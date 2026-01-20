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
8. [Advanced Configuration](#8-advanced-configuration)

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

## 8. Advanced Configuration

For more advanced changes to the website configuration, styling, and functionality, see our **[Advanced Changes Guide](advanced_changes.md)**.

This guide covers:
- 🔧 **Project structure** and file organization
- 📋 **Sidebar navigation** customization
- 🎨 **Website branding** (title, logo, links)
- 🖼️ **Image management** and optimization
- 🎭 **Theme and styling** modifications
- 🔌 **Plugin configuration** and extensions
- ✅ **Best practices** for development workflow

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


## Motor Torque and Temperature Protection Behavior

Motor overheating occurs only under specific operating conditions and is handled through built-in motor safeguards as well as additional firmware-level protections. This section explains when overheating may happen, how the system responds, and how to operate the hand safely and effectively.

---

### When overheating can occur
- Motor overheating (motor temperature exceeding 80 °C) occurs only when the motors are continuously stalled at high torque - for example, applying maximum grasp force to an object for an extended period without motion.
- Overheating does not occur during typical use cases such as pick-and-place, manipulation, or transient grasps, even when using high torque values. Continuous full-force stall conditions are required to trigger overheating.

---

### What happens during overheating
- When the motor temperature exceeds 80 °C, the motor’s built-in temperature protection is triggered.
- Once this protection is active, the motors temporarily stop accepting commands until the temperature drops below 80 °C.
- During the cooldown phase, you may observe unexpected behaviors such as the hand resetting to an open position or pending commands being discarded. This behavior is expected and is part of the motor’s self-protection mechanism.
- This overheating protection is a built-in motor feature and cannot be modified or disabled.

---

### Measured stall-duration limits (experimental results)
Based on internal testing under continuous stall conditions:
- Torque = 1000 → ~20 seconds to reach 80 °C
- Torque = 700 (default) → ~2–3 minutes
- Torque = 500 → more than 15 minutes
These durations apply only when the hand is holding an object at full force without motion.

---

### Active temperature protection (firmware-level prevention mechanism)
- To prevent the motors from reaching the critical temperature limit, the firmware automatically intervenes when the motor temperature reaches 50 °C.
- At this point, the maximum allowable torque is reduced from 1000 to 200.
- The motors continue to accept normal position, speed, and torque commands; however, the effective torque output during execution is capped at 200 to limit further heat buildup.
- This prevention mechanism is implemented at the firmware level and can be modified by users as needed.

---

### Torque range and recommended settings
- The motors support a torque command range from 0 to 1000.
- The firmware default torque value is 700, which provides a good balance between grasp strength, thermal stability, and continuous operation time.
- We recommend using the default torque value of 700 for most applications to reduce the likelihood of temperature-related interruptions while maintaining strong grasp performance.
- Motor torque can be controlled via the SDK in both position control mode and torque control mode. For examples, see:
     https://github.com/TetherIA/aero-hand-open/tree/main/sdk/examples
- Advanced users may freely adjust the default torque value and firmware-level temperature protection, with the understanding that doing so increases the risk of motor overheating.