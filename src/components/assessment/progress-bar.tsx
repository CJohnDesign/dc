import React from 'react';

interface Step {
  id: string;
  title: string;
}

interface ProgressBarProps {
  progress: number;
  steps: Step[];
  currentStepIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, steps, currentStepIndex }) => {
  return (
    <div className="px-6 md:px-8 py-4 bg-[var(--background-alt)] border-b border-gray-200">
      <div className="hidden md:flex justify-between mb-2">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`text-sm font-medium transition-colors duration-300 ${
              index <= currentStepIndex 
                ? 'text-[var(--primary)]' 
                : 'text-gray-400'
            }`}
            style={{ 
              width: `${100 / steps.length}%`,
              textAlign: index === 0 ? 'left' : index === steps.length - 1 ? 'right' : 'center'
            }}
          >
            {step.title}
          </div>
        ))}
      </div>
      
      <div className="md:hidden text-sm font-medium text-[var(--primary)] mb-2">
        Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex].title}
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--primary)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 