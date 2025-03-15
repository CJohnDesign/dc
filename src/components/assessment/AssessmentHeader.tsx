import React from 'react';

interface AssessmentHeaderProps {
  title: string;
  showDemoMode?: boolean;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({ 
  title, 
  showDemoMode = false 
}) => {
  return (
    <div className="py-2 px-4 bg-[var(--primary)] flex justify-between items-center">
      <h4 className="text-xs !text-white numeric mt-3 mb-1">
        {title}
      </h4>
      {showDemoMode && (
        <span className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-medium">
          Demo Mode
        </span>
      )}
    </div>
  );
};

export default AssessmentHeader; 