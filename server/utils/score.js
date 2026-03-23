const CATEGORY_KEYWORDS = {
  politics: ['election', 'congress', 'senate', 'president', 'policy', 'democrat', 'republican', 'legislation', 'vote', 'government', 'white house', 'supreme court'],
  markets: ['stock', 'market', 'nasdaq', 'dow', 's&p', 'trading', 'investor', 'earnings', 'ipo', 'crypto', 'bitcoin', 'fed', 'interest rate', 'inflation'],
  world: ['ukraine', 'china', 'eu', 'nato', 'un', 'climate', 'war', 'trade', 'sanctions', 'global'],
  economics: ['gdp', 'unemployment', 'recession', 'inflation', 'federal reserve', 'treasury', 'debt', 'deficit', 'jobs', 'wage'],
};

const SENTIMENT_WORDS = {
  positive: ['surge', 'rally', 'gain', 'boost', 'grow', 'win', 'breakthrough', 'record', 'rise', 'soar'],
  negative: ['crash', 'fall', 'drop', 'plunge', 'crisis', 'fear', 'risk', 'collapse', 'decline', 'threat'],
};

export function scoreStories(stories) {
  return stories
    .map((story) => {
      const text = `${story.title} ${story.summary}`.toLowerCase();

      // Category detection
      const categories = [];
      for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if (keywords.some((kw) => text.includes(kw))) {
          categories.push(cat);
        }
      }

      // Sentiment
      let sentimentScore = 0;
      for (const word of SENTIMENT_WORDS.positive) {
        if (text.includes(word)) sentimentScore++;
      }
      for (const word of SENTIMENT_WORDS.negative) {
        if (text.includes(word)) sentimentScore--;
      }
      const sentiment = sentimentScore > 0 ? 'positive' : sentimentScore < 0 ? 'negative' : 'neutral';

      // Relevance score (0-100)
      let relevance = 50;
      // More categories = more relevant
      relevance += categories.length * 10;
      // Cross-domain stories (politics + markets) are especially valuable
      if (categories.includes('politics') && categories.includes('markets')) relevance += 15;
      // Reddit engagement boosts
      if (story.score) relevance += Math.min(story.score / 100, 15);
      if (story.commentCount) relevance += Math.min(story.commentCount / 50, 10);
      // Twitter engagement
      if (story.likes) relevance += Math.min(story.likes / 100, 10);
      // RSS sources are generally higher quality
      if (story.sourceType === 'rss') relevance += 5;
      // Recency boost
      const hoursOld = (Date.now() - new Date(story.publishedAt).getTime()) / (1000 * 60 * 60);
      if (hoursOld < 6) relevance += 10;
      else if (hoursOld < 24) relevance += 5;

      relevance = Math.min(100, Math.max(0, Math.round(relevance)));

      return {
        ...story,
        categories: categories.length > 0 ? categories : ['general'],
        sentiment,
        relevance,
      };
    })
    .sort((a, b) => b.relevance - a.relevance);
}
