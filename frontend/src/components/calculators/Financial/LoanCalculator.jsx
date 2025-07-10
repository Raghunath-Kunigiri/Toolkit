import React from 'react';
import PlaceholderCalculator from '../_template/PlaceholderCalculator';

const LoanCalculator = () => {
  return (
    <PlaceholderCalculator 
      calculatorName="Loan Calculator" 
      category="Financial"
      description="Calculate loan payments, interest, and amortization schedules for personal loans, student loans, and more."
      features={[
        "Calculate monthly payment amount",
        "View total interest paid",
        "Generate amortization schedule",
        "Compare different loan terms",
        "Support for various loan types"
      ]}
    />
  );
};

export default LoanCalculator; 