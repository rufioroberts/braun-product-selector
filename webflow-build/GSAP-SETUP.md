# GSAP Setup

GSAP cannot be loaded from a CDN (Brand Store security rules). You need to self-host it.

## Download GSAP

1. Go to https://gsap.com/docs/v3/Installation/
2. Download the "gsap.min.js" file (core only, no plugins needed)
3. Upload it via Webflow's file upload interface
4. Note the hosted URL

Alternatively, grab it from the npm package:
- `node_modules/gsap/dist/gsap.min.js` (if you have it locally)

## Load Order

In Page Settings > Custom Code > Before </body>:

```html
<script src="[your-hosted-gsap-url]"></script>
<script src="[your-hosted-braun-selector-url]"></script>
```

GSAP must load first. The braun-selector.js file references `gsap` globally.

## File Size

- gsap.min.js: ~60KB (gzipped ~20KB)
- braun-selector.js: ~18KB

Both well within Webflow's file limits.
