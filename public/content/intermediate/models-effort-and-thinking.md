---
id: lesson-09
slug: models-effort-and-thinking
title: "Choosing Models, Effort, and Thinking"
level: intermediate
order: 9
duration: 17
tags:
  - model-selection
  - effort
  - extended-thinking
  - usage
  - reasoning
summary: "The three dials that control how Claude works on a task: which model, how much effort, and whether it thinks first. Covers what each level does, which combinations fit which jobs, and how to get top quality on hard problems without draining your usage on easy ones."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Choose a **model** to fit the task: Haiku, Sonnet, Opus, or Fable.
- Explain the five **effort** levels and their trade-offs.
- Turn **thinking** on or off where possible, and read its summary.
- Combine the three dials for **quality** on hard problems and **economy** on easy ones.
- Recognize when a poor answer is a **settings** problem versus a **prompt** problem.

# Why It Matters

The same question can get a quick, shallow answer or a careful, thorough one, depending on three
settings most people never touch. Maxing everything out wastes your limits on easy tasks, and
leaving everything low shortchanges hard ones. Learning to set the dials is how power users get
better answers *and* make their usage last.

# Concept Explanation

### Where the dials are

Click the **model name** (next to the send button on web and desktop, at the top on mobile). From that
menu you can:

- **Pick a model.** Click **More models** to see the full list your plan includes.
- **Set Effort.** Hover over **Effort** and choose a level. Each model has a recommended level,
  marked **Default**.
- **Toggle thinking.** The switch is labeled **Thinking** (or **Extended** on some models).

Changes can be made at any point in a conversation and apply starting with Claude's next response.
On Enterprise plans, admins can limit which models and effort levels each role can use.

### Dial 1: the model

As of writing, the current models and their best uses:

- **Haiku 5.5:** fastest. Good for quick questions, short rewrites, simple sorting and extraction.
- **Sonnet 5.5:** the speed/intelligence balance. A strong everyday default for writing, analysis,
  and coding.
- **Opus 5.5:** deep, reliable work on complex and long-running tasks.
- **Fable 5.1:** the most capable widely released model, for the hardest reasoning and long
  autonomous tasks. It's also the slowest. On Max, Fable has its own separate weekly limit.

Older models may also appear under **More models**. Bigger models generally use more of your limit
per message.

### Dial 2: effort

Effort controls **how much work** Claude puts into a response. The Help Center describes the levels:

| Level | What it's for |
| --- | --- |
| **Low**, **Medium** | Routine tasks; they stretch your usage further |
| **High** | The best overall balance of quality and speed |
| **Extra high** (xhigh) | Long-running coding and agentic tasks (Opus 4.7 and newer) |
| **Max** | The deepest reasoning, for the hardest problems |

Higher effort gives more thorough responses but **takes longer and uses more tokens**. That means
more of your usage limit.

### Dial 3: thinking

With **thinking** on, Claude works through a problem before it answers. A collapsible **Thinking**
section appears above the response with a **summary** of its reasoning. Thinking is separate from
effort, so you can combine them freely.

On the newest models (Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1, and Opus 5), thinking **can't be
turned off** in the apps. These models decide for themselves how much to think, scaled by your effort
setting and how hard the question is. On those models, **effort is your main control**.

### Reading the thinking summary

The summary is a useful debugging tool. Anthropic's hallucination guide suggests reviewing reasoning
when an answer looks wrong, because it can reveal a faulty assumption ("I'm assuming the fiscal year
starts in January"). If you spot one, correct it in your next message.

### A simple strategy

1. Start with a **balanced baseline**: the model your plan defaults to at its **Default** effort, or
   **Sonnet**, which is a lighter everyday choice that stretches your limits. (Anthropic's developer
   docs suggest Opus 5.5 as the starting point for most *API* workloads; in the apps your usage limits
   are part of the trade-off too.)
2. If the task is **simple**, drop to **Haiku** or **Low/Medium** effort to save usage.
3. If the answer is **shallow or wrong on a hard problem**, first check your prompt (missing context?),
   *then* raise effort or switch to **Opus**.
4. Save **Fable** and **Max** effort for problems that truly need them.

# Key Terminology

- **Model selector** — the menu (click the model name) for model, effort, and thinking.
- **Effort** — how much work Claude puts into a response: low, medium, high, extra high, or max.
- **Default effort** — the level Anthropic recommends for a model, marked in the menu.
- **Thinking** — Claude reasoning through a problem before answering; a summary appears above the reply.
- **Adaptive thinking** — newer models deciding how much to think based on effort and difficulty.
- **Tokens** — the units of text Claude processes; more effort generally means more tokens used.

# Options and Trade-offs

| Task | Suggested starting point | Why |
| --- | --- | --- |
| Quick fact, rewrite, or translation | Haiku or Sonnet, Low/Medium effort | Fast, light on your limits |
| Everyday drafting and analysis | Sonnet, Default effort | Balanced quality and speed |
| Strategy memo, tricky analysis, careful edit | Opus, High effort | More thorough reasoning |
| Long coding or multi-step agentic work | Opus, Extra high effort | Designed for long-running tasks |
| The hardest reasoning problem you have | Fable, High or Max effort | Maximum capability, slowest, most usage |

# Worked Example

**Problem:** a spreadsheet formula meant to calculate quarterly commission keeps returning wrong
totals for some reps.

1. **First try:** Sonnet, default effort. Claude suggests a plausible fix, but the totals are still
   wrong.
2. **Check the prompt first:** you hadn't said that commission tiers reset each quarter. Add that,
   with three sample rows and the expected results.
3. **Raise the dials:** switch to **Opus** at **High** effort and ask again.
4. **Read the thinking summary:** it shows Claude assumed tier thresholds were cumulative across the
   year. That was the bug in its earlier reasoning *and* in your formula.
5. **Fix and verify:** Claude rewrites the formula, and you test it on the three sample rows.

The prompt fix and the effort increase each helped. The thinking summary showed which assumption
mattered.

# Real World Analogy

Think of a **restaurant kitchen**. The **model** is which chef you ask: the line cook for a fast
sandwich, the head chef for a tasting menu. **Effort** is how much time you give them, from five
minutes to an afternoon. **Thinking** is whether they plan the menu on paper before cooking. You
wouldn't book the head chef for an afternoon to make toast. You also wouldn't give the line cook five
minutes to cater a wedding.

# Examples

## Example 1 — Basic: a light task with light settings

Settings: **Haiku**, **Low** effort.

```text
Rewrite this sentence to sound friendlier: "Your request has been denied
due to incomplete documentation."
```

**Why this works:** a simple rewrite doesn't need deep reasoning. Light settings answer instantly and
save usage.

## Example 2 — Real-world: a decision memo

Settings: **Opus**, **High** effort.

```text
We're choosing between building our own scheduling tool and buying a SaaS one.
Attached: our requirements, three vendor quotes, and our team's capacity plan.
Write a 1-page decision memo with a recommendation, the key trade-offs, the
risks of each option, and what would change your recommendation.
```

**Why this works:** weighing trade-offs across several documents benefits from a stronger model and
more effort. Check the thinking summary to see how it weighed the evidence.

## Example 3 — Pitfall: max everything, all the time

A user sets **Fable** at **Max** effort for every message, including "thanks!" and short rewrites.
Responses are slow, and they hit their weekly limit by Wednesday.

**The fix:** match the dials to the task. Keep heavy settings for heavy problems, and use the
defaults or lower for everything else.

# Common Mistakes

- **Raising effort to fix a bad prompt.** Missing context isn't solved by thinking harder. Add it.
- **Using the biggest model for trivial tasks.** It's slower and burns limits.
- **Ignoring the thinking summary** when an answer seems off. It often shows the wrong assumption.
- **Never trying lower effort** on routine work, where it's often just as good.
- **Expecting to turn thinking off** on the newest models. Lower the effort instead.

# Best Practices

- Pick a **balanced everyday baseline** (your default model, or Sonnet at Default effort) and adjust from there.
- **Drop down** (Haiku, Low/Medium) for quick, simple tasks.
- **Step up** (Opus, High/Extra high) for complex, multi-document, or long-running work.
- **Reserve Fable and Max** for problems that truly need maximum reasoning.
- When an answer disappoints, **fix the prompt first**, then adjust the dials.

# Summary

- Three dials shape every response: **model**, **effort**, and **thinking**, all in the model selector.
- **Haiku** is fastest, **Sonnet** balanced, **Opus** deep, and **Fable** the most capable widely released.
- Effort runs **Low → Medium → High → Extra high → Max**; higher means more thorough, slower, and
  more usage.
- **Thinking** shows a reasoning summary; on the newest models it's always on and **effort** is the
  control.
- Match the dials to the task, and **fix prompts before raising effort**.

# Flash Cards

Q: Where do you change the model, effort, and thinking settings?
A: Click the model name (next to the send button on web/desktop, at the top on mobile) to open the model selector.

Q: List the five effort levels from lowest to highest.
A: Low, Medium, High, Extra high (xhigh), and Max.

Q: What is the trade-off of higher effort?
A: More thorough responses that take longer and use more tokens, and therefore more of your usage limit.

Q: Which effort level does the Help Center describe as the best overall balance?
A: High.

Q: On the newest models, can you turn thinking off in the apps?
A: No. Thinking can't be turned off on Haiku 5.5, Sonnet 5.5, Opus 5.5, Fable 5.1, or Opus 5, so effort is the main control.

Q: What should you check before raising effort to fix a weak answer?
A: Your prompt. Missing context or vague instructions are often the real cause.

# Exercises

### Easy
Ask the same simple question with Haiku at Low effort and with Opus at High effort. Compare speed and
quality. Was the extra effort worth it?

### Medium
Pick a reasoning-heavy task, such as a logic puzzle or a planning problem with constraints. Run it at
two effort levels and read the thinking summaries. Note one assumption the summary revealed.

### Challenging
Create a personal "dial guide" for your five most common tasks: the model and effort level you'll use
for each and why. Test each one for a week, track how often you had to step up, and revise.

# Further Reading

- Claude Help Center — *Change the model, effort, and thinking settings*:
  <https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings>
- Claude Help Center — *When should I use web search, extended thinking, and research?*:
  <https://support.claude.com/en/articles/11095361-when-should-i-use-web-search-extended-thinking-and-research>
- Anthropic — *Models overview*: <https://platform.claude.com/docs/en/about-claude/models/overview>
- Anthropic — *Effort* (how effort works under the hood):
  <https://platform.claude.com/docs/en/build-with-claude/effort>
