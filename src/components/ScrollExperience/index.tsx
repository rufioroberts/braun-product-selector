import { useRef, useCallback } from 'react';
import { useScrollSelector } from '../../hooks/useScrollSelector';
import { HeroSection } from './HeroSection';
import { GenderReveal } from './GenderReveal';
import { CategoryChapters } from './CategoryChapters';
import { PrecisionQuestion } from './PrecisionQuestion';
import { MatchReveal } from './MatchReveal';
import { ProductShowcase } from './ProductShowcase';
import { ProgressBar } from './ProgressBar';

export function ScrollExperience() {
  const {
    phase,
    selections,
    selectGender,
    selectCategory,
    selectPriority,
    completeReveal,
    reset,
    goBackToCategories,
    goBackToPrecision,
  } = useScrollSelector();

  // Refs for auto-scrolling
  const categoryRef = useRef<HTMLDivElement>(null);
  const precisionRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Gender selected -> scroll to categories
  const handleGenderSelect = useCallback((gender: 'Men' | 'Women') => {
    selectGender(gender);
    setTimeout(() => {
      categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  }, [selectGender]);

  // Category selected -> scroll to precision question (or reveal if skipped)
  const handleCategorySelect = useCallback((category: Parameters<typeof selectCategory>[0]) => {
    selectCategory(category);
    setTimeout(() => {
      precisionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }, [selectCategory]);

  // Priority selected -> auto-scrolls to reveal
  const handlePrioritySelect = useCallback((priority: 'best' | 'balanced' | 'value') => {
    selectPriority(priority);
    // Reveal is full-screen, scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }, [selectPriority]);

  // Reveal complete -> show products
  const handleRevealComplete = useCallback(() => {
    completeReveal();
    setTimeout(() => {
      showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }, [completeReveal]);

  // Go back logic
  const handleGoBack = useCallback(() => {
    if (phase === 'showcase') {
      goBackToPrecision();
      setTimeout(() => {
        precisionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else if (phase === 'precision') {
      goBackToCategories();
      setTimeout(() => {
        categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else if (phase === 'category') {
      reset();
    }
  }, [phase, goBackToCategories, goBackToPrecision, reset]);

  // Full reset
  const handleFullReset = useCallback(() => {
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [reset]);

  return (
    <div className="relative">
      {/* Progress bar — visible during category and precision phases */}
      <ProgressBar
        phase={phase}
        selections={selections}
        onReset={handleFullReset}
        onGoBack={handleGoBack}
      />

      {/* Phase: Hero */}
      {(phase === 'hero' || phase === 'gender') && (
        <HeroSection
          onBegin={() => {
            const el = document.getElementById('section-gender');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Phase: Gender */}
      {(phase === 'hero' || phase === 'gender') && (
        <div id="section-gender">
          <GenderReveal onSelect={handleGenderSelect} selected={selections.gender} />
        </div>
      )}

      {/* Phase: Category — includes a transition bridge from gender */}
      {phase === 'category' && selections.gender && (
        <div ref={categoryRef}>
          {/* Transition bridge: dark-to-light gradient with acknowledgement */}
          <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-50 py-24 md:py-32">
            <div className="max-w-xl mx-auto px-6 text-center" style={{ animation: 'fadeSlideIn 0.8s ease-out forwards' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-white/80">
                  {selections.gender === 'Men' ? "Men's grooming" : "Women's care"} — got it
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white/90">
                Now, what are you trying to achieve?
              </h2>
              <p className="mt-3 text-gray-400 text-sm">
                Pick the goal that sounds most like you.
              </p>
            </div>
          </div>

          {/* Category options */}
          <div style={{ animation: 'fadeSlideIn 0.6s 0.2s ease-out forwards', opacity: 0 }}>
            <CategoryChapters
              gender={selections.gender}
              onSelect={handleCategorySelect}
              selected={selections.category}
            />
          </div>
        </div>
      )}

      {/* Phase: Precision Question */}
      {phase === 'precision' && selections.category && (
        <div ref={precisionRef} style={{ animation: 'fadeSlideIn 0.5s ease-out forwards' }}>
          <PrecisionQuestion
            category={selections.category}
            onSelect={handlePrioritySelect}
          />
        </div>
      )}

      {/* Phase: Match Reveal */}
      {phase === 'reveal' && selections.category && selections.matchedTier && (
        <MatchReveal
          tier={selections.matchedTier}
          category={selections.category}
          onComplete={handleRevealComplete}
        />
      )}

      {/* Phase: Product Showcase */}
      {phase === 'showcase' && selections.category && (
        <div ref={showcaseRef} style={{ animation: 'fadeSlideIn 0.5s ease-out forwards' }}>
          <ProductShowcase
            category={selections.category}
            matchedTier={selections.matchedTier}
            onReset={handleGoBack}
            onFullReset={handleFullReset}
          />
        </div>
      )}
    </div>
  );
}
