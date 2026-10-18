---
id: lesson-15
slug: claude-in-your-browser-and-apps
title: "Claude in Chrome and Your Other Apps"
level: intermediate
order: 15
duration: 19
tags:
  - claude-in-chrome
  - browser-agent
  - microsoft-365
  - google-workspace
  - mobile
summary: "Claude doesn't only live at claude.ai. This lesson covers Claude in Chrome (a browser agent that reads, clicks, and fills forms), the Excel, PowerPoint, and Google Workspace sidebars, Claude in Slack, and mobile and voice, with the safety habits each one needs."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Install and use **Claude in Chrome**, including its side panel, tab groups, shortcuts, and scheduled tasks.
- Apply the **safety practices** for browser agents, especially against **prompt injection**.
- Use Claude **inside your documents** through the Microsoft 365 and Google Workspace add-ins.
- Know what **Claude in Slack**, **mobile**, and **voice mode** offer.
- Pick the **right surface** for a task.

# Why It Matters

The best place for Claude is often wherever your work already is: the web page you're reading, the
spreadsheet you're fixing, the Slack thread you're in. Bringing Claude to those places removes the
copy-paste shuffle. A Claude that can click and type in your browser also carries real risk. This
lesson covers both the power and the precautions.

# Concept Explanation

### Claude in Chrome: a browser agent

**Claude in Chrome** is a browser extension that lets Claude **read, click, and navigate websites
alongside you**. It's available on **all paid plans** and works in **Google Chrome only**, not other
Chromium-based browsers and not on mobile.

**Setup:** install it from the Chrome Web Store, sign in with your Claude account, pin it from the
puzzle-piece menu, and grant the requested permissions. In Claude Desktop, connect it under
**Settings > Connectors**.

**What it can do:**

- **Browser actions:** read pages, click, type, navigate, fill forms, take screenshots.
- **Multi-tab work:** drag tabs into Claude's tab group so it can work across them.
- **Shortcuts:** save effective prompts and reuse them by typing `/`. Shortcuts can be scheduled.
- **Scheduled tasks:** run recurring browser tasks daily, weekly, monthly, or yearly (clock icon).
- **Workflow recording:** record steps for Claude to repeat (in the classic panel).
- **Background work:** tasks continue when you switch tabs, as long as Chrome stays open.
- **For developers:** read console logs, errors, network requests, and page state. It pairs with
  Claude Code to build, deploy, and then test in the browser.

**The side panel:** on Max and Team (rolling out to Pro), the side panel runs as a **Cowork session**.
Sessions are saved to your history, and skills, plugins, and connectors work there. It starts in
**Automatically approve** mode, where Claude screens its own actions and pauses when approval is
needed. You can switch to **Manually approve** to review every action.

### Browser-agent safety

Anthropic's guidance is blunt: *the biggest risk facing browser-using AI tools is prompt injection*,
hidden instructions on a web page that try to trick Claude into unintended actions. Safety classifiers
screen for this, but the risk is not zero. Practical rules from the Help Center:

- **Use a separate browser profile** without access to sensitive accounts (banking, healthcare,
  government).
- **Review proposed actions** before approving, especially on unfamiliar sites.
- **Start with simple tasks** like research or form-filling, and keep prompts specific.
- **Stop immediately** if Claude drifts to unrelated topics, unexpected sites, or asks for sensitive
  information.
- Claude **takes screenshots of open tabs** and can't filter sensitive content out of what it sees.
- It **asks permission before accessing financial sites**. Anthropic recommends against using it on
  pages with regulated data.
- **Prohibited uses** include stock trading or investment transactions, bypassing captchas, inputting
  sensitive data, and gathering facial images.
- You stay **responsible** for actions Claude takes in your browser.

### Claude inside your documents

**Microsoft 365.** Claude has add-ins for **Excel** and **PowerPoint**. They share conversation context
with each other and support skills (type `/` in the sidebar to pick one). The Excel add-in can work
with pivot tables, charts, and conditional formatting. Separately, the **Microsoft 365 connector** can,
when an admin enables write tools, draft and send email, manage calendar events, and update OneDrive
and SharePoint files. Teams stays read-only.

**Google Workspace.** **Claude for Google Workspace** (beta on Pro, Max, Team, and Enterprise) adds a
Claude sidebar to **Docs, Sheets, and Slides** with one install. It can draft and restructure
documents, explain and fix formulas, build models on new tabs, and restyle decks. By default it **asks
before edits**. It **can't share files, grant access, or change ownership**, and its edits show up in
version history under your name. Note that it works only on the open file, and each operation is
limited to about six minutes.

### Claude in Slack

Team and Enterprise members can **tag Claude in Slack conversations** to delegate tasks while they
work on other things. Developers can also mention `@Claude` with a bug report and get a pull request
back through Claude Code (Lesson 18).

### Mobile and voice

The iOS and Android apps support **voice mode** (in beta), a spoken back-and-forth that works best on
your phone and draws from your normal usage limits. Mobile can also render **interactive charts and
apps** in conversations, and in the US, Pro and Max users can let Claude analyze **health and fitness
data**. Mobile is a great place to start and steer Cowork tasks (Lesson 14).

# Key Terminology

- **Claude in Chrome** — a browser extension that lets Claude read, click, and navigate sites with you.
- **Side panel** — Claude's panel beside your tabs in Chrome; a Cowork session on Max and Team.
- **Tab group** — the tabs you've given Claude to work across.
- **Shortcut** — a saved prompt you reuse with `/`, optionally on a schedule.
- **Prompt injection** — instructions hidden in content that try to hijack Claude's actions.
- **Add-in / sidebar** — Claude embedded in Excel, PowerPoint, or Google Docs, Sheets, and Slides.
- **Voice mode** — spoken conversation with Claude (beta), best on mobile.

# Options and Trade-offs

| Task | Best surface | Why |
| --- | --- | --- |
| Work across several websites | Claude in Chrome | Reads and acts on real pages |
| Fix or explain a spreadsheet | Excel add-in or Google Sheets sidebar | Works directly in the file |
| Restyle or extend a deck | PowerPoint add-in or Google Slides sidebar | Edits slides in place |
| Delegate from a team thread | Claude in Slack | No context switch for the team |
| Talk through a problem hands-free | Voice mode on mobile | Natural spoken back-and-forth |
| Multi-step work across files and apps | Cowork (Lesson 14) | Plans and executes whole tasks |

# Worked Example

**Goal:** collect five open job postings from three company career pages into a Google Sheet.

1. **Use a work-only Chrome profile** with no banking or personal accounts signed in.
2. **Put the three career pages in Claude's tab group**, and open a blank Google Sheet in another tab.
3. **Switch to Manually approve** for this first run.
4. **Prompt:**

```text
From the three career pages in my tab group, find up to five open roles that
mention "data analyst". Add one row per role to the Google Sheet: company,
title, location, link, date posted. Don't submit any applications or forms
other than typing in the sheet.
```

5. **Approve each action** as Claude works, and stop if it navigates somewhere unexpected.
6. **Save it as a shortcut** if you'll repeat it, and schedule it weekly once you trust it.

# Real World Analogy

Claude in Chrome is like a **helper sitting at your computer**, using your browser while you watch.
Handy, but they see everything on your screen, including your bank tab. So you give them a separate
user account without your bank logins. The document add-ins are more like a **specialist in each
room**: the spreadsheet expert who only touches the workbook open in front of them, and who can't
hand your file to anyone else.

# Examples

## Example 1 — Basic: understand the page you're on

```text
Summarize this page in five bullets and list any deadlines or prices it
mentions. Then compare it with the other two tabs in your group.
```

**Why this works:** read-only actions on pages you chose, so it's a safe and very useful first use.

## Example 2 — Real-world: audit a spreadsheet in place

In Google Sheets with the Claude sidebar:

```text
Explain how the "Forecast" tab calculates monthly revenue. Flag any hardcoded
numbers inside formulas and any formulas that reference empty cells. Don't
change anything yet; just list the issues with cell references.
```

**Why this works:** the sidebar sees the actual file. Asking for a list before edits keeps you in control.

## Example 3 — Pitfall: the browser agent in your everyday profile

A user runs Claude in Chrome in the same profile where they're signed into their bank, email, and HR
portal, then asks it to "research and sign me up for the best webinar." A page it visits contains
hidden instructions.

**The fix:** use a **separate profile** without sensitive accounts, keep tasks specific, use **Manually
approve** on unfamiliar sites, and stop the task if Claude does anything unrelated.

# Common Mistakes

- **Running a browser agent in your main profile** with sensitive accounts signed in.
- **Approving actions without reading them,** especially on new websites.
- **Expecting Claude in Chrome on other browsers or mobile.** It's Chrome-only.
- **Forgetting add-in limits:** the Google sidebar works only on the open file and can't share or export it.
- **Using browser agents for prohibited tasks** like trading, captchas, or entering sensitive data.

# Best Practices

- Keep a **dedicated Chrome profile** for Claude.
- Start in **Manually approve** for new kinds of tasks; move to automatic approval once trusted.
- Turn reliable prompts into **shortcuts**, and schedule them only after several clean runs.
- Use **document add-ins** for edits inside files, and ask for a list of issues before changes.
- Pick the **surface where the work lives**, and fall back to Cowork for multi-app tasks.

# Summary

- **Claude in Chrome** (paid plans, Chrome only) reads, clicks, navigates, and fills forms, with tab
  groups, shortcuts, and scheduled tasks.
- **Prompt injection** is the top browser-agent risk: use a **separate profile**, review actions, and
  stop at anything unexpected.
- **Excel and PowerPoint add-ins** and **Claude for Google Workspace** bring Claude into your files,
  asking before edits by default.
- **Claude in Slack** lets teams delegate from a thread; **mobile** adds voice mode and more.
- Choose the surface **where your work already is**.

# Flash Cards

Q: What does Claude in Chrome do, and which plans include it?
A: It lets Claude read, click, and navigate websites alongside you; it's available on all paid plans.

Q: Which browsers does Claude in Chrome support?
A: Google Chrome only. Not other Chromium-based browsers, and not mobile.

Q: What does Anthropic call the biggest risk for browser-using AI?
A: Prompt injection: hidden instructions in web content that try to trick Claude into unintended actions.

Q: What is the single most important setup step for safe browser use?
A: Use a separate browser profile without access to sensitive accounts like banking, healthcare, or government.

Q: Name two things Claude for Google Workspace can never do.
A: Share the file, give anyone access, or change its owner (any two).

Q: What are the two approval modes in the Chrome side panel?
A: Automatically approve (Claude screens actions and pauses when needed) and Manually approve (you review every action).

# Exercises

### Easy
Install Claude in Chrome in a fresh Chrome profile. Open two articles on the same topic, add them to
Claude's tab group, and ask for a comparison.

### Medium
Save a prompt you use often as a **shortcut**, run it three times on different pages, and refine it.
Note whether you'd trust it on a schedule, and why.

### Challenging
Pick a real spreadsheet or document (or a copy) and use the Excel or Google Workspace sidebar to
audit it before changing anything. Then apply the fixes one at a time, checking version history after
each. Write a short note on what you'd let Claude change automatically next time.

# Further Reading

- Claude Help Center — *Get started with Claude in Chrome*:
  <https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome>
- Claude Help Center — *Use Claude in Chrome safely*:
  <https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely>
- Claude Help Center — *Use Claude in Google Docs, Sheets, and Slides*:
  <https://support.claude.com/en/articles/16951679-use-claude-in-google-docs-sheets-and-slides>
- Claude Help Center — *Release notes* (Excel, PowerPoint, Slack, and mobile updates):
  <https://support.claude.com/en/articles/12138966-release-notes>
