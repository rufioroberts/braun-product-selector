import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface EdgeCase {
  id: number;
  title: string;
  description: string;
}

const edgeCases: EdgeCase[] = [
  { id: 1, title: 'Single result path', description: 'Body Groomer (1 product) — shows "You might also like" recovery' },
  { id: 2, title: 'All products', description: '"Show me everything" — full grid with sort/filter' },
  { id: 3, title: 'Back navigation', description: 'User goes back mid-flow, selections preserved' },
  { id: 4, title: 'Mobile viewport', description: '375px width, stacked layout, touch targets' },
  { id: 5, title: 'Return visitor', description: 'localStorage restores previous selections' },
];

interface EdgeCaseViewerProps {
  onTrigger?: (id: number) => void;
}

export function EdgeCaseViewer({ onTrigger }: EdgeCaseViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button - fixed bottom */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-red-900 text-white text-xs font-bold rounded-full shadow-lg hover:bg-red-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <AlertTriangle className="w-4 h-4" />
        Edge Cases
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-14 left-4 z-50 w-80 max-h-80 overflow-y-auto bg-white border-2 border-red-900 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-3 border-b border-red-100">
            <h3 className="text-sm font-bold text-red-900">Edge Cases</h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-2 space-y-1">
            {edgeCases.map(ec => (
              <button
                key={ec.id}
                type="button"
                onClick={() => onTrigger?.(ec.id)}
                className="w-full text-left p-2 rounded hover:bg-red-50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-red-900 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                    {ec.id}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{ec.title}</p>
                    <p className="text-xs text-gray-500">{ec.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
