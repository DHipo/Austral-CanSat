---
name: pr-create
description: Use when creating or preparing a pull request for the current branch. Formats the PR title using Conventional Commits and ensures the PR body follows the standardized template with a mandatory link to the related Linear issue.
---

# PR Create Skill

This skill automates and standardizes the creation of Pull Requests in the Cinematch repository, ensuring that all PRs adhere to the required structure, title conventions, mandatory Linear issue link, and project rules.

## Mandatory Rules

1. **Required Issue Link:** Every PR must include a direct link to the corresponding Linear issue (e.g., `https://linear.app/absolute-cinematch/issue/CIN-XX/...` or `CIN-XX`).
2. **Title Format:** Must follow Conventional Commits: `<type>(<scope>): <concise description> (CIN-XX)`.
3. **Standard Template:** The PR body must follow the template defined in `.github/pull_request_template.md`.
4. **Pre-Verification:** Before opening the PR, verify that `npm run lint`, `npm run test`, and `npm run build` pass without errors.
5. **Cinematch Rules:** Ensure the PR follows all rules defined in `AGENTS.md` (English only, mobile first, no emojis, hooks for services, error enums in component files, separate SVG files, composition over inheritance).

## Mandatory PR Template

```markdown
## Context and Objective
<Description of the problem and resolved goal>

## Related Issue
- **Issue:** [CIN-XX: Title](https://linear.app/absolute-cinematch/issue/CIN-XX/...)

## Changes Made
- <Item 1>
- <Item 2>

## Verification and Test Plan
- [x] `npm run lint` passes without errors
- [x] `npm run test` passes without errors
- [x] `npm run build` compiles successfully
- [x] Executed tests: <details>

## Pre-Merge Checklist
- [x] Code adheres to AGENTS.md and CLAUDE.md directives.
- [x] All code, comments, and PR text are in English.
- [x] No emojis are used anywhere in the changes.
- [x] No direct calls to TMDB from the frontend.
- [x] Updated Knowledge Base if applicable.
- [x] Commits follow Conventional Commits.
```

## Helper Usage

The skill includes a support script in `scripts/pr_create.py`:

```bash
# Prepare the PR description and validate the issue link
python .agents/skills/pr-create/scripts/pr_create.py --issue "https://linear.app/absolute-cinematch/issue/CIN-20/..." --title "feat(ai): configure AI environment and PR skill"

# Or submit automatically if gh CLI is available
python .agents/skills/pr-create/scripts/pr_create.py --issue "CIN-20" --title "feat(ai): configure AI environment and PR skill" --submit
```
