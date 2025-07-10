import React, { useState, useEffect } from 'react';
import { X, Play, Square, Download, Copy, Check } from 'lucide-react';

interface ExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

const BACKEND_URL = 'http://localhost:8000';

const ExecutionModal: React.FC<ExecutionModalProps> = ({ isOpen, onClose, project }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const executeProject = async () => {
    try {
      setIsRunning(true);
      setError(null);
      setOutput(['Initializing project...']);

      const response = await fetch(`${BACKEND_URL}/execute/${project.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: project.filename,
          parameters: {}
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to execute project');
      }

      setOutput(prev => [...prev, 'Execution successful!', JSON.stringify(data.result, null, 2)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput(prev => [...prev, 'Error: ' + (err instanceof Error ? err.message : 'An error occurred')]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRun = () => {
    executeProject();
  };

  const handleStop = () => {
    setIsRunning(false);
    setOutput(prev => [...prev, 'Execution stopped by user']);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.id}-output.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              {project?.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{project?.name}</h2>
              <p className="text-gray-600 text-sm">{project?.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Execution Console</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
            <div className="font-mono text-sm">
              {output.map((line, index) => (
                <div 
                  key={index} 
                  className={`mb-1 ${
                    line.startsWith('Error:') ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  <span className="text-gray-500">$ </span>
                  {line}
                </div>
              ))}
              {isRunning && (
                <div className="text-green-400 flex items-center">
                  <span className="text-gray-500">$ </span>
                  <span className="animate-pulse">Running...</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                error ? 'bg-red-500' : isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-gray-600">
                {error ? 'Error' : isRunning ? 'Running...' : 'Ready'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Square size={16} />
                <span>Stop</span>
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Play size={16} />
                <span>Run Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionModal;