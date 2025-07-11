import React, { useState, useRef } from 'react';

interface ConversionOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  inputTypes: string[];
  outputTypes: string[];
}

const conversionOptions: ConversionOption[] = [
  {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    description: 'Convert PDF pages to image files (PNG, JPEG)',
    icon: '🖼️',
    inputTypes: ['.pdf'],
    outputTypes: ['PNG', 'JPEG']
  },
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert image files to PDF document',
    icon: '📄',
    inputTypes: ['.png', '.jpg', '.jpeg', '.bmp', '.gif'],
    outputTypes: ['PDF']
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF to editable Word document',
    icon: '📝',
    inputTypes: ['.pdf'],
    outputTypes: ['DOCX']
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert Word document to PDF',
    icon: '📋',
    inputTypes: ['.docx', '.doc'],
    outputTypes: ['PDF']
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    description: 'Extract tables from PDF to Excel spreadsheet',
    icon: '📊',
    inputTypes: ['.pdf'],
    outputTypes: ['XLSX']
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    description: 'Convert Excel spreadsheet to PDF',
    icon: '📈',
    inputTypes: ['.xlsx', '.xls'],
    outputTypes: ['PDF']
  },
  {
    id: 'pdf-to-powerpoint',
    title: 'PDF to PowerPoint',
    description: 'Convert PDF to PowerPoint presentation',
    icon: '📺',
    inputTypes: ['.pdf'],
    outputTypes: ['PPTX']
  },
  {
    id: 'powerpoint-to-pdf',
    title: 'PowerPoint to PDF',
    description: 'Convert PowerPoint presentation to PDF',
    icon: '🎯',
    inputTypes: ['.pptx', '.ppt'],
    outputTypes: ['PDF']
  },
  {
    id: 'pdf-to-text',
    title: 'PDF to Text',
    description: 'Extract text content from PDF',
    icon: '📃',
    inputTypes: ['.pdf'],
    outputTypes: ['TXT']
  },
  {
    id: 'text-to-pdf',
    title: 'Text to PDF',
    description: 'Convert text file to PDF document',
    icon: '📄',
    inputTypes: ['.txt'],
    outputTypes: ['PDF']
  },
  {
    id: 'merge-pdfs',
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into one',
    icon: '🔗',
    inputTypes: ['.pdf'],
    outputTypes: ['PDF']
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Split PDF into separate files by pages',
    icon: '✂️',
    inputTypes: ['.pdf'],
    outputTypes: ['PDF']
  },
  {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate PDF pages clockwise or counterclockwise',
    icon: '🔄',
    inputTypes: ['.pdf'],
    outputTypes: ['PDF']
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce PDF file size with compression',
    icon: '🗜️',
    inputTypes: ['.pdf'],
    outputTypes: ['PDF']
  },
  {
    id: 'protect-pdf',
    title: 'Protect PDF',
    description: 'Add password protection to PDF',
    icon: '🔒',
    inputTypes: ['.pdf'],
    outputTypes: ['PDF']
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove password protection from PDF',
    icon: '🔓',
    inputTypes: ['.pdf'],
    outputTypes: ['PDF']
  }
];

interface PDFConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PDFConverterModal: React.FC<PDFConverterModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<ConversionOption | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>('');
  const [outputPath, setOutputPath] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [rotationAngle, setRotationAngle] = useState<string>('90');
  const [compressionLevel, setCompressionLevel] = useState<string>('medium');
  const [password, setPassword] = useState<string>('');
  const [splitPages, setSplitPages] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleConvert = async () => {
    if (!selectedOption || selectedFiles.length === 0) {
      setProcessingStatus('Please select files and conversion option');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('Processing...');

    // Simulate processing time
    setTimeout(() => {
      setProcessingStatus('Conversion completed successfully!');
      setIsProcessing(false);
      
      // Auto-close after success
      setTimeout(() => {
        resetModal();
      }, 2000);
    }, 3000);
  };

  const resetModal = () => {
    setSelectedOption(null);
    setSelectedFiles([]);
    setOutputFormat('');
    setOutputPath('');
    setIsProcessing(false);
    setProcessingStatus('');
    setPassword('');
    setSplitPages('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const renderConversionOptions = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {conversionOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => {
            setSelectedOption(option);
            setOutputFormat(option.outputTypes[0]);
          }}
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center"
        >
          <div className="text-3xl mb-2">{option.icon}</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{option.title}</div>
        </button>
      ))}
    </div>
  );

  const renderConversionInterface = () => {
    if (!selectedOption) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <span className="text-2xl mr-2">{selectedOption.icon}</span>
            {selectedOption.title}
          </h3>
          <button
            onClick={() => setSelectedOption(null)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300">{selectedOption.description}</p>

        {/* File Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Input File(s)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple={selectedOption.id === 'merge-pdfs' || selectedOption.id === 'image-to-pdf'}
              accept={selectedOption.inputTypes.join(',')}
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {selectedFiles.length > 0 && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selected: {selectedFiles.map(f => f.name).join(', ')}
              </div>
            )}
          </div>

          {/* Output Format Selection */}
          {selectedOption.outputTypes.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {selectedOption.outputTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          )}

          {/* Special Options */}
          {selectedOption.id === 'rotate-pdf' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rotation Angle
              </label>
              <select
                value={rotationAngle}
                onChange={(e) => setRotationAngle(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="90">90° Clockwise</option>
                <option value="180">180°</option>
                <option value="270">270° Clockwise</option>
              </select>
            </div>
          )}

          {selectedOption.id === 'compress-pdf' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Compression Level
              </label>
              <select
                value={compressionLevel}
                onChange={(e) => setCompressionLevel(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="low">Low (Highest Quality)</option>
                <option value="medium">Medium</option>
                <option value="high">High (Smallest Size)</option>
              </select>
            </div>
          )}

          {(selectedOption.id === 'protect-pdf' || selectedOption.id === 'unlock-pdf') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={selectedOption.id === 'protect-pdf' ? 'Enter new password' : 'Enter current password'}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          )}

          {selectedOption.id === 'split-pdf' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Page Range (e.g., 1-5, 8, 10-12)
              </label>
              <input
                type="text"
                value={splitPages}
                onChange={(e) => setSplitPages(e.target.value)}
                placeholder="1-3, 5, 7-9"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          )}

          {/* Output Path */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Output Location
            </label>
            <input
              type="text"
              value={outputPath}
              onChange={(e) => setOutputPath(e.target.value)}
              placeholder="Leave empty for default downloads folder"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Status */}
        {processingStatus && (
          <div className={`p-4 rounded-md ${
            processingStatus.includes('success') || processingStatus.includes('completed')
              ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300'
              : processingStatus.includes('Error') || processingStatus.includes('Please')
              ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300'
              : 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
          }`}>
            {processingStatus}
          </div>
        )}

        {/* Progress Bar */}
        {isProcessing && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '45%' }}></div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleConvert}
            disabled={isProcessing || selectedFiles.length === 0}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? 'Converting...' : 'Start Conversion'}
          </button>
          <button
            onClick={() => setSelectedOption(null)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="text-4xl mr-3">📄</span>
              Easy PDF Converter
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          {selectedOption ? renderConversionInterface() : renderConversionOptions()}

          {/* Footer */}
          {!selectedOption && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFConverterModal; 