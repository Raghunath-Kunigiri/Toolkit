import React, { useState } from 'react';
import { Play, Star, Download, ExternalLink, FileCode } from 'lucide-react';
import PDFConverterModal from './PDFConverterModal';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    tags: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    filename: string;
  };
  onExecute: (project: any) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onExecute }) => {
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  
  const difficultyColors = {
    Easy: 'bg-green-50 text-green-700 border-green-100',
    Medium: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    Hard: 'bg-red-50 text-red-700 border-red-100',
  };

  const handleClick = () => {
    if (project.id === 'pdf-converter') {
      setIsPDFModalOpen(true);
    } else {
      onExecute(project);
    }
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition duration-300 group"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
              {project.icon}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </span>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium group-hover:bg-blue-50/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
            <div className="flex items-center space-x-2">
              <FileCode size={16} className="text-gray-400" />
              <span className="font-mono text-xs">{project.filename}</span>
            </div>
            <button 
              className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              <Play size={14} />
              <span>Run</span>
            </button>
          </div>
        </div>
      </div>

      {project.id === 'pdf-converter' && (
        <PDFConverterModal
          isOpen={isPDFModalOpen}
          onClose={() => setIsPDFModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;