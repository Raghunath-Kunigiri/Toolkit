import React, { useState } from 'react';
import { Calculator, Calendar, Clock, Gift } from 'lucide-react';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [results, setResults] = useState(null);

  const calculateAge = () => {
    if (!birthDate) {
      alert('Please enter your birth date');
      return;
    }

    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (birth > target) {
      alert('Birth date cannot be in the future');
      return;
    }

    // Calculate age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastDayOfPreviousMonth = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += lastDayOfPreviousMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days
    const timeDiff = target.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    const totalHours = Math.floor(timeDiff / (1000 * 3600));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));

    // Calculate next birthday
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    
    // If the birthday has already passed this year or is today, set it to next year
    if (
      nextBirthday < target || 
      (nextBirthday.getMonth() === target.getMonth() && nextBirthday.getDate() === target.getDate())
    ) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }

    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 3600 * 24));

    setResults({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      daysToNextBirthday,
      nextBirthday: nextBirthday.toLocaleDateString()
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Calculate Age On (Optional)
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="text-xs text-secondary-500 mt-1">Leave empty to calculate current age</p>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={calculateAge}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Age
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Age Calculation Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">{results.years}</div>
              <div className="text-sm text-secondary-600">Years</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{results.months}</div>
              <div className="text-sm text-secondary-600">Months</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{results.days}</div>
              <div className="text-sm text-secondary-600">Days</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-medium text-secondary-900 mb-3">Detailed Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary-600">Total Days:</span>
                <span className="font-medium">{results.totalDays.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Total Hours:</span>
                <span className="font-medium">{results.totalHours.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Total Minutes:</span>
                <span className="font-medium">{results.totalMinutes.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Gift className="h-5 w-5 text-yellow-600 mr-2" />
              <h4 className="font-medium text-yellow-800">Next Birthday</h4>
            </div>
            <div className="text-sm text-yellow-700">
              <p>Your next birthday is on <strong>{results.nextBirthday}</strong></p>
              <p>That's <strong>{results.daysToNextBirthday}</strong> days from now!</p>
            </div>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <h4 className="font-medium text-secondary-900 mb-2">How to use this calculator:</h4>
        <ul className="text-sm text-secondary-600 space-y-1">
          <li>• Enter your birth date using the date picker</li>
          <li>• Optionally change the "Calculate Age On" date to see your age on a specific date</li>
          <li>• Click "Calculate Age" to see detailed age information</li>
          <li>• View your exact age in years, months, and days</li>
        </ul>
      </div>
    </div>
  );
};

export default AgeCalculator; 