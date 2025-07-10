import React from 'react';
import { Code, Github, Star } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">
                Python<span className="text-gradient">Toolkit</span>
              </h1>
              <p className="text-sm text-secondary-600">Mini Projects Collection</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#projects" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Projects
            </a>
            <a href="#about" className="text-secondary-700 hover:text-primary-600 transition-colors">
              About
            </a>
            <a href="#docs" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Documentation
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="btn btn-outline text-sm">
              <Star className="h-4 w-4 mr-2" />
              Star
            </button>
            <button className="btn btn-primary text-sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 