---
id: lesson-18
slug: automating-claude-code
title: "Automating Claude Code: Hooks, Subagents, MCP, Plugins, and CI"
level: advanced
order: 18
duration: 25
tags:
  - hooks
  - subagents
  - claude-code-mcp
  - headless
  - github-actions
summary: "Turning Claude Code from an assistant into automation: deterministic hooks, subagents that keep your context clean, connecting tools over MCP, packaging setups as plugins, and running Claude non-interactively in scripts, GitHub Actions, and scheduled routines."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Write **hooks** that run on lifecycle events and **block** unsafe actions.
- Create **subagents** for isolated, parallel, or specialist work.
- Connect external tools with **`claude mcp add`** and choose the right **scope**.
- Install and share setups as **plugins** from **marketplaces**.
- Run Claude **headless** with `claude -p`, in **GitHub Actions**, and on a **schedule**.

# Why It Matters

Lesson 17 taught Claude Code what to know. This lesson makes it do things **reliably and at scale**:
formatting every edit, refusing to touch secrets, reviewing every pull request, and running overnight
jobs. The key idea is the difference between **asking** Claude to do something (instructions) and
**guaranteeing** it happens (hooks, permissions, CI).

# Concept Explanation

### Hooks: guarantees, not requests

Hooks are commands Claude Code runs **automatically at specific points in its lifecycle**. In the
docs' words, they give you **deterministic control**: certain actions always happen instead of
depending on the model choosing them. Anthropic's rule of thumb: **put guardrails in hooks**. "Never
edit `.env`" in CLAUDE.md is a request, and a `PreToolUse` hook that blocks the edit is enforcement.

Common events include **`PreToolUse`** (before a tool runs, so it can block), **`PostToolUse`** (after a
tool, for example to format), **`Notification`** (Claude needs your input), **`Stop`** (Claude finishes a
turn), **`SessionStart`**, and **`UserPromptSubmit`**. Hooks go in a settings file under `"hooks"`, with
a `matcher` for which tools they apply to:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" }
        ]
      }
    ]
  }
}
```

**How hooks communicate:** Claude Code sends event data as JSON on **stdin**. **Exit 0** means no
objection. **Exit 2 blocks the action**, and what you write to **stderr** becomes the reason (fed back
to Claude on events like `PreToolUse`). For richer control, exit 0 and print JSON. Hooks can also be
an HTTP request, an MCP tool call, a prompt, or a subagent. Run **`/hooks`** to see what's configured,
or just ask Claude to write a hook for you.

### Subagents: separate context, summarized results

A **subagent** runs in **its own context window** with its own system prompt, tools, and permissions,
and returns only a **summary**. That keeps verbose side work, such as reading 40 files or running a
long search, out of your main conversation. Built-ins include **Explore** (fast, read-only),
**Plan**, and **general-purpose**.

Define your own in **`.claude/agents/<name>.md`** (project) or `~/.claude/agents/` (personal). Only
`name` and `description` are required:

```markdown
---
name: security-reviewer
description: Reviews code changes for security vulnerabilities. Use after implementing features that touch auth, input handling, or secrets.
tools: Read, Grep, Glob
model: opus
---

You are a senior security engineer. Review the changes for injection, broken
auth, exposed secrets, and unsafe data handling. Give file and line references
and a concrete fix for each finding. Report only issues that matter.
```

Claude delegates automatically based on the **description**, or you can ask: "Use the
security-reviewer subagent on this diff." A **fork** (`/subtask …`) is a subagent that starts with a
copy of your conversation. Subagents can also run in the **background** while you keep working.

### MCP in Claude Code

Connect external tools with **`claude mcp add`**:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable -- npx -y airtable-mcp-server
```

The `--` separates Claude's options from the server's own command (and the docs advise putting
another option between `--env` and the server name, as here). **Scopes:** `local` (the default,
just you in this project), `project` (shared through a committed **`.mcp.json`**), and `user` (all your
projects). Run **`/mcp`** to check status and sign in to servers that use OAuth. Tool schemas load **on
demand**, so idle servers cost little context. The docs also note that CLI tools like `gh` are often
the most context-efficient way to reach external services.

### Plugins and marketplaces

A **plugin** packages **skills, subagents, hooks, and MCP servers** into one installable unit. Its
skills are namespaced (`/my-plugin:review`). Browse with **`/plugin`**, or install directly:

```text
/plugin install commit-commands@claude-plugins-official
/plugin marketplace add your-org/claude-plugins
```

Choose a scope when installing: **user** (all your projects), **project** (everyone in the repository,
via `.claude/settings.json`), or **local**. Plugins can run hooks and MCP servers, so **read what a
plugin installs before you install it**. Plugins you enable on your claude.ai account also sync into
Claude Code.

### Headless runs: `claude -p`

`claude -p "prompt"` runs Claude **non-interactively**, which is how it fits into scripts, pre-commit
hooks, and pipelines:

```bash
tail -200 app.log | claude -p "Summarize any errors and their likely causes"
claude -p "List all API endpoints" --output-format json
claude -p "Run the test suite and fix failures" --allowedTools "Bash(npm test *)" "Edit" --permission-mode dontAsk
```

`--output-format json` returns one JSON object with a `result` field, and `stream-json` streams events.
`--permission-mode dontAsk` with an explicit `--allowedTools` list denies anything not pre-approved,
which is what you want unattended. For large migrations, the bundled **`/batch`** skill splits work
across many subagents in their own worktrees.

### Claude in CI: GitHub Actions

The **Claude Code GitHub Action** (`anthropics/claude-code-action@v1`) runs Claude in your workflows.
The quickest setup is **`/install-github-app`** inside Claude Code. Without a `prompt` input it waits
for **`@claude`** mentions in issues and pull requests; with a `prompt` it runs automatically on any
event, including a schedule.

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
    steps:
      - uses: actions/checkout@v6
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Store credentials as **secrets**, never in the repository. You can use an `ANTHROPIC_API_KEY`, or a
`CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token` to use a subscription. Cap runs with `--max-turns`
in `claude_args`. GitLab CI/CD is supported too.

### Scheduling and long runs

- **Routines** (`/schedule`) run in the **cloud** on a schedule, an API call, or a GitHub event, so they
  keep going with your computer off.
- **Desktop scheduled tasks** run on your machine with access to local files.
- **`/loop`** repeats a prompt inside a session, and **`/goal`** keeps Claude working until a
  condition you set is met.

# Key Terminology

- **Hook** — a command (or HTTP call, prompt, or subagent) Claude Code runs at a lifecycle event.
- **`PreToolUse` / `PostToolUse`** — hook events before and after a tool runs.
- **Exit code 2** — a hook's signal to block the action, with stderr as the reason.
- **Subagent** — an isolated worker with its own context that returns a summary.
- **`.mcp.json`** — the project-scoped MCP configuration file you commit for your team.
- **Plugin / marketplace** — a packaged bundle of extensions, and a catalog you install them from.
- **Headless mode** — running `claude -p` non-interactively in scripts and CI.

# Options and Trade-offs

| Need | Tool | Note |
| --- | --- | --- |
| Must happen on every edit or command | Hook | Deterministic; keep scripts fast |
| Block something absolutely | Deny rule or `PreToolUse` hook (exit 2) | Prompts and CLAUDE.md are only requests |
| Research without bloating context | Subagent | Returns a summary; specify what to report |
| An external system's data or actions | MCP server (or its CLI) | Pick scope deliberately; review auth |
| The same setup across many repos | Plugin | Namespaced; review hooks and servers it runs |
| Unattended runs | `claude -p` + `--allowedTools` + `dontAsk` | Allow only what the job needs |
| PR automation | GitHub Action | Secrets for credentials; cap turns and time |

# Worked Example

**Goal:** a safer, more automated team repository.

1. **Format on edit:** add the `PostToolUse` prettier hook above to `.claude/settings.json`.
2. **Protect secrets:** add `deny` rules for `Read(./.env*)`, and a `PreToolUse` hook script that exits 2
   when an `Edit` or `Write` targets `.env`, `package-lock.json`, or `.git/`.
3. **Review step:** add the `security-reviewer` subagent, and end feature prompts with "Then have the
   security-reviewer subagent check the diff, and fix anything it reports."
4. **Shared tools:** `claude mcp add --scope project …` for your issue tracker, committed as `.mcp.json`.
5. **CI:** run `/install-github-app` so teammates can type `@claude` on issues and PRs.
6. **Verify the guardrails:** ask Claude to "add a comment to .env". The hook should block it and Claude
   should explain why.

# Real World Analogy

Think of an **automated workshop**. **Hooks** are the safety interlocks and sensors: the saw won't run
with the guard up, and every part gets deburred as it leaves the station. Nobody has to remember.
**Subagents** are specialists at separate benches who hand back a finished part and a short note.
**MCP servers** are the supply lines to other buildings. **Plugins** are pre-packaged production-line
kits you can install in a second workshop. **Headless runs and CI** are the night shift, working from a
written job sheet with only the tools you've signed out.

# Examples

## Example 1 — Basic: get notified when Claude needs you

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": "notify-send 'Claude Code' 'Claude Code needs your attention'" }
        ]
      }
    ]
  }
}
```

**Why this works:** the `Notification` event fires when Claude waits for input or permission, so you
can switch tasks without watching the terminal. That command is for Linux; the docs give macOS and
Windows equivalents.

## Example 2 — Real-world: a nightly report in CI

A scheduled GitHub Actions workflow passes a `prompt` ("Summarize yesterday's commits and open issues")
and `claude_args: --allowedTools "mcp__github__list_commits,mcp__github__list_issues"`. Every morning
the summary waits in the run log, and Claude can only use the two read tools it was given.

**Why this works:** automation mode plus a minimal tool allowlist makes an unattended run that's both
useful and contained.

## Example 3 — Pitfall: the rule that was only a request

A team writes "NEVER edit .env files" in CLAUDE.md. Weeks later, deep in a long session, Claude
"helpfully" updates a variable in `.env.local`.

**The fix:** instructions are advisory. Add `deny` rules for `Read(./.env*)` and `Edit(./.env*)`, plus
a `PreToolUse` hook that exits 2 for those paths. Now the action is **blocked**, not just discouraged.

# Common Mistakes

- **Using prompts for guarantees.** Use deny rules and hooks for anything that must never happen.
- **Slow or noisy hooks** that run on every tool call. Use matchers and keep them fast.
- **Vague subagent descriptions,** so Claude never delegates, or delegates the wrong things.
- **Wide-open headless runs.** Always pair `-p` with a minimal `--allowedTools` list.
- **Committing secrets** in workflows or `.mcp.json`. Use repository secrets and `${VAR}` expansion.

# Best Practices

- Put **guardrails in hooks and deny rules**; put **knowledge in CLAUDE.md and skills**.
- Use **subagents for investigation and independent review**, so a fresh context checks the work.
- Share team tools through a committed **`.mcp.json`** and team setups through **plugins**.
- Run unattended jobs with **`dontAsk` + explicit `--allowedTools`**, capped turns, and timeouts.
- **Test automation deliberately**: try the blocked action, and read the CI logs from the first runs.

# Summary

- **Hooks** run deterministically at lifecycle events; **exit 2 blocks** an action, with stderr as the reason.
- **Subagents** (`.claude/agents/*.md`) work in isolated context and return summaries.
- **`claude mcp add`** connects tools at **local**, **project** (`.mcp.json`), or **user** scope.
- **Plugins** bundle skills, subagents, hooks, and MCP servers; install from **marketplaces** after review.
- **`claude -p`**, the **GitHub Action**, and **routines** run Claude unattended; keep permissions minimal.

# Flash Cards

Q: Why use a hook instead of a CLAUDE.md instruction?
A: Hooks are deterministic: they run every time at a lifecycle event, while CLAUDE.md instructions are requests Claude may not always follow.

Q: What does exit code 2 mean for a hook?
A: Block the action; what the hook writes to stderr becomes the reason (fed to Claude on events like PreToolUse).

Q: Where are project subagents defined, and which two fields are required?
A: In .claude/agents/<name>.md; name and description are required.

Q: What are the three MCP scopes in Claude Code?
A: local (default; you, this project), project (shared via a committed .mcp.json), and user (all your projects).

Q: How do you run Claude Code non-interactively?
A: claude -p "your prompt", optionally with --output-format json or stream-json, --allowedTools, and a permission mode.

Q: What's the quickest way to set up the Claude Code GitHub Action?
A: Run /install-github-app inside Claude Code; it installs the GitHub App, adds the secret, and prepares the workflow.

# Exercises

### Easy
Add a `Notification` hook for your operating system to `~/.claude/settings.json`, confirm it appears in
`/hooks`, and trigger it by letting Claude wait for a permission prompt.

### Medium
Create a read-only subagent (tools: Read, Grep, Glob) that answers "where is X implemented and how?"
for your codebase. Use it on three questions and compare your main context usage with and without it
(`/context`).

### Challenging
Build a small "safety kit" for a repository: a `PreToolUse` protection hook, deny rules for secrets, a
`PostToolUse` formatter, and a headless `claude -p` script that runs your tests with `dontAsk` and an
explicit allowlist. Try to get Claude to violate each guardrail, and document which mechanism stopped
it.

# Further Reading

- Claude Code docs — *Automate actions with hooks*: <https://code.claude.com/docs/en/hooks-guide>
- Claude Code docs — *Custom subagents*: <https://code.claude.com/docs/en/sub-agents>
- Claude Code docs — *Connect tools via MCP*: <https://code.claude.com/docs/en/mcp>
- Claude Code docs — *Install and manage plugins*: <https://code.claude.com/docs/en/plugins/install>
- Claude Code docs — *Claude Code GitHub Actions*: <https://code.claude.com/docs/en/github-actions>
- Claude Code docs — *Headless / programmatic use*: <https://code.claude.com/docs/en/headless>
