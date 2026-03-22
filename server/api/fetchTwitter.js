// Twitter/X API integration
// Requires a Twitter API Bearer Token in .env as TWITTER_BEARER_TOKEN
// Falls back gracefully if not configured

export async function fetchTwitter(twitterConfig) {
  const token = process.env.TWITTER_BEARER_TOKEN;
  if (!token) {
    console.warn('Twitter: No TWITTER_BEARER_TOKEN set, skipping Twitter fetch');
    return [];
  }

  const { searchTerms = [] } = twitterConfig;
  if (searchTerms.length === 0) return [];

  const results = await Promise.allSettled(
    searchTerms.map((term) => searchTweets(token, term))
  );

  return results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value);
}

async function searchTweets(token, query) {
  try {
    const params = new URLSearchParams({
      query: `${query} -is:retweet lang:en`,
      max_results: '10',
      'tweet.fields': 'created_at,public_metrics,text',
    });

    const res = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error(`Twitter API ${res.status}`);

    const data = await res.json();
    return (data.data || []).map((tweet) => ({
      title: tweet.text.slice(0, 120),
      link: `https://twitter.com/i/web/status/${tweet.id}`,
      summary: tweet.text,
      source: 'Twitter/X',
      sourceType: 'twitter',
      publishedAt: tweet.created_at || new Date().toISOString(),
      likes: tweet.public_metrics?.like_count || 0,
      retweets: tweet.public_metrics?.retweet_count || 0,
    }));
  } catch (err) {
    console.warn(`Failed to search Twitter for "${query}": ${err.message}`);
    return [];
  }
}
