import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-secondary-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg">
                <Code className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900">PythonToolkit</h3>
            </div>
            <p className="text-secondary-600 mb-4">
              A comprehensive collection of Python mini projects and utilities. 
              From calculators to QR generators, find the perfect tool for your needs.
            </p>
            <div className="flex items-center space-x-4 text-sm text-secondary-500">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1 text-red-500" />
                Made with love
              </div>
              <div className="flex items-center">
                <Coffee className="h-4 w-4 mr-1 text-amber-500" />
                Powered by coffee
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-secondary-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#projects" className="text-secondary-600 hover:text-primary-600 transition-colors">Projects</a></li>
              <li><a href="#about" className="text-secondary-600 hover:text-primary-600 transition-colors">About</a></li>
              <li><a href="#docs" className="text-secondary-600 hover:text-primary-600 transition-colors">Documentation</a></li>
              <li><a href="#api" className="text-secondary-600 hover:text-primary-600 transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-secondary-900 mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#utility" className="text-secondary-600 hover:text-primary-600 transition-colors">Utility</a></li>
              <li><a href="#security" className="text-secondary-600 hover:text-primary-600 transition-colors">Security</a></li>
              <li><a href="#web" className="text-secondary-600 hover:text-primary-600 transition-colors">Web Tools</a></li>
              <li><a href="#image" className="text-secondary-600 hover:text-primary-600 transition-colors">Image Processing</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary-600">
            © 2024 PythonToolkit. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-secondary-400 hover:text-secondary-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-400 hover:text-secondary-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-secondary-400 hover:text-secondary-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 