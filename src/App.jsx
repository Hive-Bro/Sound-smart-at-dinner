import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import RefreshButton from './components/RefreshButton';

export default function App() {
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBriefing = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/briefing');
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setBriefing(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefing();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Sound Smart at Dinner
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Your daily intelligence briefing
            </p>
          </div>
          <div className="flex items-center gap-4">
            {briefing?.fetchedAt && (
              <span className="text-xs text-gray-500">
                Updated {new Date(briefing.fetchedAt).toLocaleTimeString()}
                {briefing.stale && ' (stale)'}
              </span>
            )}
            <RefreshButton onRefresh={fetchBriefing} loading={loading} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && !briefing && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-300">Failed to load briefing: {error}</p>
            <button
              onClick={fetchBriefing}
              className="mt-2 text-sm text-red-400 hover:text-red-300 underline"
            >
              Try again
            </button>
          </div>
        )}

        {loading && !briefing && <LoadingSkeleton />}

        {briefing && <Dashboard briefing={briefing} />}
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-32 bg-gray-800/50 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-800/50 rounded-lg" />
        ))}
      </div>
      <div className="h-48 bg-gray-800/50 rounded-lg" />
    </div>
  );
}
