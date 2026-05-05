# Braun AU — Quest for Precision Product Selector

## Overview
- **Type**: Single Page Application (React + Vite + TypeScript)
- **Styling**: Tailwind CSS v4 (utility-first, no custom CSS resets needed)
- **UI Libraries**: lucide-react (icons)
- **Dev Server**: Vite with HMR (auto-reloads on save)
- **Deployment**: GitHub Pages via GitHub Actions (auto-deploys on push to main)
- **Staging URL**: https://rufioroberts.github.io/braun-product-selector/
- **Repo**: https://github.com/rufioroberts/braun-product-selector

## Deployment Notes
- GitHub Pages is set to deploy via **GitHub Actions** (not branch)
- Workflow file: `.github/workflows/deploy.yml`
- Uses Node 22, `npm install --registry https://registry.npmjs.org/`
- **IMPORTANT**: No `package-lock.json` in repo (deleted to avoid auth token issues from local Amazon npm config)
- **IMPORTANT**: `.npmrc` is in `.gitignore` — never commit local npm auth configs
- Vite `base` is set to `/braun-product-selector/` for GitHub Pages path
- To deploy: just `git push` to main — workflow auto-triggers
- Build command: `npm run build` (runs `tsc -b && vite build`)
- **TypeScript strict mode**: Build will fail on unused variables/imports — always run `npx vite build` locally before pushing

## Git Workflow
```bash
cd /Users/robsmat/Documents/Smith/braun-product-selector
git add .
git commit -m "your message"
git push
```
That's it. GitHub Actions handles the rest.

## Project Context
- **Client:** Procter & Gamble (Braun)
- **Market:** Amazon AU
- **Deliverable:** Interactive product selector wireframe for Brand Store
- **Campaign:** "Quest for Precision"
- **Concept:** Gamified match-finder — a quest that leads to a personalized product reveal

## Architecture
- Entry point: `src/main.tsx`
- Root component: `src/App.tsx`
- Global styles: `src/index.css` (Tailwind import + keyframe animations)

## Design Concept: Quest for Precision

The experience is a **gamified quest** that makes the user feel like they're being personally matched to a product — not just filtering a catalog.

### Flow (Current — Rebuilt)
```
Hero → Gender Selection → Transition Bridge → Category Goals → Precision Question → Match Reveal → Product Showcase
```

### Steps:
1. **Hero** — "Your Quest for Precision Starts Here" — sets up the journey metaphor
2. **Gender Selection** — "I'm looking for..." → Men's Grooming / Women's Care (dark split-screen)
3. **Transition Bridge** — acknowledges choice ("Men's grooming — got it"), gradient from dark to light, asks "What are you trying to achieve?"
4. **Category Goals** — goal-framed options (not catalog items): "The closest possible shave", "Shape and define my beard", etc.
5. **Precision Question** — "What matters most to you?" — maps to tiers without saying "pick a budget"
6. **Match Reveal** — animated reveal moment: "Finding your precision match..." → "Your Precision Match"
7. **Product Showcase** — tabbed tier view with matched tier highlighted, user-centric language, longevity badges on premium

### Key Design Principles
- **Quest framing** — every step feels like progress toward a personal discovery
- **User-centric language** — "Your closest shave" not "The closest shave we make"
- **Micro-rewards** — acknowledgement after each choice ("Got it", checkmarks, pulses)
- **Reveal moment** — dedicated beat between questions and results creates anticipation
- **Investment justification** — premium products get "Built to last" / longevity badges
- **No budget question** — precision question maps to tiers through aspirational language

## File Structure
```
src/
  components/
    AmazonHeader.tsx          # Amazon Brand Store chrome
    AmazonFooter.tsx          # Amazon footer
    DesignerHint.tsx          # Blue dashed annotation
    AccessibilityHint.tsx     # Teal dashed annotation
    EdgeCaseViewer.tsx        # Fixed bottom-left panel
    ProductCard.tsx           # Shared product card (legacy)
    ScrollExperience/
      index.tsx               # Main orchestrator — wires all phases together
      HeroSection.tsx         # "Your Quest for Precision" opening
      GenderReveal.tsx        # Split-screen gender selection
      TransitionBridge (in index.tsx) # Dark-to-light gradient bridge after gender
      CategoryChapters.tsx    # Goal-framed category selection
      PrecisionQuestion.tsx   # "What matters most?" — maps to tiers
      MatchReveal.tsx         # Animated reveal moment
      ProductShowcase.tsx     # Tabbed product display with matched tier
      ProgressBar.tsx         # Step progress indicator
      TransitionPrompt.tsx    # UNUSED (kept for reference)
      BreathingMoment.tsx     # UNUSED (kept for reference)
    ProductLogic/
      index.tsx               # Decision tree (internal view)
  data/
    products.ts               # 21 typed products from CSV
  hooks/
    useScrollSelector.ts      # State: phase (hero/gender/category/precision/reveal/showcase)
    useInView.ts              # Intersection Observer hook
    useScrollProgress.ts      # Scroll progress (0-1) for a section
    useMouseParallax.ts       # Mouse-driven parallax transforms
    useProductSelector.ts     # Legacy hook (kept for ProductLogic)
```

## State Management (useScrollSelector)

Phases: `hero` → `gender` → `category` → `precision` → `reveal` → `showcase`

Selections stored:
- `gender`: 'mens' | 'womens'
- `category`: string (e.g., 'Electric Shaver')
- `precision`: 'premium' | 'mid' | 'entry' (mapped from aspirational question)

Persists to localStorage for session continuity.

## Product Data
- 21 SKUs across 6 categories
- Categories: Electric Shaver (9), Beard Trimmer (2), Multi Groomer (4), Body Groomer (1), IPL Hair Removal (3), Facial Care (2)
- Tiers: Premium, Mid-Range, Entry
- Each product has: asin, name, category, tier, series, gender, features[], priceRange

## Brief Alignment

| Brief Requirement | Implementation |
|---|---|
| "Gamified element" | Quest framing + precision question + reveal moment |
| "Find their perfect match" | Dedicated match reveal screen |
| "Precision tailored to you" | All user-centric language throughout |
| "Decision fatigue solved" | Progressive disclosure, never see all 21 |
| "Premium feels rewarding" | Investment/longevity framing on premium tier |
| "Longevity of Braun" | "Built to last" badges on premium products |
| "Quest for Precision" campaign | Hero framing, journey language throughout |
| "Add to cart" | Yellow CTA on every product tile |

## Language Decisions
- Hero: "Your Quest for Precision Starts Here"
- Gender question: "I'm looking for..." (not "Who are you shopping for?")
- Options: "Men's Grooming" / "Women's Care" (product ranges, not people)
- Categories framed as goals: "The closest possible shave" not "Electric Shavers"
- Precision question: aspirational language maps to tiers without mentioning budget
- Results: "Your precision match" / "Matched to your routine"
- Premium badges: "Built to last" / "Best long-term value"
- Amazon yellow: `bg-[#ffd814]`
