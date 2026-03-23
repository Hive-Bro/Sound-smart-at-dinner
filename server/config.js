export const config = {
  rssFeeds: [
    { name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews' },
    { name: 'AP News', url: 'https://rsshub.app/apnews/topics/apf-topnews' },
    { name: 'Financial Times', url: 'https://www.ft.com/rss/home' },
    { name: 'The Economist', url: 'https://www.economist.com/rss' },
  ],
  subreddits: [
    'politics',
    'worldnews',
    'investing',
    'economics',
    'wallstreetbets',
  ],
  twitter: {
    // Configure your Twitter/X API credentials in .env
    // Add accounts and search terms below
    accounts: [],
    searchTerms: ['breaking news', 'markets', 'federal reserve'],
  },
};
