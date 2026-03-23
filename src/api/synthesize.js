export async function synthesize(stories, apiKey) {
  if (!apiKey) {
    return null;
  }

  const topStories = stories.slice(0, 30);
  const storySummaries = topStories
    .map(
      (s, i) =>
        `${i + 1}. [${s.source}] ${s.title}${s.summary ? `\n   ${s.summary.slice(0, 200)}` : ''}`
    )
    .join('\n');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `You are a personal intelligence briefing analyst. Analyze these news stories and social media posts from today and produce a briefing.

Here are today's top stories from various sources:

${storySummaries}

Produce a JSON response with this exact structure:
{
  "trendSummary": "A 100-150 word narrative summary of the most important trends across politics, markets, and world events today. Be confident and clear.",
  "marketPoliticsConnections": [
    {
      "headline": "Short connection headline",
      "explanation": "1-2 sentences explaining how a political event connects to market movements. Name specific sectors, policies, and mechanisms."
    }
  ],
  "talkingPoints": [
    {
      "topic": "Topic name",
      "points": [
        {
          "claim": "Bold, memorable claim (1 sentence)",
          "support": "One supporting fact or context (1 sentence)",
          "context": "dinner|business|debate"
        }
      ]
    }
  ],
  "uncertainties": ["Things that are contested or too early to call"]
}

Guidelines:
- Generate 2-4 market-politics connections
- Generate 3-5 topics with 2-3 talking points each
- Talking points should make someone sound genuinely informed, not like they're reading headlines
- Be non-partisan but direct — present multiple angles where relevant
- Flag genuine uncertainties
- Respond with ONLY valid JSON, no markdown fences`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.content[0].text;

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Failed to parse synthesis response');
  }
}
