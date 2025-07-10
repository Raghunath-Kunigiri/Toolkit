import React, { useState } from 'react';
import { Calculator, User, Ruler, Scale, AlertCircle } from 'lucide-react';

const BmiCalculator = () => {
  const [inputs, setInputs] = useState({
    height: '',
    weight: '',
    unit: 'metric' // metric or imperial
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    const { height, weight, unit } = inputs;
    
    if (!height || !weight) {
      alert('Please fill in all fields');
      return;
    }

    let bmi;
    let heightInMeters;
    let weightInKg;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100; // cm to meters
      weightInKg = parseFloat(weight);
    } else {
      // Imperial: height in inches, weight in pounds
      heightInMeters = (parseFloat(height) * 2.54) / 100; // inches to meters
      weightInKg = parseFloat(weight) * 0.453592; // pounds to kg
    }

    bmi = weightInKg / (heightInMeters * heightInMeters);

    let category, categoryColor, healthAdvice;
    
    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = 'text-blue-600';
      healthAdvice = 'Consider consulting a healthcare provider about healthy weight gain.';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      categoryColor = 'text-green-600';
      healthAdvice = 'Great! You have a healthy weight. Maintain it with balanced diet and exercise.';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      categoryColor = 'text-yellow-600';
      healthAdvice = 'Consider a balanced diet and regular exercise to reach a healthy weight.';
    } else {
      category = 'Obese';
      categoryColor = 'text-red-600';
      healthAdvice = 'Consider consulting a healthcare provider for a personalized weight management plan.';
    }

    setResults({
      bmi: bmi.toFixed(1),
      category,
      categoryColor,
      healthAdvice
    });
  };

  const getBMIRange = (category) => {
    switch (category) {
      case 'Underweight': return '< 18.5';
      case 'Normal weight': return '18.5 - 24.9';
      case 'Overweight': return '25.0 - 29.9';
      case 'Obese': return '≥ 30.0';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Unit Selection */}
      <div className="flex justify-center">
        <div className="bg-secondary-100 p-1 rounded-lg flex">
          <button
            onClick={() => handleInputChange('unit', 'metric')}
            className={`px-4 py-2 rounded-md transition-colors ${
              inputs.unit === 'metric'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-secondary-600 hover:text-secondary-800'
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            onClick={() => handleInputChange('unit', 'imperial')}
            className={`px-4 py-2 rounded-md transition-colors ${
              inputs.unit === 'imperial'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-secondary-600 hover:text-secondary-800'
            }`}
          >
            Imperial (in, lbs)
          </button>
        </div>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Ruler className="inline h-4 w-4 mr-1" />
              Height ({inputs.unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={inputs.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder={inputs.unit === 'metric' ? '175' : '70'}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Scale className="inline h-4 w-4 mr-1" />
              Weight ({inputs.unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={inputs.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              placeholder={inputs.unit === 'metric' ? '70' : '154'}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={calculateBMI}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate BMI
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Your BMI Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-2">{results.bmi}</div>
                <div className={`text-lg font-semibold ${results.categoryColor} mb-2`}>
                  {results.category}
                </div>
                <div className="text-sm text-secondary-600">
                  BMI Range: {getBMIRange(results.category)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-secondary-900 mb-2">Health Advice</h4>
                <p className="text-sm text-secondary-600">{results.healthAdvice}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BMI Categories Reference */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <h4 className="font-medium text-secondary-900 mb-3">BMI Categories</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-medium text-blue-600">Underweight</div>
            <div className="text-secondary-600">&lt; 18.5</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-medium text-green-600">Normal</div>
            <div className="text-secondary-600">18.5 - 24.9</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded">
            <div className="font-medium text-yellow-600">Overweight</div>
            <div className="text-secondary-600">25.0 - 29.9</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded">
            <div className="font-medium text-red-600">Obese</div>
            <div className="text-secondary-600">≥ 30.0</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-yellow-800 font-medium">Important Note</h4>
          <p className="text-yellow-700 text-sm mt-1">
            BMI is a screening tool and not a diagnostic tool. Consult with a healthcare professional for a comprehensive health assessment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator; 