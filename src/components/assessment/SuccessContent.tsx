'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
      <div className="p-6 md:p-8 bg-[var(--primary)] text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Application Submitted!</h1>
        <p className="mt-2 text-white/80">
          Thank you for completing your business funding assessment
        </p>
      </div>
      
      <div className="p-6 md:p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--secondary)]">
          Your Application Has Been Received
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Our team of funding experts will review your information and contact you within 24 hours to discuss your personalized funding options.
        </p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 max-w-lg mx-auto text-left">
          <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
          <ol className="list-decimal pl-5 text-blue-700 space-y-2">
            <li>Our team reviews your application (within 24 hours)</li>
            <li>We'll contact you to discuss your funding options</li>
            <li>We'll help you select the best option for your business</li>
            <li>Funding can be provided in as little as 24-48 hours</li>
          </ol>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-2 rounded-md bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            Return to Home
          </Link>
          <Link 
            href="/contact"
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessContent; 