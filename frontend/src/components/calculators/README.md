# Calculator Module

This directory contains all calculator components organized by category. Each calculator is a self-contained React component that can be loaded dynamically.

## Directory Structure

```
calculators/
├── _template/
│   └── PlaceholderCalculator.jsx    # Reusable template for placeholder calculators
├── Financial/
│   ├── MortgageCalculator.jsx       # ✅ Complete - Full mortgage calculation
│   ├── LoanCalculator.jsx           # 🚧 Placeholder 
│   ├── AutoloanCalculator.jsx       # 🚧 Placeholder
│   ├── RetirementCalculator.jsx     # 🚧 Placeholder
│   └── ... (11 more)
├── Fitness/
│   ├── BmiCalculator.jsx            # ✅ Complete - Full BMI calculation
│   ├── CalorieCalculator.jsx        # 🚧 Placeholder
│   └── ... (7 more)
├── Math/
│   ├── PercentageCalculator.jsx     # ✅ Complete - Multi-tab percentage tools
│   ├── ScientificCalculator.jsx     # 🚧 Placeholder
│   ├── FractionCalculator.jsx       # 🚧 Placeholder
│   └── ... (3 more)
└── Other/
    ├── AgeCalculator.jsx            # ✅ Complete - Full age calculation
    ├── DateCalculator.jsx           # 🚧 Placeholder
    └── ... (8 more)
```

## Calculator Categories

### 💰 Financial Calculators (15 total)
- **Mortgage Calculator** ✅ - Calculate mortgage payments with taxes, insurance, PMI
- **Loan Calculator** 🚧 - General loan payment calculator
- **Auto Loan Calculator** 🚧 - Car loan specific calculations
- **Retirement Calculator** 🚧 - Retirement planning and savings
- Interest Calculator, Payment Calculator, Amortization Calculator, etc.

### 💪 Fitness & Health Calculators (9 total)
- **BMI Calculator** ✅ - Body Mass Index with health recommendations
- **Calorie Calculator** 🚧 - Daily calorie needs calculation
- Body Fat Calculator, BMR Calculator, Ideal Weight Calculator, etc.

### 🧮 Math Calculators (6 total)
- **Percentage Calculator** ✅ - Multi-tab percentage operations
- **Scientific Calculator** 🚧 - Advanced mathematical functions
- **Fraction Calculator** 🚧 - Fraction arithmetic operations
- Triangle Calculator, Standard Deviation Calculator, Random Number Generator

### 📅 Other Calculators (10 total)
- **Age Calculator** ✅ - Precise age calculation with next birthday
- **Date Calculator** 🚧 - Date arithmetic and differences
- Time Calculator, GPA Calculator, Password Generator, etc.

## Implementation Status

- ✅ **Complete**: 4 calculators (Mortgage, BMI, Percentage, Age)
- 🚧 **Placeholder**: 36 calculators using the template system
- 📊 **Total**: 40 calculators planned

## Adding New Calculators

### For Complete Implementation:

1. Create a new component file in the appropriate category folder
2. Follow the pattern of existing complete calculators:
   - Use React hooks (useState) for form inputs
   - Implement proper validation
   - Show results in a dedicated section
   - Include helpful information/instructions
   - Use consistent styling with TailwindCSS

### For Placeholder Implementation:

1. Create a new component file
2. Import and use the `PlaceholderCalculator` template:

```jsx
import React from 'react';
import PlaceholderCalculator from '../_template/PlaceholderCalculator';

const YourCalculator = () => {
  return (
    <PlaceholderCalculator 
      calculatorName="Your Calculator Name"
      description="Brief description of what this calculator does."
      category="Financial" // or Fitness, Math, Other
      estimatedCompletion="Q1 2024"
    />
  );
};

export default YourCalculator;
```

## Design Patterns

### Input Patterns
- Use labeled inputs with icons from lucide-react
- Implement real-time validation
- Support multiple input formats (imperial/metric for BMI, etc.)
- Use appropriate input types (number, date, select)

### Results Display
- Show results in highlighted boxes
- Use color coding (green for good, red for alerts)
- Include explanatory text and recommendations
- Format numbers appropriately (currency, percentages, etc.)

### Layout Patterns
- Use responsive grid layouts
- Include information sections with usage instructions
- Add disclaimers where appropriate (health, financial advice)
- Use consistent spacing and typography

## Features

- **Dynamic Loading**: Calculators are lazy-loaded for better performance
- **Category Navigation**: Sidebar with collapsible categories
- **Search**: Real-time search across all calculators
- **Popular Calculators**: Highlighted popular/featured calculators
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Consistent UI**: Unified design system across all calculators

## Technical Notes

- All calculators use functional components with hooks
- Styled with TailwindCSS for consistency
- Icons from lucide-react library
- Lazy loading implemented via React.lazy() and Suspense
- Placeholder template reduces code duplication 