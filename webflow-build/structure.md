# Webflow Page Structure

Build this exactly in Webflow Designer. The JS targets these class names.

---

## Page Wrapper

```
body
├── div.page-wrapper
│   ├── section.bps-hero
│   ├── section.bps-gender
│   ├── section.bps-category
│   ├── section.bps-precision
│   ├── section.bps-reveal
│   └── section.bps-results
└── [Middleware Code component]
```

All sections except `.bps-hero` start with `display: none` (set in Webflow style panel).

---

## Section 1: Hero (.bps-hero)

```
section.bps-hero
└── div.bps-hero-content
    ├── p.bps-hero-eyebrow          → "QUEST FOR PRECISION"
    ├── h1.bps-hero-heading         → "Precision tailored to you"
    ├── p.bps-hero-subheading       → "Tell us what matters. We'll do the rest."
    └── a.bps-hero-cta              → "Find my match" (Link Block styled as button)
```

**Styles:**
- Section: min-height 100vh, display flex, align-items center, justify-content center, background #1a1a2e (dark navy), text white
- Content: text-align center, max-width 600px, padding 2rem
- Eyebrow: text-transform uppercase, letter-spacing 3px, font-size 0.75rem, opacity 0.7
- Heading: font-size 3rem (mobile 2rem), font-weight 300, line-height 1.2
- Subheading: font-size 1.125rem, opacity 0.8, margin-top 1rem
- CTA: margin-top 2.5rem, padding 1rem 2.5rem, border 1px solid white, border-radius 100px, font-size 0.875rem, text-transform uppercase, letter-spacing 1px

---

## Section 2: Gender (.bps-gender)

```
section.bps-gender
└── div.bps-gender-content
    ├── h2.bps-gender-heading       → "I'm shopping for..."
    └── div.bps-gender-options
        ├── button.bps-gender-option [data-gender="men"]
        │   ├── span.bps-option-label   → "Men's"
        │   └── span.bps-option-desc    → "Shavers, trimmers, groomers"
        └── button.bps-gender-option [data-gender="women"]
            ├── span.bps-option-label   → "Women's"
            └── span.bps-option-desc    → "IPL, facial care"
```

**Styles:**
- Section: min-height 100vh, display flex, align-items center, justify-content center, background white
- Content: text-align center, max-width 500px, padding 2rem
- Heading: font-size 1.75rem, font-weight 300, margin-bottom 2.5rem, color #1a1a2e
- Options container: display flex, flex-direction column, gap 1rem
- Option button: padding 1.5rem 2rem, border 1px solid #e5e5e5, border-radius 12px, background white, display flex, justify-content space-between, align-items center, cursor pointer, transition all 0.2s
- Option button hover: border-color #1a1a2e, box-shadow 0 2px 12px rgba(0,0,0,0.08)
- Label: font-size 1.25rem, font-weight 500, color #1a1a2e
- Desc: font-size 0.875rem, color #666

---

## Section 3: Category (.bps-category)

```
section.bps-category
├── div.bps-nav
│   ├── button.bps-nav-back         → "‹ Back"
│   ├── span.bps-nav-breadcrumb     → "Men's" (dynamic)
│   └── button.bps-nav-reset        → "Start over"
└── div.bps-category-content
    ├── div.bps-category-bridge
    │   └── h2.bps-category-heading  → "What are you trying to achieve?"
    └── div.bps-category-options
        ├── button.bps-category-option [data-category="Electric Shaver"]
        │   ├── div.bps-option-text
        │   │   ├── span.bps-option-label  → "The closest possible shave"
        │   │   └── span.bps-option-desc   → "Clean-shaven, smooth skin, no irritation."
        │   └── span.bps-option-arrow   → "›" (chevron)
        ├── button.bps-category-option [data-category="Beard Trimmer"]
        │   ├── div.bps-option-text
        │   │   ├── span.bps-option-label  → "Shape and maintain my beard"
        │   │   └── span.bps-option-desc   → "39 length settings. Define edges, maintain length."
        │   └── span.bps-option-arrow   → "›"
        ├── button.bps-category-option [data-category="Multi Groomer"]
        │   ├── div.bps-option-text
        │   │   ├── span.bps-option-label  → "One tool for everything"
        │   │   └── span.bps-option-desc   → "Face, beard, body, nose, ears. One device."
        │   └── span.bps-option-arrow   → "›"
        └── button.bps-category-option [data-category="Body Groomer"]
            ├── div.bps-option-text
            │   ├── span.bps-option-label  → "Below-the-neck grooming"
            │   └── span.bps-option-desc   → "Body hair management with skin protection."
            └── span.bps-option-arrow   → "›"
```

**Women's categories** (shown when gender = women):
- `data-category="IPL Hair Removal"` → "Long-term hair removal" / "Visible results in 4 weeks. Salon-smooth at home."
- `data-category="Facial Care"` → "Facial care and hair removal" / "Gentle removal, cleansing, toning."

**Styles:**
- Section: min-height 100vh, display flex, flex-direction column, background white
- Nav: display flex, justify-content space-between, align-items center, padding 0.75rem 1.5rem, border-bottom 1px solid #f0f0f0, position sticky, top 0, background white, z-index 10
- Nav back/reset: font-size 0.8rem, color #666, background none, border none, cursor pointer
- Nav breadcrumb: font-size 0.8rem, font-weight 500, color #1a1a2e
- Content: flex 1, display flex, flex-direction column, align-items center, justify-content center, padding 2rem 1.5rem
- Bridge: background #1a1a2e, color white, padding 1rem 1.5rem, border-radius 12px, text-align center, margin-bottom 2rem, width 100%
- Category heading: font-size 1.125rem, font-weight 500
- Options: display flex, flex-direction column, gap 0.75rem, width 100%, max-width 500px
- Option button: padding 1.25rem 1.5rem, border 1px solid #e8e8e8, border-radius 12px, background white, display flex, justify-content space-between, align-items center, cursor pointer, text-align left
- Option label: font-size 1.125rem, font-weight 600, color #1a1a2e
- Option desc: font-size 0.8rem, color #666, margin-top 0.25rem
- Option arrow: font-size 1.5rem, color #ccc, width 2rem, height 2rem, background #f5f5f5, border-radius 50%, display flex, align-items center, justify-content center

---

## Section 4: Precision (.bps-precision)

```
section.bps-precision
├── div.bps-nav
│   ├── button.bps-nav-back
│   ├── span.bps-nav-breadcrumb     → "Men's › Shavers" (dynamic)
│   └── button.bps-nav-reset
└── div.bps-precision-content
    ├── h2.bps-precision-heading    → "How much precision do you need?"
    └── div.bps-precision-options
        ├── button.bps-precision-option [data-tier="Premium"]
        │   ├── span.bps-option-label   → "Maximum precision"
        │   └── span.bps-option-desc    → "Latest technology. Best-in-class results."
        ├── button.bps-precision-option [data-tier="Mid-Range"]
        │   ├── span.bps-option-label   → "Great performance"
        │   └── span.bps-option-desc    → "Proven technology. Excellent daily results."
        └── button.bps-precision-option [data-tier="Entry"]
            ├── span.bps-option-label   → "Solid fundamentals"
            └── span.bps-option-desc    → "Reliable performance. Great value."
```

**Note:** Not all categories have all tiers. The JS will show/hide options based on available products.

**Styles:** Same as category section (reuse `.bps-nav`, similar option styling).
- Content: flex 1, display flex, flex-direction column, align-items center, justify-content center, padding 2rem
- Heading: font-size 1.5rem, font-weight 300, margin-bottom 2rem, color #1a1a2e
- Options: same as category options

---

## Section 5: Reveal (.bps-reveal)

```
section.bps-reveal
└── div.bps-reveal-content
    ├── div.bps-reveal-icon         → "✓" (checkmark, animated)
    ├── h2.bps-reveal-heading       → "Your match is ready"
    ├── p.bps-reveal-subheading     → "Precision tailored to you"
    └── p.bps-reveal-proof          → "100+ YEARS OF GERMAN ENGINEERING"
```

**Styles:**
- Section: min-height 100vh, display flex, align-items center, justify-content center, background #1a1a2e, color white
- Content: text-align center, max-width 400px
- Icon: width 4rem, height 4rem, border-radius 50%, border 2px solid white, display flex, align-items center, justify-content center, font-size 1.5rem, margin 0 auto 1.5rem
- Heading: font-size 1.75rem, font-weight 300
- Subheading: font-size 1rem, opacity 0.7, margin-top 0.5rem
- Proof: font-size 0.7rem, text-transform uppercase, letter-spacing 2px, opacity 0.5, margin-top 2rem

The JS animates these elements in sequence (icon → heading → subheading → proof), then auto-transitions to results after 2.5s.

---

## Section 6: Results (.bps-results)

```
section.bps-results
├── div.bps-results-nav
│   ├── span.bps-results-breadcrumb → "Men's › Shavers › Premium" (dynamic)
│   └── button.bps-results-reset    → "Start over"
└── div.bps-results-content
    ├── div.bps-results-header
    │   ├── h2.bps-results-heading  → "Your matches" (dynamic count)
    │   └── p.bps-results-subtitle  → "Based on your preferences"
    ├── div.bps-results-grid        → TEX ProductCard components go here (JS injects)
    └── div.bps-results-footer
        ├── p.bps-results-proof     → "Built to last · Engineered for 7+ years of daily use"
        └── button.bps-results-restart → "Start over"
```

**Styles:**
- Section: min-height 100vh, background white, padding 2rem 1.5rem
- Nav: display flex, justify-content space-between, align-items center, padding-bottom 1rem, border-bottom 1px solid #f0f0f0, margin-bottom 2rem
- Breadcrumb: font-size 0.75rem, color #666
- Reset: font-size 0.75rem, color #666, background none, border none
- Header: text-align center, margin-bottom 2rem
- Heading: font-size 1.5rem, font-weight 300, color #1a1a2e
- Subtitle: font-size 0.875rem, color #666
- Grid: display flex, flex-wrap wrap, gap 1.5rem, justify-content center
- Footer: text-align center, margin-top 3rem, padding-top 2rem, border-top 1px solid #f0f0f0
- Proof: font-size 0.75rem, text-transform uppercase, letter-spacing 1px, color #666
- Restart: margin-top 1rem, font-size 0.8rem, color #1a1a2e, text-decoration underline, background none, border none

**Product Cards in Results Grid:**

The JS dynamically creates TEX product card divs based on the filtered ASINs. Each card structure:

```
div.bps-product-card
├── div [data-tina-component="ProductImage"] [data-tina-asin="B0CKSYY3TD"]
├── div [data-tina-component="Title"] [data-tina-asin="B0CKSYY3TD"] [data-tina-text-align="center"]
├── div [data-tina-component="AverageCustomerReviews"] [data-tina-asin="B0CKSYY3TD"] [data-tina-size="sm"]
├── div [data-tina-component="Price"] [data-tina-asin="B0CKSYY3TD"] [data-tina-show-sale-price="true"]
└── div [data-tina-component="AddToCart"] [data-tina-asin="B0CKSYY3TD"]
```

**Card styles:**
- Card: width 280px (mobile: 100%), padding 1.5rem, border 1px solid #e8e8e8, border-radius 12px, display flex, flex-direction column, gap 0.75rem, align-items center

---

## Responsive Notes

**Desktop (base):**
- Hero heading: 3rem
- Options max-width: 500px
- Results grid: 2-3 cards per row

**Tablet (max-width: 991px):**
- Hero heading: 2.5rem
- Results grid: 2 cards per row

**Mobile Portrait (max-width: 479px):**
- Hero heading: 2rem
- Options: full width with padding
- Results grid: 1 card per row (card width 100%)
- All sections: padding 1.5rem

---

## Custom Attributes Summary

These data attributes are required for the JS to work:

| Element | Attribute | Values |
|---|---|---|
| Gender buttons | `data-gender` | `men`, `women` |
| Category buttons | `data-category` | `Electric Shaver`, `Beard Trimmer`, `Multi Groomer`, `Body Groomer`, `IPL Hair Removal`, `Facial Care` |
| Precision buttons | `data-tier` | `Premium`, `Mid-Range`, `Entry` |

Set these as custom attributes in Webflow's element settings panel.
