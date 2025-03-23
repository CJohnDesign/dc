import React from 'react';
import { ArrowUp, ArrowDown, HelpCircle, TrendingUp, Info } from 'lucide-react';

export interface CreditSummary {
  score: number;
  scoreRating: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  utilization: number;
  activeTradelines: number;
  highUtilizationCount: number;
  negativeItemsCount: number;
  profileAge: string;
  inquiryCount: number;
  lastUpdated?: string;
}

interface CreditSummaryPanelProps {
  data: CreditSummary;
}

const CreditSummaryPanel: React.FC<CreditSummaryPanelProps> = ({ data }) => {
  const getScoreColor = (rating: string) => {
    switch (rating) {
      case 'Poor':
        return 'text-gray-500';
      case 'Fair':
        return 'text-amber-500';
      case 'Good':
        return 'text-lime-500';
      case 'Excellent':
        return 'text-gray-400';
      default:
        return 'text-gray-500';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 50) return 'text-red-500';
    if (utilization > 30) return 'text-amber-500';
    return 'text-green-500';
  };

  // Calculate the position of the pointer on the gauge arc
  // FICO scores range from 300-850
  const calculatePointerPosition = (score: number) => {
    // Limit the score to the valid range
    const boundedScore = Math.max(300, Math.min(850, score));
    
    // Calculate percentage along the scale (0 to 1)
    return (boundedScore - 300) / (850 - 300);
  };

  const pointerPosition = calculatePointerPosition(data.score);

  const MetricItem = ({ label, value, tooltip, status }: { label: string; value: string | number; tooltip?: string; status?: 'positive' | 'negative' | 'neutral' }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-1">
        <span className="text-sm">{label}</span>
        {tooltip && (
          <div className="relative group">
            <HelpCircle size={14} className="opacity-50" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1">
        <span className={`font-medium ${status === 'positive' ? 'text-green-500' : status === 'negative' ? 'text-red-500' : ''}`}>
          {value}
        </span>
        {status === 'positive' && <ArrowUp size={14} className="text-green-500" />}
        {status === 'negative' && <ArrowDown size={14} className="text-red-500" />}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Score Header */}
      <div className="p-6 bg-[var(--background-alt)] border-b border-gray-200">
        <div className="flex items-center justify-between mb-5">
          <h4 className="text-xl font-heading font-bold text-[#1e3a4f]">Your Score</h4>
          <button className="text-sm text-[#1e3a4f] font-medium hover:underline flex items-center gap-1">
            <TrendingUp size={14} />
            View History
          </button>
        </div>
        
        {/* Credit Score Gauge - Adjusted to fit container */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[260px] h-[140px] mb-2">
            {/* Gauge Background with shadow */}
            <div className="relative w-full h-full">
              {/* Gauge Track with subtle inner shadow */}
              <div className="absolute w-full h-[70px] top-0 overflow-hidden">
                <div className="w-full h-[140px] bg-gray-50 rounded-[140px] rounded-b-none shadow-inner"></div>
              </div>
              
              {/* Colored Segments with smoother gradients */}
              <div className="absolute w-full h-[70px] top-0 overflow-hidden">
                {/* Poor segment (300-579) */}
                <div 
                  className="absolute h-[140px] w-[74px] left-0 rounded-tl-[140px] top-0 overflow-hidden" 
                  style={{ background: 'linear-gradient(to right, #FF4D4D, #FF7373)' }}>
                </div>
                
                {/* Fair segment (580-669) */}
                <div 
                  className="absolute h-[140px] w-[65px] left-[74px] top-0 overflow-hidden" 
                  style={{ background: 'linear-gradient(to right, #FF9F40, #FFB366)' }}>
                </div>
                
                {/* Good segment (670-739) */}
                <div 
                  className="absolute h-[140px] w-[65px] left-[139px] top-0 overflow-hidden" 
                  style={{ background: 'linear-gradient(to right, #B8E07E, #D0E9A6)' }}>
                </div>
                
                {/* Excellent segment (740-850) */}
                <div 
                  className="absolute h-[140px] w-[56px] left-[204px] rounded-tr-[140px] top-0 overflow-hidden" 
                  style={{ background: 'linear-gradient(to right, #60AF4F, #7EC269)' }}>
                </div>
              </div>
              
              {/* Gauge Labels */}
              <div className="absolute w-full top-[25px] px-2">
                <div className="flex justify-between text-[9px] text-white font-medium">
                  <span className="ml-4">Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span className="mr-5">Excellent</span>
                </div>
              </div>
              
              {/* Tick marks */}
              <div className="absolute w-full top-[60px] px-1">
                <div className="flex justify-between text-[8px] text-gray-600 font-medium">
                  <span>300</span>
                  <span>580</span>
                  <span>670</span>
                  <span>740</span>
                  <span>850</span>
                </div>
              </div>
              
              {/* Enhanced Pointer with shadow */}
              <div 
                className="absolute top-[70px] transform -translate-x-1/2" 
                style={{ left: `calc(${pointerPosition * 100}%)` }}
              >
                <div className="relative">
                  <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#1e3a4f] drop-shadow-md"></div>
                  <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 h-3 w-3 bg-white rounded-full border-2 border-[#1e3a4f] shadow-md"></div>
                </div>
              </div>
              
              {/* Score Display with enhanced styling - made more compact */}
              <div className="absolute top-[78px] left-1/2 transform -translate-x-1/2 text-center bg-white px-5 py-1.5 rounded-full shadow-md border border-gray-100">
                <p className="text-[36px] font-bold leading-tight text-[#1e3a4f]">{data.score}</p>
                <div className="flex items-center justify-center -mt-1">
                  <span className={`text-xs font-medium ${getScoreColor(data.scoreRating)}`}>{data.scoreRating}</span>
                  <Info size={12} className="ml-1 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Last updated - with improved styling */}
          {data.lastUpdated && (
            <p className="text-xs text-gray-500 text-center">
              Last updated: <span className="font-medium">{data.lastUpdated}</span>
            </p>
          )}
        </div>
      </div>

      {/* Metrics List */}
      <div className="p-6">
        <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Credit Factors</h4>
        <MetricItem 
          label="Credit Utilization" 
          value={`${data.utilization}%`} 
          tooltip="The percentage of your available credit that you're using. Lower is better."
          status={data.utilization > 30 ? 'negative' : 'positive'} 
        />
        <MetricItem 
          label="Active Tradelines" 
          value={data.activeTradelines} 
          tooltip="The number of active credit accounts you have."
        />
        <MetricItem 
          label="High Utilization Accounts" 
          value={data.highUtilizationCount} 
          tooltip="Accounts with utilization over 30%."
          status={data.highUtilizationCount > 0 ? 'negative' : 'positive'} 
        />
        <MetricItem 
          label="Negative Items" 
          value={data.negativeItemsCount} 
          tooltip="Late payments, collections, or other negative marks."
          status={data.negativeItemsCount > 0 ? 'negative' : 'positive'} 
        />
        <MetricItem 
          label="Credit Age" 
          value={data.profileAge} 
          tooltip="The average age of all your credit accounts."
        />
        <MetricItem 
          label="Recent Inquiries" 
          value={data.inquiryCount} 
          tooltip="Hard inquiries in the last 12 months."
          status={data.inquiryCount > 2 ? 'negative' : data.inquiryCount > 0 ? 'neutral' : 'positive'} 
        />
      </div>
    </div>
  );
};

export default CreditSummaryPanel; 