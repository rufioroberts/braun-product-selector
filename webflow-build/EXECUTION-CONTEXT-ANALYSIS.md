# Brand Store Execution Context Analysis

## How the Brand Store custom code works (from user's code):

1. The Brand Store page has an iframe containing the custom code
2. `window.frameElement` = the iframe element itself
3. `dom_el = window.frameElement.parentElement` = the parent of the iframe in the PARENT document
4. HTML is fetched and injected into a `div.webflow-page` container appended to `dom_el`
5. External scripts are loaded by:
   ```js
   const script = doc.createElement('script');
   script.src = src;
   window.parent.document.body.appendChild(script);
   ```
6. Embedded scripts are loaded by:
   ```js
   const script = document.createElement('script');
   script.textContent = code;
   window.parent.document.body.appendChild(script);
   ```

## Key insight: When braun-selector.js runs:

- It was loaded via `loadScript(src)` which creates a `<script>` element and appends it to `window.parent.document.body`
- Therefore, when braun-selector.js executes, its execution context is the PARENT document
- `document` inside braun-selector.js = `window.parent.document` (the Amazon page)
- `document.querySelector('.webflow-page')` should find the injected container

## The ACTUAL DOM structure in the parent document:

```
window.parent.document.body
├── ... (Amazon Brand Store stuff, hidden by first script)
├── .stores-container
│   └── [some wrapper]
│       └── iframe (contains the custom code)
│           └── parentElement (dom_el)
│               ├── <link> (normalize.css)
│               ├── <link> (webflow.css)
│               ├── <link> (normalizeAUI.css)
│               ├── <link> (bil-au---prototype-and-wireframes.webflow.css)
│               └── div.webflow-page
│                   └── [injected HTML body content]
├── <script src="...jquery.js">
├── <script src="...webflow.js">
├── <script src="...braun-selector.js">  ← OUR SCRIPT
└── ... (embedded scripts)
```

## So when braun-selector.js runs:

1. `document` = the parent document (Amazon page)
2. `document.querySelector('.webflow-page')` = the div containing our Webflow HTML
3. The Webflow HTML has sections: .braun-hero, .braun-gender, etc.
4. The Webflow CSS is loaded and styles those sections

## The PROBLEM:

The script does:
```js
var doc;
try { doc = (window.parent && window.parent.document) || document; } catch(e) { doc = document; }
```

But since the script IS ALREADY running in the parent document context (it was appended to parent.document.body), `window.parent.document` might be the SAME as `document`, OR it might go up ANOTHER level to the Brand Store's outer frame.

Actually wait — the script is appended to `window.parent.document.body` from WITHIN the iframe. So the script element lives in the parent document. When it executes, its `document` refers to the document it's attached to = the parent document.

So `document` in braun-selector.js = the parent document (where .webflow-page lives).

And `window.parent` from the parent document's perspective = either the same window (if it's the top) or the Brand Store's outer frame.

## CORRECT approach:

Since the script runs in the parent document context:
- Use `document` directly (not window.parent.document)
- `document.querySelector('.webflow-page')` will find the container
- Elements created with `document.createElement()` can be appended to that container

## Why the current code might fail:

1. `window.parent.document` from the parent context might try to go UP another level (to Amazon's outer frame) and hit a cross-origin error
2. The try/catch would then fall back to `document` which IS correct
3. But `.querySelector('.page-wrapper')` won't find anything because the Webflow HTML doesn't have a .page-wrapper class — it has sections directly inside .webflow-page

## VERIFIED FIX:

The wrapper selector should be:
```js
var wrapper = document.querySelector('.webflow-page') || document.querySelector('.page-wrapper') || document.body;
```

And `doc` should just be `document` since the script already runs in the correct context.

## But there's ANOTHER issue:

The script does `wrapper.innerHTML = ''` (or hides children and appends). But the Webflow CSS file is loaded as a `<link>` on `dom_el` (the iframe's parent), NOT on the document head. So the CSS might not apply to elements created by the script if they're appended in a different location.

Actually looking again — the CSS links are appended to `dom_el` which is the iframe's parentElement. The .webflow-page div is also a child of dom_el. So the CSS links and the content are siblings. CSS `<link>` elements work when they're in the document anywhere (not just <head>), so this should be fine.

## The REAL issue with styling:

The script injects its own `<style>` into `doc.head` (which is the parent document's <head>). The Webflow CSS is loaded as a `<link>` on dom_el (a div in the body). Both should apply.

BUT — the Webflow CSS has styles for `.braun-hero`, `.hero-content`, `.hero-title`, `.hero-cta` etc. These styles from the Webflow export will CONFLICT with the script's injected styles (which use `.bps-hero`, `.bps-cta` etc.).

Since the script hides existing Webflow elements and renders its own HTML with `.bps-*` classes, there shouldn't be conflicts... UNLESS the Webflow CSS has global resets or body styles that affect everything.

## WAIT — I think I found the real issue:

Looking at the Brand Store code again:
```js
const iframe = window.frameElement;
iframe.style.display = "none";
iframe.style.height = "0%";
```

At the END of initializeContent(), the iframe is HIDDEN. The content lives in the parent document (in dom_el), not in the iframe. So the iframe disappearing is fine.

But the script's `wrapper` variable — if it finds `.webflow-page` — that div contains the ORIGINAL Webflow HTML (the sections). The script hides those children and appends its own `.bps-app` div. This should work.

## Let me check: does the script use `getElementById`?

Yes! It uses `doc.getElementById('bps-start')` etc. Since `doc` resolves to `document` (the parent document), and the elements are created and appended to the parent document, `getElementById` should work.

## FINAL DIAGNOSIS:

The most likely issue is that `document.querySelector('.webflow-page')` returns null because:
1. The script runs BEFORE the HTML is fully injected (race condition)
2. OR the .webflow-page class is on a div that's inside dom_el, which might be inside a shadow DOM or disconnected element

Actually no — the Brand Store code uses `await` for everything and loads scripts AFTER injecting HTML. So by the time braun-selector.js runs, .webflow-page exists.

Let me re-read the loadScripts flow:
```js
async function loadScripts() {
  for (const src of scripts) {
    await loadScript(src);  // waits for each script to load
  }
  embeddedScripts.forEach(script => cES(script));
}
await loadScripts();
```

So braun-selector.js is loaded and executed BEFORE the next script in the queue. By this point, .webflow-page exists in the DOM.

## CONFIRMED ROOT CAUSE:

The script should work. The issue is likely CSS specificity — the Webflow stylesheet has styles that override the injected styles. For example, if the Webflow CSS has:
```css
.braun-hero { display: none; }
```
That hides the original sections. But the script's NEW elements use .bps-* classes which shouldn't be affected.

UNLESS — the Webflow CSS has broad selectors like `section { ... }` or `* { ... }` that affect all elements.

OR — the `html { font-size: 16px }` set by addWebflowTagToHtml() is correct and rem units work fine.

I think the actual issue might be simpler: the script works but the VISUAL doesn't match the prototype because:
1. No product images (just gray placeholders) — expected
2. The font might be different (system fonts vs what the prototype uses)
3. The layout might be affected by Amazon's page styles

But the user said "gold CTA" and "white screen" — those are specific bugs:
- Gold CTA = the Webflow .hero-cta style is showing instead of the script's .bps-cta
- White screen = the results section isn't rendering

This means the script ISN'T running properly, or the Webflow HTML is showing INSTEAD of the script's HTML.

## HYPOTHESIS:

The script hides children of .webflow-page, but the Webflow HTML sections ARE the children. Then it appends .bps-app. But if the Webflow CSS has `display: flex` or `display: block` on the sections with !important, hiding them with `style.display = 'none'` might not work.

Actually — the user said it's "going further" now (after the last fix). So the script IS running. The hero shows (dark background, text). But:
1. "Homepage doesn't have all the copy" — some text is missing
2. "CTA is gold" — wrong button color
3. "White screen after clicking CTA" — next step doesn't render

If the CTA is gold, that means the WEBFLOW hero section is showing (it has .hero-cta styled gold), NOT the script's .bps-cta (which is white). This means the script's hide-and-replace isn't working — the original Webflow HTML is still visible.

## DEFINITIVE FIX:

The script needs to COMPLETELY REMOVE the Webflow sections, not just hide them. And it needs to ensure its own styles have higher specificity than the Webflow CSS.

Or better: the script should set `wrapper.innerHTML = ''` to nuke everything, then render fresh. The previous version did this but I changed it to "hide children" — that was wrong because Webflow CSS can override inline display:none.
