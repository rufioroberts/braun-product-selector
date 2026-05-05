import { useState, useCallback, useEffect } from 'react';
import type { Gender, Category, Tier } from '../data/products';

export type Phase = 'hero' | 'gender' | 'category' | 'precision' | 'reveal' | 'showcase';

export interface Selections {
  gender: Gender | null;
  category: Category | null;
  priority: 'best' | 'balanced' | 'value' | null;
  matchedTier: Tier | null;
}

const STORAGE_KEY = 'braun-scroll-v3';

// Map priority answers to tiers
function mapPriorityToTier(priority: 'best' | 'balanced' | 'value'): Tier {
  switch (priority) {
    case 'best': return 'Premium';
    case 'balanced': return 'Mid-Range';
    case 'value': return 'Entry';
  }
}

// Some categories only have 1-2 tiers — skip precision question
export function categoryHasMultipleTiers(category: Category): boolean {
  const multiTierCategories: Category[] = ['Electric Shaver', 'Multi Groomer', 'Beard Trimmer'];
  return multiTierCategories.includes(category);
}

export function useScrollSelector() {
  const [phase, setPhase] = useState<Phase>('hero');
  const [selections, setSelections] = useState<Selections>({
    gender: null,
    category: null,
    priority: null,
    matchedTier: null,
  });

  // Load from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { phase: p, selections: s } = JSON.parse(stored);
        setPhase(p);
        setSelections(s);
      }
    } catch { /* ignore */ }
  }, []);

  // Save to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ phase, selections }));
    } catch { /* ignore */ }
  }, [phase, selections]);

  const selectGender = useCallback((gender: Gender) => {
    setSelections({ gender, category: null, priority: null, matchedTier: null });
    setPhase('category');
  }, []);

  const selectCategory = useCallback((category: Category) => {
    setSelections(prev => ({ ...prev, category, priority: null, matchedTier: null }));
    // If category only has 1-2 tiers, skip precision question and go to reveal
    if (categoryHasMultipleTiers(category)) {
      setPhase('precision');
    } else {
      // Auto-match to the best available tier
      setSelections(prev => ({ ...prev, category, priority: 'best', matchedTier: 'Premium' }));
      setPhase('reveal');
    }
  }, []);

  const selectPriority = useCallback((priority: 'best' | 'balanced' | 'value') => {
    const matchedTier = mapPriorityToTier(priority);
    setSelections(prev => ({ ...prev, priority, matchedTier }));
    setPhase('reveal');
  }, []);

  const completeReveal = useCallback(() => {
    setPhase('showcase');
  }, []);

  const reset = useCallback(() => {
    setSelections({ gender: null, category: null, priority: null, matchedTier: null });
    setPhase('hero');
    localStorage.removeItem(STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBackToCategories = useCallback(() => {
    setSelections(prev => ({ ...prev, category: null, priority: null, matchedTier: null }));
    setPhase('category');
  }, []);

  const goBackToPrecision = useCallback(() => {
    setSelections(prev => ({ ...prev, priority: null, matchedTier: null }));
    setPhase('precision');
  }, []);

  return {
    phase,
    selections,
    selectGender,
    selectCategory,
    selectPriority,
    completeReveal,
    reset,
    goBackToCategories,
    goBackToPrecision,
  };
}
