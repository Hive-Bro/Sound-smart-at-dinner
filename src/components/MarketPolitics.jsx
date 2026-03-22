export default function MarketPolitics({ connections }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {connections.map((conn, i) => (
        <div
          key={i}
          className="bg-gray-900 border border-gray-800 rounded-lg p-4 border-l-4 border-l-emerald-600"
        >
          <h3 className="text-sm font-semibold text-emerald-400 mb-2">
            {conn.headline}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {conn.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}
