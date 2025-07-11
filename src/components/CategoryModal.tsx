import React, { useState } from 'react';
import { Project } from '../data/projects';
import PDFConverterModal from './PDFConverterModal';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  projects: Project[];
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, category, projects }) => {
  const [pdfConverterOpen, setPdfConverterOpen] = useState(false);

  if (!isOpen) return null;

  const categoryProjects = projects.filter(project => project.category === category);

  const handleProjectAction = (project: Project, action?: () => void) => {
    if (project.filename === 'pdf_converter.py') {
      setPdfConverterOpen(true);
    } else if (action) {
      action();
    } else if (project.action) {
      project.action();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-[80%] max-w-4xl max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="text-2xl text-gray-600 dark:text-gray-300">
                      {project.icon}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {project.options && project.options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white dark:bg-gray-600 p-3 rounded-md"
                      >
                        <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
                        <button
                          onClick={() => handleProjectAction(project, option.action)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Run
                        </button>
                      </div>
                    ))}
                    {!project.options && (
                      <button
                        onClick={() => handleProjectAction(project)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Run Project
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PDFConverterModal
        isOpen={pdfConverterOpen}
        onClose={() => setPdfConverterOpen(false)}
      />
    </>
  );
};

export default CategoryModal; 