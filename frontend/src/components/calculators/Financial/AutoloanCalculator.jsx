import React from 'react';
import PlaceholderCalculator from '../_template/PlaceholderCalculator';

const AutoloanCalculator = () => {
  return (
    <PlaceholderCalculator 
      calculatorName="Auto Loan Calculator"
      category="Financial"
      description="Calculate car loan payments, trade-in values, and financing options for new and used vehicles."
      features={[
        "Calculate monthly car payments",
        "Include trade-in value",
        "Factor in sales tax and fees",
        "Compare financing vs leasing",
        "Down payment optimization"
      ]}
    />
  );
};

export default AutoloanCalculator; 