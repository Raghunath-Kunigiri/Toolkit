import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProjectCard from './components/ProjectCard';
import ExecutionModal from './components/ExecutionModal';
import HeroSection from './components/HeroSection';
import { projects, getProjectsByCategory, Project } from './data/projects';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <main className="flex-1 min-h-screen">
          {activeCategory === 'all' && <HeroSection />}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {categoryNames[activeCategory]}
              </h2>
              <p className="text-gray-600">
                {displayedProjects.length} project{displayedProjects.length !== 1 ? 's' : ''} available
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onExecute={handleProjectExecute}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
      
      <ExecutionModal
        isOpen={executionModalOpen}
        onClose={() => setExecutionModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

export default App;