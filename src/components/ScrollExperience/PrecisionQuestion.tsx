import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import type { Category } from '../../data/products';

interface PrecisionQuestionProps {
  category: Category;
  onSelect: (priority: 'best' | 'balanced' | 'value') => void;
}

function getQuestionText(category: Category): { heading: string; subtext: string } {
  switch (category) {
    case 'Electric Shaver':
      return { heading: 'How much do you want included?', subtext: 'All our shavers use the same core technology' };
    case 'Beard Trimmer':
      return { heading: 'How do you like to work?', subtext: 'Both deliver precision \u2014 they just get there differently' };
    case 'Multi Groomer':
      return { heading: 'How much do you want to cover?', subtext: 'More attachments = more versatility' };
    case 'IPL Hair Removal':
      return { heading: 'How hands-on do you want to be?', subtext: 'Both use the same proven IPL technology' };
    case 'Facial Care':
      return { heading: "What's your routine?", subtext: 'From quick touch-ups to full skincare' };
    default:
      return { heading: 'What suits you best?', subtext: 'Help us find your match' };
  }
}

interface PriorityOption {
  id: 'best' | 'balanced' | 'value';
  label: string;
  subtitle: string;
}

function getOptions(category: Category): PriorityOption[] {
  switch (category) {
    case 'Electric Shaver':
      return [
        { id: 'best', label: 'The complete system', subtitle: 'Charging station, cleaning cartridge, travel case — everything sorted' },
        { id: 'balanced', label: 'Just the shaver', subtitle: 'Same Braun engineering, I\'ll handle the rest' },
        { id: 'value', label: 'Keep it simple', subtitle: 'A great shave without the extras' },
      ];
    case 'Beard Trimmer':
      return [
        { id: 'best', label: 'I want it to adapt to me', subtitle: 'AutoSense motor reads your beard and adjusts power' },
        { id: 'balanced', label: 'I know what I need', subtitle: '39 length settings, long battery, reliable results' },
      ];
    case 'Multi Groomer':
      return [
        { id: 'best', label: 'Head to toe', subtitle: '12+ attachments — beard, hair, body, nose, ears' },
        { id: 'balanced', label: 'Beard and body', subtitle: 'The key attachments with smart technology' },
        { id: 'value', label: 'Beard and styling', subtitle: 'Trim, edge, and style — the essentials' },
      ];
    case 'IPL Hair Removal':
      return [
        { id: 'best', label: 'Fastest visible results', subtitle: 'Smart skin sensor adapts intensity automatically' },
        { id: 'balanced', label: 'Steady and effective', subtitle: 'Same IPL technology, more hands-on control' },
      ];
    case 'Facial Care':
      return [
        { id: 'best', label: 'Cleanse, tone, and epilate', subtitle: 'Multiple heads for a full skincare routine' },
        { id: 'balanced', label: 'Quick facial grooming', subtitle: 'Fast, gentle hair removal on the go' },
      ];
    default:
      return [
        { id: 'best', label: 'The complete package', subtitle: 'Everything included, nothing to think about' },
        { id: 'balanced', label: 'Just what I need', subtitle: 'Great performance, straightforward setup' },
      ];
  }
}

// Panel styles — same as CategoryChapters for visual consistency
const PANEL_STYLES = [
  { bg: 'bg-gray-900', bgHover: 'bg-gray-800', accent: 'bg-gray-700/30', accentHover: 'bg-gray-700/50' },
  { bg: 'bg-gray-800', bgHover: 'bg-gray-700', accent: 'bg-gray-600/25', accentHover: 'bg-gray-600/40' },
  { bg: 'bg-[#1a1f2e]', bgHover: 'bg-[#232940]', accent: 'bg-blue-900/20', accentHover: 'bg-blue-900/35' },
];

export function PrecisionQuestion({ category, onSelect }: PrecisionQuestionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  const options = getOptions(category);
  const question = getQuestionText(category);
  const isSelected = selected !== null;
  const isTwoOptions = options.length === 2;

  const handleSelect = (option: PriorityOption) => {
    if (isSelected) return;
    setSelected(option.id);
    setTimeout(() => onSelect(option.id), 800);
  };

  return (
    <section
      ref={ref}
      className={`relative h-screen w-full overflow-hidden flex flex-col md:block transition-opacity duration-700 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Question overlay — desktop only (floats over panels) */}
      <div
        className={`hidden md:flex absolute top-0 left-0 right-0 z-20 justify-center pointer-events-none pt-[12vh] transition-all duration-700 ${
          isSelected ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="text-center px-4">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/70 mb-4 drop-shadow-lg">
            Step 3 of 4
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] drop-shadow-xl mb-4">
            {question.heading}
          </h2>
          <p className="text-white/50 text-sm drop-shadow-lg">
            {question.subtext}
          </p>
        </div>
      </div>

      {/* Question — mobile only (takes its own space, not overlapping) */}
      <div
        className={`flex md:hidden items-center justify-center bg-gray-950 px-6 py-6 transition-all duration-700 ${
          isSelected ? 'opacity-0 !h-0 !py-0' : 'opacity-100 h-[15vh]'
        }`}
      >
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70 mb-2">
            Step 3 of 4
          </p>
          <h2 className="text-xl font-black text-white leading-[1.1] mb-1">
            {question.heading}
          </h2>
          <p className="text-white/50 text-xs">
            {question.subtext}
          </p>
        </div>
      </div>

      {/* Two options: 50/50 split (like women's categories / gender) */}
      {isTwoOptions && (
        <>
          {/* Desktop */}
          <div className="hidden md:flex h-full w-full">
            {options.map((option, index) => {
              const isHovered = hoveredIndex === index;
              const style = PANEL_STYLES[index];

              const getWidth = () => {
                if (!isSelected) {
                  if (isHovered) return '55%';
                  if (hoveredIndex !== null && !isHovered) return '45%';
                  return '50%';
                }
                return selected === option.id ? '100%' : '0%';
              };

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => !isSelected && setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  disabled={isSelected}
                  className="relative h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group"
                  style={{ width: getWidth() }}
                >
                  <div className={`absolute inset-0 transition-all duration-500 ${isHovered ? style.bgHover : style.bg}`} />
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full transition-all duration-700 ${
                      isHovered ? `${style.accentHover} scale-110` : `${style.accent} scale-100`
                    }`} />
                  </div>

                  <div className={`relative z-10 h-full flex flex-col items-center justify-end pb-[15vh] px-8 transition-all duration-500 ${
                    isSelected && selected !== option.id ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                  }`}>
                    <h3 className={`text-3xl lg:text-4xl font-black text-white mb-2 transition-all duration-500 ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}>
                      {option.label}
                    </h3>
                    <p className="text-white/60 text-sm text-center max-w-xs">
                      {option.subtitle}
                    </p>
                    <div className={`mt-6 px-6 py-2.5 border border-white/30 rounded-full transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0 border-white/60' : 'opacity-0 translate-y-4'
                    }`}>
                      <span className="text-sm font-medium text-white">Select</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile — stacked */}
          <div className="flex md:hidden flex-col flex-1 w-full">
            {options.map((option, index) => {
              const style = PANEL_STYLES[index];
              const getMobileHeight = () => {
                if (!isSelected) return '50%';
                return selected === option.id ? '100%' : '0%';
              };

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  disabled={isSelected}
                  className="relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98]"
                  style={{ height: getMobileHeight() }}
                >
                  <div className={`absolute inset-0 ${style.bg}`} />
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute -bottom-10 -left-10 w-48 h-48 rounded-full ${style.accent}`} />
                  </div>
                  <div className={`relative z-10 h-full flex items-center justify-center px-6 transition-all duration-500 ${
                    isSelected && selected !== option.id ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="text-center">
                      <h3 className="text-xl font-black text-white mb-1">{option.label}</h3>
                      <p className="text-white/60 text-xs">{option.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Three options: vertical thirds (like gender but 3 panels) */}
      {!isTwoOptions && (
        <>
          {/* Desktop — 3 vertical columns with hover-grow */}
          <div className="hidden md:flex h-full w-full">
            {options.map((option, index) => {
              const isHovered = hoveredIndex === index;
              const style = PANEL_STYLES[index];

              const getWidth = () => {
                if (!isSelected) {
                  if (isHovered) return '40%';
                  if (hoveredIndex !== null && !isHovered) return '30%';
                  return '33.333%';
                }
                return selected === option.id ? '100%' : '0%';
              };

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => !isSelected && setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  disabled={isSelected}
                  className="relative h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group"
                  style={{ width: getWidth() }}
                >
                  {/* Background */}
                  <div className={`absolute inset-0 transition-all duration-500 ${isHovered ? style.bgHover : style.bg}`} />

                  {/* Geometric accent */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute -bottom-20 -right-20 w-72 h-72 rounded-full transition-all duration-700 ${
                      isHovered ? `${style.accentHover} scale-110` : `${style.accent} scale-100`
                    }`} />
                    <div className={`absolute top-1/3 left-1/4 w-40 h-40 rounded-full transition-all duration-700 ${
                      isHovered ? `${style.accentHover} scale-125` : `${style.accent} scale-100`
                    }`} />
                  </div>

                  {/* Subtle border between panels */}
                  <div className="absolute inset-0 border-r border-white/[0.04] last:border-r-0" />

                  {/* Content */}
                  <div className={`relative z-10 h-full flex flex-col items-center justify-end pb-[15vh] px-8 transition-all duration-500 ${
                    isSelected && selected !== option.id ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                  }`}>
                    <h3 className={`text-2xl lg:text-3xl font-black text-white mb-2 text-center transition-all duration-500 ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}>
                      {option.label}
                    </h3>
                    <p className="text-white/60 text-sm text-center max-w-xs">
                      {option.subtitle}
                    </p>

                    {/* Hover CTA */}
                    <div className={`mt-6 px-6 py-2.5 border border-white/30 rounded-full transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0 border-white/60' : 'opacity-0 translate-y-4'
                    }`}>
                      <span className="text-sm font-medium text-white">Select</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile — stacked equal thirds */}
          <div className="flex md:hidden flex-col flex-1 w-full">
            {options.map((option, index) => {
              const style = PANEL_STYLES[index];

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  disabled={isSelected}
                  className={`relative w-full flex-1 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] ${
                    isSelected && selected !== option.id ? 'opacity-0 !flex-[0]' : 'opacity-100'
                  }`}
                >
                  <div className={`absolute inset-0 ${style.bg}`} />
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full ${style.accent}`} />
                  </div>
                  {/* Subtle border */}
                  <div className="absolute inset-0 border-b border-white/[0.06]" />
                  <div className={`relative z-10 h-full flex items-center justify-center px-6 transition-all duration-500 ${
                    isSelected && selected !== option.id ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="text-center">
                      <h3 className="text-lg font-black text-white mb-0.5">{option.label}</h3>
                      <p className="text-white/60 text-xs">{option.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
