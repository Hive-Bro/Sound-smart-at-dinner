export default function TrendSummary({ summary }) {
  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-800/40 rounded-xl p-6">
      <h2 className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">
        Today's Briefing
      </h2>
      <p className="text-gray-200 leading-relaxed text-lg">{summary}</p>
    </div>
  );
}
