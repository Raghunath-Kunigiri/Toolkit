import React from 'react';
import PlaceholderCalculator from '../_template/PlaceholderCalculator';

const CalorieCalculator = () => {
  return (
    <PlaceholderCalculator 
      calculatorName="Calorie Calculator"
      category="Fitness & Health"
      description="Calculate daily calorie needs, BMR, and macronutrient requirements for your fitness goals."
      features={[
        "Calculate daily calorie needs",
        "Basal Metabolic Rate (BMR)",
        "Activity level adjustments",
        "Weight loss/gain planning",
        "Macronutrient breakdowns"
      ]}
    />
  );
};

export default CalorieCalculator; 