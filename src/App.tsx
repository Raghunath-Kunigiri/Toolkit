import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import { projects, categories } from './data/projects';
import CategoryModal from './components/CategoryModal';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryProjects = projects.filter(p => p.category === category);
            return (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {category}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {categoryProjects.length} tools available
                </p>
              </div>
            );
          })}
        </div>
      </main>

      <CategoryModal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory || ''}
        projects={projects}
      />
    </div>
  );
}

export default App;