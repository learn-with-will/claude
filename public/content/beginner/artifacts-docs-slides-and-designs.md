---
id: lesson-06
slug: artifacts-docs-slides-and-designs
title: "Artifacts: Docs, Slides, Designs, and Interactive Apps"
level: beginner
order: 6
duration: 20
tags:
  - artifacts
  - claude-docs
  - claude-slides
  - claude-design
  - sharing
summary: "Artifacts are the things Claude makes that you'd put in front of someone. This lesson covers the Docs, Slides, and Design templates, dashboards and interactive tools, editing in place, AI-powered artifacts, storage, and how to share and export your work."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Explain what an **artifact** is and when Claude creates one.
- Create **Docs**, **Slides**, and **Designs**, and know what Dashboards and Motion add.
- Edit artifacts by **chatting**, **editing directly**, and **highlighting a section**.
- Understand **AI-powered artifacts**, connected apps, and artifact **storage**.
- **Share** and **export** artifacts safely.

# Why It Matters

A chat answer is something you read. An artifact is something you **use**: a document you send, a
deck you present, a dashboard you check every morning, a small tool your team clicks through.
Artifacts turn Claude from a writer into a maker, and they're available on every plan, including
Free.

# Concept Explanation

### What an artifact is

The Help Center defines it neatly: an artifact is *anything Claude makes for you that you'd put in
front of someone*: a design, deck, document, dashboard, or small interactive tool. Artifacts open
**beside the conversation**, so you can see and refine them while you chat. Everything you make is
saved to the **Artifacts tab** in the sidebar.

Claude creates an artifact when content is **significant and self-contained** (typically over 15
lines), likely to be **edited or reused**, understandable **without the conversation**, and worth
**coming back to**. You can always just ask for one.

Artifacts require **Code execution and file creation** to be on (Settings > Capabilities; on Team and
Enterprise, Organization settings > Capabilities).

### The templates: Docs, Slides, and Design

Since September 16, 2026, artifacts include three templates you can start from in any conversation
or the Artifacts tab:

- **Claude Docs**: living documents with headings, tables, and tabs. Ask for a doc, type `/docs`, or
  choose **Output > Docs**. Claude asks a few clarifying questions, then drafts. You can type
  directly, collaborate in real time, and **@Claude** in a comment to request an edit.
- **Claude Slides**: presentations that export to **PowerPoint** or **PDF**, or go to **Google Slides**.
- **Claude Design**: a **canvas** beside the chat for prototypes, one-pagers, landing pages, and
  other visuals. You can refine through chat, inline comments, or by dragging elements on the canvas.
  Projects can inherit your organization's **design system** (brand colors, fonts, components).

Two newer types are in **beta**: **Dashboards** (paid plans) build live charts from connected apps
and data platforms, with each chart showing its query and last refresh time. **Motion** (Team and
Enterprise) makes animated explainers you can export as MP4.

Beyond the templates, artifacts can be code snippets, single-page websites, diagrams, flowcharts,
and small interactive tools. Claude can also draw **interactive charts and diagrams inline** in its
replies. Artifacts made in chat before September 16, 2026 are **legacy artifacts**. They keep
working, but new ones use the current experience.

### Editing artifacts three ways

1. **Ask in chat:** "Make the title bigger and add a pricing slide."
2. **Edit directly:** type in a doc, edit a slide, move elements in a design.
3. **Edit with Claude:** highlight part of a doc or Markdown file, choose **Edit with Claude**, and
   describe the change. It applies to just that section.

Editing an earlier chat message creates a **separate branch** with its own artifacts, so you can try
another direction safely.

### AI-powered artifacts, connected apps, and storage

- **AI-powered:** artifacts can **call Claude** themselves, so the people using them can ask
  questions or generate content inside the tool. There's no API key and no cost to the builder.
  Usage counts against **each user's own plan limits**. New artifacts ask permission the first time
  they use Claude.
- **Connected apps (paid plans):** artifacts can use your connectors (Lesson 12). You approve which
  tools an artifact may use, and everyone connects their own accounts.
- **Storage (paid plans):** artifacts can save data between sessions, up to **20 MB per artifact,
  text only**. The builder decides what goes in **personal** storage (private to each user) and what
  goes in **shared** storage (visible to everyone using the artifact).

### Sharing and exporting

Artifacts **start private**; you choose who can open them. Exports:

| Type | Exports to |
| --- | --- |
| Docs | Word, PDF, Markdown, Google Docs |
| Slides | PowerPoint, PDF, Google Slides |
| Designs | .zip, PDF, PowerPoint, Google Slides, standalone HTML (plus hand-offs to tools such as Canva, Adobe products, and Miro, and to Claude Code) |
| Motion | MP4 |

For Docs, Free/Pro/Max can share with anyone who has the link (they need a Claude account). Team and
Enterprise share within the organization.

# Key Terminology

- **Artifact** — a self-contained thing Claude makes (doc, deck, design, dashboard, tool) shown beside the chat.
- **Artifacts tab** — the sidebar page where all your artifacts are saved and organized.
- **Claude Docs / Slides / Design** — the artifact templates for documents, presentations, and visual designs.
- **Edit with Claude** — highlighting a section and describing a change applied just there.
- **AI-powered artifact** — an artifact that calls Claude; usage counts against each viewer's own plan.
- **Shared storage** — artifact data visible to everyone who uses the artifact.
- **Legacy artifact** — an artifact created in chat before September 16, 2026.

# Options and Trade-offs

| You need… | Use | Note |
| --- | --- | --- |
| A document to edit with others | Claude Docs | Real-time co-editing; @Claude in comments |
| A presentation | Claude Slides | Export to PowerPoint, PDF, or Google Slides |
| A mockup, landing page, or one-pager | Claude Design | Canvas editing; can apply a design system |
| Live numbers from your tools | Dashboards (beta) | Paid plans; charts show their query and refresh time |
| A small tool for your team | Interactive artifact | Can use Claude and connectors; review storage settings |
| Just an answer | A normal reply | Not everything needs to be an artifact |

# Worked Example

**Goal:** a reusable trip-budget planner your friends can use.

1. **Ask:** "Build an interactive trip budget planner: inputs for flights, lodging per night, number
   of nights, daily food, and activities; show the total and per-person cost for a group size I
   choose; include a pie chart of the categories."
2. **Iterate:** "Add a currency selector (USD, EUR, JPY) with manually entered exchange rates, and
   save my last inputs."
3. **Check storage:** saving inputs uses artifact storage. Ask Claude to keep each person's inputs
   in **personal** storage so friends don't see each other's numbers.
4. **Share:** open the share settings and send the link. Friends use it with their own accounts.

# Real World Analogy

Artifacts are a **workbench beside the conversation**. While you talk with a craftsman, they build
the actual object on the bench: a document, a model, a small machine. You can ask them to adjust it,
pick up a tool and adjust it yourself, or point at one part ("change just this"). When it's done, you
can hand it to someone else, and if it's a machine that needs power, each person who uses it brings
their own batteries (their own usage).

# Examples

## Example 1 — Basic: a living document

```text
/docs Create a one-page onboarding checklist for new remote employees:
first day, first week, first month. Include a table of key contacts with
placeholder names. Audience: new hires in a 50-person company.
```

**Why this works:** it names the output (a doc), the structure, and the audience. Claude will ask a
couple of clarifying questions, then draft something you can edit and share.

## Example 2 — Real-world: from doc to deck

```text
Turn the onboarding checklist doc into a 6-slide presentation for our
all-hands: one title slide, one slide per time period, one for contacts,
one for questions. Keep text minimal and use our brand color #1F6FEB.
```

Then export it to PowerPoint or Google Slides for the meeting.

**Why this works:** one source of truth (the doc) becomes another format without re-explaining the
content.

## Example 3 — Pitfall: shared storage for private data

A manager builds a "team feedback" artifact that saves everyone's comments in **shared** storage.
Every user can now see everyone else's feedback, which is not what anyone expected.

**The fix:** decide deliberately what goes in **personal** versus **shared** storage, and tell Claude
explicitly when you build the artifact. Shared storage is visible to everyone using it.

# Common Mistakes

- **Forgetting the capability setting.** Artifacts need Code execution and file creation turned on.
- **Rewriting a whole artifact for a small fix.** Highlight the section and use Edit with Claude.
- **Ignoring storage scope.** Shared storage is visible to all users of the artifact.
- **Assuming AI-powered artifacts cost the builder.** Each user's own plan limits are used.
- **Building on published artifacts from unknown creators.** Only copy code from creators you trust.

# Best Practices

- Ask for the **output type explicitly** (doc, slides, design, dashboard, tool).
- Start from a **template** in the Artifacts tab when one fits.
- Use **chat for big changes**, **direct edits for small ones**, and **Edit with Claude** for sections.
- Keep artifacts **private until reviewed**; share deliberately, and export to the format your audience uses.
- Treat interactive artifacts like software: check **storage**, **connected tools**, and **permissions**.

# Summary

- An artifact is **anything Claude makes that you'd put in front of someone**, shown beside the chat
  and saved in the **Artifacts tab**.
- Templates: **Docs**, **Slides**, and **Design**; **Dashboards** and **Motion** are in beta.
- Edit by **chatting**, **editing directly**, or **highlighting a section**; earlier-message edits branch.
- Artifacts can be **AI-powered** (each user's own usage), use **connected apps**, and **store data**
  (20 MB, text only, personal or shared).
- Artifacts start **private**, and Docs, Slides, and Designs export to common formats.

# Flash Cards

Q: How does the Help Center define an artifact?
A: Anything Claude makes for you that you'd put in front of someone, such as a design, deck, document, dashboard, or small tool.

Q: Which setting do artifacts require?
A: Code execution and file creation.

Q: What are the three artifact templates?
A: Claude Docs (documents), Claude Slides (presentations), and Claude Design (visual designs).

Q: Whose usage does an AI-powered artifact consume?
A: Each user's own plan limits, not the builder's.

Q: What's the difference between personal and shared artifact storage?
A: Personal storage is private to each user; shared storage is visible to everyone who uses the artifact.

Q: Name two formats Claude Slides can export to.
A: PowerPoint and PDF (it can also go to Google Slides).

# Exercises

### Easy
Ask Claude for a one-page doc on a topic you know well, then use **Edit with Claude** to change just
one paragraph. Export it to Word or PDF.

### Medium
Turn that doc into a short slide deck, export it to PowerPoint or Google Slides, and list two things
you had to fix by hand. Then ask Claude to fix them and compare.

### Challenging
Build an interactive artifact for a real need (a habit tracker, a quiz for your team, a pricing
calculator). Decide what data, if any, it stores and whether that's personal or shared. Write a
three-sentence "privacy note" for its users explaining what is saved and who can see it.

# Further Reading

- Claude Help Center — *What are artifacts and how do I use them?*:
  <https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them>
- Claude Help Center — *Get started with Claude Docs*:
  <https://support.claude.com/en/articles/16923645-get-started-with-claude-docs>
- Claude Help Center — *Get started with Claude Design*:
  <https://support.claude.com/en/articles/14604416-get-started-with-claude-design>
- Claude Help Center — *Share artifacts*: <https://support.claude.com/en/articles/9547008-share-artifacts>
