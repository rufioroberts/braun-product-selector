import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import type { Category } from '../../data/products';

interface PrecisionQuestionProps {
  category: Category;
  onSelect: (priority: 'best' | 'balanced' | 'value') => void;
}

interface PriorityOption {
  id: 'best' | 'balanced' | 'value';
  label: string;
  description: string;
}

function getOptions(category: Category): PriorityOption[] {
  switch (category) {
    case 'Electric Shaver':
      return [
        { id: 'best', label: 'The absolute best shave possible', description: 'I want zero compromise on closeness and comfort.' },
        { id: 'balanced', label: 'Great shave, fair price', description: 'Smart tech without the premium extras.' },
        { id: 'value', label: 'Reliable daily shaver', description: 'Gets the job done well. No fuss.' },
      ];
    case 'Beard Trimmer':
      return [
        { id: 'best', label: 'Maximum precision and control', description: 'Smart motor that reads my beard density.' },
        { id: 'balanced', label: 'Same precision, simpler package', description: '39 settings and great battery. Just less packaging.' },
      ];
    case 'Multi Groomer':
      return [
        { id: 'best', label: 'Every attachment, every scenario', description: 'I want the full kit for head-to-toe grooming.' },
        { id: 'balanced', label: 'Versatile but focused', description: 'Core attachments with smart tech.' },
        { id: 'value', label: 'Simple and effective', description: 'Basic trimming and styling done right.' },
      ];
    default:
      return [
        { id: 'best', label: 'The best result possible', description: 'Top performance, regardless of price.' },
        { id: 'balanced', label: 'Great performance, fair price', description: 'The sweet spot of value and quality.' },
      ];
  }
}

export function PrecisionQuestion({ category, onSelect }: PrecisionQuestionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });

  const options = getOptions(category);

  return (
    <section ref={ref} className="relative py-12 md:py-28 bg-white min-h-[80vh] md:min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 md:px-6 w-full">
        {/* Question header */}
        <div
          className={`text-center mb-8 md:mb-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-2 md:mb-3">
            Step 3 of 4
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900">
            What matters most to you?
          </h2>
          <p className="mt-2 md:mt-3 text-gray-500 text-sm">
            This helps us match you to the right level.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => {
            const isHovered = hoveredId === option.id;

            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                onMouseEnter={() => setHoveredId(option.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group w-full text-left rounded-xl p-4 md:p-6 transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                } ${
                  isHovered
                    ? 'bg-gray-900 shadow-xl scale-[1.02]'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
                style={{
                  transitionDelay: isInView ? `${index * 100 + 300}ms` : '0ms',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`text-base md:text-xl font-bold transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-gray-900'
                    }`}>
                      {option.label}
                    </h3>
                    <p className={`mt-0.5 md:mt-1 text-xs md:text-sm transition-colors duration-300 ${
                      isHovered ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {option.description}
                    </p>
                  </div>

                  {/* Selection indicator */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'bg-white/20'
                      : 'bg-white border border-gray-200 group-hover:border-gray-300'
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
