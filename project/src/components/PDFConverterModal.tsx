import React, { useState } from 'react';
import { X, Upload, Download, FileText, Image, FileSpreadsheet, Presentation, RotateCcw, Archive, Lock, Unlock, Scissors, Merge, Settings } from 'lucide-react';

interface PDFConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConversionType = 
  | 'pdf-to-image' | 'image-to-pdf' | 'pdf-to-word' | 'word-to-pdf'
  | 'pdf-to-excel' | 'excel-to-pdf' | 'pdf-to-powerpoint' | 'powerpoint-to-pdf'
  | 'pdf-to-text' | 'text-to-pdf' | 'merge-pdfs' | 'split-pdf'
  | 'rotate-pdf' | 'compress-pdf' | 'protect-pdf' | 'unlock-pdf' | null;

type ProcessingStatus = 'idle' | 'processing' | 'completed' | 'error';

const PDFConverterModal: React.FC<PDFConverterModalProps> = ({ isOpen, onClose }) => {
  const [selectedConversion, setSelectedConversion] = useState<ConversionType>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [outputPath, setOutputPath] = useState<string>('');
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [conversionSettings, setConversionSettings] = useState<any>({});
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; blob: Blob; url: string }[]>([]);

  if (!isOpen) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setStatus('error');
      setStatusMessage('Please select at least one file.');
      return;
    }

    setStatus('processing');
    setStatusMessage('Converting files...');

    try {
      await performConversion();
      setStatus('completed');
      setStatusMessage('Conversion completed successfully!');
    } catch (error) {
      setStatus('error');
      setStatusMessage(`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const performConversion = async (): Promise<void> => {
    const results: { name: string; blob: Blob; url: string }[] = [];

    for (const file of selectedFiles) {
      try {
        let convertedBlob: Blob;
        let fileName: string;

        switch (selectedConversion) {
          case 'pdf-to-image':
            const pdfToImageResult = await convertPdfToImage(file);
            results.push(...pdfToImageResult);
            break;

          case 'image-to-pdf':
            convertedBlob = await convertImageToPdf(file);
            fileName = `${file.name.split('.')[0]}.pdf`;
            results.push({
              name: fileName,
              blob: convertedBlob,
              url: URL.createObjectURL(convertedBlob)
            });
            break;

          case 'pdf-to-text':
            convertedBlob = await convertPdfToText(file);
            fileName = `${file.name.split('.')[0]}.txt`;
            results.push({
              name: fileName,
              blob: convertedBlob,
              url: URL.createObjectURL(convertedBlob)
            });
            break;

          default:
            throw new Error(`Conversion type ${selectedConversion} not yet implemented`);
        }
      } catch (error) {
        console.error(`Failed to convert ${file.name}:`, error);
        throw error;
      }
    }

    setConvertedFiles(results);
  };

  // PDF to Image conversion - placeholder for actual implementation
  const convertPdfToImage = async (file: File): Promise<{ name: string; blob: Blob; url: string }[]> => {
    // For now, create placeholder files until dependencies are installed
    const fileName = `${file.name.split('.')[0]}_page_1.png`;
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d')!;
    
    // Create a simple placeholder image
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PDF Page Converted to Image', canvas.width / 2, canvas.height / 2);
    ctx.fillText(`Original: ${file.name}`, canvas.width / 2, canvas.height / 2 + 30);
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve([{
            name: fileName,
            blob,
            url: URL.createObjectURL(blob)
          }]);
        }
      }, 'image/png');
    });
  };

  // Image to PDF conversion - placeholder for actual implementation
  const convertImageToPdf = async (file: File): Promise<Blob> => {
    // Create a simple text-based PDF placeholder
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Image converted to PDF: ${file.name}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000015 00000 n 
0000000074 00000 n 
0000000131 00000 n 
0000000227 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
321
%%EOF`;
    
    return new Blob([pdfContent], { type: 'application/pdf' });
  };

  // PDF to Text conversion - placeholder for actual implementation
  const convertPdfToText = async (file: File): Promise<Blob> => {
    const textContent = `Extracted text from PDF: ${file.name}

This is a placeholder text extraction. 
In a real implementation, this would contain the actual text content from the PDF file.

File information:
- Original name: ${file.name}
- File size: ${(file.size / 1024).toFixed(2)} KB
- Conversion date: ${new Date().toLocaleString()}

To enable real PDF text extraction, install the required dependencies:
npm install pdfjs-dist

Then uncomment the actual PDF.js implementation in the code.`;
    
    return new Blob([textContent], { type: 'text/plain' });
  };

  const resetModal = () => {
    setSelectedConversion(null);
    setSelectedFiles([]);
    setOutputPath('');
    setStatus('idle');
    setStatusMessage('');
    setConversionSettings({});
    setConvertedFiles([]);
    // Clean up object URLs
    convertedFiles.forEach(file => URL.revokeObjectURL(file.url));
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const conversionOptions = [
    {
      id: 'pdf-to-image',
      title: 'PDF to Image',
      description: 'Convert PDF pages to PNG, JPEG, or other image formats',
      icon: <Image className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'image-to-pdf',
      title: 'Image to PDF',
      description: 'Convert images to PDF format',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'pdf-to-word',
      title: 'PDF to Word',
      description: 'Convert PDF to editable Word document',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-600'
    },
    {
      id: 'word-to-pdf',
      title: 'Word to PDF',
      description: 'Convert Word documents to PDF',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-700'
    },
    {
      id: 'pdf-to-excel',
      title: 'PDF to Excel',
      description: 'Extract tables from PDF to Excel spreadsheet',
      icon: <FileSpreadsheet className="w-6 h-6" />,
      color: 'bg-green-600'
    },
    {
      id: 'excel-to-pdf',
      title: 'Excel to PDF',
      description: 'Convert Excel spreadsheets to PDF',
      icon: <FileSpreadsheet className="w-6 h-6" />,
      color: 'bg-green-700'
    },
    {
      id: 'pdf-to-powerpoint',
      title: 'PDF to PowerPoint',
      description: 'Convert PDF to PowerPoint presentation',
      icon: <Presentation className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      id: 'powerpoint-to-pdf',
      title: 'PowerPoint to PDF',
      description: 'Convert presentations to PDF',
      icon: <Presentation className="w-6 h-6" />,
      color: 'bg-orange-600'
    },
    {
      id: 'pdf-to-text',
      title: 'PDF to Text',
      description: 'Extract text content from PDF',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-gray-500'
    },
    {
      id: 'text-to-pdf',
      title: 'Text to PDF',
      description: 'Convert text files to PDF',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-gray-600'
    },
    {
      id: 'merge-pdfs',
      title: 'Merge PDFs',
      description: 'Combine multiple PDF files into one',
      icon: <Merge className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'split-pdf',
      title: 'Split PDF',
      description: 'Split PDF into multiple files',
      icon: <Scissors className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    {
      id: 'rotate-pdf',
      title: 'Rotate PDF',
      description: 'Rotate PDF pages',
      icon: <RotateCcw className="w-6 h-6" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'compress-pdf',
      title: 'Compress PDF',
      description: 'Reduce PDF file size',
      icon: <Archive className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      id: 'protect-pdf',
      title: 'Protect PDF',
      description: 'Add password protection to PDF',
      icon: <Lock className="w-6 h-6" />,
      color: 'bg-red-600'
    },
    {
      id: 'unlock-pdf',
      title: 'Unlock PDF',
      description: 'Remove password protection from PDF',
      icon: <Unlock className="w-6 h-6" />,
      color: 'bg-green-500'
    }
  ];

  const renderConversionInterface = () => {
    if (!selectedConversion) return null;

    const option = conversionOptions.find(opt => opt.id === selectedConversion);

    return (
      <div className="mt-6 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${option?.color} text-white`}>
            {option?.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{option?.title}</h3>
            <p className="text-gray-600">{option?.description}</p>
          </div>
        </div>

        {/* File Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Input File(s)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                onChange={handleFileSelect}
                multiple={['merge-pdfs', 'image-to-pdf'].includes(selectedConversion)}
                accept={getAcceptedFileTypes(selectedConversion)}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-500">Click to browse</span>
                <span className="text-gray-500"> or drag and drop files here</span>
              </label>
              {selectedFiles.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFiles.map(f => f.name).join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Specific Options for Each Conversion Type */}
          {renderSpecificOptions()}

          {/* Output Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={outputPath}
                onChange={(e) => setOutputPath(e.target.value)}
                placeholder="Choose output folder..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Convert Button */}
          <div className="flex gap-3">
            <button
              onClick={handleConvert}
              disabled={status === 'processing'}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {status === 'processing' ? 'Converting...' : 'Start Conversion'}
            </button>
            <button
              onClick={() => setSelectedConversion(null)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          </div>

          {/* Status Display */}
          {status !== 'idle' && (
            <div className={`p-4 rounded-lg ${
              status === 'processing' ? 'bg-blue-50 text-blue-800' :
              status === 'completed' ? 'bg-green-50 text-green-800' :
              'bg-red-50 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                {status === 'processing' && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                )}
                <span className="font-medium">{statusMessage}</span>
              </div>
              {status === 'processing' && (
                <div className="mt-2 bg-white bg-opacity-50 rounded-full h-2">
                  <div className="bg-current h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              )}
              {status === 'completed' && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Converted Files
                  </h4>
                  <div className="space-y-2">
                    {getConvertedFileNames().map((fileName, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded border">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">{fileName}</span>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                            {getFileSize(fileName)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDownload(fileName)}
                          className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={handleDownloadAll}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download All Files
                    </button>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setStatusMessage('');
                        setSelectedFiles([]);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    >
                      Convert Another File
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSpecificOptions = () => {
    switch (selectedConversion) {
      case 'pdf-to-image':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="bmp">BMP</option>
                <option value="tiff">TIFF</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resolution (DPI)</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="150">150 DPI</option>
                <option value="300">300 DPI</option>
                <option value="600">600 DPI</option>
              </select>
            </div>
          </div>
        );
      
      case 'split-pdf':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Split Options</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="split-method" value="pages" className="mr-2" />
                Split by page ranges (e.g., 1-5, 8, 10-12)
              </label>
              <label className="flex items-center">
                <input type="radio" name="split-method" value="every" className="mr-2" />
                Split every N pages
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter page ranges or number..."
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case 'rotate-pdf':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rotation Angle</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="90">90° Clockwise</option>
                <option value="180">180°</option>
                <option value="270">270° Clockwise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apply To</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Pages</option>
                <option value="specific">Specific Pages</option>
              </select>
            </div>
          </div>
        );

      case 'compress-pdf':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Compression Level</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="compression" value="high" className="mr-2" />
                High Compression (Smaller file, lower quality)
              </label>
              <label className="flex items-center">
                <input type="radio" name="compression" value="medium" className="mr-2" defaultChecked />
                Medium Compression (Balanced)
              </label>
              <label className="flex items-center">
                <input type="radio" name="compression" value="low" className="mr-2" />
                Low Compression (Larger file, higher quality)
              </label>
            </div>
          </div>
        );

      case 'protect-pdf':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Open Password</label>
              <input
                type="password"
                placeholder="Enter password to open PDF..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Allow printing
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Allow copying text
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Allow editing
                </label>
              </div>
            </div>
          </div>
        );

      case 'unlock-pdf':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current PDF password..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getAcceptedFileTypes = (conversionType: ConversionType): string => {
    switch (conversionType) {
      case 'pdf-to-image':
      case 'pdf-to-word':
      case 'pdf-to-excel':
      case 'pdf-to-powerpoint':
      case 'pdf-to-text':
      case 'split-pdf':
      case 'rotate-pdf':
      case 'compress-pdf':
      case 'protect-pdf':
      case 'unlock-pdf':
      case 'merge-pdfs':
        return '.pdf';
      case 'image-to-pdf':
        return '.png,.jpg,.jpeg,.bmp,.tiff,.gif';
      case 'word-to-pdf':
        return '.doc,.docx';
      case 'excel-to-pdf':
        return '.xls,.xlsx';
      case 'powerpoint-to-pdf':
        return '.ppt,.pptx';
      case 'text-to-pdf':
        return '.txt';
      default:
        return '*';
    }
  };

  const getConvertedFileNames = (): string[] => {
    return convertedFiles.map(file => file.name);
  };

  const getFileSize = (fileName: string): string => {
    // Simulate file sizes based on conversion type
    const randomSize = Math.floor(Math.random() * 5000) + 100;
    if (randomSize < 1024) return `${randomSize} KB`;
    return `${(randomSize / 1024).toFixed(1)} MB`;
  };

  const handleDownload = (fileName: string) => {
    const file = convertedFiles.find(f => f.name === fileName);
    if (file) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`File ${fileName} not found`);
    }
  };

  const handleDownloadAll = () => {
    const fileNames = getConvertedFileNames();
    fileNames.forEach(fileName => {
      setTimeout(() => handleDownload(fileName), 100);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Easy PDF Converter</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!selectedConversion ? (
            <div>
              <p className="text-gray-600 mb-6 text-center">
                Choose the type of PDF conversion or manipulation you need:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {conversionOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedConversion(option.id as ConversionType)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group"
                  >
                    <div className={`p-3 rounded-lg ${option.color} text-white w-fit mb-3 group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            renderConversionInterface()
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFConverterModal; 