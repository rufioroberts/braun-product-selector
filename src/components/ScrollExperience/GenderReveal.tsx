import { useState } from 'react';
import { useInView } from '../../hooks/useInView';

interface GenderRevealProps {
  onSelect: (gender: 'Men' | 'Women') => void;
  selected: 'Men' | 'Women' | null;
}

export function GenderReveal({ onSelect, selected }: GenderRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });
  const [hovered, setHovered] = useState<'Men' | 'Women' | null>(null);

  const isSelected = selected !== null;

  // After selection, animate the chosen side to full and collapse the other
  const getDesktopWidth = (side: 'Men' | 'Women') => {
    if (!isSelected) {
      // Hover effect: hovered side grows, other shrinks
      if (hovered === side) return '55%';
      if (hovered && hovered !== side) return '45%';
      return '50%';
    }
    return selected === side ? '100%' : '0%';
  };

  const getMobileHeight = (side: 'Men' | 'Women') => {
    if (!isSelected) return '50%';
    return selected === side ? '100%' : '0%';
  };

  return (
    <section
      ref={ref}
      className={`relative h-screen w-full overflow-hidden transition-opacity duration-700 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Question overlay — positioned at top */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none pt-[8vh] md:pt-[15vh] transition-all duration-700 ${
          isSelected ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="text-center px-4">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/70 mb-2 md:mb-3 drop-shadow-lg">
            Start here
          </p>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] drop-shadow-xl">
            I'm looking for...
          </h2>
        </div>
      </div>

      {/* Desktop: vertical split (side by side) / Mobile: horizontal split (stacked) */}
      {/* Desktop layout */}
      <div className="hidden md:flex h-full w-full">
        {/* Him — left half */}
        <button
          onClick={() => !isSelected && onSelect('Men')}
          onMouseEnter={() => !isSelected && setHovered('Men')}
          onMouseLeave={() => setHovered(null)}
          disabled={isSelected}
          className="relative h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group"
          style={{ width: getDesktopWidth('Men') }}
          aria-label="Shopping for him — shavers, trimmers and groomers"
        >
          {/* Background */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            hovered === 'Men' ? 'bg-gray-900' : 'bg-gray-800'
          }`} />

          {/* Subtle geometric accent */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full transition-all duration-700 ${
              hovered === 'Men' ? 'bg-gray-700/40 scale-110' : 'bg-gray-700/20 scale-100'
            }`} />
            <div className={`absolute top-1/4 right-1/4 w-40 h-40 rounded-full transition-all duration-700 ${
              hovered === 'Men' ? 'bg-gray-600/20 scale-125' : 'bg-gray-600/10 scale-100'
            }`} />
          </div>

          {/* Content — positioned in lower half to avoid question text at top */}
          <div className={`relative z-10 h-full flex flex-col items-center justify-end pb-[15vh] px-8 transition-all duration-500 ${
            isSelected && selected !== 'Men' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}>
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center mb-5 transition-all duration-500 ${
              hovered === 'Men' ? 'scale-110 border-white/60' : 'scale-100'
            }`}>
              <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <h3 className={`text-3xl lg:text-4xl font-black text-white mb-2 transition-all duration-500 ${
              hovered === 'Men' ? 'scale-105' : 'scale-100'
            }`}>
              Men's Grooming
            </h3>
            <p className="text-white/60 text-sm text-center max-w-xs">
              Shavers, trimmers & groomers
            </p>
            <p className="mt-1.5 text-white/40 text-xs">
              16 products
            </p>

            {/* Hover CTA */}
            <div className={`mt-6 px-6 py-2.5 border border-white/30 rounded-full transition-all duration-300 ${
              hovered === 'Men' ? 'opacity-100 translate-y-0 border-white/60' : 'opacity-0 translate-y-4'
            }`}>
              <span className="text-sm font-medium text-white">Select</span>
            </div>
          </div>
        </button>

        {/* Divider line */}
        <div className={`w-px bg-white/10 transition-opacity duration-500 ${
          isSelected ? 'opacity-0' : 'opacity-100'
        }`} />

        {/* Her — right half */}
        <button
          onClick={() => !isSelected && onSelect('Women')}
          onMouseEnter={() => !isSelected && setHovered('Women')}
          onMouseLeave={() => setHovered(null)}
          disabled={isSelected}
          className="relative h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group"
          style={{ width: getDesktopWidth('Women') }}
          aria-label="Shopping for her — IPL hair removal and facial care"
        >
          {/* Background */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            hovered === 'Women' ? 'bg-gray-700' : 'bg-gray-600'
          }`} />

          {/* Subtle geometric accent */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full transition-all duration-700 ${
              hovered === 'Women' ? 'bg-gray-500/30 scale-110' : 'bg-gray-500/15 scale-100'
            }`} />
            <div className={`absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full transition-all duration-700 ${
              hovered === 'Women' ? 'bg-gray-400/15 scale-125' : 'bg-gray-400/5 scale-100'
            }`} />
          </div>

          {/* Content — positioned in lower half to avoid question text at top */}
          <div className={`relative z-10 h-full flex flex-col items-center justify-end pb-[15vh] px-8 transition-all duration-500 ${
            isSelected && selected !== 'Women' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}>
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center mb-5 transition-all duration-500 ${
              hovered === 'Women' ? 'scale-110 border-white/60' : 'scale-100'
            }`}>
              <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <h3 className={`text-3xl lg:text-4xl font-black text-white mb-2 transition-all duration-500 ${
              hovered === 'Women' ? 'scale-105' : 'scale-100'
            }`}>
              Women's Care
            </h3>
            <p className="text-white/60 text-sm text-center max-w-xs">
              IPL hair removal & facial care
            </p>
            <p className="mt-1.5 text-white/40 text-xs">
              5 products
            </p>

            {/* Hover CTA */}
            <div className={`mt-6 px-6 py-2.5 border border-white/30 rounded-full transition-all duration-300 ${
              hovered === 'Women' ? 'opacity-100 translate-y-0 border-white/60' : 'opacity-0 translate-y-4'
            }`}>
              <span className="text-sm font-medium text-white">Select</span>
            </div>
          </div>
        </button>
      </div>

      {/* Mobile layout — horizontal split (top/bottom) */}
      <div className="flex md:hidden flex-col h-full w-full">
        {/* Men's — top half */}
        <button
          onClick={() => !isSelected && onSelect('Men')}
          disabled={isSelected}
          className="relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98]"
          style={{ height: getMobileHeight('Men') }}
          aria-label="Men's grooming range"
        >
          <div className="absolute inset-0 bg-gray-900" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-gray-700/30" />
          </div>
          <div className={`relative z-10 h-full flex items-end justify-center pb-16 px-6 transition-all duration-500 ${
            isSelected && selected !== 'Men' ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className="text-center">
              <h3 className="text-xl font-black text-white mb-1">Men's Grooming</h3>
              <p className="text-white/60 text-xs">Shavers, trimmers & groomers</p>
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className={`h-px w-full bg-white/10 transition-opacity duration-500 ${
          isSelected ? 'opacity-0' : 'opacity-100'
        }`} />

        {/* Women's — bottom half */}
        <button
          onClick={() => !isSelected && onSelect('Women')}
          disabled={isSelected}
          className="relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98]"
          style={{ height: getMobileHeight('Women') }}
          aria-label="Women's care range"
        >
          <div className="absolute inset-0 bg-gray-700" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gray-500/20" />
          </div>
          <div className={`relative z-10 h-full flex items-start justify-center pt-16 px-6 transition-all duration-500 ${
            isSelected && selected !== 'Women' ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className="text-center">
              <h3 className="text-xl font-black text-white mb-1">Women's Care</h3>
              <p className="text-white/60 text-xs">IPL hair removal & facial care</p>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
