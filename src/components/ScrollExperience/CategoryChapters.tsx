import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import type { Gender, Category } from '../../data/products';

interface CategoryChaptersProps {
  gender: Gender;
  onSelect: (category: Category) => void;
  selected: Category | null;
}

interface GoalOption {
  category: Category;
  title: string;
  subtitle: string;
}

const MEN_GOALS: GoalOption[] = [
  {
    category: 'Electric Shaver',
    title: 'Electric Shavers',
    subtitle: 'The closest possible shave',
  },
  {
    category: 'Beard Trimmer',
    title: 'Beard Trimmers',
    subtitle: 'Shape and maintain with precision',
  },
  {
    category: 'Multi Groomer',
    title: 'Multi Groomers',
    subtitle: 'One tool for everything',
  },
  {
    category: 'Body Groomer',
    title: 'Body Groomers',
    subtitle: 'Below-the-neck grooming',
  },
];

const WOMEN_GOALS: GoalOption[] = [
  {
    category: 'IPL Hair Removal',
    title: 'IPL Hair Removal',
    subtitle: 'Long-term hair removal at home',
  },
  {
    category: 'Facial Care',
    title: 'Facial Care',
    subtitle: 'Gentle removal and skincare',
  },
];

// Each panel gets a slightly different dark tone for visual separation
const PANEL_STYLES = [
  { bg: 'bg-gray-900', bgHover: 'bg-gray-800', accent: 'bg-gray-700/30', accentHover: 'bg-gray-700/50' },
  { bg: 'bg-gray-800', bgHover: 'bg-gray-700', accent: 'bg-gray-600/25', accentHover: 'bg-gray-600/40' },
  { bg: 'bg-[#1a1f2e]', bgHover: 'bg-[#232940]', accent: 'bg-blue-900/20', accentHover: 'bg-blue-900/35' },
  { bg: 'bg-[#1f1a1a]', bgHover: 'bg-[#2a2222]', accent: 'bg-red-900/15', accentHover: 'bg-red-900/25' },
];

export function CategoryChapters({ gender, onSelect, selected }: CategoryChaptersProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  const goals = gender === 'Men' ? MEN_GOALS : WOMEN_GOALS;
  const isWomen = gender === 'Women';
  const isSelected = selected !== null;

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
            Step 2 of 4
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] drop-shadow-xl">
            What are you looking for?
          </h2>
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
            Step 2 of 4
          </p>
          <h2 className="text-xl font-black text-white leading-[1.1]">
            What are you looking for?
          </h2>
        </div>
      </div>

      {/* Women: 50/50 vertical split (same pattern as gender) */}
      {isWomen && (
        <>
          {/* Desktop */}
          <div className="hidden md:flex h-full w-full">
            {goals.map((goal, index) => {
              const isHovered = hoveredIndex === index;
              const style = PANEL_STYLES[index];

              const getWidth = () => {
                if (!isSelected) {
                  if (isHovered) return '55%';
                  if (hoveredIndex !== null && !isHovered) return '45%';
                  return '50%';
                }
                return selected === goal.category ? '100%' : '0%';
              };

              return (
                <button
                  key={goal.category}
                  onClick={() => !isSelected && onSelect(goal.category)}
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
                    isSelected && selected !== goal.category ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                  }`}>
                    <h3 className={`text-3xl lg:text-4xl font-black text-white mb-2 transition-all duration-500 ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}>
                      {goal.title}
                    </h3>
                    <p className="text-white/60 text-sm text-center max-w-xs">
                      {goal.subtitle}
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
            {goals.map((goal, index) => {
              const style = PANEL_STYLES[index];
              const getMobileHeight = () => {
                if (!isSelected) return '50%';
                return selected === goal.category ? '100%' : '0%';
              };

              return (
                <button
                  key={goal.category}
                  onClick={() => !isSelected && onSelect(goal.category)}
                  disabled={isSelected}
                  className="relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98]"
                  style={{ height: getMobileHeight() }}
                >
                  <div className={`absolute inset-0 ${style.bg}`} />
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute -bottom-10 -left-10 w-48 h-48 rounded-full ${style.accent}`} />
                  </div>
                  <div className={`relative z-10 h-full flex items-center justify-center px-6 transition-all duration-500 ${
                    isSelected && selected !== goal.category ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="text-center">
                      <h3 className="text-xl font-black text-white mb-1">{goal.title}</h3>
                      <p className="text-white/60 text-xs">{goal.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Men: 4 vertical columns with hover-grow */}
      {!isWomen && (
        <>
          {/* Desktop — 4 vertical columns */}
          <div className="hidden md:flex h-full w-full">
            {goals.map((goal, index) => {
              const isHovered = hoveredIndex === index;
              const style = PANEL_STYLES[index];

              const getWidth = () => {
                if (!isSelected) {
                  if (isHovered) return '34%';
                  if (hoveredIndex !== null && !isHovered) return '22%';
                  return '25%';
                }
                return selected === goal.category ? '100%' : '0%';
              };

              return (
                <button
                  key={goal.category}
                  onClick={() => !isSelected && onSelect(goal.category)}
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
                    <div className={`absolute -bottom-16 -right-16 w-56 h-56 rounded-full transition-all duration-700 ${
                      isHovered ? `${style.accentHover} scale-110` : `${style.accent} scale-100`
                    }`} />
                    <div className={`absolute top-1/3 left-1/4 w-32 h-32 rounded-full transition-all duration-700 ${
                      isHovered ? `${style.accentHover} scale-125` : `${style.accent} scale-100`
                    }`} />
                  </div>

                  {/* Subtle border between panels */}
                  <div className="absolute inset-0 border-r border-white/[0.04] last:border-r-0" />

                  {/* Content */}
                  <div className={`relative z-10 h-full flex flex-col items-center justify-end pb-[15vh] px-6 transition-all duration-500 ${
                    isSelected && selected !== goal.category ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                  }`}>
                    <h3 className={`text-xl lg:text-2xl font-black text-white mb-2 text-center transition-all duration-500 ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}>
                      {goal.title}
                    </h3>
                    <p className="text-white/60 text-xs text-center max-w-[180px]">
                      {goal.subtitle}
                    </p>

                    {/* Hover CTA */}
                    <div className={`mt-5 px-5 py-2 border border-white/30 rounded-full transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0 border-white/60' : 'opacity-0 translate-y-4'
                    }`}>
                      <span className="text-sm font-medium text-white">Select</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile — stacked equal quarters */}
          <div className="flex md:hidden flex-col flex-1 w-full">
            {goals.map((goal, index) => {
              const style = PANEL_STYLES[index];

              return (
                <button
                  key={goal.category}
                  onClick={() => !isSelected && onSelect(goal.category)}
                  disabled={isSelected}
                  className={`relative w-full flex-1 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] ${
                    isSelected && selected !== goal.category ? 'opacity-0 !flex-[0]' : 'opacity-100'
                  }`}
                >
                  <div className={`absolute inset-0 ${style.bg}`} />
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full ${style.accent}`} />
                  </div>
                  {/* Subtle border */}
                  <div className="absolute inset-0 border-b border-white/[0.06]" />
                  <div className={`relative z-10 h-full flex items-center justify-center px-6 transition-all duration-500 ${
                    isSelected && selected !== goal.category ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="text-center">
                      <h3 className="text-lg font-black text-white mb-0.5">{goal.title}</h3>
                      <p className="text-white/60 text-xs">{goal.subtitle}</p>
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
