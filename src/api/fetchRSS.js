const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

const RSS_FEEDS = [
  { name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews' },
  { name: 'AP News', url: 'https://rsshub.app/apnews/topics/apf-topnews' },
  { name: 'Financial Times', url: 'https://www.ft.com/rss/home' },
  { name: 'The Economist', url: 'https://www.economist.com/rss' },
];

export async function fetchAllRSS() {
  const results = await Promise.allSettled(
    RSS_FEEDS.map((feed) => fetchSingleFeed(feed))
  );
  return results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value);
}

async function fetchSingleFeed({ name, url }) {
  try {
    const res = await fetch(CORS_PROXY + encodeURIComponent(url), {
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    return parseRSSXml(text, name);
  } catch (err) {
    console.warn(`Failed to fetch RSS from ${name}: ${err.message}`);
    return [];
  }
}

function parseRSSXml(xml, sourceName) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const items = doc.querySelectorAll('item');
  const stories = [];

  items.forEach((item, i) => {
    if (i >= 10) return;
    const title = item.querySelector('title')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';

    // Strip HTML tags from description
    const summary = description.replace(/<[^>]*>/g, '').slice(0, 300);

    stories.push({
      title,
      link,
      summary,
      source: sourceName,
      sourceType: 'rss',
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
    });
  });

  return stories;
}
