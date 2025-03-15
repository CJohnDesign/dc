import React from 'react';
import { AssessmentFormData } from '../AssessmentFlow';

interface CreditInfoStepProps {
  formData: AssessmentFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CreditInfoStep: React.FC<CreditInfoStepProps> = ({ 
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
    return formData.creditScore !== '';
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              This information helps us match you with the right funding options. Your credit will not be pulled at this stage.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700 mb-1">
            Approximate Credit Score*
          </label>
          <select
            id="creditScore"
            name="creditScore"
            value={formData.creditScore}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Credit Score Range</option>
            <option value="excellent">Excellent (720+)</option>
            <option value="good">Good (680-719)</option>
            <option value="fair">Fair (640-679)</option>
            <option value="poor">Poor (580-639)</option>
            <option value="bad">Bad (Below 580)</option>
            <option value="unknown">I don't know</option>
          </select>
        </div>

        <div>
          <label htmlFor="bankruptcies" className="block text-sm font-medium text-gray-700 mb-1">
            Bankruptcies in the Last 7 Years
          </label>
          <select
            id="bankruptcies"
            name="bankruptcies"
            value={formData.bankruptcies}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="0">None</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3_or_more">3 or more</option>
          </select>
        </div>

        <div>
          <label htmlFor="taxLiens" className="block text-sm font-medium text-gray-700 mb-1">
            Tax Liens in the Last 7 Years
          </label>
          <select
            id="taxLiens"
            name="taxLiens"
            value={formData.taxLiens}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="0">None</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3_or_more">3 or more</option>
          </select>
        </div>

        <div>
          <label htmlFor="judgments" className="block text-sm font-medium text-gray-700 mb-1">
            Judgments in the Last 7 Years
          </label>
          <select
            id="judgments"
            name="judgments"
            value={formData.judgments}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="0">None</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3_or_more">3 or more</option>
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

export default CreditInfoStep; 