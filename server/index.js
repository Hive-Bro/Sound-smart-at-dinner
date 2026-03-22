import express from 'express';
import cors from 'cors';
import { fetchAllRSS } from './api/fetchRSS.js';
import { fetchReddit } from './api/fetchReddit.js';
import { fetchTwitter } from './api/fetchTwitter.js';
import { synthesize } from './api/synthesize.js';
import { dedupe } from './utils/dedupe.js';
import { scoreStories } from './utils/score.js';
import { config } from './config.js';

const app = express();
app.use(cors());
app.use(express.json());

let cache = null;

app.get('/api/briefing', async (req, res) => {
  try {
    // Fetch from all sources in parallel
    const [rssStories, redditStories, twitterStories] = await Promise.allSettled([
      fetchAllRSS(config.rssFeeds),
      fetchReddit(config.subreddits),
      fetchTwitter(config.twitter),
    ]);

    const allStories = [
      ...(rssStories.status === 'fulfilled' ? rssStories.value : []),
      ...(redditStories.status === 'fulfilled' ? redditStories.value : []),
      ...(twitterStories.status === 'fulfilled' ? twitterStories.value : []),
    ];

    // Deduplicate and score
    const unique = dedupe(allStories);
    const scored = scoreStories(unique);

    // Synthesize with Claude
    const synthesis = await synthesize(scored);

    cache = { stories: scored, synthesis, fetchedAt: new Date().toISOString() };
    res.json(cache);
  } catch (err) {
    console.error('Briefing error:', err);
    // Return cache if available
    if (cache) {
      return res.json({ ...cache, stale: true });
    }
    res.status(500).json({ error: 'Failed to generate briefing' });
  }
});

app.get('/api/stories', async (req, res) => {
  try {
    const [rssStories, redditStories, twitterStories] = await Promise.allSettled([
      fetchAllRSS(config.rssFeeds),
      fetchReddit(config.subreddits),
      fetchTwitter(config.twitter),
    ]);

    const allStories = [
      ...(rssStories.status === 'fulfilled' ? rssStories.value : []),
      ...(redditStories.status === 'fulfilled' ? redditStories.value : []),
      ...(twitterStories.status === 'fulfilled' ? twitterStories.value : []),
    ];

    const unique = dedupe(allStories);
    const scored = scoreStories(unique);
    res.json(scored);
  } catch (err) {
    console.error('Stories error:', err);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
