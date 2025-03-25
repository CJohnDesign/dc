'use client';

import React, { useState, useRef, useEffect } from 'react';
import BusinessInfoStep from './steps/BusinessInfoStep';
import FinancialInfoStep from './steps/FinancialInfoStep';
import CreditInfoStep from './steps/CreditInfoStep';
import FundingNeedsStep from './steps/FundingNeedsStep';
import ReviewStep from './steps/ReviewStep';
import ProgressBar from './progress-bar';
import AssessmentHeader from './assessment-header';
import assessmentData from '@/lib/db/examples/example-assessment.json';
// Define the steps in our assessment flow
const STEPS = [
  { id: 'business-info', title: 'Business Information' },
  { id: 'financial-info', title: 'Financial Details' },
  { id: 'credit-info', title: 'Credit Information' },
  { id: 'funding-needs', title: 'Funding Needs' },
  { id: 'review', title: 'Review & Submit' },
];

// Demo mode flag - set to true to enable demo mode
const DEMO_MODE = true;

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

// Helper function to load demo data
const loadDemoData = (): AssessmentFormData => {
  const demoData = assessmentData.dummyData;
  
  return {
    // Business Information
    businessName: demoData[0]?.data?.businessName || '',
    businessType: demoData[0]?.data?.businessType || '',
    industry: demoData[0]?.data?.industry || '',
    yearsInBusiness: demoData[0]?.data?.yearsInBusiness || '',
    numberOfEmployees: demoData[0]?.data?.numberOfEmployees || '',
    businessAddress: demoData[0]?.data?.businessAddress || '',
    businessCity: demoData[0]?.data?.businessCity || '',
    businessState: demoData[0]?.data?.businessState || '',
    businessZip: demoData[0]?.data?.businessZip || '',
    
    // Financial Information
    annualRevenue: demoData[1]?.data?.annualRevenue || '',
    monthlyRevenue: demoData[1]?.data?.monthlyRevenue || '',
    currentDebt: demoData[1]?.data?.currentDebt || '',
    profitMargin: demoData[1]?.data?.profitMargin || '',
    
    // Credit Information
    creditScore: demoData[2]?.data?.creditScore || '',
    bankruptcies: demoData[2]?.data?.bankruptcies || '',
    taxLiens: demoData[2]?.data?.taxLiens || '',
    judgments: demoData[2]?.data?.judgments || '',
    
    // Funding Needs
    fundingAmount: demoData[3]?.data?.fundingAmount || '',
    fundingPurpose: demoData[3]?.data?.fundingPurpose || '',
    timeframe: demoData[3]?.data?.timeframe || '',
    preferredTerms: demoData[3]?.data?.preferredTerms || '',
    
    // Contact Information
    ownerName: demoData[4]?.data?.ownerName || '',
    ownerEmail: demoData[4]?.data?.ownerEmail || '',
    ownerPhone: demoData[4]?.data?.ownerPhone || '',
    bestTimeToContact: demoData[4]?.data?.bestTimeToContact || '',
  };
};

const AssessmentFlow: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<AssessmentFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Load demo data if DEMO_MODE is enabled
  useEffect(() => {
    if (DEMO_MODE) {
      setFormData(loadDemoData());
    }
  }, []);

  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex) / (STEPS.length - 1)) * 100;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      
      // If demo mode is enabled, load the demo data for the next step
      if (DEMO_MODE) {
        const demoData = assessmentData.dummyData;
        const nextStepId = STEPS[currentStepIndex + 1]?.id || '';
        
        // Keep current form data
        const updatedFormData = { ...formData };
        
        // Update form data based on the next step
        if (nextStepId === 'financial-info' && demoData[1]?.data) {
          updatedFormData.annualRevenue = demoData[1]?.data?.annualRevenue || '';
          updatedFormData.monthlyRevenue = demoData[1]?.data?.monthlyRevenue || '';
          updatedFormData.currentDebt = demoData[1]?.data?.currentDebt || '';
          updatedFormData.profitMargin = demoData[1]?.data?.profitMargin || '';
        } else if (nextStepId === 'credit-info' && demoData[2]?.data) {
          updatedFormData.creditScore = demoData[2]?.data?.creditScore || '';
          updatedFormData.bankruptcies = demoData[2]?.data?.bankruptcies || '';
          updatedFormData.taxLiens = demoData[2]?.data?.taxLiens || '';
          updatedFormData.judgments = demoData[2]?.data?.judgments || '';
        } else if (nextStepId === 'funding-needs' && demoData[3]?.data) {
          updatedFormData.fundingAmount = demoData[3]?.data?.fundingAmount || '';
          updatedFormData.fundingPurpose = demoData[3]?.data?.fundingPurpose || '';
          updatedFormData.timeframe = demoData[3]?.data?.timeframe || '';
          updatedFormData.preferredTerms = demoData[3]?.data?.preferredTerms || '';
        } else if (nextStepId === 'review' && demoData[4]?.data) {
          updatedFormData.ownerName = demoData[4]?.data?.ownerName || '';
          updatedFormData.ownerEmail = demoData[4]?.data?.ownerEmail || '';
          updatedFormData.ownerPhone = demoData[4]?.data?.ownerPhone || '';
          updatedFormData.bestTimeToContact = demoData[4]?.data?.bestTimeToContact || '';
        }
        
        setFormData(updatedFormData);
      }
      
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      
      // No need to update form data when going back in demo mode
      // The data should already be populated from the previous steps
      
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
    if (!currentStep) return null;

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
      <AssessmentHeader 
        title="Deliver Capital Funding Assessment" 
        showDemoMode={DEMO_MODE} 
      />
      
      <ProgressBar progress={progress} steps={STEPS} currentStepIndex={currentStepIndex} />
      
      <div className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-[var(--secondary)]">
          {currentStep?.title}
        </h2>
        
        <form onSubmit={e => e.preventDefault()}>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default AssessmentFlow; 