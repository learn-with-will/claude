---
id: lesson-08
slug: using-claude-responsibly
title: "Using Claude Responsibly: Limits, Privacy, and Values"
level: beginner
order: 8
duration: 20
tags:
  - hallucinations
  - verification
  - privacy
  - constitution
  - safety
summary: "Claude's real limits and how to work with them safely: why models sometimes get facts wrong and how to catch it, what happens to your data and which privacy controls you have, how Claude's constitution shapes its behavior, and where human judgment must stay in charge."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Explain why Claude sometimes **hallucinates**, and use techniques that **catch and reduce** it.
- Describe how your **data** is handled on consumer and commercial plans, and which **controls** you have.
- Use **incognito chats** and memory controls for sensitive conversations.
- Summarize the **values** in Claude's constitution and what they mean for your requests.
- Decide where **human review** is non-negotiable.

# Why It Matters

Claude is capable enough that it's tempting to stop checking. That's exactly when mistakes slip
through: a confident but wrong statistic in a report, a private document shared from the wrong
account, or an action you didn't review. Using Claude *well* includes knowing its failure modes,
your privacy settings, and what it's designed to refuse. That knowledge turns a powerful tool into a
trustworthy one.

# Concept Explanation

### Hallucinations: confident and wrong

Anthropic's own docs are direct about this: even the most advanced models, Claude included,
sometimes produce statements that are factually wrong or that contradict the material they were
given. This is called **hallucination**. It happens most with obscure facts, exact numbers, citations, recent events (after
the June 2026 knowledge cutoff), and questions where the honest answer is "there isn't enough
information."

Techniques from Anthropic's *Reduce hallucinations* guide that work in any chat:

- **Allow "I don't know."** Explicitly permit uncertainty.
- **Ground in sources.** For documents, have Claude quote the relevant passages first and answer
  only from them.
- **Ask for citations.** Then check them. With web search on, every claim should link to a source
  you can open.
- **Restrict to provided material.** "Use only the attached documents, not general knowledge."
- **Ask twice.** Run the same question again or in a new chat. Inconsistent answers are a warning
  sign.

The guide's bottom line is that these techniques reduce hallucinations but don't eliminate them.
Always check critical information yourself, especially before high-stakes decisions.

### Your data: what happens to it

Policies differ by account type (from Anthropic's data-usage documentation, as of writing):

- **Consumer accounts (Free, Pro, Max):** you **choose** whether your chats and coding sessions may be
  used to improve future models. If you allow it, data is kept for up to **5 years**. If you don't,
  it's kept for **30 days**. Change this any time at **claude.ai/settings/data-privacy-controls**.
- **Commercial accounts (Team, Enterprise, the API):** Anthropic **doesn't train** on your content by
  default. Standard retention is 30 days, and Enterprise offers custom retention controls.

So your account type matters: if your employer has a Team or Enterprise plan, use **that** account for
work data, not a personal one.

### Privacy controls you should know

- **Incognito chats** (the ghost icon, on all plans): not saved to your chat history, not used for
  memory, and not included in chat search. On Team and Enterprise they still follow the
  organization's data exports and retention.
- **Memory controls** (Lesson 11): view, edit, or delete what Claude remembers; turn memory off for a
  single chat before your first message; keep sensitive topics out (the default).
- **Delete chats** you no longer need. One nuance from the Help Center: deleting a conversation
  **doesn't automatically delete** memory entries generated from it. Delete those in **Settings >
  Memory** too.
- **Share less.** Don't paste passwords, full ID numbers, or other people's personal data unless the
  task truly needs it.

### Claude's values: the constitution

Anthropic trains Claude using a published **constitution** that explains how and why Claude should
behave. It names four core properties, in priority order (applied holistically, not mechanically):

1. **Broadly safe:** not undermining appropriate human oversight of AI.
2. **Broadly ethical:** good values, honesty, avoiding inappropriate harm.
3. **Compliant with Anthropic's guidelines.**
4. **Genuinely helpful** to the people it works with.

Two ideas matter for everyday users. First, the constitution says *unhelpfulness is never trivially
"safe,"* so Claude aims to actually help, not refuse by reflex. Second, honesty is held to a very
high standard: Claude *should basically never directly lie or actively deceive*. There are also a
small number of **hard constraints** it won't cross under any instructions, such as providing serious
uplift toward biological weapons. Separately, Anthropic's **Usage Policy** spells out what people may
and may not use Claude for.

### When Claude declines

Sometimes Claude declines a request or adds a caution, and some products also run **safety
classifiers** that can block a response. If a legitimate request is declined, rephrase it with more
context about your purpose. Don't try to trick the model. For specialized fields like security
research, Anthropic runs verification programs that allow more latitude.

### Keep humans in charge of consequences

Claude can now act for you: sending messages through connectors, editing files in Cowork, clicking
through websites in Chrome. Anthropic's Chrome guidance is plain that **you** stay responsible for
what Claude does on your behalf there. The same principle applies everywhere: review before
anything irreversible, financial, legal, medical, or public goes out.

# Key Terminology

- **Hallucination** — a fluent, confident statement that is false or unsupported.
- **Grounding** — tying answers to quoted, checkable sources.
- **Incognito chat** — a chat that isn't saved to history, memory, or search.
- **Data retention** — how long Anthropic keeps your data (depends on account type and settings).
- **Constitution** — Anthropic's published document describing Claude's values and behavior.
- **Hard constraint** — a line Claude won't cross regardless of instructions.
- **Usage Policy** — Anthropic's rules on permitted and prohibited uses of Claude.

# Options and Trade-offs

| Situation | Safer choice | Why |
| --- | --- | --- |
| Work data | Your organization's Team/Enterprise account | No training by default; your org's controls apply |
| Sensitive personal topic | Incognito chat | Not saved to history, memory, or search |
| Critical facts or figures | Grounding + citations + your own check | Hallucinations are reduced, not eliminated |
| Actions with real consequences | Manual approval, review before sending | You remain responsible for what's done for you |
| Unsure whether a request is allowed | Read the Usage Policy; give honest context | Context helps Claude understand legitimate purposes |

# Worked Example

**Task:** using Claude to draft an appeal of a denied insurance claim.

1. **Minimize data:** share the denial letter and the relevant policy pages, but blank out your
   member ID and other identifiers Claude doesn't need.
2. **Ground it:** "Quote the policy sections that support coverage for this treatment, with page
   numbers. If none apply, say so."
3. **Draft:** "Write a firm, polite appeal letter that cites those sections."
4. **Verify:** check every quoted section against the actual policy document, and confirm deadlines
   and addresses on the insurer's official site.
5. **Decide:** for anything ambiguous, ask a professional (a benefits advocate or your doctor's
   billing office) before sending.

Claude saved hours of drafting, and the human-checked facts made the letter trustworthy.

# Real World Analogy

Claude is like a **brilliant intern with a perfect poker face**. They work fast and write
beautifully, but when they don't know something they might fill the gap with a confident guess. You
wouldn't let an intern sign a contract or send a press release without reading it first. You'd also
think twice about which confidential files you hand them, and on which company's systems. Good
managers stay helpful and trusting while checking what matters most.

# Examples

## Example 1 — Basic: asking for verifiable claims

```text
What are the main health benefits of regular walking? For each claim, say how
confident you are and what kind of source would confirm it. If evidence is
mixed, say so.
```

**Why this works:** confidence levels and a "mixed evidence" path make overstatement visible.

## Example 2 — Real-world: a private brainstorm

You want to think through a difficult family situation without it shaping future answers. Start an
**incognito chat** (ghost icon) so it isn't saved to history, memory, or chat search. Afterward,
check **Settings > Memory** to confirm nothing sensitive was saved from earlier chats.

**Why this works:** incognito plus a memory check gives you a private space and a clean record.

## Example 3 — Pitfall: work data in a personal account

An employee pastes a spreadsheet of customer names and emails into their **personal** Free account
to "quickly clean it up." Their company has a Team plan with no-training defaults and its own data
policies, and the personal account bypasses both.

**The fix:** use the organization's account for work data, remove personal data the task doesn't
need, and follow your company's AI policy.

# Common Mistakes

- **Trusting fluent answers** about exact figures, citations, or recent events without checking.
- **Using a personal account for work data** instead of the organization's account.
- **Assuming deleting a chat deletes its memories.** Clean up Settings > Memory too.
- **Pasting unnecessary sensitive data**, such as full ID numbers, passwords, or others' personal details.
- **Letting Claude take irreversible actions unreviewed** through connectors, Cowork, or Chrome.

# Best Practices

- Build **verification** into important prompts: quotes, citations, confidence, "I don't know."
- Check your **privacy settings** once (claude.ai/settings/data-privacy-controls) and choose deliberately.
- Use **incognito** for sensitive topics, and **review memory** periodically.
- Keep **work in work accounts**, and share only the data a task needs.
- Treat Claude's output as a draft: **you** approve anything consequential.

# Summary

- Claude can **hallucinate**; reduce it with "I don't know" permission, grounding, citations, and
  re-asking, and always verify critical facts.
- **Consumer** accounts choose whether data trains models (5-year vs 30-day retention); **commercial**
  accounts aren't trained on by default.
- **Incognito chats**, **memory controls**, and deleting chats (plus their memories) protect privacy.
- The **constitution** orders Claude's values: broadly safe, broadly ethical, guideline-compliant,
  genuinely helpful, with very high honesty standards.
- **Humans stay responsible** for consequential actions taken with Claude's help.

# Flash Cards

Q: What is a hallucination?
A: A fluent, confident statement from the model that is false or not supported by its sources.

Q: Name three techniques that reduce hallucinations.
A: Allowing "I don't know," grounding answers in quoted sources, asking for citations, restricting to provided documents, and re-asking to compare answers (any three).

Q: How long is consumer data kept if you allow it to be used for training, and if you don't?
A: Up to 5 years if you allow it; 30 days if you don't (as of writing).

Q: Does Anthropic train on Team, Enterprise, or API content by default?
A: No. Commercial accounts aren't used for training by default.

Q: What does an incognito chat skip?
A: It isn't saved to chat history, isn't used for memory, and isn't included in chat search.

Q: What are the four core values in Claude's constitution, in priority order?
A: Broadly safe, broadly ethical, compliant with Anthropic's guidelines, and genuinely helpful.

# Exercises

### Easy
Open your privacy settings at claude.ai/settings/data-privacy-controls and note your current
training choice. Decide whether it's the one you want, and change it if not.

### Medium
Ask Claude three factual questions in an area you know well, including one obscure one. Ask for
sources and confidence. Check each answer and record which, if any, were wrong or overconfident.

### Challenging
Write a one-page "AI use guideline" for your team or household: which account to use for what,
what data never to share, which outputs always need human review, and how to verify facts. Ask
Claude to critique it for gaps, then revise.

# Further Reading

- Anthropic — *Reduce hallucinations*:
  <https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations>
- Anthropic — *Data usage* (training and retention): <https://code.claude.com/docs/en/data-usage>
- Claude Help Center — *Using Claude's chat search and memory* (incognito and memory controls):
  <https://support.claude.com/en/articles/11817273-using-claude-s-chat-search-and-memory-to-build-on-previous-context>
- Anthropic — *Claude's constitution*: <https://www.anthropic.com/constitution>
- Anthropic — *Privacy Center*: <https://privacy.anthropic.com/>
