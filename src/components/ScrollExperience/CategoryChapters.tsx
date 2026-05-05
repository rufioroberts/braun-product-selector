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
  goal: string;
  description: string;
  productCount: number;
}

const MEN_GOALS: GoalOption[] = [
  {
    category: 'Electric Shaver',
    goal: 'The closest possible shave',
    description: 'Clean-shaven, smooth skin, no irritation.',
    productCount: 9,
  },
  {
    category: 'Beard Trimmer',
    goal: 'Shape and maintain my beard',
    description: '39 length settings. Define edges, maintain length.',
    productCount: 2,
  },
  {
    category: 'Multi Groomer',
    goal: 'One tool for everything',
    description: 'Face, beard, body, nose, ears. One device.',
    productCount: 4,
  },
  {
    category: 'Body Groomer',
    goal: 'Below-the-neck grooming',
    description: 'Body hair management with skin protection.',
    productCount: 1,
  },
];

const WOMEN_GOALS: GoalOption[] = [
  {
    category: 'IPL Hair Removal',
    goal: 'Long-term hair removal',
    description: 'Salon-quality IPL at home. Visible results in 4 weeks.',
    productCount: 3,
  },
  {
    category: 'Facial Care',
    goal: 'Facial hair removal and skincare',
    description: 'Gentle removal and cleansing in one routine.',
    productCount: 2,
  },
];

export function CategoryChapters({ gender, onSelect, selected: _selected }: CategoryChaptersProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  const goals = gender === 'Men' ? MEN_GOALS : WOMEN_GOALS;

  return (
    <section ref={ref} className="relative min-h-[calc(100dvh-44px)] md:min-h-0 py-6 md:py-6 bg-gray-50 flex items-center">
      <div className="max-w-2xl mx-auto px-5 md:px-6 w-full">

        {/* Goal options */}
        <div className="space-y-3 md:space-y-2.5">
          {goals.map((goal, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <button
                key={goal.category}
                onClick={() => onSelect(goal.category)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group w-full text-left rounded-xl p-5 md:p-6 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                } ${
                  isHovered
                    ? 'bg-gray-900 shadow-xl scale-[1.02]'
                    : 'bg-white shadow-md hover:shadow-lg border border-gray-100'
                }`}
                style={{
                  transitionDelay: isInView ? `${index * 80 + 200}ms` : '0ms',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`text-base md:text-xl font-bold transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-gray-900'
                    }`}>
                      {goal.goal}
                    </h3>
                    <p className={`mt-0.5 md:mt-1 text-xs md:text-sm transition-colors duration-300 ${
                      isHovered ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {goal.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'bg-white/20'
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <svg className={`w-5 h-5 transition-all duration-300 ${
                      isHovered ? 'text-white translate-x-0.5' : 'text-gray-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
