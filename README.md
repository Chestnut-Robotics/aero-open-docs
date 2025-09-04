# Open Hand Documentation

This repository contains the source code for the TetherIA Open Hand documentation website, built with [Docusaurus](https://docusaurus.io/) and deployed automatically with [Netlify](https://netlify.com/).

The site is live at: **[https://docs.tetheria.ai](https://docs.tetheria.ai)**

---

## 📋 Table of Contents

1. [Getting Started](#1-getting-started)
2. [Preview the Website Locally](#2-preview-the-website-locally)
3. [Making Changes to the Documentation](#3-making-changes-to-the-documentation)
4. [Submitting Changes (Pull Requests)](#4-submitting-changes-pull-requests)
5. [Validating with Netlify Preview](#5-validating-with-netlify-preview)
6. [Deployment](#6-deployment)
7. [Summary Workflow](#summary-workflow)

---

## 1. Getting Started

### Prerequisites

You only need to install Node.js and npm once.

#### Install Node.js (v18 or later)

- **Download from:** [nodejs.org](https://nodejs.org/)
- **On Mac with Homebrew:** `brew install node`

#### Verify installation:

```bash
node -v
npm -v
```

✅ **You should see version numbers.**

### Install Dependencies

Clone the repo and install:

```bash
git clone https://github.com/TetherIA/open-hand-doc.git
cd open-hand-doc
npm install
```

📸 **Example terminal output:**

---

## 2. Preview the Website Locally

Run the development server:

```bash
npm run start
```

Then open **[http://localhost:3000/](http://localhost:3000/)** in your browser.

The page will update automatically when you edit files.

📸 **Example local preview:**

---

## 3. Making Changes to the Documentation

Most edits are just Markdown files inside the `docs/` folder.

### 📂 Folder Structure

```
open-hand-doc/
├── docs/            ← main documentation files
│   ├── intro.md
│   ├── usage.md
│   └── my-new-page.md
├── docusaurus.config.js
├── package.json
└── README.md
```

### Steps to Add or Edit Docs

1. Open the `docs/` folder
2. Duplicate an existing file or edit one
3. Save changes

### Markdown Basics (for Non-Coders)

| Markdown | Result |
|----------|--------|
| `# Title` | Large title |
| `## Subtitle` | Section heading |
| `- item` | Bullet list |
| `[text](https://example.com)` | Link |
| `![caption](images/example.png)` | Image |

📸 **Editing example:**

---

## 4. Submitting Changes (Pull Requests)

### Create a New Branch

```bash
git checkout -b user/yourname/my-change
```

### Save & Commit

```bash
git add .
git commit -m "Added new documentation page"
git push origin user/yourname/my-change
```

### Open Pull Request

1. Go to GitHub
2. Click **"Compare & pull request"**

📸 **GitHub PR button:**

🔒 **Note:** One reviewer must approve before merge.

---

## 5. Validating with Netlify Preview

When you create a PR, Netlify builds a preview site.

📸 **Example (your screenshot):**

✅ Shows **"Deploy Preview ready"**

🔗 **Link to preview site** (e.g., `https://deploy-preview-2--openhandlite.netlify.app`)

🔍 **Link to deploy logs**

👉 **Click the preview link** to check your changes before merging.

---

## 6. Deployment

After PR is approved and merged to `main`:

- Netlify deploys automatically
- Visit **[https://docs.tetheria.ai](https://docs.tetheria.ai)** to see updates
- Usually takes 1–2 minutes

📸 **Deployed site example:**

---

## Summary Workflow

### Visual Workflow

```
Clone repo → npm install
     ↓
Preview site → npm run start
     ↓
Edit docs/*.md
     ↓
Push & open PR → get approval
     ↓
Check Netlify preview → confirm
     ↓
Merge → site updates live
```

---