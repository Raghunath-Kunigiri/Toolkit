import React from 'react';
import { ArrowRight, Code, Zap, Shield } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Python Mini
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Projects
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive collection of Python utility tools and scripts. 
            From file operations to security tools, execute projects directly in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <span>Explore Projects</span>
              <ArrowRight size={20} />
            </button>
            <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Code size={20} />
              <span>View on GitHub</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/70 transition-colors">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">45+ Projects</h3>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">37+ Projects</h3>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">82+ Projects</h3>
            <p className="text-gray-600">Ready-to-use Python scripts across multiple categories</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/70 transition-colors">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Execution</h3>
            <p className="text-gray-600">Run projects directly in your browser with real-time output</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/70 transition-colors">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Production Ready</h3>
            <p className="text-gray-600">Well-tested, documented, and secure implementations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;