import React from 'react';
import { 
  FileText, 
  Globe, 
  Shield, 
  FileImage,
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
  Zap,
  Battery,
  Timer,
  Terminal,
  CheckCircle,
  MousePointer,
  Video,
  Type,
  FileCode,
  Shuffle,
  Code,
  BarChart3,
  Network,
  Clipboard,
  HardDrive,
  Music,
  Layers,
  AlertTriangle,
  Info,
  Tag,
  MapPin,
  Map,
  Scan,
  Bell,
  Cloud,
  Bot as Robot,
  Edit,
  Bug as Virus,
  Baby,
  Image as ImageIcon
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
  // File Operations (25 projects)
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
  {
    id: 'json-csv-converter',
    name: 'JSON to CSV Converter',
    description: 'Convert JSON data to CSV format with automatic field detection and custom mapping.',
    category: 'file-operations',
    icon: <FileCode size={20} className="text-blue-600" />,
    tags: ['json', 'csv', 'conversion'],
    difficulty: 'Easy',
    downloads: 4320,
    rating: 4.4
  },
  {
    id: 'xml-json-converter',
    name: 'XML to JSON Converter',
    description: 'Convert XML files to JSON format with proper structure preservation.',
    category: 'file-operations',
    icon: <Code size={20} className="text-orange-600" />,
    tags: ['xml', 'json', 'conversion'],
    difficulty: 'Medium',
    downloads: 3890,
    rating: 4.3
  },
  {
    id: 'png-ico-converter',
    name: 'PNG to ICO Converter',
    description: 'Convert PNG images to ICO format for creating application icons.',
    category: 'file-operations',
    icon: <MousePointer size={20} className="text-purple-600" />,
    tags: ['png', 'ico', 'icons'],
    difficulty: 'Easy',
    downloads: 2340,
    rating: 4.2
  },
  {
    id: 'png-jpg-converter',
    name: 'PNG to JPG Converter',
    description: 'Convert PNG images to JPG format with quality control and batch processing.',
    category: 'file-operations',
    icon: <FileImage size={20} className="text-green-600" />,
    tags: ['png', 'jpg', 'conversion'],
    difficulty: 'Easy',
    downloads: 5670,
    rating: 4.5
  },
  {
    id: 'jpg-png-converter',
    name: 'JPG to PNG Converter',
    description: 'Convert JPG images to PNG format preserving transparency and quality.',
    category: 'file-operations',
    icon: <FileImage size={20} className="text-blue-600" />,
    tags: ['jpg', 'png', 'conversion'],
    difficulty: 'Easy',
    downloads: 4890,
    rating: 4.4
  },
  {
    id: 'pdf-text-converter',
    name: 'PDF to Text Converter',
    description: 'Extract text content from PDF files with formatting preservation.',
    category: 'file-operations',
    icon: <FileText size={20} className="text-red-600" />,
    tags: ['pdf', 'text', 'extraction'],
    difficulty: 'Medium',
    downloads: 6780,
    rating: 4.6
  },
  {
    id: 'image-converter-gui',
    name: 'Image Converter GUI',
    description: 'User-friendly graphical interface for converting between various image formats.',
    category: 'file-operations',
    icon: <FileImage size={20} className="text-teal-600" />,
    tags: ['gui', 'images', 'conversion'],
    difficulty: 'Medium',
    downloads: 3450,
    rating: 4.3
  },
  {
    id: 'file-backup',
    name: 'File Backup Tool',
    description: 'Automated file backup with versioning and incremental backup support.',
    category: 'file-operations',
    icon: <HardDrive size={20} className="text-blue-600" />,
    tags: ['backup', 'versioning', 'automation'],
    difficulty: 'Medium',
    downloads: 4560,
    rating: 4.5
  },
  {
    id: 'file-splitter',
    name: 'File Splitter',
    description: 'Split large files into smaller chunks for easier transfer and storage.',
    category: 'file-operations',
    icon: <Scissors size={20} className="text-orange-600" />,
    tags: ['splitting', 'chunks', 'transfer'],
    difficulty: 'Easy',
    downloads: 3210,
    rating: 4.2
  },
  {
    id: 'file-merger',
    name: 'File Merger',
    description: 'Merge multiple files into a single file with various merge strategies.',
    category: 'file-operations',
    icon: <Layers size={20} className="text-green-600" />,
    tags: ['merging', 'combining', 'files'],
    difficulty: 'Easy',
    downloads: 2890,
    rating: 4.1
  },
  {
    id: 'text-encoder',
    name: 'Text Encoder/Decoder',
    description: 'Encode and decode text using various encoding schemes (Base64, URL, HTML).',
    category: 'file-operations',
    icon: <Type size={20} className="text-purple-600" />,
    tags: ['encoding', 'decoding', 'text'],
    difficulty: 'Easy',
    downloads: 3670,
    rating: 4.3
  },
  {
    id: 'file-renamer',
    name: 'Batch File Renamer',
    description: 'Rename multiple files using patterns, regular expressions, and custom rules.',
    category: 'file-operations',
    icon: <Edit size={20} className="text-indigo-600" />,
    tags: ['renaming', 'batch', 'patterns'],
    difficulty: 'Medium',
    downloads: 4120,
    rating: 4.4
  },
  {
    id: 'file-permissions',
    name: 'File Permissions Manager',
    description: 'Manage file and folder permissions with bulk operations and security analysis.',
    category: 'file-operations',
    icon: <Shield size={20} className="text-red-600" />,
    tags: ['permissions', 'security', 'management'],
    difficulty: 'Hard',
    downloads: 2340,
    rating: 4.0
  },
  {
    id: 'file-monitor',
    name: 'File System Monitor',
    description: 'Monitor file system changes in real-time with notifications and logging.',
    category: 'file-operations',
    icon: <Eye size={20} className="text-teal-600" />,
    tags: ['monitoring', 'filesystem', 'realtime'],
    difficulty: 'Medium',
    downloads: 3450,
    rating: 4.2
  },
  {
    id: 'file-sync',
    name: 'File Synchronizer',
    description: 'Synchronize files between different locations with conflict resolution.',
    category: 'file-operations',
    icon: <RefreshCw size={20} className="text-blue-600" />,
    tags: ['sync', 'backup', 'mirroring'],
    difficulty: 'Hard',
    downloads: 2890,
    rating: 4.3
  },
  {
    id: 'file-search',
    name: 'Advanced File Search',
    description: 'Search files by content, metadata, and advanced criteria with indexing.',
    category: 'file-operations',
    icon: <Search size={20} className="text-green-600" />,
    tags: ['search', 'indexing', 'content'],
    difficulty: 'Medium',
    downloads: 4670,
    rating: 4.5
  },
  {
    id: 'file-recovery',
    name: 'File Recovery Tool',
    description: 'Recover deleted files and restore corrupted data with deep scanning.',
    category: 'file-operations',
    icon: <RefreshCw size={20} className="text-red-600" />,
    tags: ['recovery', 'restore', 'deleted'],
    difficulty: 'Hard',
    downloads: 3210,
    rating: 4.1
  },
  {
    id: 'file-analyzer',
    name: 'File Content Analyzer',
    description: 'Analyze file content, structure, and metadata with detailed reports.',
    category: 'file-operations',
    icon: <BarChart3 size={20} className="text-purple-600" />,
    tags: ['analysis', 'metadata', 'reports'],
    difficulty: 'Medium',
    downloads: 2560,
    rating: 4.0
  },
  {
    id: 'file-validator',
    name: 'File Integrity Validator',
    description: 'Validate file integrity using checksums and digital signatures.',
    category: 'file-operations',
    icon: <CheckCircle size={20} className="text-green-600" />,
    tags: ['validation', 'integrity', 'checksums'],
    difficulty: 'Medium',
    downloads: 2890,
    rating: 4.2
  },

  // Web Tools (15 projects)
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
  {
    id: 'proxy-tester',
    name: 'Proxy Tester',
    description: 'Test proxy servers for connectivity, speed, and anonymity levels.',
    category: 'web-tools',
    icon: <Network size={20} className="text-indigo-600" />,
    tags: ['proxy', 'testing', 'networking'],
    difficulty: 'Medium',
    downloads: 2890,
    rating: 4.1
  },
  {
    id: 'web-scraper',
    name: 'Web Scraper',
    description: 'Extract data from websites with customizable selectors and export formats.',
    category: 'web-tools',
    icon: <Download size={20} className="text-orange-600" />,
    tags: ['scraping', 'data', 'extraction'],
    difficulty: 'Hard',
    downloads: 6780,
    rating: 4.4
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap Generator',
    description: 'Generate XML sitemaps for websites with automatic discovery and validation.',
    category: 'web-tools',
    icon: <Map size={20} className="text-green-600" />,
    tags: ['sitemap', 'seo', 'xml'],
    difficulty: 'Medium',
    downloads: 3450,
    rating: 4.3
  },
  {
    id: 'robots-checker',
    name: 'Robots.txt Checker',
    description: 'Validate and analyze robots.txt files for SEO compliance.',
    category: 'web-tools',
    icon: <Robot size={20} className="text-blue-600" />,
    tags: ['robots', 'seo', 'validation'],
    difficulty: 'Easy',
    downloads: 2340,
    rating: 4.1
  },
  {
    id: 'ssl-checker',
    name: 'SSL Certificate Checker',
    description: 'Check SSL certificate validity, expiration, and security details.',
    category: 'web-tools',
    icon: <Lock size={20} className="text-red-600" />,
    tags: ['ssl', 'security', 'certificates'],
    difficulty: 'Medium',
    downloads: 4560,
    rating: 4.5
  },
  {
    id: 'http-headers',
    name: 'HTTP Headers Analyzer',
    description: 'Analyze HTTP headers for security, performance, and SEO insights.',
    category: 'web-tools',
    icon: <Info size={20} className="text-purple-600" />,
    tags: ['headers', 'security', 'analysis'],
    difficulty: 'Medium',
    downloads: 3210,
    rating: 4.2
  },
  {
    id: 'page-speed',
    name: 'Page Speed Tester',
    description: 'Test website loading speed and performance with detailed metrics.',
    category: 'web-tools',
    icon: <Zap size={20} className="text-yellow-600" />,
    tags: ['speed', 'performance', 'metrics'],
    difficulty: 'Medium',
    downloads: 5670,
    rating: 4.6
  },
  {
    id: 'broken-links',
    name: 'Broken Link Checker',
    description: 'Find and report broken links on websites with batch processing.',
    category: 'web-tools',
    icon: <AlertTriangle size={20} className="text-red-600" />,
    tags: ['links', 'validation', 'seo'],
    difficulty: 'Medium',
    downloads: 4120,
    rating: 4.3
  },
  {
    id: 'meta-analyzer',
    name: 'Meta Tags Analyzer',
    description: 'Analyze and optimize meta tags for SEO and social media sharing.',
    category: 'web-tools',
    icon: <Tag size={20} className="text-indigo-600" />,
    tags: ['meta', 'seo', 'social'],
    difficulty: 'Easy',
    downloads: 3890,
    rating: 4.4
  },
  {
    id: 'whois-lookup',
    name: 'WHOIS Domain Lookup',
    description: 'Get detailed domain registration information and ownership details.',
    category: 'web-tools',
    icon: <Search size={20} className="text-teal-600" />,
    tags: ['whois', 'domain', 'lookup'],
    difficulty: 'Easy',
    downloads: 2780,
    rating: 4.0
  },
  {
    id: 'ip-geolocation',
    name: 'IP Geolocation Tracker',
    description: 'Track IP addresses and get geographical location information.',
    category: 'web-tools',
    icon: <MapPin size={20} className="text-green-600" />,
    tags: ['ip', 'geolocation', 'tracking'],
    difficulty: 'Easy',
    downloads: 4340,
    rating: 4.2
  },

  // Security Tools (12 projects)
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
  {
    id: 'password-strength',
    name: 'Password Strength Checker',
    description: 'Analyze password strength and provide security recommendations.',
    category: 'security',
    icon: <Shield size={20} className="text-green-600" />,
    tags: ['passwords', 'strength', 'analysis'],
    difficulty: 'Easy',
    downloads: 7890,
    rating: 4.5
  },
  {
    id: 'port-scanner',
    name: 'Network Port Scanner',
    description: 'Scan network ports to identify open services and potential vulnerabilities.',
    category: 'security',
    icon: <Scan size={20} className="text-red-600" />,
    tags: ['ports', 'scanning', 'network'],
    difficulty: 'Hard',
    downloads: 3450,
    rating: 4.2
  },
  {
    id: 'vulnerability-scanner',
    name: 'Vulnerability Scanner',
    description: 'Scan systems for known vulnerabilities and security weaknesses.',
    category: 'security',
    icon: <AlertTriangle size={20} className="text-orange-600" />,
    tags: ['vulnerabilities', 'scanning', 'security'],
    difficulty: 'Hard',
    downloads: 2890,
    rating: 4.1
  },
  {
    id: 'firewall-analyzer',
    name: 'Firewall Rules Analyzer',
    description: 'Analyze firewall rules and configurations for security gaps.',
    category: 'security',
    icon: <Shield size={20} className="text-purple-600" />,
    tags: ['firewall', 'rules', 'analysis'],
    difficulty: 'Hard',
    downloads: 2340,
    rating: 4.0
  },
  {
    id: 'malware-scanner',
    name: 'Malware Scanner',
    description: 'Scan files and directories for malware and suspicious content.',
    category: 'security',
    icon: <Virus size={20} className="text-red-600" />,
    tags: ['malware', 'scanning', 'detection'],
    difficulty: 'Hard',
    downloads: 4560,
    rating: 4.3
  },
  {
    id: 'security-audit',
    name: 'Security Audit Tool',
    description: 'Perform comprehensive security audits with detailed reports.',
    category: 'security',
    icon: <CheckCircle size={20} className="text-blue-600" />,
    tags: ['audit', 'security', 'compliance'],
    difficulty: 'Hard',
    downloads: 3210,
    rating: 4.2
  },
  {
    id: 'encryption-tool',
    name: 'Text Encryption Tool',
    description: 'Encrypt and decrypt text messages using various encryption algorithms.',
    category: 'security',
    icon: <Lock size={20} className="text-indigo-600" />,
    tags: ['encryption', 'text', 'algorithms'],
    difficulty: 'Medium',
    downloads: 4890,
    rating: 4.4
  },
  {
    id: 'secure-delete',
    name: 'Secure File Deletion',
    description: 'Securely delete files with multiple overwrite passes to prevent recovery.',
    category: 'security',
    icon: <Trash2 size={20} className="text-red-600" />,
    tags: ['deletion', 'security', 'privacy'],
    difficulty: 'Medium',
    downloads: 3670,
    rating: 4.1
  },

  // Utility Tools (20 projects)
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
  {
    id: 'battery-monitor',
    name: 'Battery Monitor',
    description: 'Monitor battery status and send notifications when battery is low.',
    category: 'utilities',
    icon: <Battery size={20} className="text-green-600" />,
    tags: ['battery', 'monitoring', 'notifications'],
    difficulty: 'Easy',
    downloads: 3240,
    rating: 4.2
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate age from birth date with detailed breakdown in years, months, and days.',
    category: 'utilities',
    icon: <Baby size={20} className="text-pink-600" />,
    tags: ['age', 'calculator', 'date'],
    difficulty: 'Easy',
    downloads: 2890,
    rating: 4.1
  },
  {
    id: 'stopwatch',
    name: 'Digital Stopwatch',
    description: 'Precise stopwatch with start, stop, and reset functionality.',
    category: 'utilities',
    icon: <Timer size={20} className="text-blue-600" />,
    tags: ['stopwatch', 'timer', 'precision'],
    difficulty: 'Easy',
    downloads: 4560,
    rating: 4.4
  },
  {
    id: 'todo-cli',
    name: 'Todo CLI Manager',
    description: 'Command-line todo list manager with task organization and completion tracking.',
    category: 'utilities',
    icon: <CheckCircle size={20} className="text-green-600" />,
    tags: ['todo', 'cli', 'productivity'],
    difficulty: 'Medium',
    downloads: 3670,
    rating: 4.3
  },
  {
    id: 'number-to-words',
    name: 'Number to Words Converter',
    description: 'Convert numeric values to their written word equivalents in multiple languages.',
    category: 'utilities',
    icon: <Type size={20} className="text-purple-600" />,
    tags: ['numbers', 'words', 'conversion'],
    difficulty: 'Medium',
    downloads: 2340,
    rating: 4.0
  },
  {
    id: 'object-converter',
    name: 'Object Converter',
    description: 'Convert Python dictionaries to objects with dot notation access.',
    category: 'utilities',
    icon: <Shuffle size={20} className="text-orange-600" />,
    tags: ['objects', 'conversion', 'python'],
    difficulty: 'Easy',
    downloads: 1890,
    rating: 3.9
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement (length, weight, temperature, etc.).',
    category: 'utilities',
    icon: <RefreshCw size={20} className="text-indigo-600" />,
    tags: ['units', 'conversion', 'measurement'],
    difficulty: 'Easy',
    downloads: 5670,
    rating: 4.5
  },
  {
    id: 'color-picker',
    name: 'Color Picker & Converter',
    description: 'Pick colors and convert between different color formats (HEX, RGB, HSL).',
    category: 'utilities',
    icon: <Palette size={20} className="text-pink-600" />,
    tags: ['colors', 'picker', 'conversion'],
    difficulty: 'Easy',
    downloads: 4230,
    rating: 4.3
  },
  {
    id: 'text-counter',
    name: 'Text Counter & Analyzer',
    description: 'Count words, characters, paragraphs, and analyze text statistics.',
    category: 'utilities',
    icon: <Type size={20} className="text-blue-600" />,
    tags: ['text', 'counting', 'analysis'],
    difficulty: 'Easy',
    downloads: 3450,
    rating: 4.2
  },
  {
    id: 'random-generator',
    name: 'Random Data Generator',
    description: 'Generate random numbers, strings, UUIDs, and test data for development.',
    category: 'utilities',
    icon: <Shuffle size={20} className="text-green-600" />,
    tags: ['random', 'generator', 'testing'],
    difficulty: 'Easy',
    downloads: 4890,
    rating: 4.4
  },
  {
    id: 'clipboard-manager',
    name: 'Clipboard Manager',
    description: 'Manage clipboard history with search, favorites, and sync capabilities.',
    category: 'utilities',
    icon: <Clipboard size={20} className="text-purple-600" />,
    tags: ['clipboard', 'history', 'productivity'],
    difficulty: 'Medium',
    downloads: 3210,
    rating: 4.1
  },
  {
    id: 'note-taker',
    name: 'Quick Note Taker',
    description: 'Take quick notes with tagging, search, and export functionality.',
    category: 'utilities',
    icon: <FileText size={20} className="text-teal-600" />,
    tags: ['notes', 'productivity', 'organization'],
    difficulty: 'Easy',
    downloads: 5430,
    rating: 4.5
  },
  {
    id: 'reminder-app',
    name: 'Reminder Application',
    description: 'Set reminders with notifications, recurring schedules, and priority levels.',
    category: 'utilities',
    icon: <Bell size={20} className="text-orange-600" />,
    tags: ['reminders', 'notifications', 'scheduling'],
    difficulty: 'Medium',
    downloads: 4670,
    rating: 4.3
  },
  {
    id: 'weather-app',
    name: 'Weather Information Tool',
    description: 'Get current weather conditions and forecasts for any location.',
    category: 'utilities',
    icon: <Cloud size={20} className="text-blue-600" />,
    tags: ['weather', 'forecast', 'location'],
    difficulty: 'Medium',
    downloads: 6780,
    rating: 4.6
  },

  // Multimedia Tools (10 projects)
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
  },
  {
    id: 'ascii-art-generator',
    name: 'ASCII Art Generator',
    description: 'Convert images to ASCII art with customizable character sets and density.',
    category: 'multimedia',
    icon: <Terminal size={20} className="text-gray-600" />,
    tags: ['ascii', 'art', 'conversion'],
    difficulty: 'Medium',
    downloads: 5670,
    rating: 4.5
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size while maintaining quality.',
    category: 'multimedia',
    icon: <Archive size={20} className="text-blue-600" />,
    tags: ['compression', 'optimization', 'images'],
    difficulty: 'Easy',
    downloads: 8230,
    rating: 4.6
  },
  {
    id: 'audio-converter',
    name: 'Audio Format Converter',
    description: 'Convert between different audio formats (MP3, WAV, FLAC, etc.).',
    category: 'multimedia',
    icon: <Music size={20} className="text-purple-600" />,
    tags: ['audio', 'conversion', 'formats'],
    difficulty: 'Medium',
    downloads: 6450,
    rating: 4.4
  },
  {
    id: 'video-converter',
    name: 'Video Format Converter',
    description: 'Convert videos between different formats with quality and compression options.',
    category: 'multimedia',
    icon: <Video size={20} className="text-red-600" />,
    tags: ['video', 'conversion', 'formats'],
    difficulty: 'Hard',
    downloads: 7890,
    rating: 4.5
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