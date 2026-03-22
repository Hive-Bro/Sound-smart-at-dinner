# CLAUDE.md — Personal Intelligence Briefing App

## Project Overview

A personal dashboard that aggregates news, RSS feeds, and social media (Twitter/X, Reddit)
across politics, current events, finance, and markets — then uses AI to synthesize
the information into trend summaries and sharp talking points. The goal is to make
the user sound genuinely informed in social settings, business meetings, and debates,
and to understand how political events connect to market movements.

This is a single-user personal tool. There is no auth system, no multi-tenancy,
and no public-facing UI needed.

---

## Core Features

### 1. Data Ingestion
- Pull from RSS feeds (configurable list of news sources)
- Pull from Reddit (subreddits: r/politics, r/worldnews, r/investing, r/economics, r/stocks)
- Pull from Twitter/X (curated list of accounts and search terms)
- All fetching happens on-demand when the user opens the app — no background workers needed at first

### 2. AI Synthesis (Claude API)
- Summarize top trends across all sources in plain English
- Identify connections between political events and market movements
- Generate 3–5 punchy, accurate talking points per major topic
- Talking points should be calibrated for: dinner/social conversations, business meetings, and debate contexts
- Flag where expert opinions conflict or where data is uncertain

### 3. Dashboard UI
- Single-page app — clean, fast, readable
- Sections: Top Stories, Market-Politics Connections, Today's Talking Points
- Each story card shows: headline, source, sentiment signal, and relevance score
- Talking points displayed as a scannable list — bold claim, one-sentence support
- "Refresh" button triggers a fresh fetch + re-synthesis on demand

---

## Tech Stack

Claude Code should choose the most appropriate stack, but here are preferences:
- **Frontend**: React (Vite) — fast, component-based, easy to iterate
- **Backend**: Node.js with Express — simple API routes for fetching and AI calls
- **AI**: Anthropic Claude API (claude-sonnet) for summarization and talking point generation
- **Data**: No database needed initially — fetch fresh on each load, cache in memory
- **Styling**: Tailwind CSS — utility-first, no design system overhead

If a simpler approach (e.g. pure frontend with serverless functions) achieves the same
result, prefer simplicity over architecture.

---

## Project Structure (suggested)

```
src/
├── App.jsx                  # Main layout and state
├── components/
│   ├── Dashboard.jsx        # Top-level view
│   ├── StoryCard.jsx        # Individual news item
│   ├── TalkingPoints.jsx    # AI-generated briefing points
│   ├── TrendSummary.jsx     # AI narrative summary
│   └── RefreshButton.jsx    # Triggers full re-fetch
├── api/
│   ├── fetchRSS.js          # RSS feed parser
│   ├── fetchReddit.js       # Reddit API calls
│   ├── fetchTwitter.js      # Twitter/X API calls
│   └── synthesize.js        # Claude API integration
└── utils/
    ├── dedupe.js            # Remove duplicate stories across sources
    └── score.js             # Relevance scoring logic
```

---

## Content Sources (starting list — user can expand)

### RSS / News
- Reuters: https://feeds.reuters.com/reuters/topNews
- AP News: https://rsshub.app/apnews/topics/apf-topnews
- Financial Times (free): https://www.ft.com/rss/home
- The Economist: https://www.economist.com/rss

### Reddit
- r/politics
- r/worldnews
- r/investing
- r/economics
- r/wallstreetbets (for market sentiment signals)

### Twitter/X
- Accounts and search terms to be configured by user in a `config.js` file

---

## AI Prompt Guidelines

When calling the Claude API for synthesis, follow these principles:
- **Tone**: Confident, clear, non-partisan where possible — present multiple angles
- **Talking points**: Lead with a bold, memorable claim; follow with one supporting fact
- **Market-politics links**: Be specific — name the sector, the policy, the mechanism
- **Uncertainty**: Always flag when something is contested or early-stage
- **Length**: Summaries max 150 words; talking points max 2 sentences each

---

## Development Conventions

- Keep components small and single-purpose
- All API keys in `.env` — never hardcoded
- `.env.example` must be kept up to date
- Prefer readable code over clever code — this is a personal tool, maintainability matters
- Add a `README.md` with setup instructions (npm install, env vars needed, npm run dev)

---

## Out of Scope (for now)

- User accounts or authentication
- Saving/bookmarking stories
- Push notifications or scheduled digests
- Mobile app
- Deployment / hosting setup
