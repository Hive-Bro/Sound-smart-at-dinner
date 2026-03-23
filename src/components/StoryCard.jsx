const SENTIMENT_COLORS = {
  positive: 'text-green-400',
  negative: 'text-red-400',
  neutral: 'text-gray-500',
};

const SENTIMENT_LABELS = {
  positive: 'Positive',
  negative: 'Negative',
  neutral: 'Neutral',
};

const SOURCE_TYPE_COLORS = {
  rss: 'bg-blue-900/40 text-blue-300',
  reddit: 'bg-orange-900/40 text-orange-300',
  twitter: 'bg-sky-900/40 text-sky-300',
};

export default function StoryCard({ story }) {
  const {
    title,
    link,
    source,
    sourceType,
    sentiment,
    relevance,
    categories = [],
  } = story;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${SOURCE_TYPE_COLORS[sourceType] || 'bg-gray-800 text-gray-400'}`}
        >
          {source}
        </span>
        {categories.slice(0, 2).map((cat) => (
          <span
            key={cat}
            className="text-xs text-gray-500 capitalize"
          >
            {cat}
          </span>
        ))}
      </div>

      <h3 className="text-sm font-medium text-gray-200 leading-snug mb-3 line-clamp-3">
        {title}
      </h3>

      <div className="flex items-center justify-between">
        <span className={`text-xs ${SENTIMENT_COLORS[sentiment]}`}>
          {SENTIMENT_LABELS[sentiment]}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${relevance}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{relevance}</span>
        </div>
      </div>
    </a>
  );
}
