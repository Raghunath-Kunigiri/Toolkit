import React from 'react';
import PlaceholderCalculator from '../_template/PlaceholderCalculator';

const RetirementCalculator = () => {
  return (
    <PlaceholderCalculator 
      calculatorName="Retirement Calculator"
      category="Financial"
      description="Plan your retirement savings with comprehensive calculations for 401(k), IRA, and investment growth."
      features={[
        "Calculate retirement savings needs",
        "401(k) and IRA projections",
        "Social Security estimates",
        "Investment growth modeling",
        "Retirement timeline planning"
      ]}
    />
  );
};

export default RetirementCalculator; 