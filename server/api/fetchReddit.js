export async function fetchReddit(subreddits) {
  const results = await Promise.allSettled(
    subreddits.map((sub) => fetchSubreddit(sub))
  );

  return results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value);
}

async function fetchSubreddit(subreddit) {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`,
      {
        headers: {
          'User-Agent': 'SoundSmartAtDinner/1.0',
        },
      }
    );

    if (!res.ok) throw new Error(`Reddit ${res.status}`);

    const data = await res.json();
    const posts = data?.data?.children || [];

    return posts
      .filter((p) => !p.data.stickied)
      .map((p) => ({
        title: p.data.title,
        link: `https://reddit.com${p.data.permalink}`,
        summary: p.data.selftext?.slice(0, 300) || '',
        source: `r/${subreddit}`,
        sourceType: 'reddit',
        publishedAt: new Date(p.data.created_utc * 1000).toISOString(),
        score: p.data.score,
        commentCount: p.data.num_comments,
      }));
  } catch (err) {
    console.warn(`Failed to fetch r/${subreddit}: ${err.message}`);
    return [];
  }
}
