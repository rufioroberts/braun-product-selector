# Braun Product Selector — Webflow Build Guide

## Overview

Single-page experience. All sections stacked vertically, JS controls visibility and transitions. Product cards use TEX components (data-tina attributes) for live Amazon data.

---

## File Structure

```
webflow-build/
├── README.md              ← You're here (build guide)
├── braun-selector.js      ← Main JS file (upload to Webflow)
├── gsap.min.js            ← GSAP core (upload to Webflow)
└── structure.md           ← Detailed section/class breakdown
```

---

## Setup Steps

### 1. Upload JS Files

Upload both `gsap.min.js` and `braun-selector.js` via the Webflow file upload interface. You'll get hosted URLs for each.

### 2. Add Script References

In Page Settings → Custom Code → Before </body>:

```html
<script src="[your-gsap-url]"></script>
<script src="[your-braun-selector-url]"></script>
```

GSAP must load first.

### 3. Build the Page Structure

Follow `structure.md` for exact class names and nesting. The JS targets these classes directly.

### 4. Middleware Code

Ensure the Middleware Code component is a direct child of `<body>` after `page-wrapper`. This activates TEX product components.

---

## How It Works

1. Page loads → only `bps-hero` section visible
2. User clicks "Find my match" → hero fades out, `bps-gender` fades in
3. User picks gender → gender fades out, `bps-category` fades in (filtered options)
4. User picks category → category fades out, `bps-precision` fades in (tier question)
5. User picks tier → precision fades out, `bps-reveal` plays animation
6. Reveal completes → `bps-results` fades in with filtered TEX ProductCards

Back/reset navigation available at every step.

---

## Metrics

The JS fires BilWebflow metrics at each step:
- `BraunSelector_Hero_FindMatch_Click`
- `BraunSelector_Gender_[Men|Women]_Click`
- `BraunSelector_Category_[CategoryName]_Click`
- `BraunSelector_Precision_[Tier]_Click`
- `BraunSelector_Results_ProductCard_Click`
- `BraunSelector_Results_StartOver_Click`

---

## Important Notes

- No `<` characters in any inline code embeds (use `\u003C`)
- No DOMContentLoaded — direct invocation
- Safe document selector pattern used (iframe-safe)
- All animations via GSAP (self-hosted, not CDN)
- Product cards are TEX components — they auto-hydrate with real Amazon data
- Class names use `bps-` prefix (Braun Product Selector) to avoid conflicts
