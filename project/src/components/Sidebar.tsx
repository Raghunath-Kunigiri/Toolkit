import React from 'react';
import { 
  FileText, 
  Globe, 
  Shield, 
  Wrench, 
  Image, 
  Home,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Projects', icon: Home, count: 82 },
  { id: 'file-operations', name: 'File Operations', icon: FileText, count: 25 },
  { id: 'web-tools', name: 'Web Tools', icon: Globe, count: 15 },
  { id: 'security', name: 'Security Tools', icon: Shield, count: 12 },
  { id: 'utilities', name: 'Utility Tools', icon: Wrench, count: 20 },
  { id: 'multimedia', name: 'Multimedia', icon: Image, count: 10 },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeCategory, onCategoryChange }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-md border-r border-gray-200/50 z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <nav className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-100
                    ${activeCategory === category.id 
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-gray-700 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;