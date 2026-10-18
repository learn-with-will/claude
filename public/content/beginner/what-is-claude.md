---
id: lesson-01
slug: what-is-claude
title: "What Is Claude?"
level: beginner
order: 1
duration: 18
tags:
  - claude
  - anthropic
  - large-language-models
  - model-family
  - knowledge-cutoff
summary: "What Claude actually is: a family of large language models made by Anthropic. Covers how a language model works in plain words (tokens, training, the context window, the knowledge cutoff), the Haiku, Sonnet, Opus, and Fable tiers, and every place you can use Claude."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Explain what **Claude** is and who makes it.
- Describe, in plain words, how a **large language model** produces an answer.
- Name the current **model tiers** (Haiku, Sonnet, Opus, Fable) and what each is for.
- Explain the **context window** and the **knowledge cutoff**, and why both matter to you.
- List the main **places you can use Claude**: the apps, Claude Code, the browser, and the API.

# Why It Matters

Most frustration with AI tools comes from a wrong mental model: treating Claude like a search engine,
expecting it to remember last week's chat, or trusting a confident answer about yesterday's news.
Once you know what Claude *is* and how it works, you'll know when to give it more context, when to
turn on web search, and when to double-check its answers. Everything else in this course builds on
the picture you form here.

# Concept Explanation

### Claude in one sentence

Anthropic's documentation puts it simply: Claude is *a family of state-of-the-art large language
models developed by Anthropic*. "Claude" is also the name of the assistant you chat with in the Claude
apps, and the name of a growing set of products built on those models (Claude Code, Claude in Chrome,
Cowork, and more). **Anthropic** is the AI safety and research company that trains Claude.

### How a language model works (no math)

A **large language model (LLM)** is a program trained on a very large amount of text to predict what
text should come next. That simple skill, scaled up enormously, turns out to produce writing,
summarizing, translating, reasoning, and coding.

1. **Text becomes tokens.** Claude reads and writes in **tokens**, small chunks of text (a word, part
   of a word, or punctuation). Tokens are also how usage and API prices are measured.
2. **Pre-training.** The model learns patterns of language and knowledge from its training data.
3. **Further training.** It is then trained to act as a helpful, honest assistant. Anthropic shapes
   Claude's character and values with a written **constitution** (Lesson 8).
4. **Generating an answer.** When you send a message, Claude produces its reply one token at a time,
   each choice informed by everything in the conversation so far.

Current Claude models can also **think** before answering. They reason through a problem first, and
the apps show a summary of that reasoning (Lesson 9).

### The context window: Claude's working memory

The **context window** is everything Claude can "see" at once: your messages, its replies, uploaded
files, and instructions. Current models have a **1 million-token** context window. Anthropic's docs
estimate that's roughly 555,000 words. When a conversation outgrows it, the apps summarize earlier
messages so the chat can continue. Detail can be lost when that happens.

Two consequences matter every day:

- Claude only knows what's **in the context window**. A brand-new chat starts empty unless memory or
  a Project adds context (Lessons 7 and 11).
- **Longer context costs more.** Long chats and big files use more of your plan's usage, so start a
  new chat for a new topic (Lesson 3).

### The knowledge cutoff

A model learns from data collected up to a certain date, its **knowledge cutoff**. For the current
models (Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1) that's **June 2026**. Claude "may not be aware of
events or information that occurred after" that date, in the Help Center's words. For anything newer,
turn on **web search** (Lesson 10).

### The model family

Claude comes in tiers that trade speed and cost against capability. As of writing (October 2026):

| Model | Best for (from Anthropic's model overview) | Relative speed |
| --- | --- | --- |
| **Claude Haiku 5.5** | High-volume, latency-sensitive tasks such as classification and routing | Fastest |
| **Claude Sonnet 5.5** | "The best combination of speed and intelligence" | Fast |
| **Claude Opus 5.5** | Long-running agentic coding and knowledge work | Moderate |
| **Claude Fable 5.1** | Demanding reasoning and long-horizon agentic work | Slower |

There is also a **Mythos** tier, offered only to approved organizations through Anthropic's Project
Glasswing program. You won't use it in everyday Claude. For developers who are unsure, Anthropic's
docs suggest starting with **Opus 5.5** for most workloads and moving to Fable 5.1 for the hardest
problems. Lesson 9 shows how to choose in the apps.

### What Claude can and can't do

**Can:** write and edit, summarize and analyze long documents, reason through problems, write and
debug code, read images and PDFs, work in many languages, use tools (web search, code execution, your
connected apps), and, in Cowork, Claude Code, and Claude in Chrome, take multi-step actions for you.

**Can't (or shouldn't be trusted to):** know recent events without search, remember other chats
unless memory is on, guarantee every fact is right, or generate photos the way image models do.
Claude builds diagrams, charts, and visuals with code (HTML and SVG) instead.

### Where you can use Claude

- **Claude apps:** claude.ai in a browser, Claude Desktop (macOS, Windows), and mobile (iOS, Android).
- **Claude Code:** an agentic coding tool in your terminal, IDE, desktop app, or browser (Lessons 16–18).
- **Claude in your other tools:** Chrome, Microsoft 365 and Google Workspace add-ins, Slack (Lesson 15).
- **Claude Developer Platform (the API):** build your own apps with Claude (Lessons 19–23). Claude is
  also offered through Amazon Bedrock, Google Cloud, and Microsoft Foundry.

# Key Terminology

- **Claude** — Anthropic's family of AI models, and the assistant and products built on them.
- **Anthropic** — the company that builds and trains Claude.
- **Large language model (LLM)** — a model trained on vast text to predict and generate language.
- **Token** — a small chunk of text; the unit Claude reads, writes, and is measured by.
- **Context window** — everything Claude can see in a conversation at once (1M tokens on current models).
- **Knowledge cutoff** — the date after which the model's training data stops (June 2026 for current models).
- **Model tier** — Haiku, Sonnet, Opus, or Fable: a level of capability, speed, and cost.

# Options and Trade-offs

| Tier | Strength | Trade-off | Reach for it when… |
| --- | --- | --- | --- |
| Haiku | Fastest, lowest cost | Least capable on hard reasoning | You need quick, simple, high-volume answers |
| Sonnet | Strong balance of speed and intelligence | Not the deepest reasoner | Everyday writing, analysis, and coding |
| Opus | Deep, reliable work on long tasks | Slower, uses more of your limits | Complex projects, careful analysis, agentic work |
| Fable | Most capable widely released model | Slowest; most expensive | The hardest reasoning and long, autonomous tasks |

# Worked Example

**Question:** You want Claude to analyze a 300-page book manuscript. Will it fit in the context window?

1. A typical book page holds about 300–400 words, so estimate 300 × 400 = **120,000 words**.
2. Anthropic estimates a 1M-token window holds roughly **555,000 words** on the current models.
3. 120,000 is well under 555,000, so the whole manuscript fits, with room to spare for your
   questions and Claude's answers.

Note the practical catch: uploading it to a single chat counts against your usage every time you
send a message in that chat. If you'll ask many questions over weeks, put it in a **Project** (Lesson
7), where reused content is cached and counts less against your limits.

# Real World Analogy

Think of Claude as a **brilliant new colleague** (Anthropic's own docs use this framing) who has read
an enormous library, but only up to a certain date. They're quick, articulate, and know a little about
almost everything. But they only know what's on the desk in front of them right now. That desk is the
context window. They don't remember yesterday's meeting unless someone wrote it down (memory), and
they'll sometimes misremember a detail with total confidence. Give them good briefing notes, let them
look things up, and check their important claims, and they'll do outstanding work.

# Examples

## Example 1 — Basic: a clear first question

```text
Explain what a Roth IRA is in three short paragraphs for someone who has never invested.
End with two questions I should ask a financial advisor.
```

**Why this works:** it states the topic, the audience, the length, and a useful extra. Claude does
best when the task is specific.

## Example 2 — Real-world: give it the context it can't know

```text
I'm a nurse manager. Our hospital is switching shift handoffs from verbal to a written
SBAR template next month. Draft a friendly 150-word announcement for my team that
explains why, what changes, and that I'll run two practice sessions next week.
```

**Why this works:** Claude can't know your role, your hospital, or your plan. Putting those facts in
the prompt (the context window) is what makes the draft usable on the first try.

## Example 3 — Pitfall: asking about very recent events with no search

```text
Who won yesterday's match?
```

**What goes wrong:** anything after the June 2026 knowledge cutoff isn't in the model's training
data. Without web search, Claude can't know the answer and should say so. The fix is to turn on web
search, or ask Claude to search ("Search the web for…"), and then check the cited sources.

# Common Mistakes

- **Treating Claude like a search engine.** It reasons from training and context. For current facts,
  use web search and check the citations.
- **Assuming it remembers other chats.** A new chat starts fresh unless memory or a Project supplies
  context.
- **Trusting confident wording.** Fluent isn't the same as correct. Verify anything important.
- **Always picking the biggest model.** It's slower and uses more of your limits than a simple task needs.
- **Expecting photo-style image generation.** Claude makes diagrams and visuals with code, not
  photographs.

# Best Practices

- Give Claude the **context it can't know**: who you are, your goal, your audience, your constraints.
- Use **web search** for anything recent, and look at the sources it cites.
- Start a **new chat for a new topic** to keep context focused and usage low.
- Match the **model to the task**: Sonnet for everyday work, Opus or Fable for the hardest problems,
  Haiku for quick and simple ones.
- Treat Claude's output as a **strong first draft** you review, especially for high-stakes decisions.

# Summary

- Claude is a **family of large language models** built by **Anthropic**, plus the apps and tools on top.
- It works in **tokens**, generating replies one token at a time from everything in its **context
  window** (1M tokens on current models).
- Current models have a **June 2026 knowledge cutoff**; use web search for newer facts.
- The tiers are **Haiku** (fastest), **Sonnet** (balanced), **Opus** (deep work), and **Fable** (most
  capable widely released).
- You can use Claude in the **apps**, **Claude Code**, your **browser and office tools**, and through
  the **API**.

# Flash Cards

Q: What is Claude, in one sentence?
A: A family of large language models developed by Anthropic, and the assistant and products built on them.

Q: What is a token?
A: A small chunk of text (a word, part of a word, or punctuation) that Claude reads and writes; usage and API prices are measured in tokens.

Q: What is the context window?
A: Everything Claude can see in a conversation at once (messages, files, instructions), 1 million tokens on current models.

Q: What is the knowledge cutoff for the current Claude models?
A: June 2026. For anything newer, use web search.

Q: Name the four widely available model tiers from fastest to most capable.
A: Haiku, Sonnet, Opus, and Fable.

Q: Can Claude generate photographs like an image model?
A: No. It creates diagrams, charts, and visuals with code (HTML and SVG) and can analyze images you upload.

# Exercises

### Easy
Open a new chat and ask Claude: "What's your knowledge cutoff, and what should I do if I need newer
information?" Compare its answer with this lesson.

### Medium
Pick a document you work with (a report, a manual, a long article). Estimate its word count, then
work out whether it fits in a 1M-token context window using the ~555,000-word estimate. Write one
sentence on whether you'd use a single chat or a Project for it, and why.

### Challenging
Write three prompts for the same task (for example, "plan a team offsite"): one vague, one with full
context, and one that also asks Claude to flag assumptions it's making. Run all three and list the
differences in the answers. What did the extra context change?

# Further Reading

- Anthropic — *Models overview*: <https://platform.claude.com/docs/en/about-claude/models/overview>
- Claude Help Center — *How up-to-date is Claude's training data?*:
  <https://support.claude.com/en/articles/8114494-how-up-to-date-is-claude-s-training-data>
- Claude Help Center — *Get started with Claude*:
  <https://support.claude.com/en/articles/8114491-get-started-with-claude>
- Anthropic — *Claude's constitution*: <https://www.anthropic.com/constitution>
- Anthropic Academy — free courses: <https://academy.claude.com/>
