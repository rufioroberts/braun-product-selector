import { useState } from 'react';
import type { Product, Category } from '../../data/products';
import { products } from '../../data/products';

interface ProductShowcaseProps {
  category: Category;
  matchedTier?: string | null;
  onReset: () => void;
  onFullReset?: () => void;
}

// Rich content for each tier
interface TierShowcase {
  tier: string;
  headline: string;
  positioning: string;
  rtbs: string[];
  keySpec: { label: string; value: string }[];
  products: Product[];
}

function getTierShowcases(category: Category): TierShowcase[] {
  const categoryProducts = products.filter(p => p.category === category);

  switch (category) {
    case 'Electric Shaver':
      return [
        {
          tier: 'Premium',
          headline: 'The closest shave we make.',
          positioning: 'You want the best result with the least effort. No second passes, no irritation.',
          rtbs: [
            'Sonic Technology with 10,000 micro-vibrations captures more hair in every stroke',
            '360\u00B0 Flex Head follows every contour of your face automatically',
            'AutoSense reads your beard density 13x per second and adapts power',
            'SmartCare Center cleans, charges, and lubricates in one step',
          ],
          keySpec: [
            { label: 'Series', value: '7 & 8' },
            { label: 'Shaving Elements', value: '4+1' },
            { label: 'Battery', value: '60 min' },
            { label: 'Wet & Dry', value: 'Yes' },
          ],
          products: categoryProducts.filter(p => p.tier === 'Premium'),
        },
        {
          tier: 'Mid-Range',
          headline: 'Same smart motor. Fewer extras.',
          positioning: 'You want a great shave without paying for the cleaning station and premium case.',
          rtbs: [
            'AutoSense technology still adapts to your beard. Same smart motor.',
            'EasyClick system lets you swap between trimmer and shaver heads',
            '3 flexible blades follow facial contours for a close, comfortable shave',
          ],
          keySpec: [
            { label: 'Series', value: '5' },
            { label: 'Shaving Elements', value: '3' },
            { label: 'Battery', value: '50 min' },
            { label: 'Wet & Dry', value: 'Yes' },
          ],
          products: categoryProducts.filter(p => p.tier === 'Mid-Range'),
        },
        {
          tier: 'Entry',
          headline: 'Does the job. Does it well.',
          positioning: 'You want a solid electric shaver at a fair price. No bells, no whistles.',
          rtbs: [
            'MicroComb technology guides more hair to the cutting elements',
            'Pressure-sensitive shaving elements protect your skin',
            'Fully washable. Rinse under the tap and go.',
          ],
          keySpec: [
            { label: 'Series', value: '3' },
            { label: 'Shaving Elements', value: '3' },
            { label: 'Battery', value: '45 min' },
            { label: 'Wet & Dry', value: 'Yes' },
          ],
          products: categoryProducts.filter(p => p.tier === 'Entry'),
        },
      ];

    case 'Multi Groomer':
      return [
        {
          tier: 'Premium',
          headline: 'One tool. Everything covered.',
          positioning: 'You want a single device that handles face, beard, body, nose, and ears without buying five separate things.',
          rtbs: [
            'Up to 10 precision attachments for every grooming scenario',
            'AutoSense motor adapts power to hair density automatically',
            '100-minute runtime. Weeks of grooming on a single charge.',
          ],
          keySpec: [
            { label: 'Attachments', value: '8-10' },
            { label: 'Runtime', value: '100 min' },
            { label: 'AutoSense', value: 'Yes' },
            { label: 'Wet & Dry', value: 'Yes' },
          ],
          products: categoryProducts.filter(p => p.tier === 'Premium'),
        },
        {
          tier: 'Mid-Range',
          headline: 'Same motor, slightly smaller kit.',
          positioning: 'You want the versatility and smart tech without the full premium price.',
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
          products: categoryProducts.filter(p => p.tier === 'Mid-Range'),
        },
        {
          tier: 'Entry',
          headline: 'Simple styling. Sharp results.',
          positioning: 'You want a straightforward grooming tool for basic trimming and styling.',
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
          products: categoryProducts.filter(p => p.tier === 'Entry'),
        },
      ];

    case 'Beard Trimmer':
      return [
        {
          tier: 'Premium',
          headline: 'Reads your beard. Adjusts itself.',
          positioning: 'You take your beard seriously and want a trimmer that keeps up.',
          rtbs: [
            'AutoSense motor reads hair density and adjusts power in real-time',
            '39 precision length settings for exact styling control',
            '100-minute runtime. Trim all week on one charge.',
          ],
          keySpec: [
            { label: 'Length Settings', value: '39' },
            { label: 'Runtime', value: '100 min' },
            { label: 'AutoSense', value: 'Yes' },
            { label: 'Series', value: '7' },
          ],
          products: categoryProducts.filter(p => p.tier === 'Premium'),
        },
        {
          tier: 'Mid-Range',
          headline: 'Same precision. Lower price.',
          positioning: 'Same 39 settings, same motor, same battery. Just a different series number.',
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
          products: categoryProducts.filter(p => p.tier === 'Mid-Range'),
        },
      ];

    case 'Body Groomer':
      return [
        {
          tier: 'Mid-Range',
          headline: 'Gentle on skin. Effective on hair.',
          positioning: 'You want body grooming that actually accounts for sensitive areas.',
          rtbs: [
            'SkinShield technology prevents nicks and irritation on sensitive areas',
            'Designed specifically for body hair. Not a repurposed face trimmer.',
            'Fully waterproof for comfortable shower grooming',
          ],
          keySpec: [
            { label: 'Technology', value: 'SkinShield' },
            { label: 'Wet & Dry', value: 'Yes' },
            { label: 'Body-specific', value: 'Yes' },
            { label: 'Series', value: '5' },
          ],
          products: categoryProducts.filter(p => p.tier === 'Mid-Range'),
        },
      ];

    case 'IPL Hair Removal':
      return [
        {
          tier: 'Premium',
          headline: 'Visible results in 4 weeks.',
          positioning: 'You want full body coverage with the fastest IPL available at home.',
          rtbs: [
            '400,000 flashes. Enough for 22+ years of full-body treatments.',
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
          products: categoryProducts.filter(p => p.tier === 'Premium'),
        },
        {
          tier: 'Entry',
          headline: 'Same technology. Smaller price.',
          positioning: 'You want effective IPL at a lower price point. Still works, still lasts.',
          rtbs: [
            '300,000 flashes. Still enough for 16+ years of treatments.',
            '3 comfort modes let you control intensity',
            'Compact design is easy to handle and store',
          ],
          keySpec: [
            { label: 'Flashes', value: '300,000' },
            { label: 'Modes', value: '3 comfort' },
            { label: 'Design', value: 'Compact' },
            { label: 'Results', value: '4 weeks' },
          ],
          products: categoryProducts.filter(p => p.tier === 'Entry'),
        },
      ];

    case 'Facial Care':
      return [
        {
          tier: 'Premium',
          headline: 'Epilate, cleanse, and tone. One device.',
          positioning: 'You want more than hair removal. Full facial routine in one tool.',
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
          products: categoryProducts.filter(p => p.tier === 'Premium'),
        },
        {
          tier: 'Entry',
          headline: 'Quick touch ups. Fits in your bag.',
          positioning: 'You want fast facial hair removal in something small enough to take anywhere.',
          rtbs: [
            'Gentle enough for the most sensitive facial skin',
            'Built-in Smart Light reveals even the finest hairs',
            'Compact size fits in any bag. Perfect for travel.',
          ],
          keySpec: [
            { label: 'Smart Light', value: 'Built-in' },
            { label: 'Size', value: 'Compact' },
            { label: 'Travel', value: 'Yes' },
            { label: 'Series', value: 'Face Mini' },
          ],
          products: categoryProducts.filter(p => p.tier === 'Entry'),
        },
      ];

    default:
      return [];
  }
}

export function ProductShowcase({ category, matchedTier, onReset, onFullReset }: ProductShowcaseProps) {
  const showcases = getTierShowcases(category);
  const hasMultipleTiers = showcases.length > 1;
  
  // Default to the matched tier tab
  const matchedIndex = matchedTier ? showcases.findIndex(s => s.tier === matchedTier) : 0;
  const [activeTab, setActiveTab] = useState(matchedIndex >= 0 ? matchedIndex : 0);

  const tabs = hasMultipleTiers
    ? [...showcases.map(s => s.tier), 'Compare']
    : [];

  const isCompareTab = hasMultipleTiers && activeTab === showcases.length;
  const activeShowcase = !isCompareTab ? showcases[activeTab] : null;

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-inner">
      {/* Tier tabs / nav */}
      {hasMultipleTiers ? (
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-gray-700 transition-colors py-3"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex" role="tablist" aria-label="Product ranges">
              {tabs.map((tab, index) => {
                const isActive = activeTab === index;
                const isCompare = index === showcases.length;
                const isMatched = !isCompare && matchedTier && showcases[index]?.tier === matchedTier;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isMatched && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                      {isCompare ? 'Compare' : tab}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gray-900 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onFullReset || onReset}
              className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-gray-700 transition-colors py-3"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <span className="text-xs font-medium text-gray-500">{category}</span>
            <button
              onClick={onFullReset || onReset}
              className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Tab content */}
      <div role="tabpanel" className="transition-opacity duration-300" key={activeTab}>
        {!isCompareTab && activeShowcase && (
          <TierContent showcase={activeShowcase} />
        )}
        {isCompareTab && (
          <ComparisonView showcases={showcases} category={category} />
        )}
      </div>

      {/* Bottom CTA */}
      <div className="py-10 text-center bg-gray-50 border-t border-gray-100">
        <p className="text-gray-500 text-sm mb-3">Want to explore a different goal?</p>
        <button
          onClick={onFullReset || onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-sm font-semibold text-white rounded-full transition-colors"
        >
          Start a new quest
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tier Content: image-led, minimal copy, clear Add to Cart
// ---------------------------------------------------------------------------

function TierContent({ showcase }: { showcase: TierShowcase }) {
  return (
    <div className="py-8 md:py-10" style={{ animation: 'fadeSlideIn 0.4s ease-out forwards' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Tier context: one headline, one line of positioning */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
              {showcase.tier}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
            {showcase.headline}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{showcase.positioning}</p>
        </div>

        {/* Product grid: images dominant, Add to Cart clear */}
        <div className={`grid gap-6 ${
          showcase.products.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
          showcase.products.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' :
          showcase.products.length <= 4 ? 'grid-cols-2 lg:grid-cols-3' :
          'grid-cols-2 lg:grid-cols-4'
        }`}>
          {showcase.products.map((product, i) => (
            <ProductTile key={product.asin} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product Tile: hero image, name, price, Add to Cart
// ---------------------------------------------------------------------------

function ProductTile({ product, index }: { product: Product; index: number }) {
  const isPremium = product.tier === 'Premium';
  
  return (
    <div
      className="group rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition-all duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Premium badge */}
      {isPremium && (
        <div className="px-4 py-1.5 bg-gray-900 text-center">
          <span className="text-[10px] font-bold tracking-wider uppercase text-white">Built to last</span>
        </div>
      )}

      {/* Hero image */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 group-hover:from-white group-hover:to-gray-50 transition-colors">
        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gray-300 rounded-full flex items-center justify-center mb-2">
              <span className="text-sm font-bold text-gray-500">IMG</span>
            </div>
            <span className="text-[10px] text-gray-400">{product.asin}</span>
          </div>
        </div>
      </div>

      {/* Product info: tight, scannable */}
      <div className="p-4">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-0.5">{product.series}</p>
        <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1">{product.name}</h4>
        <p className="text-xs text-gray-500 mb-3 line-clamp-1">{product.features[0]}</p>

        {/* Price */}
        {product.priceRange && (
          <p className="text-lg font-bold text-gray-900 mb-3">{product.priceRange}</p>
        )}

        {/* Add to Cart */}
        <a
          href={`https://www.amazon.com.au/dp/${product.asin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] text-sm font-medium text-gray-900 rounded-full border border-[#FCD200] shadow-sm transition-colors"
        >
          Add to Cart
        </a>

        {/* Secondary */}
        <a
          href={`https://www.amazon.com.au/dp/${product.asin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center mt-2 py-1.5 text-xs text-[#007185] hover:text-[#c7511f] hover:underline transition-colors"
        >
          See full details
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Comparison View
// ---------------------------------------------------------------------------

function ComparisonView({ showcases, category }: { showcases: TierShowcase[]; category: Category }) {
  return (
    <div className="py-10 md:py-14" style={{ animation: 'fadeSlideIn 0.5s ease-out forwards' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-black text-gray-900">Compare at a glance</h3>
          <p className="mt-2 text-gray-500 text-sm">{category} ranges side by side</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-5 font-medium text-gray-500 w-1/4">Feature</th>
                {showcases.map(s => (
                  <th key={s.tier} className="text-center py-4 px-4">
                    <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                      {s.tier}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-5 text-gray-600 font-medium">Best for</td>
                {showcases.map(s => (
                  <td key={s.tier} className="text-center py-4 px-4 text-gray-700 text-xs leading-relaxed">
                    {s.positioning}
                  </td>
                ))}
              </tr>
              {showcases[0].keySpec.map((spec, i) => (
                <tr key={spec.label} className="border-b border-gray-100">
                  <td className="py-3 px-5 text-gray-600">{spec.label}</td>
                  {showcases.map(s => (
                    <td key={s.tier} className="text-center py-3 px-4 font-medium text-gray-900">
                      {s.keySpec[i]?.value || '\u2014'}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-gray-100">
                <td className="py-3 px-5 text-gray-600">Products</td>
                {showcases.map(s => (
                  <td key={s.tier} className="text-center py-3 px-4 font-medium text-gray-900">
                    {s.products.length}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-5 text-gray-600 font-medium">Standout feature</td>
                {showcases.map(s => (
                  <td key={s.tier} className="text-center py-4 px-4 text-gray-700 text-xs leading-relaxed">
                    {s.rtbs[0]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* All products below comparison */}
        <div className="mt-12">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 text-center">
            All {category} products
          </p>
          <div className="grid gap-5 grid-cols-2 lg:grid-cols-3">
            {showcases.flatMap(s => s.products).map((product, i) => (
              <ProductTile key={product.asin} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
