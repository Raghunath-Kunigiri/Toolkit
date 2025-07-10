import React, { useState } from 'react';
import { Calculator, Percent, DollarSign } from 'lucide-react';

const PercentageCalculator = () => {
  const [activeTab, setActiveTab] = useState('percentage');
  const [inputs, setInputs] = useState({
    // Percentage of number
    number: '',
    percentage: '',
    // Percentage change
    oldValue: '',
    newValue: '',
    // What percentage
    part: '',
    whole: '',
    // Tip calculator
    billAmount: '',
    tipPercentage: ''
  });

  const [results, setResults] = useState({});

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculatePercentage = () => {
    const { number, percentage } = inputs;
    if (number && percentage) {
      const result = (parseFloat(number) * parseFloat(percentage)) / 100;
      setResults(prev => ({ ...prev, percentageOfNumber: result.toFixed(2) }));
    }
  };

  const calculatePercentageChange = () => {
    const { oldValue, newValue } = inputs;
    if (oldValue && newValue) {
      const change = ((parseFloat(newValue) - parseFloat(oldValue)) / parseFloat(oldValue)) * 100;
      setResults(prev => ({ ...prev, percentageChange: change.toFixed(2) }));
    }
  };

  const calculateWhatPercentage = () => {
    const { part, whole } = inputs;
    if (part && whole) {
      const percentage = (parseFloat(part) / parseFloat(whole)) * 100;
      setResults(prev => ({ ...prev, whatPercentage: percentage.toFixed(2) }));
    }
  };

  const calculateTip = () => {
    const { billAmount, tipPercentage } = inputs;
    if (billAmount && tipPercentage) {
      const tip = (parseFloat(billAmount) * parseFloat(tipPercentage)) / 100;
      const total = parseFloat(billAmount) + tip;
      setResults(prev => ({ 
        ...prev, 
        tipAmount: tip.toFixed(2),
        totalWithTip: total.toFixed(2)
      }));
    }
  };

  const tabs = [
    { id: 'percentage', label: '% of Number', icon: Percent },
    { id: 'change', label: '% Change', icon: Calculator },
    { id: 'what', label: 'What %', icon: Percent },
    { id: 'tip', label: 'Tip Calculator', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Percentage of Number */}
      {activeTab === 'percentage' && (
        <div className="bg-white border border-secondary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Calculate Percentage of a Number
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Number
              </label>
              <input
                type="number"
                value={inputs.number}
                onChange={(e) => handleInputChange('number', e.target.value)}
                placeholder="100"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Percentage (%)
              </label>
              <input
                type="number"
                value={inputs.percentage}
                onChange={(e) => handleInputChange('percentage', e.target.value)}
                placeholder="25"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={calculatePercentage}
              className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Calculate
            </button>
          </div>
          {results.percentageOfNumber && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-lg font-semibold text-green-800">
                {inputs.percentage}% of {inputs.number} = {results.percentageOfNumber}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Percentage Change */}
      {activeTab === 'change' && (
        <div className="bg-white border border-secondary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Calculate Percentage Change
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Old Value
              </label>
              <input
                type="number"
                value={inputs.oldValue}
                onChange={(e) => handleInputChange('oldValue', e.target.value)}
                placeholder="80"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                New Value
              </label>
              <input
                type="number"
                value={inputs.newValue}
                onChange={(e) => handleInputChange('newValue', e.target.value)}
                placeholder="100"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={calculatePercentageChange}
              className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Calculate
            </button>
          </div>
          {results.percentageChange && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-lg font-semibold text-green-800">
                Percentage Change: {results.percentageChange > 0 ? '+' : ''}{results.percentageChange}%
              </div>
              <div className="text-sm text-green-600 mt-1">
                {results.percentageChange > 0 ? 'Increase' : 'Decrease'} from {inputs.oldValue} to {inputs.newValue}
              </div>
            </div>
          )}
        </div>
      )}

      {/* What Percentage */}
      {activeTab === 'what' && (
        <div className="bg-white border border-secondary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            What Percentage is X of Y?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Part (X)
              </label>
              <input
                type="number"
                value={inputs.part}
                onChange={(e) => handleInputChange('part', e.target.value)}
                placeholder="25"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Whole (Y)
              </label>
              <input
                type="number"
                value={inputs.whole}
                onChange={(e) => handleInputChange('whole', e.target.value)}
                placeholder="100"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={calculateWhatPercentage}
              className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Calculate
            </button>
          </div>
          {results.whatPercentage && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-lg font-semibold text-green-800">
                {inputs.part} is {results.whatPercentage}% of {inputs.whole}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tip Calculator */}
      {activeTab === 'tip' && (
        <div className="bg-white border border-secondary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Tip Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Bill Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.billAmount}
                onChange={(e) => handleInputChange('billAmount', e.target.value)}
                placeholder="50.00"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Tip Percentage (%)
              </label>
              <input
                type="number"
                value={inputs.tipPercentage}
                onChange={(e) => handleInputChange('tipPercentage', e.target.value)}
                placeholder="20"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={calculateTip}
              className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Calculate
            </button>
          </div>
          {results.tipAmount && (
            <div className="mt-4 space-y-2">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-secondary-600">Bill Amount</div>
                    <div className="text-lg font-semibold text-secondary-900">${inputs.billAmount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-secondary-600">Tip ({inputs.tipPercentage}%)</div>
                    <div className="text-lg font-semibold text-green-600">${results.tipAmount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-secondary-600">Total</div>
                    <div className="text-xl font-bold text-primary-600">${results.totalWithTip}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Tip Buttons */}
      {activeTab === 'tip' && (
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
          <h4 className="font-medium text-secondary-900 mb-3">Quick Tip Percentages</h4>
          <div className="grid grid-cols-4 gap-2">
            {[15, 18, 20, 25].map((tip) => (
              <button
                key={tip}
                onClick={() => handleInputChange('tipPercentage', tip.toString())}
                className="py-2 px-3 bg-white border border-secondary-300 rounded-md hover:bg-primary-50 hover:border-primary-300 transition-colors text-sm font-medium"
              >
                {tip}%
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator; 