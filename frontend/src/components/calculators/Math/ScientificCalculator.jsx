import React from 'react';
import PlaceholderCalculator from '../_template/PlaceholderCalculator';

const ScientificCalculator = () => {
  return (
    <PlaceholderCalculator 
      calculatorName="Scientific Calculator"
      category="Math"
      description="Advanced calculator with trigonometric, logarithmic, and exponential functions for complex calculations."
      features={[
        "Basic arithmetic operations",
        "Trigonometric functions (sin, cos, tan)",
        "Logarithmic and exponential functions",
        "Scientific notation support",
        "Memory functions and constants"
      ]}
    />
  );
};

export default ScientificCalculator; 