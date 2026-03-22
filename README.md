# Sound Smart at Dinner

A personal intelligence briefing dashboard that aggregates news, RSS feeds, and social media across politics, current events, finance, and markets — then uses AI to synthesize trend summaries and sharp talking points.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   - `ANTHROPIC_API_KEY` (required) — get one at https://console.anthropic.com
   - `TWITTER_BEARER_TOKEN` (optional) — for Twitter/X integration

3. **Start the app:**
   ```bash
   npm run dev
   ```
   This starts both the Express backend (port 3001) and Vite dev server (port 5173).

4. **Open** http://localhost:5173

## How It Works

- **Data Ingestion**: Fetches from RSS feeds (Reuters, AP, FT, Economist), Reddit (politics, worldnews, investing, economics, wallstreetbets), and optionally Twitter/X
- **AI Synthesis**: Claude analyzes all stories and generates trend summaries, market-politics connections, and talking points
- **Dashboard**: Clean single-page app showing your daily briefing

## Customization

Edit `server/config.js` to:
- Add/remove RSS feeds
- Change which subreddits to follow
- Configure Twitter search terms and accounts

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **AI**: Anthropic Claude API (claude-sonnet)
