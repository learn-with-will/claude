---
id: lesson-16
slug: claude-code-essentials
title: "Claude Code Essentials"
level: intermediate
order: 16
duration: 22
tags:
  - claude-code
  - agentic-coding
  - permission-modes
  - checkpoints
  - cli
summary: "Claude Code is Anthropic's agentic coding tool: it reads your codebase, edits files, runs commands, and verifies its work. This lesson covers installing it, the agentic loop, permission modes, checkpoints, the essential commands, and the explore, plan, implement, commit workflow."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Install **Claude Code** and start a session in a project.
- Explain the **agentic loop**: gather context, take action, verify results.
- Choose a **permission mode** and undo changes with **checkpoints**.
- Use the **essential commands** to manage context, models, and sessions.
- Follow the **explore → plan → implement → commit** workflow and give Claude a way to **verify** its work.

# Why It Matters

Inline code assistants suggest the next line. Claude Code **completes the task**: it searches your
repository, reads the relevant files, makes coordinated edits across them, runs the tests, and fixes
what fails. That's a different way of working, closer to delegating to a capable engineer. It also
works for non-coding work you can do from a terminal, such as writing docs, running builds, and
researching topics.

# Concept Explanation

### What it is and where it runs

Claude Code is an **agentic coding tool that reads your codebase, edits files, runs commands, and
integrates with your development tools**. The same engine runs on several surfaces: the **terminal**
(CLI), **VS Code** (and Cursor), **JetBrains** IDEs, the **Claude Desktop app** (the Code tab), and the
**web** at claude.ai/code. Your `CLAUDE.md` files, settings, and MCP servers work across all of them.

**Access:** Pro and Max include Claude Code, as do Team Standard seats. You can also use a Claude
Console (API) account, and the CLI and IDE extensions support third-party providers. Usage on Pro and
Max is **shared with your Claude chats**.

### Installing

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

That's for macOS, Linux, and WSL. On Windows PowerShell, run `irm https://claude.ai/install.ps1 | iex`.
Homebrew (`brew install --cask claude-code`) and WinGet (`winget install Anthropic.ClaudeCode`) also
work, but they don't auto-update. Check the install with `claude --version`, then start in any project:

```bash
cd your-project
claude
```

You'll be asked to log in the first time. One gotcha from the Help Center: if an `ANTHROPIC_API_KEY`
environment variable is set, Claude Code uses that key **instead of your subscription**, and you're
billed API rates.

### The agentic loop

When you give Claude a task, it works through three blended phases: **gather context**, **take
action**, and **verify results**. It repeats them until the task is done. Its built-in tools cover
**file operations** (read, edit, create), **search** (find files, grep), **execution** (shell commands,
tests, git), **web** (search, fetch docs), and **code intelligence** (with a plugin). In a session,
Claude can see your **project files**, your **terminal**, your **git state**, your **CLAUDE.md**, and
its own **auto memory**.

You're part of the loop: press **`Esc`** to stop Claude immediately, or type a correction and press
**Enter**, and Claude reads it as soon as its current tool calls finish.

### Permission modes

Press **`Shift+Tab`** to cycle modes:

| Mode | What runs without asking |
| --- | --- |
| **Manual** (config value `default`) | Reads only; Claude asks before edits and commands |
| **Accept edits** (`acceptEdits`) | Reads, file edits, and common filesystem commands |
| **Plan** (`plan`) | Exploration only; Claude proposes a plan without editing your source files |
| **Auto** (`auto`) | Most actions, with a background classifier that blocks risky ones |

Auto is the built-in starting mode for interactive terminal and VS Code sessions on recent versions
(v2.1.283 and later). Two more modes exist for automation: `dontAsk` for locked-down scripts and
`bypassPermissions` for isolated containers only. You can also pre-approve trusted commands, like
`npm test`, with `/permissions`.

### Checkpoints: undo for file edits

Before Claude edits a file, it snapshots it. Press **`Esc` twice** or run **`/rewind`** to restore code,
conversation, or both to an earlier point. Checkpoints cover **file edits only**: actions on remote
systems (databases, deployments, pushed commits) can't be undone this way, and the docs stress that
**checkpoints aren't a replacement for git**.

### Essential commands

| Command | What it does |
| --- | --- |
| `/init` | Generate a starter `CLAUDE.md` for the project |
| `/clear` | Start a new conversation with empty context |
| `/compact [focus]` | Summarize the conversation to free context |
| `/context` | Show what's filling the context window |
| `/model`, `/effort` | Switch model; set effort level |
| `/plan [task]` | Enter plan mode (optionally with a task) |
| `/rewind` | Roll code and/or conversation back to a checkpoint |
| `/resume` | Return to an earlier conversation |
| `/usage` | See plan usage, limits, and activity |
| `/doctor` | Diagnose installation and configuration problems |

### The workflow that works

Anthropic's best-practices guide recommends four phases for anything non-trivial:

1. **Explore** in plan mode: "Read /src/auth and explain how sessions work."
2. **Plan:** "I want to add Google OAuth. What files change? Create a plan."
3. **Implement:** "Implement the plan. Write tests, run them, and fix failures."
4. **Commit:** "Commit with a descriptive message and open a PR."

For small, clear changes (a typo, a rename), skip the plan. In the guide's words, if you could
describe the diff in one sentence, skip the plan.

### Give Claude a way to verify

The single most effective habit: give Claude **a check it can run**, such as tests, a build, a linter,
or a screenshot to compare. Without one, "looks done" is the only signal, and *you* become the test.
Ask Claude to show **evidence** (test output, the command it ran) rather than just claiming success.

# Key Terminology

- **Claude Code** — Anthropic's agentic coding tool for the terminal, IDEs, desktop, and web.
- **Agentic loop** — gather context, take action, verify results, repeated until done.
- **Tool** — a capability Claude can use: read/edit files, search, run commands, browse.
- **Permission mode** — how much Claude can do without asking (Manual, Accept edits, Plan, Auto).
- **Checkpoint** — a snapshot of files before an edit; restore with `Esc Esc` or `/rewind`.
- **Plan mode** — Claude explores and proposes a plan without editing source files.
- **CLAUDE.md** — a Markdown file of project instructions Claude reads every session (Lesson 17).

# Options and Trade-offs

| Choice | Best for | Trade-off |
| --- | --- | --- |
| Manual mode | Unfamiliar code, sensitive repos | Many approval prompts |
| Accept edits | Iterating on code you're reviewing | Still asks for non-filesystem commands |
| Plan mode | Large or uncertain changes | Extra step before any code changes |
| Auto mode | Long tasks with fewer interruptions | A classifier, not you, approves most actions |
| Terminal CLI | Full power, scripting, piping | Text interface |
| VS Code / JetBrains / Desktop | Visual diffs and review | Slightly less scriptable |

# Worked Example

**Situation:** you've just joined a project, and a test is failing.

1. `cd` into the repo and run `claude`.
2. **Explore** (plan mode via `Shift+Tab`): "Give me an overview of this codebase: its main modules,
   how to run the tests, and where the payment logic lives."
3. **Reproduce:** "Run the test suite and tell me which tests fail and why." Claude runs the tests and
   reads the output.
4. **Plan the fix:** "Propose a fix for the failing refund test. Address the root cause; don't change
   the test to make it pass."
5. **Implement and verify** (switch out of plan mode): "Apply the fix, run the full suite, and show me
   the output."
6. **Review** the diff, then: "Commit with a descriptive message."

If step 5 went wrong, `Esc Esc` restores the files to before the edit.

# Real World Analogy

Claude Code is like a **skilled contractor working in your workshop**. They can pick up any tool on
the bench, measure, cut, and test-fit, but you decide what they're allowed to do without asking
(permission modes). They take a photo of each piece before changing it, so a bad cut can be undone
(checkpoints). And the best contractors don't just say "done": they show you the level reading and
the test fit (verification).

# Examples

## Example 1 — Basic: learn a codebase

```text
Explain how this project is structured: the main entry point, the key modules,
how data flows from an API request to the database, and how to run it locally.
```

**Why this works:** Claude explores the repo itself. You don't need to say which files to read.

## Example 2 — Real-world: a feature with built-in verification

```text
Add an "export to CSV" button to the orders page. Follow the pattern used by
the existing "export to PDF" feature. Write tests for the CSV generator,
run the test suite, and show me the results before committing.
```

**Why this works:** it points to an existing pattern, asks for tests, and requires evidence before the commit.

## Example 3 — Pitfall: "fix the bug" with no way to check

```text
fix the login bug
```

**What goes wrong:** Claude doesn't know the symptom or what "fixed" means, so it may fix *a* bug, or
none, and report success. The guide's better version names the symptom, the likely location, and the
check:

```text
Users report login fails after a session timeout. Check the auth flow in
src/auth/, especially token refresh. Write a failing test that reproduces
it, then fix it and show the passing test output.
```

# Common Mistakes

- **No verification step.** Give Claude tests, a build, or a screenshot to check against.
- **Leaving an `ANTHROPIC_API_KEY` set** and getting API charges instead of plan usage.
- **One endless session** across unrelated tasks. Use `/clear` between them.
- **Treating checkpoints as backups.** They don't cover remote actions; commit with git.
- **Over-specifying steps** instead of describing the goal and constraints.

# Best Practices

- **Explore → plan → implement → commit** for anything non-trivial; skip planning for one-line changes.
- Always provide **a check Claude can run**, and ask for evidence.
- Use **plan mode** for unfamiliar code and **Manual** mode for sensitive repos.
- Reference files with **`@`**, paste screenshots, or pipe logs in for context.
- Run **`/clear`** between unrelated tasks, and **`/context`** when things feel slow or confused.

# Summary

- **Claude Code** reads your codebase, edits files, runs commands, and verifies its work, in the
  terminal, IDEs, desktop, and web.
- Install with the **native installer**, then run **`claude`** in a project; watch for a stray
  `ANTHROPIC_API_KEY`.
- It works in an **agentic loop**: **gather context → take action → verify results**.
- **Permission modes** (Manual, Accept edits, Plan, Auto) set what runs without asking; **`Shift+Tab`**
  cycles them.
- **Checkpoints** (`Esc Esc`, `/rewind`) undo file edits; **verification** is what makes results trustworthy.

# Flash Cards

Q: What does Claude Code do?
A: It reads your codebase, edits files, runs commands, and integrates with your development tools to complete tasks.

Q: What are the three phases of Claude Code's agentic loop?
A: Gather context, take action, and verify results.

Q: How do you cycle permission modes in the CLI?
A: Press Shift+Tab.

Q: How do you undo Claude's file edits?
A: Press Esc twice or run /rewind to restore a checkpoint (file edits only, not remote actions).

Q: What happens if ANTHROPIC_API_KEY is set when you use Claude Code with a Pro or Max plan?
A: Claude Code uses the API key instead of your subscription, so usage is billed at API rates.

Q: What's the most effective habit for reliable results from Claude Code?
A: Give Claude a check it can run (tests, a build, a screenshot) and ask for evidence of success.

# Exercises

### Easy
Install Claude Code, open a small project (or clone any open-source repo), and ask for an overview of
its structure and how to run it.

### Medium
In plan mode, ask Claude to plan a small feature or fix. Edit the plan, approve it, then have Claude
implement it with tests and show the test output. Use `/rewind` once to practice undoing.

### Challenging
Pick a real bug. Write the prompt using the symptom, location, and verification pattern, run it in
Manual mode, and log every approval prompt you got. Then pre-approve the safe, repetitive ones with
`/permissions` and repeat on another task. Compare the two sessions.

# Further Reading

- Claude Code docs — *Overview*: <https://code.claude.com/docs/en/overview>
- Claude Code docs — *How Claude Code works*: <https://code.claude.com/docs/en/how-claude-code-works>
- Claude Code docs — *Best practices*: <https://code.claude.com/docs/en/best-practices>
- Claude Code docs — *Permission modes*: <https://code.claude.com/docs/en/permission-modes>
- Claude Help Center — *Use Claude Code with your Pro or Max plan*:
  <https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan>
