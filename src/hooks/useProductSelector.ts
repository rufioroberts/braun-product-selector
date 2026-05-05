import { useState, useCallback, useEffect } from 'react';
import { products, type Product, type Gender, type Category, type Tier } from '../data/products';

export type Step = 'gender' | 'goal' | 'tier' | 'results';

export interface Selections {
  gender: Gender | null;
  category: Category | null;
  tier: Tier | null;
  tierLabel: string | null;
}

const STORAGE_KEY = 'braun-selector-state';

function loadFromStorage(): { step: Step; selections: Selections } | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return null;
}

function saveToStorage(step: Step, selections: Selections) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, selections }));
  } catch { /* ignore */ }
}

export function useProductSelector() {
  const stored = loadFromStorage();
  const [step, setStep] = useState<Step>(stored?.step ?? 'gender');
  const [selections, setSelections] = useState<Selections>(
    stored?.selections ?? { gender: null, category: null, tier: null, tierLabel: null }
  );

  useEffect(() => {
    saveToStorage(step, selections);
  }, [step, selections]);

  const selectGender = useCallback((gender: Gender) => {
    setSelections(prev => ({ ...prev, gender, category: null, tier: null, tierLabel: null }));
    setStep('goal');
  }, []);

  const selectCategory = useCallback((category: Category) => {
    const newSelections = { ...selections, category, tier: null, tierLabel: null };
    setSelections(newSelections);

    // Determine if we need a tier step or skip to results
    // Skip tier step for categories with ≤ 2 products
    if (category === 'Body Groomer' || category === 'Facial Care' || category === 'Beard Trimmer') {
      setStep('results');
    } else {
      setStep('tier');
    }
  }, [selections]);

  const selectTier = useCallback((tier: Tier, tierLabel: string) => {
    setSelections(prev => ({ ...prev, tier, tierLabel }));
    setStep('results');
  }, []);

  const goBack = useCallback(() => {
    if (step === 'results') {
      // Check if we skipped tier
      if (selections.tier) {
        setStep('tier');
      } else {
        setStep('goal');
      }
    } else if (step === 'tier') {
      setStep('goal');
    } else if (step === 'goal') {
      setStep('gender');
    }
  }, [step, selections]);

  const reset = useCallback(() => {
    setStep('gender');
    setSelections({ gender: null, category: null, tier: null, tierLabel: null });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Compute filtered results
  const getResults = useCallback((): Product[] => {
    let filtered = products;

    if (selections.gender) {
      filtered = filtered.filter(p => p.gender === selections.gender);
    }
    if (selections.category) {
      filtered = filtered.filter(p => p.category === selections.category);
    }
    if (selections.tier) {
      filtered = filtered.filter(p => p.tier === selections.tier);
    }

    return filtered;
  }, [selections]);

  // Get "you might also like" products for single-result paths
  const getAlsoLike = useCallback((): Product[] => {
    const results = getResults();
    if (results.length > 1) return [];

    // Get products from same category but different tier, or adjacent category
    const sameCategory = products.filter(
      p => p.category === selections.category && p.gender === selections.gender && !results.includes(p)
    );
    if (sameCategory.length > 0) return sameCategory.slice(0, 2);

    // Fallback: same gender, different category
    return products
      .filter(p => p.gender === selections.gender && p.category !== selections.category)
      .slice(0, 2);
  }, [selections, getResults]);

  const currentStepNumber = step === 'gender' ? 1 : step === 'goal' ? 2 : step === 'tier' ? 3 : 4;
  const totalSteps = needsTierStep(selections) ? 4 : 3;

  return {
    step,
    selections,
    selectGender,
    selectCategory,
    selectTier,
    goBack,
    reset,
    getResults,
    getAlsoLike,
    currentStepNumber,
    totalSteps,
  };
}

function needsTierStep(selections: Selections): boolean {
  if (!selections.category) return true; // assume yes until we know
  return !['Body Groomer', 'Facial Care', 'Beard Trimmer'].includes(selections.category);
}
