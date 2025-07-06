import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, Zap, Code, Users, Star } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectRunner from '../components/ProjectRunner';
import toast from 'react-hot-toast';

const Home = () => {
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isRunnerOpen, setIsRunnerOpen] = useState(false);
  const [runningProjects, setRunningProjects] = useState(new Set());
  const [projectResults, setProjectResults] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || {});
    } catch (error) {
      toast.error('Failed to fetch projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunProject = (project) => {
    setSelectedProject({
      id: Object.keys(projects).find(key => projects[key].name === project.name),
      ...project
    });
    setIsRunnerOpen(true);
  };

  const handleProjectRun = (projectId, result) => {
    setProjectResults(prev => ({
      ...prev,
      [projectId]: result
    }));
    setRunningProjects(prev => new Set([...prev].filter(id => id !== projectId)));
  };

  const filteredProjects = Object.entries(projects).filter(([key, project]) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(Object.values(projects).map(p => p.category))];

  const stats = {
    total: Object.keys(projects).length,
    categories: new Set(Object.values(projects).map(p => p.category)).size,
    runs: Object.keys(projectResults).length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4 w-8 h-8"></div>
          <p className="text-secondary-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Python<span className="text-yellow-300">Toolkit</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A comprehensive collection of Python mini projects and utilities
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-blue-100">
              <div className="flex items-center">
                <Code className="h-6 w-6 mr-2" />
                <span className="text-lg font-semibold">{stats.total}</span>
                <span className="ml-1">Projects</span>
              </div>
              <div className="flex items-center">
                <Filter className="h-6 w-6 mr-2" />
                <span className="text-lg font-semibold">{stats.categories}</span>
                <span className="ml-1">Categories</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-6 w-6 mr-2" />
                <span className="text-lg font-semibold">{stats.runs}</span>
                <span className="ml-1">Runs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <button
                onClick={fetchProjects}
                className="btn btn-outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(([key, project]) => (
            <ProjectCard
              key={key}
              project={project}
              onRun={handleRunProject}
              isRunning={runningProjects.has(key)}
              lastResult={projectResults[key]}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No projects found</h3>
            <p className="text-secondary-600">
              Try adjusting your search terms or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Why Choose PythonToolkit?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Powerful, easy-to-use Python utilities that solve real-world problems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Instant Execution</h3>
              <p className="text-secondary-600">
                Run Python scripts instantly through our web interface. No local setup required.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">User Friendly</h3>
              <p className="text-secondary-600">
                Simple, intuitive interface that makes complex Python tools accessible to everyone.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Production Ready</h3>
              <p className="text-secondary-600">
                Thoroughly tested utilities ready for real-world use in your projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Runner Modal */}
      <ProjectRunner
        project={selectedProject}
        isOpen={isRunnerOpen}
        onClose={() => setIsRunnerOpen(false)}
        onRun={handleProjectRun}
      />
    </div>
  );
};

export default Home; 