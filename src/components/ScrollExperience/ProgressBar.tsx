import type { Phase, Selections } from '../../hooks/useScrollSelector';

interface ProgressBarProps {
  phase: Phase;
  selections: Selections;
  onReset: () => void;
  onGoBack: () => void;
}

export function ProgressBar({ phase, selections, onReset, onGoBack }: ProgressBarProps) {
  // Only show during category and precision phases
  // ProductShowcase has its own integrated nav with tier tabs
  if (phase !== 'category' && phase !== 'precision') return null;

  const currentStep = phase === 'category' ? 0 : 1;

  return (
    <div className="sticky top-0 z-40 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200/60">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-11 md:h-12">
          {/* Left: Back */}
          <button
            onClick={onGoBack}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Go back to previous step"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-medium">Back</span>
          </button>

          {/* Center: Breadcrumb trail */}
          <div className="flex items-center gap-1.5">
            {selections.gender && (
              <span className="text-xs font-medium text-gray-400">
                {selections.gender === 'Men' ? "Men's" : "Women's"}
              </span>
            )}
            {selections.category && (
              <>
                <span className="text-gray-300">/</span>
                <span className="text-xs font-medium text-gray-600">
                  {selections.category}
                </span>
              </>
            )}
          </div>

          {/* Right: Start over */}
          <button
            onClick={onReset}
            className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
          >
            Start over
          </button>
        </div>

        {/* Thin progress line */}
        <div className="h-px bg-gray-200 -mx-4 md:-mx-6">
          <div
            className="h-full bg-gray-800 transition-all duration-700 ease-out"
            style={{ width: currentStep === 0 ? '50%' : '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
