import React, { useState } from 'react';
import { Calculator, Home, DollarSign, Percent, Calendar } from 'lucide-react';

const MortgageCalculator = () => {
  const [inputs, setInputs] = useState({
    homePrice: '',
    downPayment: '',
    loanTerm: 30,
    interestRate: '',
    propertyTax: '',
    homeInsurance: '',
    pmi: ''
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateMortgage = () => {
    const { homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, pmi } = inputs;
    
    if (!homePrice || !downPayment || !interestRate) {
      alert('Please fill in all required fields');
      return;
    }

    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    // Monthly mortgage payment calculation
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalInterest = (monthlyPayment * numberOfPayments) - principal;
    const totalCost = principal + totalInterest;

    // Additional monthly costs
    const monthlyPropertyTax = parseFloat(propertyTax || 0) / 12;
    const monthlyInsurance = parseFloat(homeInsurance || 0) / 12;
    const monthlyPMI = parseFloat(pmi || 0) / 12;
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalCost.toFixed(2),
      principal: principal.toFixed(2),
      monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2),
      monthlyPMI: monthlyPMI.toFixed(2),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2)
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Home className="inline h-4 w-4 mr-1" />
              Home Price *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="number"
                value={inputs.homePrice}
                onChange={(e) => handleInputChange('homePrice', e.target.value)}
                placeholder="500000"
                className="pl-10 w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Down Payment *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="number"
                value={inputs.downPayment}
                onChange={(e) => handleInputChange('downPayment', e.target.value)}
                placeholder="100000"
                className="pl-10 w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Loan Term (years)
            </label>
            <select
              value={inputs.loanTerm}
              onChange={(e) => handleInputChange('loanTerm', e.target.value)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={25}>25 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Percent className="inline h-4 w-4 mr-1" />
              Interest Rate (%) *
            </label>
            <input
              type="number"
              step="0.001"
              value={inputs.interestRate}
              onChange={(e) => handleInputChange('interestRate', e.target.value)}
              placeholder="6.5"
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Property Tax (Annual)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="number"
                value={inputs.propertyTax}
                onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                placeholder="12000"
                className="pl-10 w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Home Insurance (Annual)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="number"
                value={inputs.homeInsurance}
                onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
                placeholder="1200"
                className="pl-10 w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              PMI (Monthly)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="number"
                value={inputs.pmi}
                onChange={(e) => handleInputChange('pmi', e.target.value)}
                placeholder="200"
                className="pl-10 w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={calculateMortgage}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Mortgage
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Mortgage Calculation Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-secondary-600">Monthly P&I Payment:</span>
                <span className="font-semibold text-primary-600">${results.monthlyPayment}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-secondary-600">Monthly Property Tax:</span>
                <span className="font-semibold">${results.monthlyPropertyTax}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-secondary-600">Monthly Insurance:</span>
                <span className="font-semibold">${results.monthlyInsurance}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-secondary-600">Monthly PMI:</span>
                <span className="font-semibold">${results.monthlyPMI}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-primary-100 rounded-md border-2 border-primary-300">
                <span className="text-primary-700 font-medium">Total Monthly Payment:</span>
                <span className="font-bold text-lg text-primary-700">${results.totalMonthlyPayment}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-secondary-600">Loan Amount:</span>
                <span className="font-semibold">${results.principal}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-secondary-600">Total Interest:</span>
                <span className="font-semibold text-red-600">${results.totalInterest}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white rounded-md">
                <span className="text-secondary-600">Total Cost of Loan:</span>
                <span className="font-semibold">${results.totalCost}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <h4 className="font-medium text-secondary-900 mb-2">How to use this calculator:</h4>
        <ul className="text-sm text-secondary-600 space-y-1">
          <li>• Enter your home price and down payment amount</li>
          <li>• Select your loan term and enter the interest rate</li>
          <li>• Optionally add property tax, insurance, and PMI costs</li>
          <li>• Click "Calculate Mortgage" to see your monthly payments</li>
        </ul>
      </div>
    </div>
  );
};

export default MortgageCalculator; 