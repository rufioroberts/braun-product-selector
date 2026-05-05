import { Eye } from 'lucide-react';

interface AccessibilityHintProps {
  children: React.ReactNode;
}

export function AccessibilityHint({ children }: AccessibilityHintProps) {
  return (
    <div className="border-2 border-dashed border-teal-300 bg-teal-50 rounded-lg p-4 my-4">
      <div className="flex items-start gap-2">
        <Eye className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">Accessibility</span>
          <p className="text-sm text-teal-800 mt-1">{children}</p>
        </div>
      </div>
    </div>
  );
}
