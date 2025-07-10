import React, { useState, useRef } from 'react';
import { X, FileUp, Download, AlertCircle } from 'lucide-react';

interface PDFConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BACKEND_URL = 'http://localhost:8000';

const PDFConverterModal: React.FC<PDFConverterModalProps> = ({ isOpen, onClose }) => {
  const [conversionType, setConversionType] = useState('image_to_pdf');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | string[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const conversionOptions = [
    { value: 'image_to_pdf', label: 'Image to PDF' },
    { value: 'pdf_to_images', label: 'PDF to Images' },
    { value: 'text_to_pdf', label: 'Text to PDF' }
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        await executeConversion(base64Data);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to read file');
    }
  };

  const handleTextConversion = async () => {
    const text = textInputRef.current?.value;
    if (!text) {
      setError('Please enter some text');
      return;
    }
    await executeConversion(text);
  };

  const executeConversion = async (inputData: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch(`${BACKEND_URL}/execute/pdf-converter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: 'pdf_converter.py',
          parameters: {
            conversion_type: conversionType,
            input_data: inputData
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Conversion failed');
      }

      if (!data.result.success) {
        throw new Error(data.result.message);
      }

      setResult(data.result.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    if (conversionType === 'pdf_to_images') {
      // Download multiple images
      (result as string[]).forEach((base64Image, index) => {
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = `page_${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      // Download PDF
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${result}`;
      link.download = 'converted.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">PDF Converter</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Type
            </label>
            <select
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {conversionOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {conversionType === 'text_to_pdf' ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Text
              </label>
              <textarea
                ref={textInputRef}
                className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your text here..."
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={conversionType === 'image_to_pdf' ? 'image/*' : '.pdf'}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                <div className="flex items-center justify-center space-x-2">
                  <FileUp size={20} />
                  <span>Click to upload or drag and drop</span>
                </div>
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start space-x-2">
              <AlertCircle size={20} className="text-red-500 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="mb-6">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download size={20} />
                <span>Download Result</span>
              </button>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => conversionType === 'text_to_pdf' ? handleTextConversion() : fileInputRef.current?.click()}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Converting...' : 'Convert'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFConverterModal; 