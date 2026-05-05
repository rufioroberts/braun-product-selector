import { useInView } from '../../hooks/useInView';
import type { Gender } from '../../data/products';

interface BreathingMomentProps {
  gender: Gender | null;
  context: 'post-gender' | 'post-goal';
  category?: string | null;
}

const CONTENT = {
  'post-gender': {
    Men: {
      headline: 'Engineered for precision.',
      stat: '100+ years',
      statLabel: 'of German engineering',
      body: 'Every Braun product is designed with one goal: effortless results. From the first stroke to the last detail.',
    },
    Women: {
      headline: 'Beauty meets technology.',
      stat: '#1 IPL brand',
      statLabel: 'dermatologist recommended',
      body: 'Clinically proven results with technology that adapts to your skin. Professional-grade care, at home.',
    },
  },
  'post-goal': {
    'Electric Shaver': {
      headline: '9 shavers. 3 series. One perfect fit.',
      body: 'From the flagship Series 9 with sonic technology to the reliable Series 3 — every Braun shaver delivers a close, comfortable shave.',
      feature: 'AutoSense technology reads your beard density 13x per second',
    },
    'Multi Groomer': {
      headline: 'One tool. Endless possibilities.',
      body: 'Face, beard, body, nose, ears — Braun\'s all-in-one groomers handle it all with precision-engineered attachments.',
      feature: 'Up to 10 attachments for every grooming need',
    },
    'IPL Hair Removal': {
      headline: 'Visible results in 4 weeks.',
      body: 'Salon-quality IPL technology adapted for safe, effective home use. Clinically proven for long-lasting smoothness.',
      feature: 'SensoAdapt™ continuously reads your skin tone',
    },
    default: {
      headline: 'Precision in every detail.',
      body: 'German-engineered grooming tools designed to deliver professional results at home.',
      feature: 'Waterproof design for wet & dry use',
    },
  },
} as const;

export function BreathingMoment({ gender, context, category }: BreathingMomentProps) {
  const { ref, isInView } = useInView({ threshold: 0.3, once: true });

  let content: { headline: string; body: string; stat?: string; statLabel?: string; feature?: string };

  if (context === 'post-gender') {
    content = gender ? CONTENT['post-gender'][gender] : CONTENT['post-gender']['Men'];
  } else {
    const goalContent = CONTENT['post-goal'] as unknown as Record<string, { headline: string; body: string; feature: string }>;
    content = (category && goalContent[category]) || CONTENT['post-goal']['default'];
  }

  return (
    <section ref={ref} className="relative py-32 md:py-48 bg-gray-50 overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-200/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-200/30" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Stat callout */}
        {'stat' in content && content.stat && (
          <div
            className={`mb-8 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-5xl md:text-7xl font-black text-gray-900">{content.stat}</span>
            <p className="mt-2 text-sm font-medium tracking-widest uppercase text-gray-500">{content.statLabel}</p>
          </div>
        )}

        {/* Headline */}
        <h3
          className={`text-2xl md:text-4xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {content.headline}
        </h3>

        {/* Body */}
        <p
          className={`mt-6 text-lg text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {content.body}
        </p>

        {/* Feature callout */}
        {'feature' in content && content.feature && (
          <div
            className={`mt-10 inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200 transition-all duration-700 delay-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-gray-900" />
            <span className="text-sm font-medium text-gray-700">{content.feature}</span>
          </div>
        )}
      </div>
    </section>
  );
}
