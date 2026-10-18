---
id: lesson-14
slug: cowork-and-agentic-tasks
title: "Cowork: Handing Claude Real Tasks"
level: intermediate
order: 14
duration: 20
tags:
  - cowork
  - agentic-tasks
  - scheduled-tasks
  - permission-modes
  - delegation
summary: "Cowork brings Claude Code's agentic abilities to everyday knowledge work: Claude plans and carries out multi-step tasks with your files, apps, and browser. This lesson covers how tasks run, permission modes, scheduled tasks, working from your phone, and how to delegate safely and well."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Explain what **Cowork** is and how a **task** differs from a chat reply.
- Start a task, **review Claude's plan**, and steer it while it runs.
- Choose a **permission mode** (Manual, Auto, or Skip) for the risk involved.
- Set up **scheduled tasks** and work with **local files**, **projects**, and the **browser**.
- **Delegate** clearly, with outcomes, constraints, and checkpoints.

# Why It Matters

Chat answers questions. Cowork **does work**: it reads a folder of receipts and produces an expense
report, compiles a weekly digest while you sleep, or turns raw data into a finished deck. That's a
different relationship with an AI, closer to delegating to a colleague. Done well, it gives you back
hours. Done carelessly, it acts on the wrong files. The skill to learn here is delegation.

# Concept Explanation

### What Cowork is

In the Help Center's words, Cowork brings **Claude Code's agentic capabilities to knowledge work
beyond coding**. Instead of answering one prompt at a time, Claude takes on **complex, multi-step
tasks and executes them on your behalf**, without needing a terminal. It breaks work into subtasks
and can run several in parallel.

**Availability (as of writing):** paid plans only (Pro, Max, Team, Enterprise). It runs in **Claude
Desktop** (macOS and Windows) on all paid plans, on the **web** and **mobile** for Pro, Max, and Team
(Enterprise needs an admin to enable it), and in the **Chrome side panel** (Lesson 15).

### Starting a task

- **Unified experience:** since September 2026, "Cowork comes to every conversation" is rolling out.
  Ask for a larger task (a report, a spreadsheet, a presentation) in any chat, and Claude decides
  whether it needs a quick answer or a full task.
- **Classic layout:** select **Cowork** in the message box, describe the task, and **review Claude's
  plan** before it starts.

### Where tasks run

Tasks run **in the cloud, in an isolated environment**, and are saved to your account, so a task keeps
going if you close your laptop. Some abilities need your computer: **local file access, browser use,
and computer use require the desktop app to be open and connected.** (Cloud sessions are in beta on
Team and Enterprise.)

### What Claude can work with

- **Files and folders:** on desktop, Claude reads and writes local files **you grant access to**.
  Folder instructions add project-specific context.
- **Outputs:** spreadsheets with working formulas, slide decks, and formatted documents. Edit
  Markdown drafts in place with **Edit with Claude**.
- **Projects:** group related tasks into workspaces with their own files, instructions, and memory.
- **Connectors and plugins:** your connected apps, and plugins that bundle skills and sub-agents.
- **Browser:** Claude can open sites, read pages, click, type, and fill forms, using a built-in
  browser or your Claude in Chrome setup.
- **Memory:** cloud sessions draw on your chat memory (you can turn it off before a task starts).
- **Computer use (research preview):** on Pro and Max, Claude can open files, run tools, and click
  through your screen to finish a task.

### Scheduled tasks

Tasks can run **on demand** or **on a schedule**. The Help Center notes that **scheduled tasks run in
the cloud, with no device online**. Create one with **`/schedule`**: a Monday-morning digest, a weekly
report, a monthly cleanup.

### Working from your phone: Dispatch

A persistent thread lets you **start and steer Cowork tasks from the mobile app**. Message a task from
your phone and it runs, including computer-use steps on your desktop if that's enabled. This is a
research preview, so expect it to evolve.

### Permission modes

| Mode | Behavior | Use when |
| --- | --- | --- |
| **Manual** | Claude asks before actions; you **Allow** or **Deny** | Sensitive files, new kinds of tasks |
| **Auto** | Claude reviews each action for safety and blocks unsafe ones (uses **more** of your limit) | Routine tasks you've seen go well |
| **Skip** | Nothing pauses or checks actions | Only when you completely trust every action, connector, file, and app involved |

Regardless of mode, Claude requires your **explicit permission before permanently deleting any files**.

### Safety and usage

The Help Center is clear that Cowork *has unique risks due to its agentic nature and internet access*.
Claude can take real actions for you, so review planned actions, especially with sensitive files.
One subtle point: network-egress settings don't cover web fetch, web search, or MCP tools. Multi-step
tasks also use more of your limit than quick questions. To reduce usage, group related work, start
new conversations for unrelated topics, and ask for quick answers when you don't need a file.

### Delegating well

Treat a task like a brief to a capable colleague:

1. **Outcome:** what "done" looks like ("a 10-slide deck saved to /Reports").
2. **Inputs:** which folder, files, or connectors to use, and which to ignore.
3. **Constraints:** format, length, tone, deadlines, things not to touch.
4. **Checkpoints:** "Show me the plan first," "Ask before sending or deleting anything."

# Key Terminology

- **Cowork** — Claude carrying out multi-step tasks for you, with files, apps, and a browser.
- **Task** — a unit of delegated work that Claude plans and executes, possibly in parallel subtasks.
- **Cloud session** — a task running in an isolated cloud environment that continues without your device.
- **Scheduled task** — a task that runs on a cadence (created with `/schedule`), in the cloud.
- **Permission mode** — Manual, Auto, or Skip: how much Claude checks with you before acting.
- **Dispatch** — controlling Cowork tasks from your phone through a persistent thread (research preview).
- **Computer use** — Claude operating your screen (opening apps, clicking) to complete a task.

# Options and Trade-offs

| Choice | Benefit | Cost or risk |
| --- | --- | --- |
| Manual mode | Full control over each action | Slower; you must be present |
| Auto mode | Few interruptions, with safety checks | Uses more of your limit; not infallible |
| Skip mode | No interruptions at all | No checks: only for fully trusted setups |
| Cloud session | Keeps running when your laptop closes | No local files or screen without the desktop app |
| Local (desktop) session | Access to your files and apps | Desktop app must stay open |
| Scheduled task | Work happens without you | Review outputs regularly; scope permissions tightly |

# Worked Example

**Task:** monthly expense report from a folder of receipt PDFs and photos.

1. **Grant access** to `Documents/Receipts/2026-10` only, not your whole Documents folder.
2. **Brief:**

```text
Create my October expense report. Read every receipt in the folder I shared.
Produce an Excel file with one row per receipt (date, vendor, category, amount,
currency, file name) and a summary sheet with totals by category using formulas.
Flag receipts you can't read clearly instead of guessing. Show me your plan
first, and don't move, rename, or delete any files.
```

3. **Review the plan** in **Manual** mode for this first run, and approve.
4. **Check the output:** spot-check three rows against the receipts, then look at the flagged ones.
5. **Next month:** if it went well, run it in **Auto**, or make it a **scheduled task** with the same brief.

# Real World Analogy

Chat is like asking a colleague a question **at their desk**. Cowork is **handing them a project**:
they take the folder, go to their own office with a computer, phone, and web browser, and come back
with the finished work. You'd give a new colleague a clear brief, ask to see their plan, and keep
"please don't throw anything away" explicit. Once they've proven themselves, you let them run with
recurring jobs on their own.

# Examples

## Example 1 — Basic: a tidy-up task with a plan check

```text
In the folder I shared, rename the photos to YYYY-MM-DD_place.jpg using their
date taken and any place names you can read from the file details. Show me
the full list of old and new names before renaming anything.
```

**Why this works:** a clear outcome, a defined scope, and a checkpoint before any change.

## Example 2 — Real-world: a scheduled weekly digest

```text
/schedule Every Monday at 8:00, search the web for news from the past week
about our three competitors (Acme, Globex, Initech). Create a one-page doc
with a headline per competitor, 2-3 bullets each with source links, and a
"why it matters for us" line. Save it to my Weekly Digests project.
```

**Why this works:** scheduled tasks run in the cloud with no device online, and the brief defines
sources, format, and destination.

## Example 3 — Pitfall: Skip mode on a broad brief

A user grants access to their entire home folder, switches to **Skip**, and says "clean up my files."
Claude reorganizes years of documents into a structure the user doesn't recognize.

**The fix:** narrow the folder access, use **Manual** (or Auto) for anything new, define exactly what
"clean up" means, and require a plan review before changes.

# Common Mistakes

- **Granting broad file access** when one folder would do.
- **Using Skip mode** for anything you haven't fully vetted.
- **Vague briefs** ("handle my inbox") with no outcome, scope, or checkpoints.
- **Not checking outputs** of scheduled tasks after the first few runs.
- **Expecting local files in a cloud session** without the desktop app open and connected.

# Best Practices

- Write briefs with **outcome, inputs, constraints, and checkpoints**.
- **Grant the narrowest access** that works: one folder, the needed connectors.
- Start new kinds of tasks in **Manual**, graduate to **Auto** once trusted, and reserve **Skip** for
  fully trusted setups.
- Ask Claude to **flag uncertainty** instead of guessing, and to **show the plan** first.
- Turn proven, repeated tasks into **scheduled tasks**, and review results periodically.

# Summary

- **Cowork** lets Claude plan and execute **multi-step tasks** with your files, apps, and browser
  (paid plans).
- Tasks run in an **isolated cloud environment**; local files, browser, and computer use need the
  **desktop app open**.
- **Permission modes:** **Manual** (you approve), **Auto** (safety-checked; uses more of your limit),
  **Skip** (no checks).
- **Scheduled tasks** (`/schedule`) run in the cloud with no device online; **Dispatch** lets you steer
  from your phone.
- Delegate like a manager: **clear outcome, narrow access, checkpoints, and review**.

# Flash Cards

Q: What is Cowork?
A: Claude Code's agentic capabilities applied to knowledge work: Claude plans and executes multi-step tasks for you, without a terminal.

Q: Which plans include Cowork?
A: Paid plans only: Pro, Max, Team, and Enterprise.

Q: What do local file access, browser use, and computer use require?
A: The Claude desktop app to be open, connected, and running.

Q: Name the three Cowork permission modes.
A: Manual (you approve actions), Auto (Claude safety-checks each action and blocks unsafe ones), and Skip (no checks).

Q: Where do scheduled tasks run, and how do you create one?
A: In the cloud, with no device online; create one with /schedule.

Q: What does Claude always require before permanently deleting files?
A: Your explicit permission.

# Exercises

### Easy
Run a small, safe task on a copy of a folder (for example, "list every file and suggest better names")
in **Manual** mode, and review the plan before approving anything.

### Medium
Write a full brief (outcome, inputs, constraints, checkpoints) for a recurring task you do monthly,
run it once, and record what you had to correct. Update the brief.

### Challenging
Turn that task into a **scheduled task**. Define what you'll check after each run, how you'd detect a
silent failure (such as missing sources or empty sections), and when you'd move it from Manual to
Auto. Run it for three cycles and evaluate.

# Further Reading

- Claude Help Center — *Get started with Cowork*:
  <https://support.claude.com/en/articles/13345190-get-started-with-cowork>
- Claude Help Center — *Claude Cowork* collection:
  <https://support.claude.com/en/collections/19667525-claude-cowork>
- Claude Help Center — *Release notes* (Cowork updates):
  <https://support.claude.com/en/articles/12138966-release-notes>
- Claude Help Center — *Usage limit best practices*:
  <https://support.claude.com/en/articles/9797557-usage-limit-best-practices>
