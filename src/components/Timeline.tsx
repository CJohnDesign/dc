'use client';

import { useState } from 'react';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const Timeline = ({ steps, className = '' }: TimelineProps) => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className={`w-full ${className}`}>
      {/* Timeline navigation */}
      <div className="flex justify-between mb-6 sm:mb-8 relative px-2">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out" 
            style={{ width: `${(activeStep - 1) / (steps.length - 1) * 100}%` }}
          />
        </div>
        
        {/* Step indicators */}
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`
              w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10
              transition-all duration-300 ease-in-out
              ${activeStep >= step.id 
                ? 'bg-primary text-white font-semibold' 
                : 'bg-white border-2 border-gray-300 text-gray-500'}
            `}
          >
            <span className="numeric text-xs sm:text-sm md:text-base font-bold">{step.id}</span>
          </button>
        ))}
      </div>

      {/* Active step content */}
      {steps.map((step) => (
        <div 
          key={step.id}
          className={`
            transition-all duration-500 ease-in-out
            ${activeStep === step.id ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}
          `}
        >
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <div className="mb-3 sm:mb-0 sm:mr-4 text-primary flex justify-center">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-800 text-center sm:text-left">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-800">{step.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Mobile step selector */}
      <div className="sm:hidden flex justify-between mt-4 px-4">
        <button 
          onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
          disabled={activeStep === 1}
          className="px-3 py-1 bg-gray-100 rounded text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-800">
          Step {activeStep} of {steps.length}
        </span>
        <button 
          onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length))}
          disabled={activeStep === steps.length}
          className="px-3 py-1 bg-gray-100 rounded text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Timeline; 