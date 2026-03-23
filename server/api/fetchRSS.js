import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'SoundSmartAtDinner/1.0',
  },
});

export async function fetchAllRSS(feeds) {
  const results = await Promise.allSettled(
    feeds.map((feed) => fetchSingleFeed(feed))
  );

  return results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value);
}

async function fetchSingleFeed({ name, url }) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).slice(0, 10).map((item) => ({
      title: item.title || '',
      link: item.link || '',
      summary: item.contentSnippet || item.content || '',
      source: name,
      sourceType: 'rss',
      publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
    }));
  } catch (err) {
    console.warn(`Failed to fetch RSS from ${name}: ${err.message}`);
    return [];
  }
}
