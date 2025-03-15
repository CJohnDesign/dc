import React from 'react';
import { AssessmentFormData } from '../AssessmentFlow';

interface FundingNeedsStepProps {
  formData: AssessmentFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const FundingNeedsStep: React.FC<FundingNeedsStepProps> = ({ 
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
      formData.fundingAmount !== '' &&
      formData.fundingPurpose !== '' &&
      formData.timeframe !== '' &&
      formData.ownerName.trim() !== '' &&
      formData.ownerEmail.trim() !== '' &&
      formData.ownerPhone.trim() !== ''
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fundingAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Desired Funding Amount*
          </label>
          <select
            id="fundingAmount"
            name="fundingAmount"
            value={formData.fundingAmount}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Amount</option>
            <option value="less_than_25k">Less than $25,000</option>
            <option value="25k_to_50k">$25,000 - $50,000</option>
            <option value="50k_to_100k">$50,000 - $100,000</option>
            <option value="100k_to_250k">$100,000 - $250,000</option>
            <option value="250k_to_500k">$250,000 - $500,000</option>
            <option value="500k_to_1m">$500,000 - $1 million</option>
            <option value="more_than_1m">More than $1 million</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
            When Do You Need Funding?*
          </label>
          <select
            id="timeframe"
            name="timeframe"
            value={formData.timeframe}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Timeframe</option>
            <option value="immediately">Immediately (within days)</option>
            <option value="within_2_weeks">Within 2 weeks</option>
            <option value="within_30_days">Within 30 days</option>
            <option value="within_60_days">Within 60 days</option>
            <option value="more_than_60_days">More than 60 days</option>
            <option value="just_exploring">Just exploring options</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label htmlFor="fundingPurpose" className="block text-sm font-medium text-gray-700 mb-1">
            Purpose of Funding*
          </label>
          <select
            id="fundingPurpose"
            name="fundingPurpose"
            value={formData.fundingPurpose}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Purpose</option>
            <option value="working_capital">Working Capital</option>
            <option value="equipment_purchase">Equipment Purchase</option>
            <option value="inventory">Inventory</option>
            <option value="expansion">Business Expansion</option>
            <option value="real_estate">Commercial Real Estate</option>
            <option value="debt_refinancing">Debt Refinancing</option>
            <option value="startup_costs">Startup Costs</option>
            <option value="marketing">Marketing & Advertising</option>
            <option value="hiring">Hiring & Payroll</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="preferredTerms" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Repayment Terms
          </label>
          <select
            id="preferredTerms"
            name="preferredTerms"
            value={formData.preferredTerms}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            <option value="">Select Preferred Terms</option>
            <option value="short_term">Short-term (3-18 months)</option>
            <option value="medium_term">Medium-term (2-5 years)</option>
            <option value="long_term">Long-term (5+ years)</option>
            <option value="flexible">Flexible options</option>
            <option value="not_sure">Not sure</option>
          </select>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address*
            </label>
            <input
              type="email"
              id="ownerEmail"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number*
            </label>
            <input
              type="tel"
              id="ownerPhone"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="bestTimeToContact" className="block text-sm font-medium text-gray-700 mb-1">
              Best Time to Contact
            </label>
            <select
              id="bestTimeToContact"
              name="bestTimeToContact"
              value={formData.bestTimeToContact}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            >
              <option value="">Select Time</option>
              <option value="morning">Morning (9am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 5pm)</option>
              <option value="evening">Evening (5pm - 8pm)</option>
              <option value="anytime">Anytime</option>
            </select>
          </div>
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

export default FundingNeedsStep; 