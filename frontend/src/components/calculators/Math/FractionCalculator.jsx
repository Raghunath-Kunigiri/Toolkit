import React from 'react';
import PlaceholderCalculator from '../_template/PlaceholderCalculator';

const FractionCalculator = () => {
  return (
    <PlaceholderCalculator 
      calculatorName="Fraction Calculator"
      category="Math"
      description="Perform arithmetic operations with fractions, mixed numbers, and decimal conversions."
      features={[
        "Add, subtract, multiply, and divide fractions",
        "Mixed number support",
        "Simplify fractions automatically",
        "Convert between fractions and decimals",
        "Step-by-step solution display"
      ]}
    />
  );
};

export default FractionCalculator; 