export function dedupe(stories) {
  const seen = new Map();

  for (const story of stories) {
    const key = normalizeTitle(story.title);
    if (!seen.has(key)) {
      seen.set(key, story);
    } else {
      // Keep the version with more info or from a higher-priority source
      const existing = seen.get(key);
      if (sourceRank(story.sourceType) < sourceRank(existing.sourceType)) {
        seen.set(key, story);
      }
    }
  }

  return Array.from(seen.values());
}

function normalizeTitle(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 8)
    .join(' ');
}

function sourceRank(type) {
  const ranks = { rss: 0, reddit: 1, twitter: 2 };
  return ranks[type] ?? 3;
}
