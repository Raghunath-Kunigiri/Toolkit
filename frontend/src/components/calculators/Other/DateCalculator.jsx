import React from 'react';
import PlaceholderCalculator from '../_template/PlaceholderCalculator';

const DateCalculator = () => {
  return (
    <PlaceholderCalculator 
      calculatorName="Date Calculator"
      description="Calculate date differences, add/subtract days, and work with business days and holidays."
      category="Other"
      features={[
        "Calculate days between dates",
        "Add or subtract days from a date",
        "Business day calculations",
        "Holiday exclusions",
        "Multiple date format support"
      ]}
    />
  );
};

export default DateCalculator; 