import { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface DesignerHintProps {
  children: React.ReactNode;
  position?: 'inline' | 'top-right' | 'bottom-right';
}

export function DesignerHint({ children, position = 'inline' }: DesignerHintProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (position === 'inline') {
    return (
      <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-4 my-4">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Designer Hint</span>
            <p className="text-sm text-blue-800 mt-1">{children}</p>
          </div>
        </div>
      </div>
    );
  }

  const positionClasses = position === 'top-right'
    ? 'fixed top-32 right-4 z-40'
    : 'fixed bottom-20 right-4 z-40';

  return (
    <div className={`${positionClasses} max-w-xs border-2 border-dashed border-blue-300 bg-blue-50/95 backdrop-blur-sm rounded-lg p-3 shadow-lg`}>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-blue-400 hover:text-blue-600"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-start gap-2 pr-4">
        <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Designer Hint</span>
          <p className="text-xs text-blue-800 mt-0.5 leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}
