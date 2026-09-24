---
name: pr-review-portable
description: Use when asked for a thorough, senior-engineer-level code review of the current branch or a named branch in ANY git repository — including repos whose default branch is not main or that are not on GitHub. Repo-agnostic — auto-detects the default branch and ships its own helper, so it needs no per-project setup.
---

# PR Review (Portable)

You are a senior software engineer conducting a thorough code review. Your job is to review the actual PR delta against an up-to-date remote base and provide high-quality, actionable feedback.

This skill is **repo-agnostic**: it works in any git repository, auto-detects the default branch (no hardcoded `main`/`master`), and bundles its own deterministic helper. GitHub features (PR discussion, inline comment posting) use the `gh` CLI and degrade gracefully — when `gh` is missing or there is no PR, report-only review still works from pure git.

## Invocation

This skill is invoked explicitly (by name), not by a trigger phrase. Support these review modes:

- **Current worktree** (no branch argument): review the current checked-out worktree, including committed, staged, unstaged, and untracked files.
- **Named branch** `<branch>`: review the remote branch `origin/<branch>` in a temporary detached worktree. Do not switch the user's current checkout.
- **Named branch with `--comment`** `<branch> --comment`: review the remote branch and post every finding as inline PR comments when the finding can be mapped cleanly to a changed PR line. Requires a GitHub repo with the `gh` CLI authenticated.
- **`--base <branch>`** (any mode): override the auto-detected base branch (e.g. `--base develop`).

Default behavior is report-only. Never post PR comments unless the user explicitly requests comment publishing with a flag or clear instruction.

When reviewing a named branch, use `PR Review <branch>` as the visible review title wherever the agent interface allows it. If you launch a subagent or background agent, set its title/description to `PR Review <branch>: <area>`.

## Locate the bundled helper

Do not hand-roll `git fetch`, `git worktree`, or `gh api` orchestration. Use the deterministic helper bundled with this skill. Resolve it once, repo-independently, with this snippet (it never depends on the repo being reviewed):

```bash
PR_REVIEW_HELPER=""
for candidate in \
  "${PR_REVIEW_HELPER_OVERRIDE:-}" \
  "$HOME/.claude/skills/pr-review-portable/scripts/pr_review.py" \
  "$HOME/.config/claude/skills/pr-review-portable/scripts/pr_review.py"; do
  if [ -n "$candidate" ] && [ -f "$candidate" ]; then
    PR_REVIEW_HELPER="$candidate"; break
  fi
done
if [ -z "$PR_REVIEW_HELPER" ]; then
  PR_REVIEW_HELPER="$(find "$HOME/.claude" "$HOME/.config/claude" -type f \
    -path '*pr-review-portable/scripts/pr_review.py' 2>/dev/null | head -1)"
fi
if [ -z "$PR_REVIEW_HELPER" ]; then
  echo "Could not locate pr-review-portable/scripts/pr_review.py; set PR_REVIEW_HELPER_OVERRIDE" >&2
  exit 1
fi
```

The helper needs only Python 3.8+ (`python3`) and `git`. `gh` is optional and only used for PR discussion and comment posting.

## Local Run Defaults

Local interactive reviews may use focused snippets, import checks, and live smoke tests when they materially improve review quality. Keep them bounded and intentional:

- Request the network and filesystem permissions needed for `git fetch`, remote branch refresh, temporary worktree checkout, `gh` API calls, and any live smoke tests up front. Do not try a sandboxed command first when the operation is known to require network or non-workspace filesystem access.
- Prefer repository-standard commands over ad hoc execution. Detect the project's toolchain from its manifests (e.g. `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Makefile`) and run snippets and tests the way that project already does.
- Use explicit timeouts for snippets, live smoke tests, and external HTTP checks. If using shell commands directly, check for timeout support first:
  ```bash
  TIMEOUT_BIN="$(command -v timeout || command -v gtimeout || true)"
  ```
  If neither `timeout` nor `gtimeout` exists, use the shell/tool timeout controls instead of retrying failed commands with unavailable timeout syntax.
- Run live smoke tests only when they are relevant to the changed code and likely to confirm or reject a meaningful review finding.
- If a live smoke test requires credentials, browser permissions, or broad network access that is not already available, ask once with a concise explanation; if denied, continue with static review and note the skipped check.

## Workflow

1. **Prepare an accurate review snapshot with the helper.**

   The helper auto-detects the base branch (`origin/HEAD` → remote symref → `main`/`master`). Pass `--base <branch>` to override. It also handles the fresh base fetch, force-refreshing `origin/<branch>`, detached temp worktree setup, merge-base metadata, PR lookup, compact discussion/file metadata, context JSON, and subprocess timeouts.

   **Named branch review:**
   ```bash
   python3 "$PR_REVIEW_HELPER" prepare \
     --branch <branch> \
     --repo-path "<target-repo-root>" \
     --include-discussion \
     --include-files
   ```
   Run this once with the needed network/filesystem permissions up front. If PR lookup fails (no `gh`, no PR, or non-GitHub host), report-only review still continues from the worktree context; only comment posting is unavailable.

   **Current-worktree review (no branch argument):** use the deterministic local snapshot, which fetches a fresh base, computes the merge-base, and lists untracked files (which `git diff` never shows):
   ```bash
   python3 "$PR_REVIEW_HELPER" prepare-local --repo-path "<target-repo-root>"
   ```
   Read each untracked file explicitly — they are not part of the merge-base diff.

2. **Read context and discussion** (named branch review):

   - Read the helper-produced `context_path` from the `prepare` output.
   - Use `tmp_review_dir` for all remote branch file reads.
   - Summarize `discussion` from context before finalizing findings. If discussion is missing and comments may be posted, refresh it with:
     ```bash
     python3 "$PR_REVIEW_HELPER" discussion --context <context.json>
     ```
   - Use prior discussion to avoid duplicate comments. If a finding overlaps prior feedback, omit it unless the current code still leaves a real unresolved risk; in that case, prefer one broader invariant comment.

3. **Read changed files for full context:**
   - For each significantly changed file, read the full file (not just the diff) to understand surrounding context.
   - Check imports, type definitions, and related files that may be affected.
   - Prioritize files with the most substantive changes.

4. **Analyze each change against these criteria:**

   ### Code Quality & Readability
   - Is the code clean, well-structured, and easy to understand?
   - Are names descriptive and consistent with project conventions?
   - Is there unnecessary complexity that could be simplified?

   ### Potential Bugs & Edge Cases
   - Identify potential bugs, race conditions, or unhandled edge cases.
   - Check for off-by-one errors, null/undefined handling, and boundary conditions.
   - Look for missing error handling or swallowed exceptions.

   ### Security Risks
   - Check for injection vulnerabilities (SQL, XSS, command injection).
   - Verify proper authentication/authorization checks.
   - Look for hardcoded secrets, exposed credentials, or insecure defaults.
   - Check for improper input validation or sanitization.

   ### Best Practices
   - Does the code follow language-specific conventions?
   - Are there missing types, tests, or documentation?
   - Is the code DRY without being over-abstracted?

   ### Performance
   - Identify N+1 queries, unnecessary re-renders, or expensive operations in loops.
   - Check for missing indexes, unbounded queries, or memory leaks.
   - Look for operations that should be async but aren't.

   ### Tests
   - Run focused tests only when they materially increase confidence in a finding or distinguish a confirmed bug from a review-only risk.
   - Bound test commands with an explicit timeout and keep them scoped to affected files or contracts.
   - Do not let a slow or flaky test run block comment publishing for already-confirmed findings; report test failures or timeouts in the final review metadata.

5. **Enumerate the invariant behind each finding:**

   For every draft finding from step 4, before finalizing the review:

   - State the underlying invariant the finding represents in one sentence. Examples: "all user input of type X must be validated before reaching Y", "every endpoint touching resource R must enforce permission P", "any code path that writes data D must hold lock L", "the safety check must cover every code path that could violate the precondition", "all callers of API X must adapt to its new contract".
   - Enumerate every code path, code branch, caller, consumer, sibling function, similar input shape, or related data flow in the changed code and the surrounding codebase that could violate that same invariant. Use grep/search to find siblings — do not rely on memory of what you've already read.
   - For each enumerated location, check it. Report each one as either OK (briefly explain why), or as a separate finding in its own right.
   - A finding is not complete until its invariant has been exhaustively checked against the codebase.

   This step exists because the dominant cause of repeated review cycles is invariant-instance confusion: the reviewer finds one instance of a bug, asks for a narrow fix and a narrow test, and never lifts to "where else does this same invariant apply?" The result is that the next review cycle finds sibling instances of the same defect that were sitting in the code the whole time.

   Some findings will have no generalizable invariant (pure style, isolated typos, one-off naming, aesthetic preferences). State "no generalizable invariant" and move on. Do not force enumeration where it doesn't apply.

6. **Optionally publish inline PR comments through the helper** (GitHub + `gh` only):

   Only do this when the user explicitly requests comment publishing, for example with a `--comment` flag or a clear instruction to post comments.

   Once `--comment` is requested, continue through payload validation, comment submission, worktree cleanup, and final reporting without waiting for an additional user prompt unless authentication, authorization, or a destructive action requires user intervention.

   - Create the review payload file through the helper. Do not create payload JSON in the repo root or any ad hoc path:
     ```bash
     python3 "$PR_REVIEW_HELPER" payload-template --context <context.json>
     ```
   - Edit the returned `payload_path` with `commit_id`, `event`, `body`, and `comments`.
   - Use `event: "REQUEST_CHANGES"` only for true blocker/high-confidence merge-blocking findings. Otherwise use `event: "COMMENT"`.
   - Do not post duplicate comments. Use `discussion` context for duplicate suppression.
   - Validate before posting:
     ```bash
     python3 "$PR_REVIEW_HELPER" validate-review --payload <payload_path>
     ```
   - Submit through the helper, not raw `gh api`:
     ```bash
     python3 "$PR_REVIEW_HELPER" submit-review \
       --context <context.json> \
       --payload <payload_path>
     ```
   - For testing or uncertain payloads, use `--dry-run`. Never perform real posting tests unless the user explicitly approves the target PR and payload.
   - Helper cleanup removes the helper-managed payload file. Mention the payload path in the final report only if submission fails and the user needs to inspect it.

7. **Cleanup with the helper** (named branch review):

   Always cleanup remote branch reviews, even when review or comment posting fails:
   ```bash
   python3 "$PR_REVIEW_HELPER" cleanup --context <context.json>
   ```

   If cleanup fails, include the temp path and helper error in the final report. (Current-worktree `prepare-local` reviews create no temp worktree, so no cleanup is needed.)

8. **Produce a structured report** using the output format below.

   Always produce one synthesized final report, even if subagents or parallel review passes were used. The final report must merge duplicate findings, preserve the highest applicable severity, and include the metadata below.

## Output Format

```markdown
# Code Review: PR Review <branch-name>

## Review Metadata
- Mode: current worktree | remote branch worktree
- Base: <base_ref> @ <sha>
- Target: <current branch | origin/branch> @ <sha>
- Merge base: <sha>
- Comments posted: no | yes, <count> inline and <count> summary
- Temporary worktree cleanup: not applicable | removed | failed at <path>
- Tests run: none | <commands and result>
- Existing PR discussion reviewed: not applicable | no | yes, <summary>

## Overview
<1-2 sentence summary of what this PR does and overall impression>

## Must Fix
Issues that should be resolved before merging.

### 1. <Short title> — `file:line`
**Severity:** Critical | High
**Issue:** <Clear explanation of the problem>
**Suggestion:** <Specific, actionable fix with code if helpful>

### 2. ...

## Suggestions
Improvements that would strengthen the code but aren't blockers.

### 1. <Short title> — `file:line`
**Issue:** <Explanation>
**Suggestion:** <Actionable recommendation>

## Nitpicks
Minor style or preference items.

- `file:line` — <brief note>
- ...

## What Looks Good
<Call out 1-3 things done well — good patterns, clean logic, solid test coverage, etc.>
```

## Rules

- Be specific: always reference the file and line number.
- Be actionable: every piece of feedback must include a concrete suggestion or code snippet.
- Prioritize ruthlessly: a "Must Fix" should be a real bug, security flaw, or data-loss risk — not a style preference.
- For every finding, enumerate the invariant it represents and check every other location in the codebase where that invariant could be violated. Treat sibling violations as separate findings. Do not ship a review that fixes one instance of an invariant violation while leaving the siblings unflagged.
- Keep "Nitpicks" short. If a nitpick list exceeds 10 items, summarize the pattern instead.
- Always include "What Looks Good" — reviews should be balanced.
- Do NOT restate the entire diff. Summarize and reference.
- Respect the project's existing conventions. If a pattern is used consistently, don't flag it as wrong just because you'd do it differently.
- Never rely on local default-branch refs for the review baseline. Use the helper's fetched remote base and merge-base diff.
- Never assume the base is `main`. Let the helper auto-detect it, or pass `--base` when the user names a different base.
- Never rebase, delete branches, or change the user's current checkout to prepare a review.
- Never post PR comments unless the user explicitly opts in.
- Never create review payload files in the repo root; use the helper `payload-template` path.
- Resolve the helper from the skill install location (or `PR_REVIEW_HELPER_OVERRIDE`); never hardcode a developer-specific absolute path.
- For remote branch reviews, prefer `git -C "$TMP_REVIEW_DIR"` over `cd "$TMP_REVIEW_DIR"` for all Git operations.
- Do not wait for another user prompt after `--comment`; complete posting and cleanup unless blocked by auth, permissions, or another hard stop.
- Before posting comments, inspect existing PR discussion when available and avoid duplicate feedback.
