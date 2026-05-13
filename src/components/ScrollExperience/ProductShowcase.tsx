import { useState, useEffect } from 'react';
import type { Product, Category } from '../../data/products';
import { products } from '../../data/products';

interface ProductShowcaseProps {
  category: Category;
  matchedTier?: string | null;
  onReset: () => void;
  onFullReset?: () => void;
}

interface TierShowcase {
  tier: string;
  headline: string;
  positioning: string;
  thisIsForYou: string[];
  rtbs: string[];
  keySpec: { label: string; value: string }[];
  heroProduct: Product;
  altProduct?: Product; // optional second pick
}

// ---------------------------------------------------------------------------
// Pick the HERO product for each tier — the single best recommendation
// ---------------------------------------------------------------------------
function pickHero(categoryProducts: Product[], tier: string): { hero: Product; alt?: Product } {
  const tierProducts = categoryProducts.filter(p => p.tier === tier);
  if (tierProducts.length === 0) return { hero: categoryProducts[0] };
  if (tierProducts.length === 1) return { hero: tierProducts[0] };

  // For tiers with multiple products, pick the flagship (highest series number / most features)
  // and optionally surface one alternative
  const sorted = [...tierProducts].sort((a, b) => {
    // Prefer higher series numbers
    const seriesA = parseInt(a.series.replace(/\D/g, '')) || 0;
    const seriesB = parseInt(b.series.replace(/\D/g, '')) || 0;
    if (seriesB !== seriesA) return seriesB - seriesA;
    // Then prefer more features listed
    return b.features.length - a.features.length;
  });

  return {
    hero: sorted[0],
    alt: sorted.length > 1 ? sorted[1] : undefined,
  };
}

// ---------------------------------------------------------------------------
// Tier showcase data — RTBs, specs, positioning per category/tier
// ---------------------------------------------------------------------------
function getMatchedShowcase(category: Category, tier: string): TierShowcase | null {
  const categoryProducts = products.filter(p => p.category === category);
  const { hero, alt } = pickHero(categoryProducts, tier);
  if (!hero) return null;

  switch (category) {
    case 'Electric Shaver': {
      if (tier === 'Premium') return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'The closest shave Braun makes.',
        positioning: 'Charging station, cleaning cartridge, travel case — everything sorted.',
        thisIsForYou: [
          'You want zero friction in your routine — charge, clean, grab and go',
          'Skin sensitivity matters — AutoSense adapts pressure automatically',
          'You travel regularly and want a premium case included',
        ],
        rtbs: [
          'Sonic Technology with 10,000 micro-vibrations captures more hair in every stroke',
          '360° Flex Head follows every contour of your face automatically',
          'AutoSense reads your beard density 13x per second and adapts power',
          'SmartCare Center cleans, charges, and lubricates in one step',
        ],
        keySpec: [
          { label: 'Series', value: '7 & 8' },
          { label: 'Shaving Elements', value: '4+1' },
          { label: 'Battery', value: '60 min' },
          { label: 'Wet & Dry', value: 'Yes' },
        ],
      };
      if (tier === 'Mid-Range') return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Same smart motor. You handle the rest.',
        positioning: 'Great shave without the cleaning station and premium case.',
        thisIsForYou: [
          'You want the core Braun shaving tech without paying for accessories',
          'You already have a travel case or don\'t need a charging station',
          'You want flexibility — EasyClick lets you swap heads',
        ],
        rtbs: [
          'AutoSense technology still adapts to your beard — same smart motor as Premium',
          'EasyClick system lets you swap between trimmer and shaver heads',
          '3 flexible blades follow facial contours for a close, comfortable shave',
        ],
        keySpec: [
          { label: 'Series', value: '5 & 6' },
          { label: 'Shaving Elements', value: '3' },
          { label: 'Battery', value: '50 min' },
          { label: 'Wet & Dry', value: 'Yes' },
        ],
      };
      return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'A great shave. Nothing more, nothing less.',
        positioning: 'Solid electric shaver at a fair price.',
        thisIsForYou: [
          'You\'re switching from manual razors and want to try electric',
          'You want a reliable daily shaver without the bells and whistles',
          'You\'re buying for someone and want a safe, quality choice',
        ],
        rtbs: [
          'MicroComb technology guides more hair to the cutting elements',
          'Pressure-sensitive shaving elements protect your skin',
          'Fully washable — rinse under the tap and go',
        ],
        keySpec: [
          { label: 'Series', value: '3' },
          { label: 'Shaving Elements', value: '3' },
          { label: 'Battery', value: '45 min' },
          { label: 'Wet & Dry', value: 'Yes' },
        ],
      };
    }

    case 'Beard Trimmer': {
      if (tier === 'Premium') return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Reads your beard. Adjusts itself.',
        positioning: 'The trimmer that adapts to you — not the other way around.',
        thisIsForYou: [
          'Your beard has different densities and you want the motor to handle it',
          'You want the premium build quality and materials',
          'Beard grooming is part of your identity, not just maintenance',
        ],
        rtbs: [
          'AutoSense motor reads hair density and adjusts power in real-time',
          '39 precision length settings for exact styling control',
          '100-minute runtime — trim all week on one charge',
        ],
        keySpec: [
          { label: 'Length Settings', value: '39' },
          { label: 'Runtime', value: '100 min' },
          { label: 'AutoSense', value: 'Yes' },
          { label: 'Series', value: '7' },
        ],
      };
      return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Same precision. Simpler package.',
        positioning: 'Same 39 settings, same motor, same battery — different price.',
        thisIsForYou: [
          'You know your preferred length and just need reliable precision',
          'You want the same core tech without the premium packaging',
          'You trim regularly and need something that just works',
        ],
        rtbs: [
          'Same 39 length settings as the Series 7',
          'AutoSense technology still included',
          'Same 100-minute battery life',
        ],
        keySpec: [
          { label: 'Length Settings', value: '39' },
          { label: 'Runtime', value: '100 min' },
          { label: 'AutoSense', value: 'Yes' },
          { label: 'Series', value: '5' },
        ],
      };
    }

    case 'Multi Groomer': {
      if (tier === 'Premium') return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'One tool. Everything covered.',
        positioning: 'Head-to-toe grooming with 10+ attachments.',
        thisIsForYou: [
          'You want one device that handles beard, hair, body, nose, and ears',
          'You like having the right attachment for every job',
          'You want the AutoSense motor that adapts to different hair types',
        ],
        rtbs: [
          'Up to 10 precision attachments for every grooming scenario',
          'AutoSense motor adapts power to hair density automatically',
          '100-minute runtime — weeks of grooming on a single charge',
        ],
        keySpec: [
          { label: 'Attachments', value: '8–10' },
          { label: 'Runtime', value: '100 min' },
          { label: 'AutoSense', value: 'Yes' },
          { label: 'Wet & Dry', value: 'Yes' },
        ],
      };
      if (tier === 'Mid-Range') return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Same motor, slightly smaller kit.',
        positioning: 'The key attachments with smart technology.',
        thisIsForYou: [
          'Beard and body are your main focus — you don\'t need 10 heads',
          'You want the AutoSense motor without paying for attachments you won\'t use',
          'You want a versatile kit that covers the essentials well',
        ],
        rtbs: [
          '9-in-1 kit covers face, beard, and body trimming',
          'Same AutoSense motor as the premium range',
          'Precision wheel for exact length control',
        ],
        keySpec: [
          { label: 'Attachments', value: '9' },
          { label: 'Runtime', value: '100 min' },
          { label: 'AutoSense', value: 'Yes' },
          { label: 'Wet & Dry', value: 'Yes' },
        ],
      };
      return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Simple styling. Sharp results.',
        positioning: 'Trim, edge, and style — the essentials.',
        thisIsForYou: [
          'You want a simple tool for beard shaping and basic body grooming',
          'You prefer a metal blade over foil-style trimmers',
          'You\'re starting out and want something affordable that works',
        ],
        rtbs: [
          'Metal blade delivers precise, clean lines',
          '4-in-1 styling covers your essential grooming needs',
          'Fully waterproof for shower use',
        ],
        keySpec: [
          { label: 'Attachments', value: '4' },
          { label: 'Blade', value: 'Metal' },
          { label: 'Wet & Dry', value: 'Yes' },
          { label: 'Series', value: 'XT' },
        ],
      };
    }

    case 'Body Groomer':
      return {
        tier: 'Mid-Range', heroProduct: hero, altProduct: alt,
        headline: 'Gentle on skin. Effective on hair.',
        positioning: 'Body grooming designed for sensitive areas.',
        thisIsForYou: [
          'You want a groomer built specifically for body hair — not a repurposed face trimmer',
          'Sensitive areas matter — SkinShield technology prevents nicks',
          'You want to groom in the shower',
        ],
        rtbs: [
          'SkinShield technology prevents nicks and irritation on sensitive areas',
          'Designed specifically for body hair — not a repurposed face trimmer',
          'Fully waterproof for comfortable shower grooming',
        ],
        keySpec: [
          { label: 'Technology', value: 'SkinShield' },
          { label: 'Wet & Dry', value: 'Yes' },
          { label: 'Body-specific', value: 'Yes' },
          { label: 'Series', value: '5' },
        ],
      };

    case 'IPL Hair Removal': {
      if (tier === 'Premium') return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Visible results in 4 weeks.',
        positioning: 'Smart skin sensor adapts intensity automatically.',
        thisIsForYou: [
          'You want the sensor to handle intensity — no guessing',
          'You\'re treating larger areas (legs, arms, body) and want speed',
          'You want the included Venus razor and travel pouch',
        ],
        rtbs: [
          '400,000 flashes — enough for 22+ years of full-body treatments',
          'SensoAdapt continuously reads your skin tone and adjusts intensity',
          'Clinically proven: visible hair reduction after just 4 weeks',
          'FDA-cleared and dermatologist recommended',
        ],
        keySpec: [
          { label: 'Flashes', value: '400,000' },
          { label: 'Skin Sensor', value: 'SensoAdapt' },
          { label: 'Coverage', value: 'Full body' },
          { label: 'Results', value: '4 weeks' },
        ],
      };
      return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Same technology. Smaller price.',
        positioning: 'Effective IPL with more hands-on control.',
        thisIsForYou: [
          'You\'re happy to set the intensity yourself',
          'You\'re treating smaller areas or want to try IPL before going all-in',
          'You want proven results without the premium price',
        ],
        rtbs: [
          '300,000 flashes — still enough for 16+ years of treatments',
          '3 comfort modes let you control intensity',
          'Compact design is easy to handle and store',
        ],
        keySpec: [
          { label: 'Flashes', value: '300,000' },
          { label: 'Modes', value: '3 comfort' },
          { label: 'Design', value: 'Compact' },
          { label: 'Results', value: '4 weeks' },
        ],
      };
    }

    case 'Facial Care': {
      if (tier === 'Premium') return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Epilate, cleanse, and tone. One device.',
        positioning: 'A full facial routine in one tool.',
        thisIsForYou: [
          'You want one device that handles hair removal AND skincare',
          'You like a multi-step routine — epilate, cleanse, tone',
          'You want something waterproof for shower use',
        ],
        rtbs: [
          '3-in-1 system: epilator + cleansing brush + skin toner in one device',
          'MicroVibration head gently removes facial hair at the root',
          'Waterproof for use in the shower with your favourite cleanser',
        ],
        keySpec: [
          { label: 'Functions', value: '3-in-1' },
          { label: 'Heads', value: 'MicroVibration' },
          { label: 'Waterproof', value: 'Yes' },
          { label: 'Series', value: 'FaceSpa' },
        ],
      };
      return {
        tier, heroProduct: hero, altProduct: alt,
        headline: 'Quick touch-ups. Fits in your bag.',
        positioning: 'Fast facial hair removal, anywhere.',
        thisIsForYou: [
          'You want something small and fast for on-the-go touch-ups',
          'You prefer gentle removal over epilating',
          'You travel and want something that fits in any bag',
        ],
        rtbs: [
          'Gentle enough for the most sensitive facial skin',
          'Built-in Smart Light reveals even the finest hairs',
          'Compact size fits in any bag — perfect for travel',
        ],
        keySpec: [
          { label: 'Smart Light', value: 'Built-in' },
          { label: 'Size', value: 'Compact' },
          { label: 'Travel', value: 'Yes' },
          { label: 'Series', value: 'Face Mini' },
        ],
      };
    }

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Main Showcase — focused on ONE product recommendation
// ---------------------------------------------------------------------------

export function ProductShowcase({ category, matchedTier, onReset, onFullReset }: ProductShowcaseProps) {
  const tier = matchedTier || 'Premium';
  const showcase = getMatchedShowcase(category, tier);
  const [revealed, setRevealed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showRtbs, setShowRtbs] = useState(false);

  // Staged reveal
  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 300);
    const t2 = setTimeout(() => setShowDetails(true), 800);
    const t3 = setTimeout(() => setShowRtbs(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!showcase) return null;

  const { heroProduct, altProduct } = showcase;
  const amazonUrl = `https://www.amazon.com.au/dp/${heroProduct.asin}`;
  const altAmazonUrl = altProduct ? `https://www.amazon.com.au/dp/${altProduct.asin}` : '';

  return (
    <div className="relative">
      {/* ===== DARK HERO: Your match ===== */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gray-950 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        <div className={`relative z-10 text-center px-5 max-w-2xl mx-auto transition-all duration-1000 ease-out ${
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-white/40 mb-6">
            We found your match
          </p>

          {/* Product image placeholder */}
          <div className={`w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 bg-gray-800 rounded-2xl flex items-center justify-center transition-all duration-700 delay-200 ${
            revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-gray-400">IMG</span>
              </div>
              <span className="text-[9px] text-gray-500 font-mono">{heroProduct.asin}</span>
            </div>
          </div>

          {/* Series badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white/70 text-[10px] font-bold tracking-wider uppercase rounded-full mb-4">
            {heroProduct.series}
          </span>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.05] mb-3">
            {heroProduct.name}
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-md mx-auto mb-8">
            {showcase.positioning}
          </p>

          {/* Primary CTA */}
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FFD814] hover:bg-[#F7CA00] text-sm font-bold text-gray-900 rounded-full border border-[#FCD200] shadow-lg transition-colors"
          >
            View on Amazon
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Scroll indicator — clickable */}
          <button
            onClick={() => document.getElementById('why-this-one')?.scrollIntoView({ behavior: 'smooth' })}
            className={`block w-full mt-12 transition-all duration-700 delay-700 group cursor-pointer ${
              revealed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto mb-2 group-hover:from-white/60 transition-colors" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 group-hover:text-white/60 transition-colors">Why this one?</p>
          </button>
        </div>
      </section>

      {/* ===== TRANSITION ===== */}
      <div className="h-24 bg-gradient-to-b from-gray-950 via-gray-200 to-white" />

      {/* ===== LIGHT SECTION: Why this product ===== */}
      <section className={`relative bg-white transition-all duration-700 ${
        showDetails ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Sticky nav */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 md:px-6 flex items-center justify-between h-12">
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-gray-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <span className="text-xs font-medium text-gray-500 tracking-wide">{heroProduct.series}</span>
            <button
              onClick={onFullReset || onReset}
              className="text-[11px] font-medium text-gray-400 hover:text-gray-700 transition-colors"
            >
              Start over
            </button>
          </div>
        </div>

        {/* "This is for you if..." */}
        <div id="why-this-one" className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
            This is for you if…
          </h3>
          <div className="space-y-4">
            {showcase.thisIsForYou.map((point, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 transition-all duration-500 ${
                  showDetails ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key specs */}
        <div className="border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {showcase.keySpec.map(spec => (
                <div key={spec.label} className="text-center py-5 px-3 bg-gray-50 rounded-xl">
                  <p className="text-xl md:text-2xl font-black text-gray-900">{spec.value}</p>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mt-1">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RTBs — what makes it special */}
        <div className="border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
              What makes it stand out
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {showcase.rtbs.map((rtb, i) => (
                <div
                  key={i}
                  className={`p-5 bg-gray-50 rounded-xl transition-all duration-500 ${
                    showRtbs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <p className="text-sm text-gray-700 leading-relaxed">{rtb}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Primary CTA — repeated */}
        <div className="border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 text-center">
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FFD814] hover:bg-[#F7CA00] text-sm font-bold text-gray-900 rounded-full border border-[#FCD200] shadow-lg transition-colors"
            >
              Add to Cart on Amazon
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-xs text-[#007185] hover:text-[#c7511f] hover:underline transition-colors"
            >
              See full details on Amazon
            </a>
          </div>
        </div>

        {/* ===== ALTERNATIVE: "Also consider" — max 1 product ===== */}
        {altProduct && (
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-12">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">
                Also in this range
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-white rounded-xl border border-gray-200">
                {/* Alt product image */}
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-1">
                      <span className="text-[8px] font-bold text-gray-400">IMG</span>
                    </div>
                    <span className="text-[8px] text-gray-400 font-mono">{altProduct.asin}</span>
                  </div>
                </div>
                {/* Alt product info */}
                <div className="flex-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{altProduct.series}</span>
                  <h4 className="text-base font-bold text-gray-900 mt-1 mb-1">{altProduct.name}</h4>
                  <p className="text-xs text-gray-500 mb-4">{altProduct.features[0]}</p>
                  <a
                    href={altAmazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-xs font-bold text-gray-900 rounded-full border border-[#FCD200] transition-colors"
                  >
                    View on Amazon
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== SHOP THE RANGE CTA ===== */}
        <div className="py-14 text-center bg-gray-950">
          <p className="text-white/60 text-sm mb-2">Not quite right?</p>
          <p className="text-white/40 text-xs mb-6 max-w-sm mx-auto">
            Browse the full {category.toLowerCase()} range on Amazon
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://www.amazon.com.au/stores/Braun`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-sm font-medium text-white rounded-full transition-colors"
            >
              Shop the full range
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <button
              onClick={onFullReset || onReset}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              Start over
            </button>
          </div>

          <p className="mt-8 text-[10px] tracking-[0.2em] uppercase text-white/20">
            Built to last · Engineered for 7+ years of daily use
          </p>
        </div>
      </section>
    </div>
  );
}
