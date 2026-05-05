import { useInView } from '../../hooks/useInView';

export function HeroSection({ onBegin }: { onBegin: () => void }) {
  const { ref: titleRef, isInView: titleVisible } = useInView({ threshold: 0.3, once: true });
  const { ref: subtitleRef, isInView: subtitleVisible } = useInView({ threshold: 0.3, once: true });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gray-800/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gray-700/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Precision lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-600/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600/20 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        {/* Brand mark */}
        <div className="mb-8 md:mb-12 opacity-60">
          <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 border border-gray-600 rounded-sm">
            <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-gray-300">BRAUN</span>
          </div>
        </div>

        {/* Campaign name */}
        <div ref={titleRef}>
          <p
            className={`text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gray-500 mb-4 md:mb-6 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Quest for Precision
          </p>
          <h1
            className={`text-3xl md:text-6xl lg:text-7xl font-black text-white leading-[1] md:leading-[0.95] tracking-tight transition-all duration-1000 delay-200 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Let's find your
            <br />
            <span className="text-gray-400">perfect match.</span>
          </h1>
        </div>

        <div ref={subtitleRef}>
          <p
            className={`mt-5 md:mt-8 text-base md:text-xl text-gray-400 max-w-md mx-auto transition-all duration-1000 delay-400 ${
              subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Tell us what matters.
            <br className="hidden md:block" />
            We'll do the rest.
          </p>

          <button
            onClick={onBegin}
            className={`mt-8 md:mt-12 group relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-gray-900 font-semibold text-base md:text-lg rounded-full transition-all duration-1000 delay-600 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 ${
              subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span>Find my match</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
