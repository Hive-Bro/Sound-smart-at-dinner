const colorMap = {
  red: {
    accent: 'text-red-400',
    badge: 'bg-red-900/60 text-red-300',
    button: 'bg-red-600 hover:bg-red-500',
    divider: 'bg-red-800/30',
  },
  blue: {
    accent: 'text-blue-400',
    badge: 'bg-blue-900/60 text-blue-300',
    button: 'bg-blue-600 hover:bg-blue-500',
    divider: 'bg-blue-800/30',
  },
  green: {
    accent: 'text-green-400',
    badge: 'bg-green-900/60 text-green-300',
    button: 'bg-green-600 hover:bg-green-500',
    divider: 'bg-green-800/30',
  },
  purple: {
    accent: 'text-purple-400',
    badge: 'bg-purple-900/60 text-purple-300',
    button: 'bg-purple-600 hover:bg-purple-500',
    divider: 'bg-purple-800/30',
  },
  cyan: {
    accent: 'text-cyan-400',
    badge: 'bg-cyan-900/60 text-cyan-300',
    button: 'bg-cyan-600 hover:bg-cyan-500',
    divider: 'bg-cyan-800/30',
  },
  amber: {
    accent: 'text-amber-400',
    badge: 'bg-amber-900/60 text-amber-300',
    button: 'bg-amber-600 hover:bg-amber-500',
    divider: 'bg-amber-800/30',
  },
};

export default function SynthesisView({ synthesis, categoryName, categoryColor, onBack, onStartReading }) {
  const c = colorMap[categoryColor] || colorMap.blue;
  const paragraphs = synthesis.body.split('\n\n');

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top bar */}
      <header className="border-b border-gray-800/50 sticky top-0 z-10 bg-gray-950/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{synthesis.readTime} min read</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>{synthesis.wordCount} words</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>{synthesis.sourcesUsed} sources</span>
          </div>
        </div>
      </header>

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Category label */}
        <span className={`text-xs font-medium tracking-widest uppercase ${c.accent}`}>
          {categoryName}
        </span>

        {/* Title */}
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
          {synthesis.title}
        </h1>

        {/* Meta line */}
        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
          <span>AI-synthesized briefing</span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Divider */}
        <div className={`mt-8 h-px w-16 ${c.divider}`} />

        {/* Body */}
        <div className="mt-8 space-y-5">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-gray-300 leading-relaxed text-[16.5px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-12 h-px bg-gray-800/50" />

        {/* Start Reading button */}
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-sm text-gray-500 mb-4">
            Ready to speed-read the full source articles?
          </p>
          <button
            onClick={onStartReading}
            className={`
              ${c.button} text-white font-semibold px-8 py-3.5 rounded-xl
              transition-all duration-200 ease-out
              hover:shadow-lg hover:-translate-y-0.5
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-gray-600
              flex items-center gap-2.5
            `}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            Start Reading
          </button>
        </div>
      </article>
    </div>
  );
}
