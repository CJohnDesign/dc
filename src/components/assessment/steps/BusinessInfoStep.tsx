import React from 'react';
import { AssessmentFormData } from '../assessment-flow';

interface BusinessInfoStepProps {
  formData: AssessmentFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
}

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ formData, onChange, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isStepValid = () => {
    return (
      formData.businessName.trim() !== '' &&
      formData.businessType !== '' &&
      formData.industry !== '' &&
      formData.yearsInBusiness !== '' &&
      formData.numberOfEmployees !== ''
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
            Business Name*
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
            Business Type*
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Business Type</option>
            <option value="sole_proprietorship">Sole Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="llc">LLC</option>
            <option value="corporation">Corporation</option>
            <option value="s_corporation">S Corporation</option>
            <option value="non_profit">Non-Profit</option>
          </select>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry*
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Industry</option>
            <option value="retail">Retail</option>
            <option value="restaurant">Restaurant/Food Service</option>
            <option value="construction">Construction</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="healthcare">Healthcare</option>
            <option value="technology">Technology</option>
            <option value="professional_services">Professional Services</option>
            <option value="real_estate">Real Estate</option>
            <option value="transportation">Transportation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-700 mb-1">
            Years in Business*
          </label>
          <select
            id="yearsInBusiness"
            name="yearsInBusiness"
            value={formData.yearsInBusiness}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Years</option>
            <option value="less_than_1">Less than 1 year</option>
            <option value="1_to_2">1-2 years</option>
            <option value="3_to_5">3-5 years</option>
            <option value="6_to_10">6-10 years</option>
            <option value="more_than_10">More than 10 years</option>
          </select>
        </div>

        <div>
          <label htmlFor="numberOfEmployees" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Employees*
          </label>
          <select
            id="numberOfEmployees"
            name="numberOfEmployees"
            value={formData.numberOfEmployees}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          >
            <option value="">Select Number</option>
            <option value="1">Just me</option>
            <option value="2_to_5">2-5 employees</option>
            <option value="6_to_10">6-10 employees</option>
            <option value="11_to_50">11-50 employees</option>
            <option value="51_to_200">51-200 employees</option>
            <option value="more_than_200">More than 200 employees</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="businessAddress"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="businessCity" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="businessCity"
              name="businessCity"
              value={formData.businessCity}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessState" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                id="businessState"
                name="businessState"
                value={formData.businessState}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                {/* Add all states here */}
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                {/* More states would be added here */}
              </select>
            </div>

            <div>
              <label htmlFor="businessZip" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                id="businessZip"
                name="businessZip"
                value={formData.businessZip}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                maxLength={10}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
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

export default BusinessInfoStep; 