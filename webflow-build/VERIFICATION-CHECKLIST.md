# Verification Checklist for braun-selector.js v3

## 1. Container Finding ✅
- Line 19: `document.querySelector('.webflow-page')` — correct for Brand Store
- Line 23: Fallback tries `window.parent.document` — handles edge case
- Line 28: Fallback to `.page-wrapper` — handles direct Webflow publish
- Line 31: Last resort `document.body` — always works

## 2. Content Removal ✅
- Line 36: `container.innerHTML = ''` — nukes ALL Webflow HTML
- This eliminates the gold CTA issue entirely (the element is gone)

## 3. Style Injection ✅
- Line 80: `container.ownerDocument` — injects styles into same document as container
- Line 83: Removes previous style if exists (prevents duplicates on re-render)
- All styles use `!important` — overrides any inherited Amazon/Webflow CSS
- All classes prefixed `bps-` — zero conflict with Webflow class names

## 4. No Template Literals ✅
- All HTML uses string concatenation (`+`) not backticks
- Safe for all JS environments including older Brand Store contexts

## 5. No getElementById ✅
- Previous version used `doc.getElementById('bps-start')` which could fail
- This version uses EVENT DELEGATION — one listener on the app div
- Uses `data-*` attributes to identify clickable elements
- Walks up the DOM tree from click target to find the action

## 6. Event Delegation Logic ✅
- `data-action="start"` → advances to gender step
- `data-gender="Men/Women"` → sets gender, advances to breathing
- `data-category="..."` → sets category, advances to results
- `data-tier-index="0/1/2"` → switches tier tab
- `data-action="back"` → goes back to categories
- `data-action="reset"` → resets to hero

## 7. Render Cycle ✅
- `render()` clears container, creates fresh `.bps-app` div
- Appends to container
- Binds events AFTER DOM is in place (no setTimeout needed)

## 8. Potential Issues Found:

### ISSUE A: `data-tier-index` check
Line 393: `el.getAttribute('data-tier-index') !== null && el.getAttribute('data-tier-index') !== undefined`
- `getAttribute` returns `null` if attribute doesn't exist, never `undefined`
- But this is fine — if attribute doesn't exist, it returns null, condition fails
- If attribute exists with value "0", it returns "0" which is truthy... wait.
- Actually `"0" !== null` is true and `"0" !== undefined` is true, so it passes ✅
- But what about elements WITHOUT this attribute? getAttribute returns null.
- `null !== null` is FALSE — so the condition correctly skips. ✅

### ISSUE B: forEach on products array
Line 302: `['Premium','Mid-Range','Entry'].forEach(...)` — Array.forEach is ES5, supported everywhere ✅
Line 304: `products.filter(...)` — Array.filter is ES5 ✅

### ISSUE C: Breathing auto-advance
Line 378: setTimeout advances from breathing to categories after 2.5s
- Checks `state.step === 'breathing'` before advancing — prevents double-fire ✅
- But if user clicks back quickly, the timeout could fire after they've moved. The check prevents this. ✅

### ISSUE D: `<` character in JavaScript
Brand Store custom code rule: no literal `<` outside HTML tags.
BUT — this script is loaded as an EXTERNAL file (via script src), NOT inline.
External scripts don't have the `<` restriction — that only applies to inline scripts in the custom code block. ✅

### ISSUE E: Script size
File is 32KB. Brand Store inline limit is 2000 chars.
BUT — this is an EXTERNAL file uploaded to S3/Harmony, loaded via `<script src>`. No size limit. ✅

### ISSUE F: ownerDoc.createElement
Line 291: `var app = ownerDoc.createElement('div')`
- Creates element in the same document as the container
- Appends to container which is in that document
- All good ✅

## 9. CSS Verification:

### Hero CTA: 
`.bps-cta { background:#ffffff!important; color:#111111!important; border-radius:9999px!important }`
- WHITE background, not gold ✅
- The Amazon Add to Cart buttons on product cards correctly use `#FFD814` (gold) ✅

### All sections render:
- Hero: always renders first ✅
- Gender: renders on `data-action="start"` click ✅  
- Breathing: renders on gender click, auto-advances after 2.5s ✅
- Categories: renders after breathing ✅
- Results: renders on category click ✅

## 10. FINAL VERDICT: READY TO UPLOAD ✅

No issues found that would cause:
- Gold CTA (Webflow HTML is nuked)
- White screen (event delegation works without getElementById)
- Missing copy (all text is in the HTML generators)
- Style conflicts (all !important, all bps- prefixed)
