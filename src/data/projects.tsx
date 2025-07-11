import React from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  filename: string;
  options?: {
    label: string;
    action: () => void;
  }[];
  action?: () => void;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Calculator',
    description: 'A versatile calculator with basic and advanced operations',
    category: 'Utilities',
    icon: '🧮',
    filename: 'calculator.py',
    options: [
      {
        label: 'Basic Calculator',
        action: () => console.log('Running basic calculator')
      },
      {
        label: 'Scientific Calculator',
        action: () => console.log('Running scientific calculator')
      }
    ]
  },
  {
    id: '2',
    name: 'PDF Converter',
    description: 'Convert between PDF and various file formats',
    category: 'File Operations',
    icon: '📄',
    filename: 'pdf_converter.py',
    options: [
      {
        label: 'Image to PDF',
        action: () => console.log('Converting image to PDF')
      },
      {
        label: 'PDF to Images',
        action: () => console.log('Converting PDF to images')
      },
      {
        label: 'Text to PDF',
        action: () => console.log('Converting text to PDF')
      }
    ]
  },
  {
    id: '3',
    name: 'Password Generator',
    description: 'Generate secure passwords with custom requirements',
    category: 'Security',
    icon: '🔒',
    filename: 'password_generator.py',
    options: [
      {
        label: 'Simple Password',
        action: () => console.log('Generating simple password')
      },
      {
        label: 'Strong Password',
        action: () => console.log('Generating strong password')
      },
      {
        label: 'Custom Password',
        action: () => console.log('Generating custom password')
      }
    ]
  },
  {
    id: '4',
    name: 'Video Frame Extractor',
    description: 'Extract frames from video files',
    category: 'Multimedia',
    icon: '🎥',
    filename: 'capture_video_frames.py',
    action: () => console.log('Extracting video frames')
  },
  {
    id: '5',
    name: 'Web Scraper',
    description: 'Extract data from websites',
    category: 'Web Tools',
    icon: '🌐',
    filename: 'get_links.py',
    options: [
      {
        label: 'Extract Links',
        action: () => console.log('Extracting links')
      },
      {
        label: 'Extract Images',
        action: () => console.log('Extracting images')
      },
      {
        label: 'Extract Text',
        action: () => console.log('Extracting text')
      }
    ]
  }
];

export const categories = Array.from(new Set(projects.map(project => project.category)));