import TrendSummary from './TrendSummary';
import StoryCard from './StoryCard';
import TalkingPoints from './TalkingPoints';
import MarketPolitics from './MarketPolitics';

export default function Dashboard({ briefing }) {
  const { stories = [], synthesis } = briefing;
  const topStories = stories.slice(0, 12);

  return (
    <div className="space-y-10">
      {synthesis?.trendSummary && (
        <TrendSummary summary={synthesis.trendSummary} />
      )}

      {synthesis?.marketPoliticsConnections?.length > 0 && (
        <section>
          <SectionHeader title="Market-Politics Connections" />
          <MarketPolitics connections={synthesis.marketPoliticsConnections} />
        </section>
      )}

      {synthesis?.talkingPoints?.length > 0 && (
        <section>
          <SectionHeader title="Today's Talking Points" />
          <TalkingPoints topics={synthesis.talkingPoints} />
        </section>
      )}

      {synthesis?.uncertainties?.length > 0 && (
        <section>
          <SectionHeader title="Watch List" subtitle="Contested or developing" />
          <ul className="space-y-2">
            {synthesis.uncertainties.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-gray-400 text-sm"
              >
                <span className="text-yellow-500 mt-0.5">!</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {topStories.length > 0 && (
        <section>
          <SectionHeader
            title="Top Stories"
            subtitle={`${stories.length} stories from ${new Set(stories.map((s) => s.source)).size} sources`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topStories.map((story, i) => (
              <StoryCard key={i} story={story} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}
