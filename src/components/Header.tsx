import React from 'react';
import { Code, Github, Search, FileText, Globe, Shield, Wrench, Image, Home } from 'lucide-react';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Projects', icon: Home },
  { id: 'file-operations', name: 'File Operations', icon: FileText },
  { id: 'web-tools', name: 'Web Tools', icon: Globe },
  { id: 'security', name: 'Security Tools', icon: Shield },
  { id: 'utilities', name: 'Utility Tools', icon: Wrench },
  { id: 'multimedia', name: 'Multimedia', icon: Image },
];

const Header: React.FC<HeaderProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Code size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">All-in-One Tools</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Free Online Tools</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden sm:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools..."
                className="w-72 pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 transition-colors placeholder-gray-400"
              />
            </div>
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer" 
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Github size={22} />
            </a>
          </div>
        </div>
        
        {/* Navigation Bar */}
        <nav className="flex space-x-1 pb-4 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeCategory === category.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={18} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;