# Braun AU — Product Selector Wireframe Prototype

## Overview
- **Type**: Single Page Application (React + Vite + TypeScript)
- **Styling**: Tailwind CSS v4 (utility-first, no custom CSS resets needed)
- **UI Libraries**: lucide-react (icons)
- **Dev Server**: Vite with HMR (auto-reloads on save)

## Project Context
- **Client:** Procter & Gamble (Braun)
- **Market:** Amazon AU
- **Deliverable:** Interactive product selector wireframe for Brand Store
- **Concept:** "Scroll-to-Discover" — one continuous scroll experience with soft interactions

## Architecture
- Entry point: `src/main.tsx`
- Root component: `src/App.tsx`
- Global styles: `src/index.css` (Tailwind import + keyframe animations)

## Design Concept: Scroll-to-Discover

The experience is a streamlined two-decision flow:
1. **Range selection** — "I'm looking for..." → Men's Grooming / Women's Care (immersive split-screen)
2. **Category selection** — chapters that expand on tap to reveal tabbed product showcase

After those two choices, the experience becomes a **tabbed product showcase** where each tier is a tab:
- Premium | Mid-Range | Entry | Compare
- Each tab shows: headline, "This is for you if...", RTBs, specs, product cards
- Compare tab shows side-by-side table + all products

The products sell themselves through content. No "pick a budget" step. No filler between decisions.

## Flow (Current)
```
Hero → Gender Split → [auto-scroll] → Category Selection → Tabbed Showcase
```

**Key principle:** Two screens. Two decisions. No filler between them.
- No transition prompt (killed — was a dead stop)
- No breathing moment between decisions (killed — moved brand proof into showcase header)
- Gender selection auto-advances to categories after the split animation

## File Structure
```
src/
  components/
    AmazonHeader.tsx          # Amazon Brand Store chrome
    AmazonFooter.tsx          # Amazon footer
    DesignerHint.tsx          # Blue dashed annotation (supports inline + fixed positions)
    AccessibilityHint.tsx     # Teal dashed annotation
    EdgeCaseViewer.tsx        # Fixed bottom-left panel
    ProductCard.tsx           # Shared product card (legacy, kept for reference)
    ScrollExperience/
      index.tsx               # Main orchestrator (lean — no transition/breathing)
      HeroSection.tsx         # Opening brand moment (dark, animated)
      GenderReveal.tsx        # "I'm looking for..." split-screen selection
      CategoryChapters.tsx    # Expandable category list — showcase renders INSIDE
      ProductShowcase.tsx     # Tabbed tier comparison (Premium/Mid/Entry/Compare)
      ProgressBar.tsx         # Fixed nav — visible on category phase, hidden on showcase
      TransitionPrompt.tsx    # UNUSED (kept for reference, not imported)
      BreathingMoment.tsx     # UNUSED (kept for reference, not imported)
    ProductLogic/
      index.tsx               # Decision tree (internal view)
  data/
    products.ts               # 21 typed products from CSV
  hooks/
    useScrollSelector.ts      # State: phase, selections, localStorage
    useInView.ts              # Intersection Observer hook
    useScrollProgress.ts      # Scroll progress (0-1) for a section
    useMouseParallax.ts       # Mouse-driven parallax transforms
    useProductSelector.ts     # Legacy hook (kept for ProductLogic)
```

## Current State

### Flow Detail
1. **Hero** — full-viewport dark section, animated typography, "Begin" CTA
   - Copy: "Precision, tailored to you." / "Two choices. One perfect recommendation."
2. **Gender Split** — "I'm looking for..." with Men's Grooming / Women's Care
   - Full-screen split, hover expands one side, click auto-advances
   - Labels positioned in lower third to avoid collision with question text at top
3. **Category Chapters** — each category as a tappable chapter card
   - On selection: other cards collapse, selected stays as header, showcase expands below
   - No jump cut — content renders INSIDE the selected card
4. **Product Showcase** (tabbed) — expands in place with:
   - Inline nav bar (replaces hidden progress bar): "Change category" / "Start over"
   - Tabs: Premium | Mid-Range | Entry | Compare
   - Each tier tab: headline, "This is for you if...", RTBs, specs, product cards
   - Compare tab: side-by-side table + all products grid
   - Brand credibility line in header: "100+ years of German engineering"
   - Bottom CTA: "Choose a different category" / "Start completely over"

### Navigation Architecture
- **Progress bar** (fixed top): visible only during category selection phase
- **Showcase inline nav** (sticky top): visible during showcase phase — has "Change category" + "Start over"
- **Breadcrumb chips** (desktop): editable previous answers in progress bar
- **Bottom CTAs**: always present at end of showcase content
- **Category card header**: selected category stays visible as context anchor

### Key Design Decisions
- **No tiles/cards for questions** — interactions use scroll-reveals and expanding elements
- **No budget/tier question** — replaced with tabbed product education
- **Tabs not scroll** — tiers are alternatives (pick one), not a sequence (read all)
- **Category selection is soft** — tap a chapter to expand, not a hard filter step
- **Products sell themselves** — RTBs, specs, and positioning do the work
- **"View on Amazon" is primary CTA** — this tool recommends, doesn't sell
- **No filler between decisions** — killed transition prompt and breathing moment
- **Progress bar hides during showcase** — tabs provide enough context, avoids chrome stacking
- Amazon yellow uses `bg-[#ffd814]`
- Grayscale wireframe palette throughout
- IMG placeholder pattern for product images

## Product Data
- 21 SKUs across 6 categories
- Categories: Electric Shaver (9), Beard Trimmer (2), Multi Groomer (4), Body Groomer (1), IPL Hair Removal (3), Facial Care (2)
- Tiers: Premium, Mid-Range, Entry
- Each product has: asin, name, category, tier, series, gender, features[], priceRange

## Language Decisions
- Gender question: "I'm looking for..." (not "Who are you shopping for?")
- Options: "Men's Grooming" / "Women's Care" (product ranges, not people)
- Back labels: "Change range" / "Change category" (contextual, not generic)
- Hero: "Two choices. One perfect recommendation." (accurate promise)
