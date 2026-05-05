import { useEffect, useRef, useState } from 'react';

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Progress: 0 when element top enters viewport bottom, 1 when element bottom exits viewport top
      const totalDistance = windowHeight + elementHeight;
      const traveled = windowHeight - rect.top;
      const p = Math.max(0, Math.min(1, traveled / totalDistance));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, progress };
}
