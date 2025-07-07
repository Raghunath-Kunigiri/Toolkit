import React from 'react';
import { Calculator, AlertCircle, Clock, Code, Settings } from 'lucide-react';

const PlaceholderCalculator = ({ 
  calculatorName = "Calculator",
  description = "This calculator will be available soon.",
  category = "General",
  estimatedCompletion = "Coming Soon"
}) => {
  return (
    <div className="space-y-6">
      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-blue-900">{calculatorName}</h3>
            <p className="text-blue-700 mt-1">{description}</p>
            <div className="mt-3 flex items-center text-sm text-blue-600">
              <Settings className="h-4 w-4 mr-1" />
              <span>Status: Under Development</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Interface */}
      <div className="bg-white border border-secondary-200 rounded-lg p-6 opacity-60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Input Field 1
              </label>
              <input
                type="text"
                placeholder="Enter value..."
                disabled
                className="w-full px-3 py-2 border border-secondary-300 rounded-md bg-secondary-50 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Input Field 2
              </label>
              <input
                type="text"
                placeholder="Enter value..."
                disabled
                className="w-full px-3 py-2 border border-secondary-300 rounded-md bg-secondary-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Options
              </label>
              <select disabled className="w-full px-3 py-2 border border-secondary-300 rounded-md bg-secondary-50 cursor-not-allowed">
                <option>Select option...</option>
              </select>
            </div>

            <button
              disabled
              className="w-full bg-secondary-400 text-white py-2 px-4 rounded-md cursor-not-allowed flex items-center justify-center"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate (Coming Soon)
            </button>
          </div>
        </div>
      </div>

      {/* Preview Results */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6 opacity-60">
        <h3 className="text-lg font-semibold text-secondary-700 mb-4">Results Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary-400">--</div>
            <div className="text-sm text-secondary-500">Result 1</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary-400">--</div>
            <div className="text-sm text-secondary-500">Result 2</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary-400">--</div>
            <div className="text-sm text-secondary-500">Result 3</div>
          </div>
        </div>
      </div>

      {/* Development Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-yellow-800 font-medium">Development Status</h4>
            <p className="text-yellow-700 text-sm mt-1">
              This {calculatorName.toLowerCase()} is currently being developed. 
              We're working hard to bring you a comprehensive tool with full functionality.
            </p>
            <div className="mt-2 text-xs text-yellow-600">
              <span className="font-medium">Category:</span> {category} | 
              <span className="font-medium ml-2">ETA:</span> {estimatedCompletion}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Preview */}
      <div className="bg-white border border-secondary-200 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Code className="h-5 w-5 text-secondary-600 mr-2" />
          <h4 className="font-medium text-secondary-900">Planned Features</h4>
        </div>
        <ul className="text-sm text-secondary-600 space-y-1">
          <li>• Intuitive and user-friendly interface</li>
          <li>• Real-time calculations with instant results</li>
          <li>• Multiple input formats and units</li>
          <li>• Detailed explanations and formulas</li>
          <li>• Export results in various formats</li>
          <li>• Mobile-responsive design</li>
        </ul>
      </div>
    </div>
  );
};

export default PlaceholderCalculator; 