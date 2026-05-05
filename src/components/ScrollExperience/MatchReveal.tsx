import { useEffect, useState } from 'react';
import type { Tier, Category } from '../../data/products';

interface MatchRevealProps {
  tier: Tier;
  category: Category;
  onComplete: () => void;
}

function getTierMessage(tier: Tier, category: Category): { headline: string; subline: string } {
  switch (category) {
    case 'Electric Shaver':
      if (tier === 'Premium') return { headline: 'Your closest shave', subline: 'Series 7 & 8 — engineered for zero compromise.' };
      if (tier === 'Mid-Range') return { headline: 'Your smart shave', subline: 'Series 5 — same smart motor, streamlined package.' };
      return { headline: 'Your daily shave', subline: 'Series 3 — reliable performance, every morning.' };
    case 'Beard Trimmer':
      if (tier === 'Premium') return { headline: 'Your precision trim', subline: 'Series 7 — reads your beard, adjusts itself.' };
      return { headline: 'Your precision trim', subline: 'Series 5 — same 39 settings, great value.' };
    case 'Multi Groomer':
      if (tier === 'Premium') return { headline: 'Your complete kit', subline: 'All-in-One — every attachment, every scenario.' };
      if (tier === 'Mid-Range') return { headline: 'Your versatile groomer', subline: '9-in-1 — smart tech, focused kit.' };
      return { headline: 'Your essential groomer', subline: 'XT Series — simple styling, sharp results.' };
    case 'Body Groomer':
      return { headline: 'Your body groomer', subline: 'SkinShield technology — gentle on skin, effective on hair.' };
    case 'IPL Hair Removal':
      if (tier === 'Premium') return { headline: 'Your smoothest skin', subline: 'Pro 5 — fastest treatment with smart sensors.' };
      if (tier === 'Mid-Range') return { headline: 'Your IPL match', subline: 'Pro 3 — proven results at a great price.' };
      return { headline: 'Your IPL starter', subline: 'Mini — compact, effective, affordable.' };
    case 'Facial Care':
      return { headline: 'Your facial care match', subline: 'Gentle removal and cleansing in one device.' };
    default:
      return { headline: 'Your precision match', subline: 'Tailored to what matters to you.' };
  }
}

export function MatchReveal({ tier, category, onComplete }: MatchRevealProps) {
  const [stage, setStage] = useState<'finding' | 'found' | 'fading' | 'done'>('finding');
  const message = getTierMessage(tier, category);

  useEffect(() => {
    // Stage 1: "Finding your match..." (1.8s)
    const timer1 = setTimeout(() => setStage('found'), 1800);
    // Stage 2: Show the match, hold for 2.5s, then start fading
    const timer2 = setTimeout(() => setStage('fading'), 4300);
    // Stage 3: After fade completes, trigger onComplete
    const timer3 = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 5100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center bg-gray-950 overflow-hidden transition-opacity duration-700 ease-out ${
        stage === 'fading' || stage === 'done' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-64 h-64 md:w-96 md:h-96 rounded-full border transition-all duration-1000 ${
          stage === 'finding'
            ? 'border-gray-700/50 scale-100 animate-pulse'
            : 'border-white/20 scale-125'
        }`} />
        <div className={`absolute w-48 h-48 md:w-72 md:h-72 rounded-full border transition-all duration-1000 delay-200 ${
          stage === 'finding'
            ? 'border-gray-700/30 scale-100 animate-pulse'
            : 'border-white/10 scale-150'
        }`} style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content — single centered container, swap content in place */}
      <div className="relative z-10 text-center px-5 max-w-lg mx-auto flex items-center justify-center min-h-[200px]">
        {/* Finding state */}
        {stage === 'finding' && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.15s' }} />
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
            <p className="text-lg md:text-2xl text-gray-300 font-medium">
              Finding your match...
            </p>
          </div>
        )}

        {/* Found state */}
        {(stage === 'found' || stage === 'fading') && (
          <div style={{ animation: 'fadeSlideIn 0.7s ease-out forwards' }}>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-3 md:mb-4">
              Precision tailored to you
            </p>
            <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">
              {message.headline}
            </h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-400">
              {message.subline}
            </p>

            {/* Checkmark */}
            <div className="mt-8 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20"
              style={{ animation: 'fadeSlideIn 0.5s 0.3s ease-out forwards', opacity: 0 }}
            >
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Brand proof */}
            <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-gray-600"
              style={{ animation: 'fadeSlideIn 0.5s 0.6s ease-out forwards', opacity: 0 }}
            >
              100+ years of German engineering
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
