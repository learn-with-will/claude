---
id: lesson-10
slug: web-search-and-research
title: "Web Search and Research"
level: intermediate
order: 10
duration: 18
tags:
  - web-search
  - research
  - citations
  - source-evaluation
  - connectors
summary: "How to get current, sourced information from Claude: turning on web search, reading and checking citations, fetching specific pages, and using Research for multi-source reports, plus when to use search versus thinking versus Research and how to judge what comes back."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Turn on **web search**, make sure Claude actually searches, and read its **citations**.
- Have Claude read a **specific web page** with web fetch.
- Run **Research** for multi-source reports, and know how it uses your **connectors**.
- Choose between **web search**, **thinking**, and **Research** for a given question.
- **Evaluate sources** instead of trusting whatever is cited.

# Why It Matters

Claude's built-in knowledge stops at its training cutoff (June 2026 for current models). Prices,
news, laws, product versions, and people's roles change constantly. Web search closes that gap, and
Research turns hours of tab-hopping into a sourced report. Both are only as trustworthy as your habit
of checking what they cite.

# Concept Explanation

### Web search

Web search lets Claude look things up and answer with **citations**, links you can open to verify
each claim. The Help Center describes it as best for *straightforward, factual queries* that need
one or two searches.

- **Turning it on:** open **+** in the message box and select **Web search** (a checkmark shows it's
  on). In the newer unified experience there's no toggle. Claude searches when it needs to, and you
  can say "Search the web for…" to make sure it does.
- **Team and Enterprise:** an Owner must first enable web search for the organization.
- **Citations:** responses that use search include citations, source links, and relevant quotes.
- **Image results:** web search can show images from results (powered by Bing), each with a source.
- **Location:** Claude may use an approximate location from your IP address for local results.

Web search counts toward your usage limits.

### Reading a specific page: web fetch

With web search on, you can paste a **URL** and ask Claude to read and analyze that page: "Summarize
this article and list its main claims." A long page loads its full text into the conversation, which
can use a large share of your limit (the Help Center flags this especially for free accounts).

### Research: multi-step investigation

**Research** (paid plans) investigates a question in depth. It runs multiple searches that build on
each other and decides what to look into next based on what it finds. The result is a longer report
with citations.

- **Turning it on:** web search must be on. Then click **+** and select **Research**. A blue
  indicator appears; click it again to turn Research off.
- **Models:** Research runs on **Opus 5.5** (falling back to Opus 4.8 when needed), whatever model
  you selected.
- **Connectors:** on web and desktop, Research can also use your **connected tools**, such as Gmail,
  Google Calendar, Google Docs, and other enabled connectors. During Research, Claude can use connector
  tools **automatically, without asking for approval each time**. On mobile, Research searches only
  the web.
- **Limits:** it follows normal usage limits but uses them faster, because it retrieves many sources.

If Research doesn't start on its own, ask directly: "Please use the research tool to…"

### Search vs. thinking vs. Research

From the Help Center's guidance:

- **Web search:** quick facts needing one or two lookups (weather, a company, today's headlines).
- **Extended thinking:** complex reasoning that **doesn't need current web information** (math,
  debugging, weighing an argument).
- **Research:** comprehensive gathering needing **five or more searches over about 1–3 minutes**
  (competitor comparisons, updating an outdated internal document, prioritizing items from your
  calendar and email).
- **Research + thinking:** deep planning plus extensive gathering (a business proposal on an emerging
  technology, analyzing many scientific papers).

### Judge the sources, not just the answer

A citation proves only that *some page said it*. Before you rely on a claim:

- **Open the source.** Does it actually say what Claude claims?
- **Prefer primary sources:** official sites, regulators, original studies, company filings.
- **Check dates.** Is it current, and does the date matter for this question?
- **Look for agreement.** Ask Claude to cross-check claims across independent sources and flag conflicts.
- **Ask for the other side:** "What credible sources disagree?"

Anthropic's research-prompting guidance adds: define what a successful answer looks like, ask Claude
to verify across multiple sources, and for complex questions have it track **competing hypotheses**
and its **confidence**.

# Key Terminology

- **Web search** — Claude looking things up online and answering with citations.
- **Citation** — a link to the source that supports a claim.
- **Web fetch** — Claude reading the content of a specific URL you provide.
- **Research** — a multi-step investigation that runs many searches and returns a cited report.
- **Connector** — a link to one of your apps (Gmail, Drive, Slack…) that Claude can use (Lesson 12).
- **Primary source** — the original origin of information, such as an official site, study, or filing.

# Options and Trade-offs

| Need | Tool | Trade-off |
| --- | --- | --- |
| A current fact or quick check | Web search | Light; still verify citations |
| Analysis of one known page | Web fetch (paste the URL) | Long pages use a lot of context |
| A sourced, multi-angle report | Research | Paid plans; uses limits faster; takes minutes |
| Hard reasoning, no new info needed | Thinking / higher effort | Doesn't add current facts |
| A report that blends web and your own data | Research with connectors | Connectors are used automatically, so choose which are on |

# Worked Example

**Goal:** a competitive snapshot for a planning meeting.

1. **Check your connectors.** Research may use enabled connectors automatically, so turn off any you
   don't want included (for example, personal email).
2. **Turn on web search, then Research.**
3. **Prompt with scope and success criteria:**

```text
Research the three largest providers of employee scheduling software for
restaurants in the US. For each: pricing model, target customer size, key
features, and any notable changes in the last 12 months. Prefer official
company pages and reputable trade press. End with a comparison table and
a list of claims you couldn't verify from more than one source.
```

4. **Review:** open at least one citation per company, and confirm the pricing pages are current.
5. **Follow up:** "Which of these claims rest on a single source? Re-check those."

# Real World Analogy

Web search is a **reference librarian at the front desk**. Ask a quick question and they'll look it up
and point to the page. Research is hiring a **research assistant for the afternoon**. They pull many
sources, follow leads, and hand you a report with footnotes. Either way, a good scholar still reads
the key footnotes before quoting them, because the assistant may have misread a source or relied on a
weak one.

# Examples

## Example 1 — Basic: make sure it searches

```text
Search the web: what is the current minimum wage in Ontario, Canada, and when
did it last change? Cite the official government source.
```

**Why this works:** "Search the web" makes sure Claude looks it up, and asking for the official source
steers it to a primary source.

## Example 2 — Real-world: fetch and critique a page

```text
Read this article: https://example.com/report-on-remote-work
Summarize its three main claims, say what evidence it gives for each, and
flag any claim that isn't backed by data in the article.
```

**Why this works:** web fetch reads the exact page, and the critique step separates evidence from
opinion.

## Example 3 — Pitfall: one weak source, presented as fact

A user asks about a supplement's benefits and gets a confident answer citing a single blog post
selling the supplement. They paste it into a newsletter.

**The fix:** check *who* the source is and whether independent, primary sources agree. Ask: "Find
peer-reviewed or official health-agency sources on this, and say where evidence is weak or mixed."

# Common Mistakes

- **Assuming Claude searched** when it didn't. Ask explicitly or check for citations.
- **Treating any citation as proof.** Open it, and consider who wrote it and when.
- **Using Research for a one-line fact.** It's slower and uses more of your limit.
- **Forgetting Research can use connectors automatically.** Review what's enabled first.
- **Pasting very long pages** on a tight limit when a section would do.

# Best Practices

- Say **"Search the web"** for anything recent, and ask for **official or primary sources**.
- For Research, give **scope, criteria, preferred sources, and an output format**.
- Ask Claude to list **claims it couldn't verify** or that rest on one source.
- **Open key citations** before you rely on them, especially numbers and quotes.
- Choose the **lightest tool** that fits: search for facts, thinking for reasoning, Research for reports.

# Summary

- **Web search** adds current information with **citations**; turn it on from **+** (or just ask).
- **Web fetch** reads a specific URL you provide; long pages use more context.
- **Research** (paid) runs many linked searches, uses **Opus 5.5** regardless of your model, and can
  use your **connectors automatically** on web and desktop.
- Use **search** for quick facts, **thinking** for reasoning, **Research** for multi-source reports.
- A citation isn't proof: **check sources**, prefer **primary** ones, and look for agreement.

# Flash Cards

Q: How do you make sure Claude uses web search?
A: Turn on Web search from the + menu (if you have the toggle) and/or explicitly ask, for example "Search the web for…".

Q: What is web fetch?
A: With web search on, Claude can read and analyze the content of a specific URL you provide.

Q: What must be on before you can use Research?
A: Web search. Research also requires a paid plan.

Q: Which model does Research run on?
A: Claude Opus 5.5 (falling back to Opus 4.8 when needed), regardless of the model you selected.

Q: How does Research treat your connectors on web and desktop?
A: It can use enabled connector tools automatically, without asking for approval each time, so review what's enabled first.

Q: When should you use Research instead of web search?
A: For comprehensive gathering that needs five or more searches (about 1–3 minutes), like comparisons and multi-source reports.

# Exercises

### Easy
Ask a question about something that changed recently, first without web search and then with it.
Compare the answers and open one citation to confirm it.

### Medium
Paste a URL to a long article and ask for its main claims plus the evidence for each. Then check two
of the claims yourself against the article.

### Challenging
Run a Research report on a topic you know well, using scope, criteria, and preferred sources. Audit
five citations: does each source exist, say what was claimed, and come from a credible origin? Write
a short note on the audit's results and how you'd change the prompt next time.

# Further Reading

- Claude Help Center — *Enable and use web search*:
  <https://support.claude.com/en/articles/10684626-enable-and-use-web-search>
- Claude Help Center — *Use research on Claude*:
  <https://support.claude.com/en/articles/11088861-use-research-on-claude>
- Claude Help Center — *When should I use web search, extended thinking, and research?*:
  <https://support.claude.com/en/articles/11095361-when-should-i-use-web-search-extended-thinking-and-research>
- Anthropic — *Prompting best practices* (research and information gathering):
  <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices>
