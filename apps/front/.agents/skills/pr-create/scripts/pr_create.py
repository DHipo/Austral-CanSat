#!/usr/bin/env python3
"""
Helper script for generating structured pull requests with mandatory issue links.
"""

import argparse
import subprocess
import sys
import re

TEMPLATE = """## Contexto y Objetivo
{context}

## Issue Relacionado
- **Issue:** {issue_link}

## Cambios Realizados
{changes}

## Plan de Verificacion y Pruebas
- [x] `npm run lint` pasa sin errores
- [x] `npm run test` pasa sin errores
- [x] `npm run build` compila correctamente
- [x] Pruebas verificadas:
{tests}

## Checklist Pre-Merge
- [x] El codigo sigue las directivas de CLAUDE.md / AGENTS.md.
- [x] No se realizan llamadas directas a TMDB desde frontend.
- [x] Si se descubrio un nuevo patron, se registro en la Knowledge Base (discover_save).
- [x] Los mensajes de commit siguen Conventional Commits.
"""

def run_git_command(args):
    result = subprocess.run(["git"] + args, capture_output=True, text=True, check=False)
    return result.stdout.strip()

def get_current_branch():
    return run_git_command(["rev-parse", "--abbrev-ref", "HEAD"])

def get_commits_since_base(base="origin/main"):
    raw = run_git_command(["log", f"{base}..HEAD", "--oneline"])
    if not raw:
        # fallback to local main
        raw = run_git_command(["log", "main..HEAD", "--oneline"])
    if not raw:
        return []
    return [line.strip() for line in raw.split("\n") if line.strip()]

def format_issue_link(issue_str):
    if not issue_str:
        return None
    issue_str = issue_str.strip()
    if issue_str.startswith("http://") or issue_str.startswith("https://"):
        match = re.search(r"(CIN-\d+)", issue_str)
        key = match.group(1) if match else "Issue"
        return f"[{key}]({issue_str})"
    elif re.match(r"^CIN-\d+$", issue_str, re.IGNORECASE):
        key = issue_str.upper()
        return f"[{key}](https://linear.app/absolute-cinematch/issue/{key})"
    return f"[{issue_str}]({issue_str})"

def main():
    parser = argparse.ArgumentParser(description="Generate PR description with mandatory issue link.")
    parser.add_argument("--issue", required=True, help="Linear issue URL or key (e.g. CIN-20 or https://linear.app/...)")
    parser.add_argument("--title", required=False, help="PR Title (Conventional Commits format)")
    parser.add_argument("--context", default="Implementacion del ticket segun los requerimientos acordados.", help="Brief context summary")
    parser.add_argument("--base", default="main", help="Base branch (default: main)")
    parser.add_argument("--submit", action="store_true", help="Execute gh pr create with the generated payload")
    
    args = parser.parse_args()

    issue_link = format_issue_link(args.issue)
    if not issue_link:
        print("Error: Se requiere un enlace o identificador de issue valido (ej. CIN-20).", file=sys.stderr)
        sys.exit(1)

    branch = get_current_branch()
    commits = get_commits_since_base(f"origin/{args.base}")

    changes_list = []
    for c in commits:
        changes_list.append(f"- {c}")
    changes_str = "\n".join(changes_list) if changes_list else "- Cambios implementados en la rama actual."

    tests_str = "```bash\nnpm run lint\nnpm run test\nnpm run build\n```"

    pr_body = TEMPLATE.format(
        context=args.context,
        issue_link=issue_link,
        changes=changes_str,
        tests=tests_str,
    )

    title = args.title
    if not title and commits:
        title = commits[0]
        if " " in title:
            title = title.split(" ", 1)[1]
    if not title:
        title = f"feat: cambios en rama {branch}"

    print("============================== PR TITLE ==============================")
    print(title)
    print("============================== PR BODY ===============================")
    print(pr_body)
    print("======================================================================")

    if args.submit:
        print("\nEjecutando gh pr create...")
        cmd = ["gh", "pr", "create", "--base", args.base, "--title", title, "--body", pr_body]
        sub = subprocess.run(cmd)
        if sub.returncode != 0:
            print("No se pudo enviar automaticamente via gh CLI. Puedes copiar el contenido anterior para crearlo manualmente en GitHub.")

if __name__ == "__main__":
    main()
