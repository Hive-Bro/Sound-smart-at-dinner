const colorMap = {
  red: {
    bg: 'bg-red-950/40',
    border: 'border-red-800/30',
    hoverBorder: 'hover:border-red-600/50',
    icon: 'text-red-400',
    badge: 'bg-red-900/60 text-red-300',
    glow: 'hover:shadow-red-900/20',
  },
  blue: {
    bg: 'bg-blue-950/40',
    border: 'border-blue-800/30',
    hoverBorder: 'hover:border-blue-600/50',
    icon: 'text-blue-400',
    badge: 'bg-blue-900/60 text-blue-300',
    glow: 'hover:shadow-blue-900/20',
  },
  green: {
    bg: 'bg-green-950/40',
    border: 'border-green-800/30',
    hoverBorder: 'hover:border-green-600/50',
    icon: 'text-green-400',
    badge: 'bg-green-900/60 text-green-300',
    glow: 'hover:shadow-green-900/20',
  },
  purple: {
    bg: 'bg-purple-950/40',
    border: 'border-purple-800/30',
    hoverBorder: 'hover:border-purple-600/50',
    icon: 'text-purple-400',
    badge: 'bg-purple-900/60 text-purple-300',
    glow: 'hover:shadow-purple-900/20',
  },
  cyan: {
    bg: 'bg-cyan-950/40',
    border: 'border-cyan-800/30',
    hoverBorder: 'hover:border-cyan-600/50',
    icon: 'text-cyan-400',
    badge: 'bg-cyan-900/60 text-cyan-300',
    glow: 'hover:shadow-cyan-900/20',
  },
  amber: {
    bg: 'bg-amber-950/40',
    border: 'border-amber-800/30',
    hoverBorder: 'hover:border-amber-600/50',
    icon: 'text-amber-400',
    badge: 'bg-amber-900/60 text-amber-300',
    glow: 'hover:shadow-amber-900/20',
  },
};

const icons = {
  shield: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
    </svg>
  ),
  landmark: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
  ),
  chart: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
  flask: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  cpu: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
    </svg>
  ),
  globe: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
    </svg>
  ),
};

export default function CategoryCard({ name, icon, color, articleCount, onClick }) {
  const c = colorMap[color] || colorMap.blue;

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full text-left rounded-2xl border p-6
        transition-all duration-200 ease-out
        ${c.bg} ${c.border} ${c.hoverBorder} ${c.glow}
        hover:shadow-lg hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-950
      `}
    >
      <div className="flex items-start justify-between">
        <div className={`${c.icon} transition-transform duration-200 group-hover:scale-110`}>
          {icons[icon]}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.badge}`}>
          {articleCount} {articleCount === 1 ? 'article' : 'articles'}
        </span>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-100 tracking-tight group-hover:text-white transition-colors">
        {name}
      </h2>
      <div className="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
        <span>Read now</span>
        <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </button>
  );
}
