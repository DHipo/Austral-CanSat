#!/usr/bin/env python3
"""Deterministic helper for repo-agnostic PR review workflows.

This script owns the repeatable mechanics that should not be rediscovered by an
agent on every review: default-branch detection, branch refresh, isolated
worktree setup, compact PR discussion fetches, changed-file metadata, review
payload validation, batched review submission, and safe cleanup.

It is repo-agnostic:
  * The base branch is auto-detected (origin/HEAD -> remote symref -> main/master)
    and can be overridden with --base. Nothing is hardcoded to "main".
  * GitHub features (PR lookup, discussion, comment posting) use the `gh` CLI
    and degrade gracefully: when `gh` is missing or no PR exists, report-only
    review still works from pure git metadata.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DEFAULT_TIMEOUT_SECONDS = 60
WORKTREE_ROOT_NAME = ".tmp-review-worktrees"
GH_PR_FIELDS = "number,url,headRefName,baseRefName,headRefOid"
BRANCH_SLUG_HASH_LENGTH = 8
BRANCH_SLUG_SAFE_LENGTH = 80
ALLOWED_REVIEW_EVENTS = {"COMMENT", "REQUEST_CHANGES", "APPROVE"}
ALLOWED_COMMENT_KEYS = {
    "path",
    "position",
    "body",
    "line",
    "side",
    "start_line",
    "start_side",
    "subject_type",
}


class PrReviewError(RuntimeError):
    """Expected user-facing helper error."""


def print_json(value: Any) -> None:
    print(json.dumps(value, indent=2, sort_keys=True))


def read_json(path: Path) -> Any:
    try:
        return json.loads(path.read_text())
    except json.JSONDecodeError as exc:
        raise PrReviewError(f"Could not parse JSON at {path}: {exc}") from exc


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n")


def run_cmd(
    args: list[str],
    *,
    cwd: Path | None = None,
    timeout: int = DEFAULT_TIMEOUT_SECONDS,
) -> str:
    try:
        result = subprocess.run(
            args,
            cwd=str(cwd) if cwd else None,
            check=False,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
    except FileNotFoundError as exc:
        raise PrReviewError(
            f"Command could not start: {' '.join(args)}: {exc}"
        ) from exc
    except subprocess.TimeoutExpired as exc:
        raise PrReviewError(
            f"Command timed out after {timeout}s: {' '.join(args)}"
        ) from exc

    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip()
        if not detail:
            detail = f"exit code {result.returncode}"
        raise PrReviewError(f"{' '.join(args)} failed: {detail}")

    return result.stdout


def git(repo_path: Path, args: list[str], timeout: int) -> str:
    return run_cmd(["git", "-C", str(repo_path), *args], timeout=timeout)


def gh(repo_path: Path, args: list[str], timeout: int) -> str:
    return run_cmd(["gh", *args], cwd=repo_path, timeout=timeout)


def gh_json(repo_path: Path, args: list[str], timeout: int) -> Any:
    raw = gh(repo_path, args, timeout)
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise PrReviewError(f"Could not parse JSON from gh {' '.join(args)}") from exc


def resolve_repo_path(repo_path: str) -> Path:
    path = Path(repo_path).expanduser().resolve()
    if not path.exists():
        raise PrReviewError(f"Repository path does not exist: {path}")
    git_dir = git(
        path, ["rev-parse", "--show-toplevel"], DEFAULT_TIMEOUT_SECONDS
    ).strip()
    root = Path(git_dir).resolve()
    if root != path:
        raise PrReviewError(f"--repo-path must be the git root ({root}), got {path}")
    return path


def parse_symref_head(text: str) -> str | None:
    """Parse the default branch from `git ls-remote --symref origin HEAD`.

    Expected line shape: ``ref: refs/heads/main\tHEAD``.
    """
    for line in text.splitlines():
        line = line.strip()
        if not line.startswith("ref:"):
            continue
        for token in line.split():
            if token.startswith("refs/heads/"):
                return token[len("refs/heads/"):]
    return None


def detect_base_branch(repo_path: Path, override: str | None, timeout: int) -> str:
    """Detect the repository's default branch name (host-agnostic).

    Resolution order:
      1. Explicit --base override.
      2. Local origin/HEAD symbolic ref (no network).
      3. Remote HEAD symref via `git ls-remote` (network, any git host).
      4. Common fallbacks: main, then master.
    """
    if override:
        return override.split("origin/", 1)[-1] if override.startswith("origin/") else override

    prefix = "refs/remotes/origin/"
    try:
        out = git(
            repo_path, ["symbolic-ref", "--quiet", "refs/remotes/origin/HEAD"], timeout
        ).strip()
        if out.startswith(prefix):
            return out[len(prefix):]
    except PrReviewError:
        pass

    try:
        out = git(repo_path, ["ls-remote", "--symref", "origin", "HEAD"], timeout)
        name = parse_symref_head(out)
        if name:
            return name
    except PrReviewError:
        pass

    for candidate in ("main", "master"):
        try:
            git(
                repo_path,
                ["rev-parse", "--verify", "--quiet", f"refs/remotes/origin/{candidate}"],
                timeout,
            )
            return candidate
        except PrReviewError:
            continue

    raise PrReviewError(
        "Could not detect the repository's default branch; pass --base <branch>."
    )


def sanitize_branch(branch: str) -> str:
    sanitized = re.sub(r"[^A-Za-z0-9._-]+", "-", branch).strip(".-")
    if not sanitized:
        raise PrReviewError(f"Branch name cannot be sanitized safely: {branch!r}")
    digest = hashlib.sha256(branch.encode("utf-8")).hexdigest()[
        :BRANCH_SLUG_HASH_LENGTH
    ]
    prefix = sanitized[:BRANCH_SLUG_SAFE_LENGTH].rstrip(".-")
    return f"{prefix}-{digest}"


def is_relative_to(child: Path, parent: Path) -> bool:
    try:
        child.resolve().relative_to(parent.resolve())
        return True
    except ValueError:
        return False


def worktree_paths(repo_path: Path, branch: str) -> tuple[Path, Path, Path]:
    worktree_root = repo_path / WORKTREE_ROOT_NAME
    sanitized = sanitize_branch(branch)
    tmp_dir = (worktree_root / f"{sanitized}-review").resolve()
    context_path = (worktree_root / f"{sanitized}-review-context.json").resolve()
    return worktree_root.resolve(), tmp_dir, context_path


def payload_path_for_context(context: dict[str, Any]) -> Path:
    if context.get("payload_path"):
        return Path(str(context["payload_path"])).expanduser().resolve()
    context_path = Path(str(context["context_path"])).expanduser().resolve()
    name = context_path.name
    if name.endswith("-context.json"):
        return context_path.with_name(name.replace("-context.json", "-payload.json"))
    return context_path.with_name(f"{context_path.stem}-payload.json")


def ensure_safe_generated_file(context: dict[str, Any], path: Path) -> None:
    repo_path = Path(str(context["repo_path"])).resolve()
    worktree_root = (repo_path / WORKTREE_ROOT_NAME).resolve()
    if not is_relative_to(path, worktree_root):
        raise PrReviewError(f"Refusing generated file outside {worktree_root}: {path}")


def ensure_safe_context_for_stale_cleanup(
    repo_path: Path,
    branch: str,
    tmp_dir: Path,
    context_path: Path,
) -> None:
    worktree_root = (repo_path / WORKTREE_ROOT_NAME).resolve()
    if not is_relative_to(tmp_dir, worktree_root):
        raise PrReviewError(
            f"Refusing to clean path outside {worktree_root}: {tmp_dir}"
        )
    if tmp_dir == repo_path.resolve():
        raise PrReviewError("Refusing to clean repository root")
    if not context_path.exists():
        raise PrReviewError(
            f"Stale review worktree exists without context file: {tmp_dir}. "
            "Inspect/remove it manually."
        )
    context = read_json(context_path)
    if Path(context.get("repo_path", "")).resolve() != repo_path.resolve():
        raise PrReviewError("Stale context repo_path does not match current repo")
    if context.get("branch") != branch:
        raise PrReviewError("Stale context branch does not match current branch")
    if Path(context.get("tmp_review_dir", "")).resolve() != tmp_dir:
        raise PrReviewError("Stale context tmp_review_dir does not match expected path")


def remove_stale_worktree_if_safe(
    repo_path: Path,
    branch: str,
    tmp_dir: Path,
    context_path: Path,
    timeout: int,
) -> None:
    if not tmp_dir.exists():
        return
    ensure_safe_context_for_stale_cleanup(repo_path, branch, tmp_dir, context_path)
    try:
        git(repo_path, ["worktree", "remove", "--force", str(tmp_dir)], timeout)
    except PrReviewError:
        if tmp_dir.exists():
            raise
    git(repo_path, ["worktree", "prune"], timeout)


def repo_name_with_owner(repo_path: Path, timeout: int) -> str:
    return gh(
        repo_path,
        ["repo", "view", "--json", "nameWithOwner", "--jq", ".nameWithOwner"],
        timeout,
    ).strip()


def pr_info(repo_path: Path, branch: str, timeout: int) -> dict[str, Any]:
    try:
        data = gh_json(
            repo_path,
            ["pr", "view", branch, "--json", GH_PR_FIELDS],
            timeout,
        )
        if isinstance(data, dict) and data.get("number"):
            return {"available": True, **data}
    except PrReviewError:
        pass

    try:
        matches = gh_json(
            repo_path,
            [
                "pr",
                "list",
                "--head",
                branch,
                "--limit",
                "10",
                "--json",
                GH_PR_FIELDS,
            ],
            timeout,
        )
    except PrReviewError as exc:
        return {"available": False, "error": str(exc)}

    if not isinstance(matches, list) or not matches:
        return {"available": False, "error": f"No pull request found for {branch}"}
    if len(matches) > 1:
        return {
            "available": False,
            "error": f"Multiple pull requests found for {branch}",
        }
    return {"available": True, **matches[0]}


def slurp_paginated(repo_path: Path, api_path: str, timeout: int) -> list[Any]:
    raw = gh(repo_path, ["api", api_path, "--paginate", "--slurp"], timeout)
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise PrReviewError(f"Could not parse JSON from gh api {api_path}") from exc
    if isinstance(data, list) and all(isinstance(item, list) for item in data):
        flattened: list[Any] = []
        for page in data:
            flattened.extend(page)
        return flattened
    if isinstance(data, list):
        return data
    return [data]


def compact_body(value: Any, limit: int = 1500) -> str:
    if not isinstance(value, str):
        return ""
    return value if len(value) <= limit else f"{value[:limit]}..."


def compact_issue_comments(items: list[Any]) -> list[dict[str, Any]]:
    compacted = []
    for item in items:
        if not isinstance(item, dict):
            continue
        compacted.append(
            {
                "author": (item.get("user") or {}).get("login"),
                "created_at": item.get("created_at"),
                "url": item.get("html_url"),
                "body": compact_body(item.get("body")),
            }
        )
    return compacted


def compact_reviews(items: list[Any]) -> list[dict[str, Any]]:
    compacted = []
    for item in items:
        if not isinstance(item, dict):
            continue
        compacted.append(
            {
                "author": (item.get("user") or {}).get("login"),
                "state": item.get("state"),
                "submitted_at": item.get("submitted_at"),
                "url": item.get("html_url"),
                "body": compact_body(item.get("body")),
            }
        )
    return compacted


def compact_review_comments(items: list[Any]) -> list[dict[str, Any]]:
    compacted = []
    for item in items:
        if not isinstance(item, dict):
            continue
        compacted.append(
            {
                "author": (item.get("user") or {}).get("login"),
                "path": item.get("path"),
                "line": item.get("line"),
                "original_line": item.get("original_line"),
                "side": item.get("side"),
                "outdated": item.get("outdated"),
                "created_at": item.get("created_at"),
                "url": item.get("html_url"),
                "body": compact_body(item.get("body")),
            }
        )
    return compacted


def fetch_discussion(
    repo_path: Path,
    repo_full_name: str,
    pr_number: int,
    timeout: int,
) -> dict[str, Any]:
    return {
        "issue_comments": compact_issue_comments(
            slurp_paginated(
                repo_path,
                f"repos/{repo_full_name}/issues/{pr_number}/comments",
                timeout,
            )
        ),
        "reviews": compact_reviews(
            slurp_paginated(
                repo_path, f"repos/{repo_full_name}/pulls/{pr_number}/reviews", timeout
            )
        ),
        "review_comments": compact_review_comments(
            slurp_paginated(
                repo_path, f"repos/{repo_full_name}/pulls/{pr_number}/comments", timeout
            )
        ),
    }


def parse_changed_ranges(patch: str | None) -> list[dict[str, int]]:
    if not patch:
        return []
    ranges: list[dict[str, int]] = []
    old_line = 0
    new_line = 0
    current_start: int | None = None
    current_end: int | None = None
    for line in patch.splitlines():
        match = re.match(r"@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@", line)
        if match:
            if current_start is not None and current_end is not None:
                ranges.append({"start": current_start, "end": current_end})
            old_line = int(match.group(1))
            new_line = int(match.group(2))
            current_start = None
            current_end = None
            continue
        if line.startswith("+") and not line.startswith("+++"):
            if current_start is None:
                current_start = new_line
            current_end = new_line
            new_line += 1
            continue
        if line.startswith("-") and not line.startswith("---"):
            old_line += 1
            continue
        if line.startswith("\\"):
            continue
        if current_start is not None and current_end is not None:
            ranges.append({"start": current_start, "end": current_end})
            current_start = None
            current_end = None
        old_line += 1
        new_line += 1
    if current_start is not None and current_end is not None:
        ranges.append({"start": current_start, "end": current_end})
    return ranges


def fetch_files(
    repo_path: Path,
    repo_full_name: str,
    pr_number: int,
    timeout: int,
    include_patch: bool,
) -> list[dict[str, Any]]:
    items = slurp_paginated(
        repo_path, f"repos/{repo_full_name}/pulls/{pr_number}/files", timeout
    )
    files: list[dict[str, Any]] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        file_info = {
            "filename": item.get("filename"),
            "status": item.get("status"),
            "additions": item.get("additions"),
            "deletions": item.get("deletions"),
            "changes": item.get("changes"),
            "changed_ranges": parse_changed_ranges(item.get("patch")),
        }
        if include_patch:
            file_info["patch"] = item.get("patch")
        files.append(file_info)
    return files


def git_lines(repo_path: Path, args: list[str], timeout: int) -> list[str]:
    output = git(repo_path, args, timeout).rstrip("\n")
    return output.splitlines() if output else []


def prepare_local(args: argparse.Namespace) -> dict[str, Any]:
    """Snapshot the current worktree for review against a fresh base branch.

    Report-only and host-agnostic: no `gh`, no temp worktree. Fetches the
    detected (or overridden) base branch, then reports base/head/merge-base
    SHAs, committed changes since the merge base, and untracked files (which
    `git diff` never shows).
    """
    repo_path = resolve_repo_path(args.repo_path)
    base_branch = detect_base_branch(repo_path, args.base, args.timeout)
    base_ref = f"origin/{base_branch}"
    git(repo_path, ["fetch", "--prune", "origin", base_branch], args.timeout)

    base_sha = git(repo_path, ["rev-parse", base_ref], args.timeout).strip()
    head_sha = git(repo_path, ["rev-parse", "HEAD"], args.timeout).strip()
    merge_base_sha = git(
        repo_path, ["merge-base", base_ref, "HEAD"], args.timeout
    ).strip()
    current_branch = git(
        repo_path, ["rev-parse", "--abbrev-ref", "HEAD"], args.timeout
    ).strip()
    repo_status = git_lines(
        repo_path, ["status", "--short", "--untracked-files=all"], args.timeout
    )
    committed_changes = git_lines(
        repo_path, ["diff", "--name-status", merge_base_sha], args.timeout
    )
    untracked_files = git_lines(
        repo_path, ["ls-files", "--others", "--exclude-standard"], args.timeout
    )
    commits = git_lines(
        repo_path, ["log", "--oneline", f"{merge_base_sha}..HEAD"], args.timeout
    )
    return {
        "mode": "local",
        "repo_path": str(repo_path),
        "current_branch": current_branch,
        "base_ref": base_ref,
        "base_sha": base_sha,
        "head_sha": head_sha,
        "merge_base_sha": merge_base_sha,
        "commits": commits,
        "committed_changes": committed_changes,
        "untracked_files": untracked_files,
        "repo_status": repo_status,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }


def prepare(args: argparse.Namespace) -> dict[str, Any]:
    repo_path = resolve_repo_path(args.repo_path)
    base_branch = detect_base_branch(repo_path, args.base, args.timeout)
    base_ref = f"origin/{base_branch}"
    worktree_root, tmp_dir, context_path = worktree_paths(repo_path, args.branch)
    worktree_root.mkdir(parents=True, exist_ok=True)

    remove_stale_worktree_if_safe(
        repo_path, args.branch, tmp_dir, context_path, args.timeout
    )

    repo_status = git_lines(
        repo_path, ["status", "--short", "--untracked-files=all"], args.timeout
    )
    git(repo_path, ["fetch", "--prune", "origin", base_branch], args.timeout)
    git(
        repo_path,
        [
            "fetch",
            "--prune",
            "origin",
            f"+refs/heads/{args.branch}:refs/remotes/origin/{args.branch}",
        ],
        args.timeout,
    )

    payload_path = payload_path_for_context(
        {"repo_path": str(repo_path), "context_path": str(context_path)}
    )
    context: dict[str, Any] = {
        "repo_path": str(repo_path),
        "branch": args.branch,
        "base_ref": base_ref,
        "target_ref": f"origin/{args.branch}",
        "tmp_review_dir": str(tmp_dir),
        "context_path": str(context_path),
        "payload_path": str(payload_path),
        "base_sha": None,
        "target_sha": None,
        "merge_base_sha": None,
        "repo_status": repo_status,
        "commits": [],
        "changed_files": [],
        "pr": {"available": False, "error": "not looked up"},
        "discussion": None,
        "files": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    write_json(context_path, context)

    git(
        repo_path,
        ["worktree", "add", "--detach", str(tmp_dir), f"origin/{args.branch}"],
        args.timeout,
    )

    base_sha = git(repo_path, ["rev-parse", base_ref], args.timeout).strip()
    target_sha = git(tmp_dir, ["rev-parse", "HEAD"], args.timeout).strip()
    merge_base_sha = git(
        tmp_dir, ["merge-base", base_ref, "HEAD"], args.timeout
    ).strip()
    commits = git_lines(
        tmp_dir, ["log", "--oneline", f"{merge_base_sha}..HEAD"], args.timeout
    )
    changed_files = git_lines(
        tmp_dir, ["diff", "--name-status", merge_base_sha], args.timeout
    )

    repo_full_name = None
    pr = {"available": False, "error": "not looked up"}
    try:
        repo_full_name = repo_name_with_owner(repo_path, args.timeout)
        pr = pr_info(repo_path, args.branch, args.timeout)
    except PrReviewError as exc:
        pr = {"available": False, "error": str(exc)}

    context.update(
        {
            "base_sha": base_sha,
            "target_sha": target_sha,
            "merge_base_sha": merge_base_sha,
            "commits": commits,
            "changed_files": changed_files,
            "pr": pr,
        }
    )
    if repo_full_name:
        context["repo_full_name"] = repo_full_name

    if pr.get("available") and repo_full_name:
        pr_number = int(str(pr.get("number")))
        if args.include_discussion:
            try:
                context["discussion"] = fetch_discussion(
                    repo_path, repo_full_name, pr_number, args.timeout
                )
            except PrReviewError as exc:
                context["discussion"] = {"error": str(exc)}
        if args.include_files:
            try:
                context["files"] = fetch_files(
                    repo_path,
                    repo_full_name,
                    pr_number,
                    args.timeout,
                    args.include_patch,
                )
            except PrReviewError as exc:
                context["files"] = {"error": str(exc)}

    write_json(context_path, context)
    return context


def load_context(path: str) -> dict[str, Any]:
    context_path = Path(path).expanduser().resolve()
    context = read_json(context_path)
    if not isinstance(context, dict):
        raise PrReviewError("Context must be a JSON object")
    if Path(context.get("context_path", "")).resolve() != context_path:
        raise PrReviewError("Context path mismatch")
    return context


def repo_from_context(context: dict[str, Any]) -> tuple[Path, str, int]:
    repo_path = Path(context["repo_path"]).resolve()
    pr = context.get("pr") or {}
    if not pr.get("available"):
        raise PrReviewError(
            f"PR metadata unavailable: {pr.get('error', 'unknown error')}"
        )
    repo_full_name = context.get("repo_full_name")
    if not repo_full_name:
        repo_full_name = repo_name_with_owner(repo_path, DEFAULT_TIMEOUT_SECONDS)
    return repo_path, repo_full_name, int(pr["number"])


def discussion(args: argparse.Namespace) -> dict[str, Any]:
    context = load_context(args.context)
    repo_path, repo_full_name, pr_number = repo_from_context(context)
    data = fetch_discussion(repo_path, repo_full_name, pr_number, args.timeout)
    if not args.no_write:
        context["discussion"] = data
        write_json(Path(context["context_path"]), context)
    return data


def files(args: argparse.Namespace) -> list[dict[str, Any]]:
    context = load_context(args.context)
    repo_path, repo_full_name, pr_number = repo_from_context(context)
    data = fetch_files(
        repo_path, repo_full_name, pr_number, args.timeout, args.include_patch
    )
    if not args.no_write:
        context["files"] = data
        write_json(Path(context["context_path"]), context)
    return data


def validate_review_payload(payload: dict[str, Any], allow_empty: bool = False) -> None:
    required_keys = ["commit_id", "event", "body", "comments"]
    missing = [key for key in required_keys if key not in payload]
    if missing:
        raise PrReviewError(
            f"Review payload missing required keys: {', '.join(missing)}"
        )
    if payload["event"] not in ALLOWED_REVIEW_EVENTS:
        raise PrReviewError(
            f"Review event must be one of {sorted(ALLOWED_REVIEW_EVENTS)}"
        )
    if not isinstance(payload["comments"], list):
        raise PrReviewError("Review payload comments must be a list")
    if not allow_empty and not payload["comments"]:
        raise PrReviewError("Refusing to submit an empty inline review")
    for index, comment in enumerate(payload["comments"]):
        if not isinstance(comment, dict):
            raise PrReviewError(f"Comment {index} must be an object")
        if not comment.get("path"):
            raise PrReviewError(f"Comment {index} missing path")
        if not comment.get("body"):
            raise PrReviewError(f"Comment {index} missing body")
        has_position = "position" in comment
        has_line = "line" in comment
        if not has_position and not has_line:
            raise PrReviewError(f"Comment {index} must include position or line")
        if has_line and not comment.get("side"):
            raise PrReviewError(f"Comment {index} with line must include side")


def sanitized_payload(payload: dict[str, Any]) -> dict[str, Any]:
    clean_comments = []
    for comment in payload["comments"]:
        clean_comments.append(
            {
                key: value
                for key, value in comment.items()
                if key in ALLOWED_COMMENT_KEYS
            }
        )
    return {
        "commit_id": payload["commit_id"],
        "event": payload["event"],
        "body": payload["body"],
        "comments": clean_comments,
    }


def validate_review(args: argparse.Namespace) -> dict[str, Any]:
    payload = read_json(Path(args.payload))
    if not isinstance(payload, dict):
        raise PrReviewError("Review payload must be a JSON object")
    validate_review_payload(payload, allow_empty=args.allow_empty)
    return {
        "valid": True,
        "event": payload["event"],
        "comments": len(payload["comments"]),
    }


def payload_template(args: argparse.Namespace) -> dict[str, Any]:
    context = load_context(args.context)
    payload_path = payload_path_for_context(context)
    ensure_safe_generated_file(context, payload_path)
    if payload_path.exists() and not args.force:
        raise PrReviewError(
            f"Payload file already exists: {payload_path}. Use --force to overwrite."
        )
    target_sha = context.get("target_sha")
    if not target_sha:
        raise PrReviewError("Context does not include target_sha; rerun prepare")
    payload = {
        "commit_id": target_sha,
        "event": "COMMENT",
        "body": "",
        "comments": [],
    }
    write_json(payload_path, payload)
    context["payload_path"] = str(payload_path)
    write_json(Path(str(context["context_path"])), context)
    return {"payload_path": str(payload_path), "created": True}


def submit_review(args: argparse.Namespace) -> dict[str, Any]:
    context = load_context(args.context)
    payload = read_json(Path(args.payload))
    if not isinstance(payload, dict):
        raise PrReviewError("Review payload must be a JSON object")
    validate_review_payload(payload, allow_empty=args.allow_empty)
    clean_payload = sanitized_payload(payload)

    repo_path, repo_full_name, pr_number = repo_from_context(context)

    if args.dry_run:
        return {
            "dry_run": True,
            "repo": repo_full_name,
            "pr_number": pr_number,
            "event": clean_payload["event"],
            "comments": len(clean_payload["comments"]),
        }

    current_pr = pr_info(repo_path, context["branch"], args.timeout)
    if not current_pr.get("available"):
        raise PrReviewError(f"Could not re-read current PR metadata: {current_pr}")
    current_sha = current_pr.get("headRefOid")
    expected_sha = context.get("target_sha")
    if current_sha != expected_sha and not args.allow_stale_head:
        raise PrReviewError(
            f"PR head changed from {expected_sha} to {current_sha}; rerun prepare"
        )

    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as tmp:
        tmp_path = Path(tmp.name)
        json.dump(clean_payload, tmp)
    try:
        result = gh_json(
            repo_path,
            [
                "api",
                f"repos/{repo_full_name}/pulls/{pr_number}/reviews",
                "--method",
                "POST",
                "--input",
                str(tmp_path),
            ],
            args.timeout,
        )
    finally:
        tmp_path.unlink(missing_ok=True)
    if isinstance(result, dict):
        return result
    return {"result": result}


def cleanup(args: argparse.Namespace) -> dict[str, Any]:
    context = load_context(args.context)
    repo_path = Path(context["repo_path"]).resolve()
    tmp_dir = Path(context["tmp_review_dir"]).resolve()
    context_path = Path(context["context_path"]).resolve()
    branch = str(context["branch"])
    ensure_safe_context_for_stale_cleanup(repo_path, branch, tmp_dir, context_path)

    removed = False
    if tmp_dir.exists():
        git(repo_path, ["worktree", "remove", "--force", str(tmp_dir)], args.timeout)
        removed = True
    git(repo_path, ["worktree", "prune"], args.timeout)
    cleanup_result = {
        "removed": removed,
        "completed_at": datetime.now(timezone.utc).isoformat(),
    }
    payload_path = payload_path_for_context(context)
    payload_removed = False
    if payload_path.exists():
        ensure_safe_generated_file(context, payload_path)
        payload_path.unlink()
        payload_removed = True
    cleanup_result["payload_removed"] = payload_removed
    context_path.unlink(missing_ok=True)
    worktree_root_removed = False
    worktree_root = (repo_path / WORKTREE_ROOT_NAME).resolve()
    try:
        worktree_root.rmdir()
        worktree_root_removed = True
    except OSError:
        pass
    cleanup_result["worktree_root_removed"] = worktree_root_removed
    return {"cleanup": cleanup_result, "tmp_review_dir": str(tmp_dir)}


def add_common_timeout(parser: argparse.ArgumentParser) -> None:
    parser.add_argument("--timeout", type=int, default=DEFAULT_TIMEOUT_SECONDS)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    prepare_local_parser = subparsers.add_parser("prepare-local")
    prepare_local_parser.add_argument("--repo-path", required=True)
    prepare_local_parser.add_argument(
        "--base", help="Override the auto-detected base branch (e.g. develop)."
    )
    add_common_timeout(prepare_local_parser)

    prepare_parser = subparsers.add_parser("prepare")
    prepare_parser.add_argument("--branch", required=True)
    prepare_parser.add_argument("--repo-path", required=True)
    prepare_parser.add_argument(
        "--base", help="Override the auto-detected base branch (e.g. develop)."
    )
    prepare_parser.add_argument("--include-discussion", action="store_true")
    prepare_parser.add_argument("--include-files", action="store_true")
    prepare_parser.add_argument("--include-patch", action="store_true")
    add_common_timeout(prepare_parser)

    discussion_parser = subparsers.add_parser("discussion")
    discussion_parser.add_argument("--context", required=True)
    discussion_parser.add_argument("--no-write", action="store_true")
    add_common_timeout(discussion_parser)

    files_parser = subparsers.add_parser("files")
    files_parser.add_argument("--context", required=True)
    files_parser.add_argument("--include-patch", action="store_true")
    files_parser.add_argument("--no-write", action="store_true")
    add_common_timeout(files_parser)

    validate_parser = subparsers.add_parser("validate-review")
    validate_parser.add_argument("--payload", required=True)
    validate_parser.add_argument("--allow-empty", action="store_true")

    payload_template_parser = subparsers.add_parser("payload-template")
    payload_template_parser.add_argument("--context", required=True)
    payload_template_parser.add_argument("--force", action="store_true")

    submit_parser = subparsers.add_parser("submit-review")
    submit_parser.add_argument("--context", required=True)
    submit_parser.add_argument("--payload", required=True)
    submit_parser.add_argument("--dry-run", action="store_true")
    submit_parser.add_argument("--allow-empty", action="store_true")
    submit_parser.add_argument("--allow-stale-head", action="store_true")
    add_common_timeout(submit_parser)

    cleanup_parser = subparsers.add_parser("cleanup")
    cleanup_parser.add_argument("--context", required=True)
    add_common_timeout(cleanup_parser)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        if args.command == "prepare-local":
            print_json(prepare_local(args))
        elif args.command == "prepare":
            print_json(prepare(args))
        elif args.command == "discussion":
            print_json(discussion(args))
        elif args.command == "files":
            print_json(files(args))
        elif args.command == "validate-review":
            print_json(validate_review(args))
        elif args.command == "payload-template":
            print_json(payload_template(args))
        elif args.command == "submit-review":
            print_json(submit_review(args))
        elif args.command == "cleanup":
            print_json(cleanup(args))
        else:
            parser.error(f"unsupported command {args.command}")
    except PrReviewError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
