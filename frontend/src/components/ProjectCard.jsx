import React from 'react';
import { Play, Settings, Tag, Clock, CheckCircle } from 'lucide-react';

const ProjectCard = ({ project, onRun, isRunning, lastResult }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Utility': 'bg-blue-100 text-blue-800',
      'Security': 'bg-red-100 text-red-800',
      'Web': 'bg-green-100 text-green-800',
      'Image': 'bg-purple-100 text-purple-800',
      'Audio': 'bg-yellow-100 text-yellow-800',
      'API': 'bg-indigo-100 text-indigo-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Utility':
        return '🛠️';
      case 'Security':
        return '🔒';
      case 'Web':
        return '🌐';
      case 'Image':
        return '🖼️';
      case 'Audio':
        return '🎵';
      case 'API':
        return '🔗';
      default:
        return '📦';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getCategoryIcon(project.category)}</div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">{project.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                  <Tag className="h-3 w-3 mr-1" />
                  {project.category}
                </span>
                {lastResult && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Last run successful
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => onRun(project)}
            disabled={isRunning}
            className={`btn ${isRunning ? 'btn-secondary opacity-50' : 'btn-primary'} text-sm`}
          >
            {isRunning ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run
              </>
            )}
          </button>
        </div>

        {/* Description */}
        <p className="text-secondary-600 mb-4 line-clamp-2">{project.description}</p>

        {/* Parameters */}
        {project.parameters && project.parameters.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-secondary-700 mb-2 flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              Parameters
            </h4>
            <div className="space-y-2">
              {project.parameters.slice(0, 3).map((param, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-secondary-600">{param.name}</span>
                  <span className="text-secondary-400 text-xs">{param.type}</span>
                </div>
              ))}
              {project.parameters.length > 3 && (
                <div className="text-xs text-secondary-400">
                  +{project.parameters.length - 3} more...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Last Result Preview */}
        {lastResult && (
          <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
            <h4 className="text-sm font-medium text-secondary-700 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Last Result
            </h4>
            <div className="text-xs text-secondary-600 font-mono">
              {typeof lastResult === 'string' 
                ? lastResult.substring(0, 100) + (lastResult.length > 100 ? '...' : '')
                : JSON.stringify(lastResult, null, 2).substring(0, 100) + '...'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 