import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import RefreshButton from './components/RefreshButton';
import SettingsPanel from './components/SettingsPanel';
import { fetchAllRSS } from './api/fetchRSS';
import { fetchReddit } from './api/fetchReddit';
import { synthesize } from './api/synthesize';
import { dedupe } from './utils/dedupe';
import { scoreStories } from './utils/score';

export default function App() {
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('anthropic_api_key') || '');

  const handleSaveKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('anthropic_api_key', key);
    } else {
      localStorage.removeItem('anthropic_api_key');
    }
  };

  const fetchBriefing = async () => {
    setLoading(true);
    setError(null);
    try {
      const [rssStories, redditStories] = await Promise.allSettled([
        fetchAllRSS(),
        fetchReddit(),
      ]);

      const allStories = [
        ...(rssStories.status === 'fulfilled' ? rssStories.value : []),
        ...(redditStories.status === 'fulfilled' ? redditStories.value : []),
      ];

      if (allStories.length === 0) {
        throw new Error('Could not fetch stories from any source. Check your connection.');
      }

      const unique = dedupe(allStories);
      const scored = scoreStories(unique);

      let synthesis = null;
      if (apiKey) {
        try {
          synthesis = await synthesize(scored, apiKey);
        } catch (err) {
          console.warn('Synthesis failed:', err.message);
        }
      }

      setBriefing({
        stories: scored,
        synthesis,
        fetchedAt: new Date().toISOString(),
      });
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
              </span>
            )}
            <button
              onClick={() => setShowSettings(true)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <RefreshButton onRefresh={fetchBriefing} loading={loading} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!apiKey && !loading && (
          <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-300 text-sm">
              No API key set — showing stories without AI synthesis.{' '}
              <button
                onClick={() => setShowSettings(true)}
                className="underline hover:text-yellow-200"
              >
                Add your Anthropic API key
              </button>{' '}
              for trend summaries and talking points.
            </p>
          </div>
        )}

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

      {showSettings && (
        <SettingsPanel
          apiKey={apiKey}
          onSave={handleSaveKey}
          onClose={() => setShowSettings(false)}
        />
      )}
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
