import CategoryCard from './components/CategoryCard';
import { categories } from './data/mockNews';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-sm font-medium tracking-widest uppercase text-gray-500 mb-2">
            Speed Reader
          </p>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Today's Briefing
          </h1>
          <p className="mt-2 text-gray-400 text-lg">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              name={cat.name}
              icon={cat.icon}
              color={cat.color}
              articleCount={cat.articleCount}
              onClick={() => console.log(`Navigate to ${cat.key}`)}
            />
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-800/50 mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-xs text-gray-600 text-center">
            Sound Smart at Dinner &middot; Your personal intelligence briefing
          </p>
        </div>
      </footer>
    </div>
  );
}
