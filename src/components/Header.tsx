import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Python Tools
          </h1>
          <nav>
            <a
              href="https://github.com/Raghunath-Kunigiri/Toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;