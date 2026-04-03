export default function SynthesisLoading({ categoryName, categoryColor }) {
  const accentMap = {
    red: 'text-red-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
  };

  const barMap = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    amber: 'bg-amber-500',
  };

  const accent = accentMap[categoryColor] || 'text-gray-400';
  const bar = barMap[categoryColor] || 'bg-gray-500';

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="max-w-md w-full px-6 text-center">
        {/* Pulsing icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800">
            <svg
              className={`w-8 h-8 ${accent} animate-pulse`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">
          Synthesizing {categoryName}
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Analyzing sources, extracting key facts, and building your briefing...
        </p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${bar} rounded-full animate-synthesis-bar`}
          />
        </div>

        {/* Fake status lines */}
        <div className="mt-6 space-y-2 text-left">
          <StatusLine text="Scanning 7 sources..." delay="0s" />
          <StatusLine text="Cross-referencing key figures..." delay="0.6s" />
          <StatusLine text="Generating deep-dive synthesis..." delay="1.2s" />
        </div>
      </div>
    </div>
  );
}

function StatusLine({ text, delay }) {
  return (
    <div
      className="flex items-center gap-2 text-xs text-gray-600 opacity-0 animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <span className="w-1 h-1 rounded-full bg-gray-700 shrink-0" />
      {text}
    </div>
  );
}
