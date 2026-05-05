import type { Phase, Selections } from '../../hooks/useScrollSelector';

interface ProgressBarProps {
  phase: Phase;
  selections: Selections;
  onReset: () => void;
  onGoBack: () => void;
}

export function ProgressBar({ phase, selections, onReset, onGoBack }: ProgressBarProps) {
  // Only show during interactive phases (not hero, gender, reveal, or showcase)
  if (phase === 'hero' || phase === 'gender' || phase === 'reveal' || phase === 'showcase') return null;

  const progressWidth = phase === 'category' ? '33%' : phase === 'precision' ? '66%' : '100%';

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between">
          {/* Left: Back button */}
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 px-3 py-2 -ml-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors group"
            aria-label="Go back to previous step"
          >
            <svg className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
              Back
            </span>
          </button>

          {/* Center: Breadcrumb chips */}
          <div className="hidden md:flex items-center gap-1.5">
            {selections.gender && (
              <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {selections.gender === 'Men' ? 'Men\'s' : 'Women\'s'}
              </span>
            )}
            {selections.category && (
              <>
                <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  {selections.category}
                </span>
              </>
            )}
          </div>

          {/* Right: Start over */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 -mr-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Start over</span>
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="h-0.5 bg-gray-100">
        <div
          className="h-full bg-gray-900 transition-all duration-700 ease-out"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
}
