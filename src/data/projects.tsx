import React from 'react';
import { 
  FileText, 
  Globe, 
  Shield, 
  Wrench, 
  Image as ImageIcon,
  FileImage,
  FileUp,
  FileDown,
  Link,
  Lock,
  Key,
  Calculator,
  Clock,
  QrCode,
  Camera,
  Palette,
  Trash2,
  Search,
  Hash,
  Wifi,
  Settings,
  DollarSign,
  Calendar,
  Mail,
  Database,
  Archive,
  Scissors,
  RefreshCw,
  Eye,
  Download,
  Upload,
  Zap
} from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  downloads: number;
  rating: number;
}

export const projects: Project[] = [
  // File Operations
  {
    id: 'pdf-converter',
    name: 'PDF Converter',
    description: 'Convert various file formats to PDF including images, Word documents, and text files.',
    category: 'file-operations',
    icon: <FileText size={20} className="text-blue-600" />,
    tags: ['pdf', 'conversion', 'documents'],
    difficulty: 'Easy',
    downloads: 15420,
    rating: 4.8
  },
  {
    id: 'image-converter',
    name: 'Image Format Converter',
    description: 'Convert between different image formats (PNG, JPG, WEBP, BMP, etc.) with quality control.',
    category: 'file-operations',
    icon: <FileImage size={20} className="text-green-600" />,
    tags: ['images', 'conversion', 'formats'],
    difficulty: 'Easy',
    downloads: 12380,
    rating: 4.7
  },
  {
    id: 'file-compressor',
    name: 'File Compressor',
    description: 'Compress files and folders into ZIP archives with customizable compression levels.',
    category: 'file-operations',
    icon: <Archive size={20} className="text-purple-600" />,
    tags: ['compression', 'zip', 'archive'],
    difficulty: 'Medium',
    downloads: 8950,
    rating: 4.6
  },
  {
    id: 'csv-json-converter',
    name: 'CSV to JSON Converter',
    description: 'Convert CSV files to JSON format and vice versa with custom field mapping.',
    category: 'file-operations',
    icon: <Database size={20} className="text-teal-600" />,
    tags: ['csv', 'json', 'data'],
    difficulty: 'Easy',
    downloads: 7620,
    rating: 4.5
  },
  {
    id: 'file-organizer',
    name: 'File Organizer',
    description: 'Automatically organize files by type, date, or custom rules into structured folders.',
    category: 'file-operations',
    icon: <Settings size={20} className="text-indigo-600" />,
    tags: ['organization', 'automation', 'files'],
    difficulty: 'Medium',
    downloads: 6340,
    rating: 4.4
  },
  {
    id: 'duplicate-finder',
    name: 'Duplicate File Finder',
    description: 'Find and remove duplicate files based on content hash or file metadata.',
    category: 'file-operations',
    icon: <Search size={20} className="text-red-600" />,
    tags: ['duplicates', 'cleanup', 'optimization'],
    difficulty: 'Medium',
    downloads: 5890,
    rating: 4.3
  },

  // Web Tools
  {
    id: 'website-checker',
    name: 'Website Connectivity Checker',
    description: 'Check if websites are online and measure response times with detailed reports.',
    category: 'web-tools',
    icon: <Globe size={20} className="text-blue-600" />,
    tags: ['monitoring', 'uptime', 'performance'],
    difficulty: 'Easy',
    downloads: 9840,
    rating: 4.7
  },
  {
    id: 'link-extractor',
    name: 'Link Extractor',
    description: 'Extract all links from web pages with filtering and export options.',
    category: 'web-tools',
    icon: <Link size={20} className="text-green-600" />,
    tags: ['scraping', 'links', 'extraction'],
    difficulty: 'Medium',
    downloads: 4560,
    rating: 4.2
  },
  {
    id: 'dns-lookup',
    name: 'DNS Record Lookup',
    description: 'Perform comprehensive DNS lookups including A, AAAA, MX, NS, and TXT records.',
    category: 'web-tools',
    icon: <Eye size={20} className="text-purple-600" />,
    tags: ['dns', 'networking', 'lookup'],
    difficulty: 'Medium',
    downloads: 3780,
    rating: 4.5
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    description: 'Create custom short URLs with analytics and expiration options.',
    category: 'web-tools',
    icon: <Scissors size={20} className="text-teal-600" />,
    tags: ['urls', 'shortening', 'analytics'],
    difficulty: 'Hard',
    downloads: 8920,
    rating: 4.6
  },

  // Security Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable length, complexity, and character sets.',
    category: 'security',
    icon: <Key size={20} className="text-red-600" />,
    tags: ['passwords', 'security', 'encryption'],
    difficulty: 'Easy',
    downloads: 18340,
    rating: 4.9
  },
  {
    id: 'file-encryptor',
    name: 'File Encryptor',
    description: 'Encrypt and decrypt files using AES-256 encryption with password protection.',
    category: 'security',
    icon: <Lock size={20} className="text-orange-600" />,
    tags: ['encryption', 'security', 'files'],
    difficulty: 'Hard',
    downloads: 6780,
    rating: 4.8
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and other hash values for files and text.',
    category: 'security',
    icon: <Hash size={20} className="text-indigo-600" />,
    tags: ['hashing', 'checksum', 'verification'],
    difficulty: 'Easy',
    downloads: 5640,
    rating: 4.4
  },
  {
    id: 'wifi-analyzer',
    name: 'WiFi Network Analyzer',
    description: 'Analyze WiFi networks, check signal strength, and security configurations.',
    category: 'security',
    icon: <Wifi size={20} className="text-blue-600" />,
    tags: ['wifi', 'networking', 'security'],
    difficulty: 'Medium',
    downloads: 4920,
    rating: 4.3
  },

  // Utility Tools
  {
    id: 'calculator',
    name: 'Scientific Calculator',
    description: 'Advanced calculator with scientific functions, unit conversions, and history.',
    category: 'utilities',
    icon: <Calculator size={20} className="text-green-600" />,
    tags: ['math', 'calculations', 'science'],
    difficulty: 'Easy',
    downloads: 11230,
    rating: 4.6
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Real-time currency conversion with historical rates and multiple currencies.',
    category: 'utilities',
    icon: <DollarSign size={20} className="text-yellow-600" />,
    tags: ['currency', 'finance', 'conversion'],
    difficulty: 'Medium',
    downloads: 8760,
    rating: 4.7
  },
  {
    id: 'time-tracker',
    name: 'Time Tracker',
    description: 'Track time spent on tasks with reports, tags, and productivity analytics.',
    category: 'utilities',
    icon: <Clock size={20} className="text-purple-600" />,
    tags: ['productivity', 'tracking', 'time'],
    difficulty: 'Medium',
    downloads: 7890,
    rating: 4.5
  },
  {
    id: 'task-scheduler',
    name: 'Task Scheduler',
    description: 'Schedule and automate tasks with cron-like syntax and email notifications.',
    category: 'utilities',
    icon: <Calendar size={20} className="text-blue-600" />,
    tags: ['scheduling', 'automation', 'tasks'],
    difficulty: 'Hard',
    downloads: 4560,
    rating: 4.4
  },
  {
    id: 'email-validator',
    name: 'Email Validator',
    description: 'Validate email addresses with DNS checking and disposable email detection.',
    category: 'utilities',
    icon: <Mail size={20} className="text-teal-600" />,
    tags: ['email', 'validation', 'verification'],
    difficulty: 'Medium',
    downloads: 6730,
    rating: 4.3
  },
  {
    id: 'system-monitor',
    name: 'System Monitor',
    description: 'Monitor system resources including CPU, memory, disk usage, and network activity.',
    category: 'utilities',
    icon: <Zap size={20} className="text-red-600" />,
    tags: ['monitoring', 'system', 'performance'],
    difficulty: 'Medium',
    downloads: 5420,
    rating: 4.6
  },

  // Multimedia Tools
  {
    id: 'image-watermark',
    name: 'Image Watermark Tool',
    description: 'Add text or image watermarks to photos with customizable opacity and positioning.',
    category: 'multimedia',
    icon: <ImageIcon size={20} className="text-pink-600" />,
    tags: ['watermark', 'images', 'branding'],
    difficulty: 'Medium',
    downloads: 9340,
    rating: 4.5
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for text, URLs, WiFi credentials, and contact information.',
    category: 'multimedia',
    icon: <QrCode size={20} className="text-indigo-600" />,
    tags: ['qr-code', 'generation', 'encoding'],
    difficulty: 'Easy',
    downloads: 12890,
    rating: 4.8
  },
  {
    id: 'video-frames',
    name: 'Video Frame Extractor',
    description: 'Extract frames from videos at specified intervals with batch processing.',
    category: 'multimedia',
    icon: <Camera size={20} className="text-purple-600" />,
    tags: ['video', 'frames', 'extraction'],
    difficulty: 'Medium',
    downloads: 4670,
    rating: 4.4
  },
  {
    id: 'color-palette',
    name: 'Color Palette Generator',
    description: 'Generate color palettes from images or create custom color schemes.',
    category: 'multimedia',
    icon: <Palette size={20} className="text-orange-600" />,
    tags: ['colors', 'design', 'palette'],
    difficulty: 'Easy',
    downloads: 7820,
    rating: 4.6
  },
  {
    id: 'image-resizer',
    name: 'Batch Image Resizer',
    description: 'Resize multiple images simultaneously with various scaling options and formats.',
    category: 'multimedia',
    icon: <RefreshCw size={20} className="text-green-600" />,
    tags: ['resize', 'batch', 'images'],
    difficulty: 'Easy',
    downloads: 10450,
    rating: 4.7
  },
  {
    id: 'metadata-editor',
    name: 'Image Metadata Editor',
    description: 'View and edit EXIF data, remove metadata, and batch process image information.',
    category: 'multimedia',
    icon: <Eye size={20} className="text-teal-600" />,
    tags: ['metadata', 'exif', 'privacy'],
    difficulty: 'Medium',
    downloads: 3890,
    rating: 4.2
  }
];

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') {
    return projects;
  }
  return projects.filter(project => project.category === category);
};

export const searchProjects = (query: string): Project[] => {
  if (!query.trim()) {
    return projects;
  }
  
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project => 
    project.name.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};