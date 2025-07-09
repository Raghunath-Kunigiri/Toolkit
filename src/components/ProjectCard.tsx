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
    Easy: 'bg-green-50 text-green-700',
    Medium: 'bg-yellow-50 text-yellow-700',
    Hard: 'bg-red-50 text-red-700',
  };

  return (
    <div 
      onClick={() => onExecute(project)}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gray-50 rounded-full">
            {project.icon}
          </div>
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400" />
            <span>{project.rating}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </span>
          <div className="flex items-center space-x-1">
            <Download size={14} />
            <span>{project.downloads.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;