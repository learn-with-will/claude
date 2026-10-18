---
id: lesson-03
slug: talking-to-claude
title: "Talking to Claude: Conversations That Work"
level: beginner
order: 3
duration: 16
tags:
  - conversation
  - iteration
  - feedback
  - context
  - honesty
summary: "How to hold a productive conversation with Claude: iterating instead of one-shotting, editing earlier messages to branch, asking Claude to interview you, getting honest critique instead of agreement, and knowing when to start a fresh chat."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Treat a chat as an **iterative collaboration**, not a one-shot request.
- Steer a conversation with **follow-ups**, **edits** to earlier messages, and **in-place edits** of drafts.
- Use the **"interview me first"** pattern for bigger tasks.
- Ask for **honest critique** and uncertainty instead of reassurance.
- Decide when to **continue**, **branch**, or **start a new chat**.

# Why It Matters

The single biggest difference between people who love Claude and people who find it "just okay" is
iteration. A first answer is a starting point. The Help Center's own advice for first conversations
is: *start simple, be specific, iterate, explore*. Knowing how to steer a conversation (and when to
abandon one) gets you better results with less effort and less usage.

# Concept Explanation

### Every reply sees the whole conversation

Within a chat, Claude reads the entire conversation each time it answers: your messages, its
replies, and any files. That's why follow-ups like "make it shorter" or "use the second option" just
work, because Claude still has everything in context. It's also why a very long chat gets slower and
uses more of your limits. When a chat approaches the context limit, Claude summarizes earlier
messages so you can keep going, and some detail can be lost in that summary.

### Iterate in small steps

Good conversations usually follow a loop:

1. **Ask** for a first version with the key context.
2. **React** specifically: "The tone is too formal," "Cut the second paragraph," "Add a pricing table."
3. **Refine** until it's right, then ask for the final format you need.

Specific feedback beats "make it better." Tell Claude *what* to change and *why*.

### Edit, branch, and edit in place

- **Edit an earlier message.** If the conversation went the wrong way, edit the message where it
  went off course instead of piling corrections on top. Editing creates a **separate branch** of the
  chat (with its own artifacts), so you can explore another direction without losing the original.
- **Edit drafts in place.** When Claude drafts a document beside the chat, you can **highlight part
  of it** and describe a change. Claude applies it to just that section ("Edit with Claude").
- **Retry.** If an answer misses the mark, regenerate it, or say what was wrong and ask again.

### Let Claude interview you

For anything substantial (a plan, a spec, a difficult email), you often don't know everything you
should specify. Ask Claude to **ask you questions first**:

```text
I need to write a project proposal for a new employee mentoring program.
Before drafting anything, ask me up to 7 questions about goals, audience,
budget, and constraints. Wait for my answers, then draft.
```

Claude Docs uses this same pattern: when you ask for a doc, Claude asks a few clarifying questions
before drafting.

### Ask for honesty, not agreement

Claude aims to be honest, and Anthropic's constitution holds it to standards above many human
norms. Your phrasing still matters. A leading question ("This plan is great, right?") invites a
softer answer than a direct request for critique. Ask for what you actually need:

- "List the three weakest points in this plan, and how a skeptic would attack them."
- "If you're not sure, say so. Mark anything you're guessing."
- "Give me the strongest argument *against* my position."

Anthropic's guidance on reducing hallucinations recommends explicitly giving Claude **permission to
say "I don't know."** It's one of the simplest ways to get more trustworthy answers.

### Know when to start fresh

Start a **new chat** when you switch topics, when a chat has gone in circles, or when it's very long.
A clean chat with a better first message almost always beats a long, cluttered one. For material you
come back to again and again, use a **Project** (Lesson 7).

# Key Terminology

- **Iteration** — improving a result over several rounds of specific feedback.
- **Follow-up** — a message that refines or builds on Claude's previous answer.
- **Branch** — a separate version of a chat created when you edit an earlier message.
- **Edit with Claude** — highlighting part of a draft and describing a change applied just there.
- **Leading question** — a question phrased to suggest the answer you want.
- **Compaction** — Claude summarizing earlier messages when a chat nears the context limit.

# Options and Trade-offs

| Situation | Best move | Why |
| --- | --- | --- |
| Answer is close but needs tweaks | Follow-up message | Context is already there; small edits are cheap |
| Chat went wrong several turns ago | Edit that earlier message (branch) | Removes the bad turns instead of stacking fixes on them |
| Only one part of a long draft is off | Highlight it and use Edit with Claude | Targets the change without rewriting the rest |
| New, unrelated topic | New chat | Keeps context focused and usage low |
| Material you reuse across many chats | A Project | Stores files and instructions once, cached for reuse |

# Worked Example

**Goal:** a cover letter for a data-analyst job.

1. **Turn 1, with context:** "Here is the job posting and my résumé. Draft a 250-word cover letter.
   Emphasize my SQL dashboard project."
2. **Turn 2, specific feedback:** "Good structure. The opening is generic. Start with the dashboard's
   result (it cut reporting time by 40%). Make the tone warmer."
3. **Turn 3, honest check:** "Now act as a skeptical hiring manager. What would make you stop
   reading? Fix those issues."
4. **Turn 4, final format:** "Give me the final version as plain text, no markdown, under 250 words."

Four short turns, each with one clear job, produce a much stronger letter than a single "write me a
great cover letter" request.

# Real World Analogy

Working with Claude is like working with a **skilled editor in a workshop**. You don't hand over a
one-line note and expect a finished book. You share a draft, they suggest changes, you push back,
they revise. If a direction isn't working, you go back to an earlier draft (a branch) rather than
patching a bad one. And when you start a completely different book, you open a fresh notebook (a new
chat) instead of writing it in the margins of the last one.

# Examples

## Example 1 — Basic: a precise follow-up

```text
Great start. Three changes: shorten it to half the length, replace the jargon
with plain words, and end with a single clear call to action.
```

**Why this works:** it names exactly what to change. Claude keeps everything else.

## Example 2 — Real-world: interview first, then draft

```text
I'm planning a 2-day offsite for a 15-person engineering team. Interview me first:
ask about goals, budget, location constraints, and team dynamics, one question
at a time. After my answers, propose two agenda options with trade-offs.
```

**Why this works:** Claude collects the context you'd have forgotten to give, so the plan fits your
real situation instead of a generic one.

## Example 3 — Pitfall: the leading question

```text
I've decided to quit my job to day-trade full time. Good plan, right?
```

**What goes wrong:** the phrasing asks for validation. A better prompt asks for the honest analysis
you actually need:

```text
I'm considering quitting my job to day-trade full time. Give me a balanced
assessment: the main risks, what evidence I should look for before deciding,
and questions to discuss with a licensed financial advisor.
```

# Common Mistakes

- **Stacking corrections on a derailed chat.** Edit the earlier message or start over with a better prompt.
- **Vague feedback** like "better" or "more professional." Say what specifically should change.
- **Asking leading questions** and taking the agreement as validation.
- **Never starting new chats.** Old, unrelated context dilutes focus and uses up limits.
- **Accepting the first draft** when two more rounds would make it excellent.

# Best Practices

- Open with **context**, then iterate with **specific, one-job follow-ups**.
- For bigger tasks, ask Claude to **interview you** before it drafts.
- Explicitly allow **"I don't know"** and ask Claude to mark guesses.
- Ask for **critique, counterarguments, and risks**, not reassurance.
- **Edit earlier messages** to branch when a chat goes wrong; **start fresh** when switching topics.

# Summary

- Claude reads the **whole conversation** on every turn, which is why follow-ups work and why long
  chats cost more.
- Treat chats as **iteration**: ask, react specifically, refine.
- **Edit an earlier message** to branch; **highlight part of a draft** to edit just that part.
- Ask Claude to **interview you** for bigger tasks, and to give **honest critique** and admit
  uncertainty.
- Start a **new chat** for new topics; use **Projects** for reusable material.

# Flash Cards

Q: What does Claude read each time it replies in a chat?
A: The whole conversation so far, including your messages, its replies, and any files.

Q: What happens when you edit an earlier message?
A: Claude creates a separate branch of the chat from that point, so you can explore another direction without losing the original.

Q: What is the "interview me first" pattern?
A: Asking Claude to ask you clarifying questions before it drafts, so the result fits your real situation.

Q: What simple instruction does Anthropic recommend to reduce made-up answers?
A: Give Claude explicit permission to say "I don't know" when it isn't sure.

Q: Why is a leading question risky?
A: It signals the answer you want and invites agreement instead of the honest analysis you need.

Q: When should you start a new chat?
A: When you switch topics, when a chat has gone in circles, or when it has grown very long.

# Exercises

### Easy
Ask Claude for a short paragraph on any topic, then send three follow-ups that each change one
specific thing (length, tone, audience). Notice how it keeps everything else.

### Medium
Take a real task you've been putting off and use the interview-first pattern. Compare the final
result with what you would have written as a single prompt.

### Challenging
Write a plan you care about (a budget, a study schedule, a product idea). Ask Claude for (a) the
three biggest weaknesses, (b) the strongest counterargument, and (c) what it's unsure about. Revise
the plan and write two sentences on which critique was most useful and why.

# Further Reading

- Claude Help Center — *Get started with Claude* (first-conversation tips):
  <https://support.claude.com/en/articles/8114491-get-started-with-claude>
- Anthropic — *Reduce hallucinations*:
  <https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations>
- Claude Help Center — *What are artifacts and how do I use them?* (editing and branches):
  <https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them>
- Anthropic — *Claude's constitution* (honesty): <https://www.anthropic.com/constitution>
