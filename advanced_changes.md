# Advanced Changes to the Documentation Website

This guide explains how to adjust the website behavior and configuration. It is written for engineers with no web development background — follow the steps carefully.

---

## 📋 Table of Contents

1. [Project Structure](#1-project-structure)
2. [Changing the Sidebar](#2-changing-the-sidebar)
3. [Changing the Website Title, Logo, and Links](#3-changing-the-website-title-logo-and-links)
4. [Adding Images](#4-adding-images)
5. [Adding a New Top-Level Page](#5-adding-a-new-top-level-page)
6. [Theme & Styling](#6-theme--styling)
7. [Adding Plugins](#7-adding-plugins-optional)
8. [Best Practices](#8-best-practices)
9. [Summary Cheat Sheet](#9-summary-cheat-sheet)

---

## 1. Project Structure

The repo has a few important files/folders:

```
aero-open-docs/
├── docs/                     ← Documentation content (Markdown files)
├── docusaurus.config.js      ← Main website configuration (title, logo, navbar, footer)
├── sidebars.js               ← Defines the sidebar navigation
├── src/                      ← Custom pages or components
│   └── pages/                ← React pages (rarely touched)
├── static/                   ← Images and static assets
└── package.json              ← Dependencies and scripts
```

### 🔧 Files You Will Mostly Edit

- **`docusaurus.config.js`** → Global website settings
- **`sidebars.js`** → Sidebar navigation order/structure
- **`static/`** → Images (logos, icons, etc.)

---

## 2. Changing the Sidebar

The sidebar is controlled by `sidebars.js`.

### Example Snippet

```javascript
module.exports = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Hand Setup',
      items: ['usage', 'calibration'],
    },
  ],
};
```

### How It Works

- `'intro'` → corresponds to `docs/intro.md`
- **Category "Hand Setup"** will show pages `usage.md` and `calibration.md`

### To Add a New Page

1. **Add a Markdown file** in `docs/` (e.g., `my-feature.md`)
2. **Edit `sidebars.js`** and add `'my-feature'` to the right place
3. **Run `npm run start`** to confirm the sidebar updates

---

## 3. Changing the Website Title, Logo, and Links

All global settings live in `docusaurus.config.js`.

### Example Configuration

```javascript
const config = {
  title: 'Aero Hand Open Docs',
  favicon: 'img/favicon.ico',
  url: 'https://docs.tetheria.ai',
  baseUrl: '/',
  themeConfig: {
    navbar: {
      title: 'Chestnut Robotics',
      logo: { src: 'img/logo.svg' },
      items: [
        { to: '/docs/intro', label: 'Docs', position: 'left' },
        { href: 'https://github.com/chestnut-robotics/aero-open-docs', label: 'GitHub', position: 'right' },
      ],
    },
  },
};
```

### Common Edits

| Change | Location |
|--------|----------|
| **Change the site title** | `title: 'Aero Hand Open Docs'` |
| **Change the navbar items** | `edit navbar.items[]` |
| **Change the footer links** | `themeConfig.footer` section |

📂 **Logos/images go in `static/img/`.**

---

## 4. Adding Images

### Step 1: Place Images
Put images in the `static/img/` folder.

### Step 2: Reference in Markdown

```markdown
![My Diagram](../static/img/my-diagram.png)
```

### Step 3: Reference in Config

```javascript
logo: { src: 'img/logo.svg' }
```

---

## 5. Adding a New Top-Level Page

### Steps

1. **Inside `src/pages/`**, create a file like `team.md`
2. **Add content** in Markdown
3. **Visit** `http://localhost:3000/team` → page loads automatically

⚠️ **Use sparingly** — most content should stay in `docs/`.

---

## 6. Theme & Styling

Docusaurus uses a theme system. Simple changes can be made without CSS knowledge:

- **Dark/light mode toggle** is built-in
- **To override styles**: add files under `src/css/custom.css`

### Example: Change Link Color

```css
a {
  color: #0070f3;
}
```

---

## 7. Adding Plugins (Optional)

Plugins extend functionality. They are listed in `docusaurus.config.js`.

### Example: Google Analytics Plugin

```javascript
plugins: [
  [
    '@docusaurus/plugin-google-gtag',
    {
      trackingID: 'G-XXXXXXXXXX',
    },
  ],
];
```

### Install New Plugins

```bash
npm install <plugin-name>
```

---

## 8. Best Practices

### ✅ Testing
- **Test locally** → always run `npm run start` before PR
- **Small changes only** → don't refactor deeply unless needed

### 📝 Commit Messages
- **Describe what you changed** (e.g., "Update sidebar", "Add footer link")
- **Preview in Netlify** → validate before merge

---

## 9. Summary Cheat Sheet

| Task | File to Edit |
|------|--------------|
| **Sidebar order** | `sidebars.js` |
| **Navbar/footer/title/logo** | `docusaurus.config.js` |
| **Images** | Put in `static/img/` |
| **New standalone page** | Add in `src/pages/` |
| **Theme tweaks** | `src/css/custom.css` |

---

## 🚀 Quick Reference Commands

```bash
# Start development server
npm run start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clear cache
npm run clear
```

---

