import React, { useState } from 'react';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ExecutionModal from './components/ExecutionModal';
import HeroSection from './components/HeroSection';
import { projects, getProjectsByCategory, Project } from './data/projects';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [executionModalOpen, setExecutionModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayedProjects = getProjectsByCategory(activeCategory);

  const handleProjectExecute = (project: Project) => {
    setSelectedProject(project);
    setExecutionModalOpen(true);
  };

  const categoryNames: { [key: string]: string } = {
    'all': 'All Projects',
    'file-operations': 'File Operations',
    'web-tools': 'Web Tools',
    'security': 'Security Tools',
    'utilities': 'Utility Tools',
    'multimedia': 'Multimedia Tools',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <main className="flex-1 min-h-screen">
        {activeCategory === 'all' && (
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                Number 1 Best Reviewed All-in-One Tools
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Finding the perfect tool that does it all can be a real challenge. We've curated the best, most reliable tools to help you get the job done efficiently.
              </p>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              {categoryNames[activeCategory]}
            </h2>
            <p className="text-lg text-gray-600 text-center">
              Click on any tool to access! ({displayedProjects.length} tools available)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedProjects.map((project) => (
              <div key={project.id} className="transform transition duration-300 hover:-translate-y-1">
                <ProjectCard
                  project={project}
                  onExecute={handleProjectExecute}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Choose Our Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Totally Free', desc: 'No hidden fees or subscriptions' },
                { title: 'No Downloads', desc: 'Everything runs in your browser' },
                { title: 'Safe & Secure', desc: 'We never store your files' },
                { title: 'Easy to Use', desc: 'No technical skills required' },
              ].map((feature, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <ExecutionModal
        isOpen={executionModalOpen}
        onClose={() => setExecutionModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

export default App;