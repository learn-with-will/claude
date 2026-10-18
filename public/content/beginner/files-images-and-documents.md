---
id: lesson-05
slug: files-images-and-documents
title: "Working with Files, Images, and Documents"
level: beginner
order: 5
duration: 18
tags:
  - file-uploads
  - pdfs
  - vision
  - file-creation
  - code-execution
summary: "How to give Claude files and get files back: supported types and limits, how PDFs and images are read, getting grounded answers from long documents, and having Claude create real Excel, Word, PowerPoint, and PDF files by running code in a secure sandbox."
---

# Learning Objectives

By the end of this lesson you will be able to:

- Upload **documents, spreadsheets, and images**, and know the **limits** that apply.
- Explain how Claude reads **PDFs** (text and visuals) versus other documents (text only).
- Get **grounded answers** from long documents using quotes and page references.
- Have Claude **create and edit files** (Excel, Word, PowerPoint, PDF) and understand how that works.
- Recognize the **security trade-off** of letting Claude's sandbox reach the internet.

# Why It Matters

Most real work lives in files: reports, contracts, spreadsheets, screenshots. Claude can read them
and produce new ones. It can turn a messy CSV into a formatted spreadsheet with working formulas, or a
long PDF into a sourced summary. Knowing the limits and the right prompting habits is the difference
between "it ignored half my document" and "it found exactly what I needed."

# Concept Explanation

### Uploading files

Click **+** in the message box and choose **Add files or photos**, drag files into the chat, or paste
an image from your clipboard. Supported types, per the Help Center:

- **Documents:** PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON, and XLSX. XLSX needs **code
  execution and file creation** turned on.
- **Images:** JPEG, PNG, GIF, and WebP.

**Chat upload limits (as of writing):** up to **500 MB per file**, **20 files per chat**, images up to
**8000×8000 pixels**, and PDFs up to **1000 pages**. Files you add to a **Project** are capped at **30
MB** each.

### How Claude reads what you give it

- **PDFs of 100 pages or fewer:** Claude analyzes **text and visual elements**, including images,
  charts, and graphics.
- **PDFs of 101–1000 pages:** **text only**.
- **Other documents** (DOCX, TXT, and so on): Claude extracts the **text** and can't read embedded
  images.
- **Images and screenshots:** Claude can describe them, read text in them, interpret charts, and
  compare them. The Help Center recommends images of at least 1000×1000 pixels for best results.

Two small habits avoid confusion: refer to PDF pages by the number your **PDF viewer** shows, not the
number printed on the page, and **split very large files** into sections.

### Grounded answers from long documents

From Anthropic's prompting and hallucination guides:

- **Put the document first and the question last.**
- **Ask for quotes first:** "Find the passages relevant to X, quote them, then answer using only
  those quotes."
- **Ask for citations:** page numbers or section names for each claim.
- **Allow "not found":** "If the document doesn't say, reply 'Not in the document.'"

These steps make Claude's answer checkable and noticeably reduce made-up details.

### Claude can create and edit files

With **Code execution and file creation** on (**Settings > Capabilities**), Claude can make
**Excel (.xlsx), Word (.docx), PowerPoint (.pptx), and PDF** files you can download or save to
Google Drive. It can also write and run code to analyze CSVs and produce charts.

How it works: Claude writes and runs code (such as Python or JavaScript) in an **isolated, sandboxed
container**, separate from your computer. This is why the spreadsheets it builds have *working
formulas*, not just numbers typed in. File creation uses more of your usage limit than a regular
chat.

### The security trade-off: network access

On Free, Pro, and Max, the sandbox can reach approved package sources (such as PyPI and npm) by
default. The Help Center names the main risk as **prompt injection**: malicious instructions hidden
in a file or web page could try to make Claude run untrusted code or send data out. Its advice is
that **disabling network access eliminates this risk entirely**. On Team and Enterprise, owners
control network access, and the safest rollout starts with it off.

# Key Terminology

- **Upload** — attaching a file or image to a chat or Project.
- **Vision** — Claude's ability to read and interpret images, screenshots, and charts.
- **Code execution and file creation** — the setting that lets Claude run code in a sandbox and
  produce files.
- **Sandbox** — an isolated environment where Claude's code runs, separate from your systems.
- **Network egress** — the sandbox's ability to reach the internet.
- **Prompt injection** — hidden instructions in content that try to hijack what Claude does.
- **Grounding** — tying an answer to quoted source text so it can be checked.

# Options and Trade-offs

| Approach | Good for | Trade-off |
| --- | --- | --- |
| Upload to a chat | One-off questions about a file | Re-sent with every message, using usage each turn |
| Add to a Project | Files you'll reuse across many chats | 30 MB per file; text extraction except multimodal PDFs |
| Paste text directly | Short excerpts | Easy to lose formatting; long pastes are hard to manage |
| Let Claude create files | Spreadsheets, decks, documents you'll actually use | Uses more of your limit; review outputs before sharing |
| Network access on | Installing packages for advanced analysis | Adds prompt-injection risk; off is safest |

# Worked Example

**Task:** You have a 60-page annual report (PDF) and want a one-page brief for your manager, plus a
spreadsheet of the key numbers.

1. **Upload** the PDF. It's under 100 pages, so Claude can read its charts too.
2. **Ground it first:**

```text
From the attached report, quote every sentence that states revenue, costs,
headcount, or growth targets. Include the page number (as shown in the PDF
viewer) for each quote. If a figure isn't stated, don't estimate it.
```

3. **Then synthesize:** "Using only those quotes, write a one-page brief for my manager: three
   highlights, two risks, one recommendation."
4. **Create the file:** "Now build an Excel file with one row per figure (metric, value, page) and a
   column chart of revenue by year. Use formulas for any totals."
5. **Check:** spot-check three numbers against the cited pages before you send anything.

# Real World Analogy

Handing files to Claude is like briefing an **analyst who has a fully equipped office**: a desk to
read your documents, a calculator and spreadsheet software to crunch numbers, and a printer to hand
you finished reports. Ask them to show which page each number came from, and they will. Just remember
that anything you hand them, including a letter with suspicious instructions in it, ends up on their
desk. That's why you don't give them an open phone line to the outside world unless you need to.

# Examples

## Example 1 — Basic: summarize with page references

```text
Summarize the attached contract in plain English for a non-lawyer.
For each key obligation, give the page number. List anything unusual at the end.
```

**Why this works:** page references make the summary verifiable, and "anything unusual" points
Claude at what matters.

## Example 2 — Real-world: CSV to a working spreadsheet

```text
The attached CSV has one row per sale (date, region, product, amount).
Create an Excel file with: a cleaned data sheet, a pivot-style summary of
total sales by region and month using formulas, and a line chart of monthly
totals. Tell me any rows you dropped and why.
```

**Why this works:** Claude runs real code, so the summary uses live formulas, and asking it to
report dropped rows makes the cleaning transparent.

## Example 3 — Pitfall: the chart on page 300

A user uploads a 450-page PDF and asks Claude to interpret a chart on page 300. Claude can only read
the **text** of PDFs over 100 pages, so it can't actually see the chart.

**The fix:** extract the relevant pages into a smaller PDF (100 pages or fewer), or screenshot the
chart and upload it as an image.

# Common Mistakes

- **Expecting Claude to "see" images inside Word files.** Non-PDF documents are read as text only.
- **Asking about visuals in very long PDFs.** Over 100 pages, PDFs are text-only.
- **Trusting extracted numbers blindly.** Ask for page references and spot-check them.
- **Uploading the same big file to many chats.** Put it in a Project instead.
- **Leaving network access on without need** when working with untrusted files.

# Best Practices

- Turn on **Code execution and file creation** if you want real spreadsheets, decks, and documents.
- For long documents: **document first, question last, quotes first, citations always**.
- Keep **visual analysis** to PDFs of 100 pages or fewer, or send key pages as images.
- **Review generated files** before sharing, and ask Claude to explain its formulas and choices.
- Only share files you're **comfortable sharing**, and keep network access **off** when you don't need it.

# Summary

- Claude accepts common documents and images: **500 MB per file, 20 files per chat, PDFs up to 1000
  pages** (as of writing).
- PDFs of **100 pages or fewer** get text **and** visual analysis; longer PDFs and other documents are
  **text only**.
- Ground long-document answers with **quotes, page numbers, and "not found" permission**.
- With **code execution and file creation**, Claude builds real **Excel, Word, PowerPoint, and PDF**
  files in a **sandbox**.
- **Prompt injection** is the main file-and-web risk; turning network access off removes it.

# Flash Cards

Q: What are the chat upload limits for files?
A: As of writing, up to 500 MB per file, 20 files per chat, images up to 8000×8000 pixels, and PDFs up to 1000 pages.

Q: When does Claude analyze a PDF's charts and images, not just its text?
A: When the PDF has 100 pages or fewer. Longer PDFs are processed as text only.

Q: Can Claude read images embedded in a Word document?
A: No. For non-PDF documents it extracts only the text.

Q: Which setting lets Claude create Excel, Word, PowerPoint, and PDF files?
A: Code execution and file creation (Settings > Capabilities).

Q: Where does Claude's code run when it creates files?
A: In an isolated, sandboxed container that's separate from your systems.

Q: What's the main risk of letting the sandbox reach the internet, and how do you remove it?
A: Prompt injection from malicious content; disabling network access eliminates that risk.

# Exercises

### Easy
Upload a screenshot of a chart or table and ask Claude to describe the main trend and list the exact
values it can read. Check them against the image.

### Medium
Upload a document of 20+ pages and ask a question using the quote-first pattern with page numbers.
Verify three of the quotes against the original. Did any page numbers differ from the printed ones?

### Challenging
Give Claude a raw CSV (export one from any app, or ask Claude to generate realistic sample data) and
have it build an Excel workbook with a cleaned data sheet, formula-driven summary, and a chart. Open
the file, inspect the formulas, and write a short note on one thing you'd change before sharing it.

# Further Reading

- Claude Help Center — *Upload files to Claude*:
  <https://support.claude.com/en/articles/8241126-upload-files-to-claude>
- Claude Help Center — *Create and edit files with Claude*:
  <https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude>
- Anthropic — *Prompting best practices* (long-context prompting):
  <https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices>
- Anthropic — *Reduce hallucinations*:
  <https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations>
