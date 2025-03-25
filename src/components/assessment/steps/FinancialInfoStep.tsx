import React from 'react';
import { AssessmentFormData } from '../assessment-flow';

interface FinancialInfoStepProps {
  formData: AssessmentFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const FinancialInfoStep: React.FC<FinancialInfoStepProps> = ({ 
  formData, 
  onChange, 
  onNext, 
  onPrevious 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isStepValid = () => {
    return (
      formData.annualRevenue !== '' &&
      formData.monthlyRevenue !== ''
    );
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-6">
        This information helps us determine the funding options that best match your business profile.
        All information is kept confidential and secure.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 mb-1">
            Annual Revenue*
          </label>
          <select
            id="annualRevenue"
            name="annualRevenue"
            value={formData.annualRevenue}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Annual Revenue</option>
            <option value="less_than_100k">Less than $100,000</option>
            <option value="100k_to_250k">$100,000 - $250,000</option>
            <option value="250k_to_500k">$250,000 - $500,000</option>
            <option value="500k_to_1m">$500,000 - $1 million</option>
            <option value="1m_to_5m">$1 million - $5 million</option>
            <option value="5m_to_10m">$5 million - $10 million</option>
            <option value="more_than_10m">More than $10 million</option>
          </select>
        </div>

        <div>
          <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-gray-700 mb-1">
            Average Monthly Revenue*
          </label>
          <select
            id="monthlyRevenue"
            name="monthlyRevenue"
            value={formData.monthlyRevenue}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Monthly Revenue</option>
            <option value="less_than_10k">Less than $10,000</option>
            <option value="10k_to_25k">$10,000 - $25,000</option>
            <option value="25k_to_50k">$25,000 - $50,000</option>
            <option value="50k_to_100k">$50,000 - $100,000</option>
            <option value="100k_to_500k">$100,000 - $500,000</option>
            <option value="more_than_500k">More than $500,000</option>
          </select>
        </div>

        <div>
          <label htmlFor="currentDebt" className="block text-sm font-medium text-gray-700 mb-1">
            Current Business Debt
          </label>
          <select
            id="currentDebt"
            name="currentDebt"
            value={formData.currentDebt}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            <option value="">Select Current Debt</option>
            <option value="none">None</option>
            <option value="less_than_10k">Less than $10,000</option>
            <option value="10k_to_50k">$10,000 - $50,000</option>
            <option value="50k_to_100k">$50,000 - $100,000</option>
            <option value="100k_to_500k">$100,000 - $500,000</option>
            <option value="more_than_500k">More than $500,000</option>
          </select>
        </div>

        <div>
          <label htmlFor="profitMargin" className="block text-sm font-medium text-gray-700 mb-1">
            Approximate Profit Margin
          </label>
          <select
            id="profitMargin"
            name="profitMargin"
            value={formData.profitMargin}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            <option value="">Select Profit Margin</option>
            <option value="negative">Negative (Operating at a loss)</option>
            <option value="breakeven">Breakeven</option>
            <option value="1_to_5">1% - 5%</option>
            <option value="6_to_10">6% - 10%</option>
            <option value="11_to_15">11% - 15%</option>
            <option value="16_to_20">16% - 20%</option>
            <option value="more_than_20">More than 20%</option>
          </select>
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isStepValid()}
          className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${
            isStepValid()
              ? 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FinancialInfoStep; 