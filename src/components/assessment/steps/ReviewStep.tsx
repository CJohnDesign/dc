import React from 'react';
import { AssessmentFormData } from '../assessment-flow';

interface ReviewStepProps {
  formData: AssessmentFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ 
  formData, 
  onChange, 
  onSubmit, 
  onPrevious,
  isSubmitting 
}) => {
  // Helper function to format field values for display
  const formatValue = (key: string, value: string) => {
    if (!value) return 'Not provided';
    
    // Replace underscores with spaces and capitalize
    if (value.includes('_')) {
      return value
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return value;
  };

  // Group data for display
  const sections = [
    {
      title: 'Business Information',
      fields: [
        { label: 'Business Name', value: formData.businessName },
        { label: 'Business Type', value: formatValue('businessType', formData.businessType) },
        { label: 'Industry', value: formatValue('industry', formData.industry) },
        { label: 'Years in Business', value: formatValue('yearsInBusiness', formData.yearsInBusiness) },
        { label: 'Number of Employees', value: formatValue('numberOfEmployees', formData.numberOfEmployees) },
        { label: 'Business Address', value: [
          formData.businessAddress,
          formData.businessCity,
          formData.businessState,
          formData.businessZip
        ].filter(Boolean).join(', ') || 'Not provided' }
      ]
    },
    {
      title: 'Financial Information',
      fields: [
        { label: 'Annual Revenue', value: formatValue('annualRevenue', formData.annualRevenue) },
        { label: 'Monthly Revenue', value: formatValue('monthlyRevenue', formData.monthlyRevenue) },
        { label: 'Current Debt', value: formatValue('currentDebt', formData.currentDebt) },
        { label: 'Profit Margin', value: formatValue('profitMargin', formData.profitMargin) }
      ]
    },
    {
      title: 'Credit Information',
      fields: [
        { label: 'Credit Score', value: formatValue('creditScore', formData.creditScore) },
        { label: 'Bankruptcies', value: formatValue('bankruptcies', formData.bankruptcies) },
        { label: 'Tax Liens', value: formatValue('taxLiens', formData.taxLiens) },
        { label: 'Judgments', value: formatValue('judgments', formData.judgments) }
      ]
    },
    {
      title: 'Funding Needs',
      fields: [
        { label: 'Funding Amount', value: formatValue('fundingAmount', formData.fundingAmount) },
        { label: 'Funding Purpose', value: formatValue('fundingPurpose', formData.fundingPurpose) },
        { label: 'Timeframe', value: formatValue('timeframe', formData.timeframe) },
        { label: 'Preferred Terms', value: formatValue('preferredTerms', formData.preferredTerms) }
      ]
    },
    {
      title: 'Contact Information',
      fields: [
        { label: 'Full Name', value: formData.ownerName },
        { label: 'Email', value: formData.ownerEmail },
        { label: 'Phone', value: formData.ownerPhone },
        { label: 'Best Time to Contact', value: formatValue('bestTimeToContact', formData.bestTimeToContact) }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please review your information before submitting. You can go back to make changes if needed.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="px-4 py-3 flex justify-between">
                  <span className="text-sm font-medium text-gray-500">{field.label}</span>
                  <span className="text-sm text-gray-900 ml-4 text-right">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 flex flex-col space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              I agree to the terms and conditions
            </label>
            <p className="text-gray-500">
              By submitting this form, you agree to our <a href="/terms" className="text-[var(--primary)] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[var(--primary)] hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep; 