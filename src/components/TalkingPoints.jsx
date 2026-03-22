const CONTEXT_STYLES = {
  dinner: { label: 'Dinner', className: 'bg-amber-900/30 text-amber-300' },
  business: { label: 'Business', className: 'bg-blue-900/30 text-blue-300' },
  debate: { label: 'Debate', className: 'bg-red-900/30 text-red-300' },
};

export default function TalkingPoints({ topics }) {
  return (
    <div className="space-y-6">
      {topics.map((topic, i) => (
        <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <h3 className="text-base font-semibold text-white mb-3">
            {topic.topic}
          </h3>
          <ul className="space-y-3">
            {topic.points.map((point, j) => {
              const ctx = CONTEXT_STYLES[point.context] || CONTEXT_STYLES.dinner;
              return (
                <li key={j} className="pl-4 border-l-2 border-gray-700">
                  <p className="text-gray-200">
                    <strong className="text-white">{point.claim}</strong>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{point.support}</p>
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full mt-2 ${ctx.className}`}
                  >
                    {ctx.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
