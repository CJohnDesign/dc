'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AssessmentHeader from './assessment-header';

const SuccessContent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Simple entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <AssessmentHeader title="Funding Application Submitted" />
      
      <div className="p-6 md:p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-xl md:text-3xl font-bold mb-4 text-[var(--secondary)]">
          Access Your Funding Portal
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Your business funding application has been successfully submitted. Our financial experts are now ready to help optimize your profile for improved loan qualification.
        </p>
        
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-xl p-6 mb-8 max-w-lg mx-auto text-white shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-white">Your Funding Portal Includes:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Loan qualification status tracking</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Customized funding options</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Financial profile optimization</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Direct access to loan advisors</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Business document management</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Bank approval improvement tools</span>
            </li>
          </ul>
          
          <div className="mt-6">
            <Link 
              href="http://fund.localhost:3000/dashboard"
              className="inline-block w-full px-6 py-3 rounded-md bg-white text-[var(--primary-dark)] font-bold hover:bg-gray-100 transition-colors text-lg"
            >
              Start Your Funding Journey
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-6 max-w-lg mx-auto">
          <p className="text-gray-500 mb-4 text-sm">
            Our financial experts will review your application within 24 hours and begin structuring your profile for improved bank approvals. You'll receive updates in your portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Questions? Contact Our Funding Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessContent; 