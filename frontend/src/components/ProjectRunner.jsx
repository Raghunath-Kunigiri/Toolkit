import React, { useState, useEffect } from 'react';
import { X, Play, Copy, Download, Eye, EyeOff } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';

const ProjectRunner = ({ project, isOpen, onClose, onRun }) => {
  const [parameters, setParameters] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [showRawResult, setShowRawResult] = useState(false);

  useEffect(() => {
    if (project && project.parameters) {
      // Initialize parameters with default values
      const initParams = {};
      project.parameters.forEach(param => {
        if (param.default !== undefined) {
          initParams[param.name] = param.default;
        } else {
          initParams[param.name] = param.type === 'boolean' ? false : '';
        }
      });
      setParameters(initParams);
    }
  }, [project]);

  const handleParameterChange = (paramName, value) => {
    setParameters(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);
    
    try {
      const response = await fetch(`/api/projects/${project.id}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: project.id,
          parameters: parameters
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data.result);
        toast.success('Project executed successfully!');
        onRun(project.id, data.result);
      } else {
        setResult({ error: data.detail || 'An error occurred' });
        toast.error('Project execution failed');
      }
    } catch (error) {
      setResult({ error: error.message });
      toast.error('Network error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadResult = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${project.name.replace(/\s+/g, '_')}_result.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderParameterInput = (param) => {
    const value = parameters[param.name] || '';

    switch (param.type) {
      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={param.name}
              checked={value}
              onChange={(e) => handleParameterChange(param.name, e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
            />
            <label htmlFor={param.name} className="ml-2 text-sm text-secondary-700">
              {param.description}
            </label>
          </div>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleParameterChange(param.name, Number(e.target.value))}
            placeholder={param.description}
            className="input"
          />
        );
      
      case 'string':
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleParameterChange(param.name, e.target.value)}
            placeholder={param.description}
            className="input"
          />
        );
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-red-800 font-medium mb-2">Error</h4>
          <p className="text-red-700 text-sm">{result.error}</p>
        </div>
      );
    }

    // Handle QR code result
    if (result.qr_code) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-green-800 font-medium mb-2">QR Code Generated</h4>
          <div className="flex justify-center mb-4">
            <img src={result.qr_code} alt="Generated QR Code" className="max-w-xs" />
          </div>
          <div className="text-sm text-green-700">
            <p><strong>Text:</strong> {result.text}</p>
            <p><strong>Size:</strong> {result.size}</p>
            <p><strong>Format:</strong> {result.format}</p>
          </div>
        </div>
      );
    }

    // Handle password result
    if (result.password) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-green-800 font-medium mb-2">Password Generated</h4>
          <div className="bg-white p-3 rounded border mb-3">
            <div className="flex items-center justify-between">
              <code className="text-lg font-mono">{result.password}</code>
              <button
                onClick={() => copyToClipboard(result.password)}
                className="btn btn-outline text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </button>
            </div>
          </div>
          <div className="text-sm text-green-700">
            <p><strong>Length:</strong> {result.length}</p>
            <p><strong>Strength:</strong> {result.strength}</p>
          </div>
        </div>
      );
    }

    // Handle calculation result
    if (result.expression !== undefined) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-green-800 font-medium mb-2">Calculation Result</h4>
          <div className="bg-white p-3 rounded border mb-3">
            <p className="text-sm text-secondary-600 mb-1">Expression:</p>
            <code className="text-lg font-mono">{result.expression}</code>
          </div>
          <div className="bg-white p-3 rounded border">
            <p className="text-sm text-secondary-600 mb-1">Result:</p>
            <code className="text-xl font-mono text-primary-600">{result.result}</code>
          </div>
        </div>
      );
    }

    // Handle web link extractor result
    if (result.links !== undefined || result.page_title !== undefined) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-green-800 font-medium mb-4">Web Links Extracted</h4>
          
          {/* Page Information */}
          <div className="bg-white p-4 rounded border mb-4">
            <h5 className="font-semibold text-secondary-900 mb-2">Page Information</h5>
            <div className="space-y-2 text-sm">
              <div><strong>Title:</strong> {result.page_title}</div>
              <div><strong>URL:</strong> <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{result.url}</a></div>
              {result.page_description && <div><strong>Description:</strong> {result.page_description}</div>}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-3 rounded border text-center">
              <div className="text-2xl font-bold text-blue-600">{result.total_links_found || 0}</div>
              <div className="text-sm text-secondary-600">Total Found</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="text-2xl font-bold text-green-600">{result.links_returned || 0}</div>
              <div className="text-sm text-secondary-600">Returned</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="text-2xl font-bold text-purple-600">{result.internal_links_count || 0}</div>
              <div className="text-sm text-secondary-600">Internal</div>
            </div>
            <div className="bg-white p-3 rounded border text-center">
              <div className="text-2xl font-bold text-orange-600">{result.external_links_count || 0}</div>
              <div className="text-sm text-secondary-600">External</div>
            </div>
          </div>

          {/* Links List */}
          {result.links && result.links.length > 0 && (
            <div className="bg-white p-4 rounded border mb-4">
              <h5 className="font-semibold text-secondary-900 mb-3">Extracted Links</h5>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {result.links.map((link, index) => (
                  <div key={index} className="flex items-start justify-between p-2 hover:bg-secondary-50 rounded border">
                    <div className="flex-1 min-w-0">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium block truncate"
                      >
                        {link.text || 'No text'}
                      </a>
                      <div className="text-xs text-secondary-500 truncate mt-1">{link.url}</div>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        link.type === 'internal' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {link.type}
                      </span>
                      <button
                        onClick={() => copyToClipboard(link.url)}
                        className="text-secondary-400 hover:text-secondary-600"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email Links */}
          {result.email_links && result.email_links.length > 0 && (
            <div className="bg-white p-4 rounded border mb-4">
              <h5 className="font-semibold text-secondary-900 mb-3">Email Links ({result.email_links.length})</h5>
              <div className="space-y-2">
                {result.email_links.map((email, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-secondary-50 rounded border">
                    <div>
                      <a href={email.url} className="text-blue-600 hover:underline font-medium">
                        {email.url.replace('mailto:', '')}
                      </a>
                      <div className="text-xs text-secondary-500">{email.text}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(email.url.replace('mailto:', ''))}
                      className="text-secondary-400 hover:text-secondary-600"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters Applied */}
          {result.filters_applied && (
            <div className="bg-secondary-50 p-3 rounded border">
              <h6 className="font-medium text-secondary-900 mb-2">Filters Applied</h6>
              <div className="text-sm text-secondary-600 space-y-1">
                <div>Max Links: {result.filters_applied.max_links}</div>
                <div>Internal Only: {result.filters_applied.filter_internal ? 'Yes' : 'No'}</div>
                <div>External Only: {result.filters_applied.filter_external ? 'Yes' : 'No'}</div>
                <div>Include Emails: {result.filters_applied.include_emails ? 'Yes' : 'No'}</div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Generic result display
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-green-800 font-medium">Result</h4>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowRawResult(!showRawResult)}
              className="btn btn-outline text-xs"
            >
              {showRawResult ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </button>
            <button
              onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
              className="btn btn-outline text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </button>
            <button
              onClick={downloadResult}
              className="btn btn-outline text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </button>
          </div>
        </div>
        
        {showRawResult ? (
          <SyntaxHighlighter
            language="json"
            style={tomorrow}
            className="text-sm rounded"
          >
            {JSON.stringify(result, null, 2)}
          </SyntaxHighlighter>
        ) : (
          <div className="bg-white p-3 rounded border text-sm">
            <pre className="whitespace-pre-wrap text-secondary-700">
              {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <div>
            <h2 className="text-xl font-semibold text-secondary-900">{project.name}</h2>
            <p className="text-sm text-secondary-600">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Parameters */}
        <div className="p-6 space-y-4">
          {project.parameters && project.parameters.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-secondary-900 mb-4">Parameters</h3>
              <div className="space-y-4">
                {project.parameters.map((param) => (
                  <div key={param.name}>
                    <label className="label">
                      {param.name}
                      {param.description && (
                        <span className="text-secondary-500 font-normal ml-1">
                          - {param.description}
                        </span>
                      )}
                    </label>
                    {renderParameterInput(param)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Run Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`btn ${isRunning ? 'btn-secondary opacity-50' : 'btn-primary'}`}
            >
              {isRunning ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Project
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="pt-4">
              {renderResult()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectRunner; 