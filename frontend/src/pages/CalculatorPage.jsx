import React, { useState, useMemo, Suspense, lazy } from 'react';
import { Search, Calculator, DollarSign, Heart, Hash, Menu, ChevronLeft, Star, Clock, TrendingUp, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Direct imports for implemented calculators
import MortgageCalculator from '../components/calculators/Financial/MortgageCalculator';
import LoanCalculator from '../components/calculators/Financial/LoanCalculator';
import AutoloanCalculator from '../components/calculators/Financial/AutoloanCalculator';
import RetirementCalculator from '../components/calculators/Financial/RetirementCalculator';
import BmiCalculator from '../components/calculators/Fitness/BmiCalculator';
import CalorieCalculator from '../components/calculators/Fitness/CalorieCalculator';
import PercentageCalculator from '../components/calculators/Math/PercentageCalculator';
import ScientificCalculator from '../components/calculators/Math/ScientificCalculator';
import FractionCalculator from '../components/calculators/Math/FractionCalculator';
import AgeCalculator from '../components/calculators/Other/AgeCalculator';
import DateCalculator from '../components/calculators/Other/DateCalculator';
import PlaceholderCalculator from '../components/calculators/_template/PlaceholderCalculator';

const CalculatorPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('financial');
  const [selectedCalculator, setSelectedCalculator] = useState('mortgage');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Calculator component mapping
  const calculatorComponents = {
    financial: {
      mortgage: MortgageCalculator,
      loan: LoanCalculator,
      autoLoan: AutoloanCalculator,
      retirement: RetirementCalculator,
      // Placeholders for the rest
      interest: () => <PlaceholderCalculator calculatorName="Interest Calculator" category="Financial" />,
      payment: () => <PlaceholderCalculator calculatorName="Payment Calculator" category="Financial" />,
      amortization: () => <PlaceholderCalculator calculatorName="Amortization Calculator" category="Financial" />,
      investment: () => <PlaceholderCalculator calculatorName="Investment Calculator" category="Financial" />,
      inflation: () => <PlaceholderCalculator calculatorName="Inflation Calculator" category="Financial" />,
      finance: () => <PlaceholderCalculator calculatorName="Finance Calculator" category="Financial" />,
      incomeTax: () => <PlaceholderCalculator calculatorName="Income Tax Calculator" category="Financial" />,
      compoundInterest: () => <PlaceholderCalculator calculatorName="Compound Interest Calculator" category="Financial" />,
      salary: () => <PlaceholderCalculator calculatorName="Salary Calculator" category="Financial" />,
      interestRate: () => <PlaceholderCalculator calculatorName="Interest Rate Calculator" category="Financial" />,
      salesTax: () => <PlaceholderCalculator calculatorName="Sales Tax Calculator" category="Financial" />
    },
    fitness: {
      bmi: BmiCalculator,
      calorie: CalorieCalculator,
      // Placeholders for the rest
      bodyFat: () => <PlaceholderCalculator calculatorName="Body Fat Calculator" category="Fitness & Health" />,
      bmr: () => <PlaceholderCalculator calculatorName="BMR Calculator" category="Fitness & Health" />,
      idealWeight: () => <PlaceholderCalculator calculatorName="Ideal Weight Calculator" category="Fitness & Health" />,
      pace: () => <PlaceholderCalculator calculatorName="Pace Calculator" category="Fitness & Health" />,
      pregnancy: () => <PlaceholderCalculator calculatorName="Pregnancy Calculator" category="Fitness & Health" />,
      pregnancyConception: () => <PlaceholderCalculator calculatorName="Pregnancy Conception Calculator" category="Fitness & Health" />,
      dueDate: () => <PlaceholderCalculator calculatorName="Due Date Calculator" category="Fitness & Health" />
    },
    math: {
      percentage: PercentageCalculator,
      scientific: ScientificCalculator,
      fraction: FractionCalculator,
      // Placeholders for the rest
      randomNumber: () => <PlaceholderCalculator calculatorName="Random Number Generator" category="Math" />,
      triangle: () => <PlaceholderCalculator calculatorName="Triangle Calculator" category="Math" />,
      standardDeviation: () => <PlaceholderCalculator calculatorName="Standard Deviation Calculator" category="Math" />
    },
    other: {
      age: AgeCalculator,
      date: DateCalculator,
      // Placeholders for the rest
      time: () => <PlaceholderCalculator calculatorName="Time Calculator" category="Other" />,
      hours: () => <PlaceholderCalculator calculatorName="Hours Calculator" category="Other" />,
      gpa: () => <PlaceholderCalculator calculatorName="GPA Calculator" category="Other" />,
      grade: () => <PlaceholderCalculator calculatorName="Grade Calculator" category="Other" />,
      concrete: () => <PlaceholderCalculator calculatorName="Concrete Calculator" category="Other" />,
      subnet: () => <PlaceholderCalculator calculatorName="Subnet Calculator" category="Other" />,
      passwordGen: () => <PlaceholderCalculator calculatorName="Password Generator" category="Other" />,
      conversion: () => <PlaceholderCalculator calculatorName="Conversion Calculator" category="Other" />
    }
  };

  const calculatorCategories = {
    financial: {
      name: 'Financial',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      calculators: {
        mortgage: { name: 'Mortgage Calculator', description: 'Calculate monthly mortgage payments', popular: true },
        loan: { name: 'Loan Calculator', description: 'Calculate loan payments and interest', popular: true },
        autoLoan: { name: 'Auto Loan Calculator', description: 'Calculate car loan payments' },
        interest: { name: 'Interest Calculator', description: 'Calculate simple and compound interest' },
        payment: { name: 'Payment Calculator', description: 'Calculate payment amounts' },
        retirement: { name: 'Retirement Calculator', description: 'Plan your retirement savings', popular: true },
        amortization: { name: 'Amortization Calculator', description: 'View loan amortization schedule' },
        investment: { name: 'Investment Calculator', description: 'Calculate investment returns' },
        inflation: { name: 'Inflation Calculator', description: 'Calculate inflation impact' },
        finance: { name: 'Finance Calculator', description: 'General financial calculations' },
        incomeTax: { name: 'Income Tax Calculator', description: 'Calculate income tax' },
        compoundInterest: { name: 'Compound Interest Calculator', description: 'Calculate compound interest' },
        salary: { name: 'Salary Calculator', description: 'Calculate salary breakdown' },
        interestRate: { name: 'Interest Rate Calculator', description: 'Calculate interest rates' },
        salesTax: { name: 'Sales Tax Calculator', description: 'Calculate sales tax amounts' }
      }
    },
    fitness: {
      name: 'Fitness & Health',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      calculators: {
        bmi: { name: 'BMI Calculator', description: 'Calculate Body Mass Index', popular: true },
        calorie: { name: 'Calorie Calculator', description: 'Calculate daily calorie needs', popular: true },
        bodyFat: { name: 'Body Fat Calculator', description: 'Calculate body fat percentage' },
        bmr: { name: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate' },
        idealWeight: { name: 'Ideal Weight Calculator', description: 'Calculate ideal body weight' },
        pace: { name: 'Pace Calculator', description: 'Calculate running/walking pace' },
        pregnancy: { name: 'Pregnancy Calculator', description: 'Calculate pregnancy timeline' },
        pregnancyConception: { name: 'Pregnancy Conception Calculator', description: 'Calculate conception date' },
        dueDate: { name: 'Due Date Calculator', description: 'Calculate baby due date' }
      }
    },
    math: {
      name: 'Math',
      icon: Hash,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      calculators: {
        scientific: { name: 'Scientific Calculator', description: 'Advanced mathematical operations', popular: true },
        fraction: { name: 'Fraction Calculator', description: 'Calculate with fractions' },
        percentage: { name: 'Percentage Calculator', description: 'Calculate percentages', popular: true },
        randomNumber: { name: 'Random Number Generator', description: 'Generate random numbers' },
        triangle: { name: 'Triangle Calculator', description: 'Calculate triangle properties' },
        standardDeviation: { name: 'Standard Deviation Calculator', description: 'Calculate standard deviation' }
      }
    },
    other: {
      name: 'Other',
      icon: MoreHorizontal,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      calculators: {
        age: { name: 'Age Calculator', description: 'Calculate age and date differences', popular: true },
        date: { name: 'Date Calculator', description: 'Calculate dates and durations' },
        time: { name: 'Time Calculator', description: 'Calculate time differences' },
        hours: { name: 'Hours Calculator', description: 'Calculate work hours' },
        gpa: { name: 'GPA Calculator', description: 'Calculate Grade Point Average' },
        grade: { name: 'Grade Calculator', description: 'Calculate grades and scores' },
        concrete: { name: 'Concrete Calculator', description: 'Calculate concrete requirements' },
        subnet: { name: 'Subnet Calculator', description: 'Calculate network subnets' },
        passwordGen: { name: 'Password Generator', description: 'Generate secure passwords' },
        conversion: { name: 'Conversion Calculator', description: 'Convert units and measurements' }
      }
    }
  };

  const allCalculators = useMemo(() => {
    const calculators = [];
    Object.entries(calculatorCategories).forEach(([categoryKey, category]) => {
      Object.entries(category.calculators).forEach(([calcKey, calc]) => {
        calculators.push({
          key: calcKey,
          categoryKey,
          category: category.name,
          ...calc
        });
      });
    });
    return calculators;
  }, []);

  const filteredCalculators = useMemo(() => {
    if (!searchTerm) return [];
    return allCalculators.filter(calc =>
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allCalculators]);

  const popularCalculators = useMemo(() => {
    return allCalculators.filter(calc => calc.popular);
  }, [allCalculators]);

  const handleCalculatorSelect = (categoryKey, calcKey) => {
    setSelectedCategory(categoryKey);
    setSelectedCalculator(calcKey);
    setSearchTerm('');
  };

  const getCalculatorComponent = (categoryKey, calcKey) => {
    const CalculatorComponent = calculatorComponents[categoryKey]?.[calcKey];
    if (CalculatorComponent) {
      return <CalculatorComponent />;
    }
    return <PlaceholderCalculator calculatorName="Calculator" category="General" />;
  };

  const CategoryIcon = calculatorCategories[selectedCategory]?.icon || Calculator;

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-secondary-600 hover:text-secondary-900 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Home
              </button>
              <div className="ml-6 flex items-center">
                <Calculator className="h-6 w-6 text-primary-600 mr-2" />
                <h1 className="text-xl font-semibold text-secondary-900">Calculator Hub</h1>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-80 flex-shrink-0`}>
            <div className="bg-white rounded-lg shadow-sm border border-secondary-200 overflow-hidden">
              
              {/* Search Results */}
              {searchTerm && (
                <div className="p-4 border-b border-secondary-200">
                  <h3 className="text-sm font-medium text-secondary-900 mb-3">
                    Search Results ({filteredCalculators.length})
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredCalculators.map((calc) => (
                      <button
                        key={`${calc.categoryKey}-${calc.key}`}
                        onClick={() => handleCalculatorSelect(calc.categoryKey, calc.key)}
                        className="w-full text-left p-2 rounded-md hover:bg-secondary-50 transition-colors"
                      >
                        <div className="text-sm font-medium text-secondary-900">{calc.name}</div>
                        <div className="text-xs text-secondary-600">{calc.category}</div>
                      </button>
                    ))}
                    {filteredCalculators.length === 0 && (
                      <div className="text-sm text-secondary-500 text-center py-4">
                        No calculators found
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Popular Calculators */}
              {!searchTerm && (
                <div className="p-4 border-b border-secondary-200">
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <h3 className="text-sm font-medium text-secondary-900">Popular</h3>
                  </div>
                  <div className="space-y-1">
                    {popularCalculators.map((calc) => (
                      <button
                        key={`${calc.categoryKey}-${calc.key}`}
                        onClick={() => handleCalculatorSelect(calc.categoryKey, calc.key)}
                        className="w-full text-left p-2 rounded-md hover:bg-secondary-50 transition-colors"
                      >
                        <div className="text-sm font-medium text-secondary-900">{calc.name}</div>
                        <div className="text-xs text-secondary-600">{calc.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {!searchTerm && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-secondary-900 mb-3">Categories</h3>
                  <div className="space-y-1">
                    {Object.entries(calculatorCategories).map(([key, category]) => {
                      const Icon = category.icon;
                      const isActive = selectedCategory === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedCategory(key)}
                          className={`w-full flex items-center p-2 rounded-md transition-colors ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 border border-primary-200'
                              : 'text-secondary-600 hover:bg-secondary-50'
                          }`}
                        >
                          <div className={`p-1 rounded-md ${isActive ? category.bgColor : 'bg-secondary-100'} mr-3`}>
                            <Icon className={`h-4 w-4 ${isActive ? category.color : 'text-secondary-500'}`} />
                          </div>
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="ml-auto text-xs text-secondary-400">
                            {Object.keys(category.calculators).length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Calculator List for Selected Category */}
              {!searchTerm && selectedCategory && (
                <div className="border-t border-secondary-200 p-4">
                  <h3 className="text-sm font-medium text-secondary-900 mb-3">
                    {calculatorCategories[selectedCategory].name} Calculators
                  </h3>
                  <div className="space-y-1 max-h-80 overflow-y-auto">
                    {Object.entries(calculatorCategories[selectedCategory].calculators).map(([key, calc]) => {
                      const isActive = selectedCalculator === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedCalculator(key)}
                          className={`w-full text-left p-2 rounded-md transition-colors ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 border border-primary-200'
                              : 'text-secondary-600 hover:bg-secondary-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">{calc.name}</div>
                            {calc.popular && <Star className="h-3 w-3 text-yellow-500" />}
                          </div>
                          <div className="text-xs text-secondary-500 mt-1">{calc.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-secondary-200 min-h-[600px]">
              {/* Calculator Header */}
              {selectedCategory && selectedCalculator && (
                <div className="p-6 border-b border-secondary-200">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${calculatorCategories[selectedCategory].bgColor} mr-4`}>
                      <CategoryIcon className={`h-6 w-6 ${calculatorCategories[selectedCategory].color}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-secondary-900">
                        {calculatorCategories[selectedCategory].calculators[selectedCalculator].name}
                      </h2>
                      <p className="text-secondary-600">
                        {calculatorCategories[selectedCategory].calculators[selectedCalculator].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculator Content */}
              <div className="p-6">
                {selectedCategory && selectedCalculator ? (
                  getCalculatorComponent(selectedCategory, selectedCalculator)
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-secondary-900 mb-2">Welcome to Calculator Hub</h3>
                    <p className="text-secondary-600 mb-6">
                      Choose a calculator from the sidebar to get started
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {Object.entries(calculatorCategories).map(([key, category]) => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedCategory(key)}
                            className="p-4 border border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                          >
                            <div className="flex items-center mb-2">
                              <div className={`p-2 rounded-md ${category.bgColor} mr-3`}>
                                <Icon className={`h-5 w-5 ${category.color}`} />
                              </div>
                              <h4 className="font-medium text-secondary-900">{category.name}</h4>
                            </div>
                            <p className="text-sm text-secondary-600">
                              {Object.keys(category.calculators).length} calculators available
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage; 