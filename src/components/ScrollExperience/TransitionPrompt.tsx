import { useInView } from '../../hooks/useInView';

interface TransitionPromptProps {
  message: string;
  subMessage?: string;
  onContinue: () => void;
  buttonLabel?: string;
}

/**
 * A clear "you chose X, here's what's next" moment between phases.
 * Orients the user and gives them a deliberate action to continue.
 */
export function TransitionPrompt({ message, subMessage, onContinue, buttonLabel = 'Continue' }: TransitionPromptProps) {
  const { ref, isInView } = useInView({ threshold: 0.3, once: true });

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Confirmation checkmark */}
        <div
          className={`mb-6 transition-all duration-500 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-900">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h3
          className={`text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {message}
        </h3>

        {subMessage && (
          <p
            className={`mt-3 text-gray-500 transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {subMessage}
          </p>
        )}

        {/* Continue button */}
        <button
          onClick={onContinue}
          className={`mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-700 delay-300 hover:scale-105 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span>{buttonLabel}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
