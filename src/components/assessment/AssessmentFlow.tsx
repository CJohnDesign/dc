'use client';

import React, { useState, useRef } from 'react';
import BusinessInfoStep from './steps/BusinessInfoStep';
import FinancialInfoStep from './steps/FinancialInfoStep';
import CreditInfoStep from './steps/CreditInfoStep';
import FundingNeedsStep from './steps/FundingNeedsStep';
import ReviewStep from './steps/ReviewStep';
import ProgressBar from './ProgressBar';

// Define the steps in our assessment flow
const STEPS = [
  { id: 'business-info', title: 'Business Information' },
  { id: 'financial-info', title: 'Financial Details' },
  { id: 'credit-info', title: 'Credit Information' },
  { id: 'funding-needs', title: 'Funding Needs' },
  { id: 'review', title: 'Review & Submit' },
];

// Define the form data structure
export interface AssessmentFormData {
  // Business Information
  businessName: string;
  businessType: string;
  industry: string;
  yearsInBusiness: string;
  numberOfEmployees: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  
  // Financial Information
  annualRevenue: string;
  monthlyRevenue: string;
  currentDebt: string;
  profitMargin: string;
  
  // Credit Information
  creditScore: string;
  bankruptcies: string;
  taxLiens: string;
  judgments: string;
  
  // Funding Needs
  fundingAmount: string;
  fundingPurpose: string;
  timeframe: string;
  preferredTerms: string;
  
  // Contact Information
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  bestTimeToContact: string;
}

const initialFormData: AssessmentFormData = {
  // Business Information
  businessName: '',
  businessType: '',
  industry: '',
  yearsInBusiness: '',
  numberOfEmployees: '',
  businessAddress: '',
  businessCity: '',
  businessState: '',
  businessZip: '',
  
  // Financial Information
  annualRevenue: '',
  monthlyRevenue: '',
  currentDebt: '',
  profitMargin: '',
  
  // Credit Information
  creditScore: '',
  bankruptcies: '',
  taxLiens: '',
  judgments: '',
  
  // Funding Needs
  fundingAmount: '',
  fundingPurpose: '',
  timeframe: '',
  preferredTerms: '',
  
  // Contact Information
  ownerName: '',
  ownerEmail: '',
  ownerPhone: '',
  bestTimeToContact: '',
};

const AssessmentFlow: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<AssessmentFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex) / (STEPS.length - 1)) * 100;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      console.log('Submitting form data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to success page or show success message
      window.location.href = '/assessment/success';
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep.id) {
      case 'business-info':
        return (
          <BusinessInfoStep 
            formData={formData} 
            onChange={handleInputChange} 
            onNext={handleNext} 
          />
        );
      case 'financial-info':
        return (
          <FinancialInfoStep 
            formData={formData} 
            onChange={handleInputChange} 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
          />
        );
      case 'credit-info':
        return (
          <CreditInfoStep 
            formData={formData} 
            onChange={handleInputChange} 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
          />
        );
      case 'funding-needs':
        return (
          <FundingNeedsStep 
            formData={formData} 
            onChange={handleInputChange} 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
          />
        );
      case 'review':
        return (
          <ReviewStep 
            formData={formData} 
            onChange={handleInputChange} 
            onSubmit={handleSubmit} 
            onPrevious={handlePrevious} 
            isSubmitting={isSubmitting} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={formRef}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="py-2 px-4 bg-[var(--primary)]">
        <h4 className="text-xs !text-white numeric mt-3 mb-1">
          Deliver Capital Funding Assessment
        </h4>
      </div>
      
      <ProgressBar progress={progress} steps={STEPS} currentStepIndex={currentStepIndex} />
      
      <div className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-[var(--secondary)]">
          {currentStep.title}
        </h2>
        
        <form onSubmit={e => e.preventDefault()}>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default AssessmentFlow; 