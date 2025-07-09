import React from 'react';
import { Play, Star, Download, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    tags: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    downloads: number;
    rating: number;
  };
  onExecute: (project: any) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onExecute }) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              {project.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {project.name}
              </h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty]}`}>
                {project.difficulty}
              </span>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Star size={16} className="text-gray-400 hover:text-yellow-500" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Download size={14} />
              <span>{project.downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star size={14} />
              <span>{project.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ExternalLink size={16} className="text-gray-500" />
            </button>
            <button 
              onClick={() => onExecute(project)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Play size={16} />
              <span>Run</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;