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
        
        {/* Credit Score Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[280px] h-[140px] mb-6">
            {/* Background semi-circle with colored segments */}
            <div className="relative w-full h-full">
              {/* Gauge Background */}
              <div className="absolute w-full h-[80px] top-0 overflow-hidden">
                <div className="w-full h-[160px] bg-gray-100 rounded-[160px] rounded-b-none"></div>
              </div>
              
              {/* Colored Segments */}
              <div className="absolute w-full h-[80px] top-0 overflow-hidden">
                {/* Red segment (left) */}
                <div 
                  className="absolute h-[160px] w-[90px] left-0 rounded-tl-[160px] top-0 overflow-hidden" 
                  style={{ background: 'linear-gradient(to right, rgba(249, 102, 102, 0.6), rgba(249, 102, 102, 0.6))' }}>
                </div>
                
                {/* Orange segment */}
                <div 
                  className="absolute h-[160px] w-[70px] left-[90px] top-0 overflow-hidden" 
                  style={{ background: 'linear-gradient(to right, rgba(249, 159, 64, 0.6), rgba(249, 159, 64, 0.6))' }}>
                </div>
                
                {/* Light green segment */}
                <div 
                  className="absolute h-[160px] w-[70px] left-[160px] top-0 overflow-hidden" 
                  style={{ background: 'linear-gradient(to right, rgba(186, 230, 126, 0.6), rgba(186, 230, 126, 0.6))' }}>
                </div>
                
                {/* Dark green segment (right) */}
                <div 
                  className="absolute h-[160px] w-[50px] left-[230px] rounded-tr-[160px] top-0 overflow-hidden" 
                  style={{ background: 'linear-gradient(to right, rgba(96, 175, 79, 0.6), rgba(96, 175, 79, 0.6))' }}>
                </div>
              </div>
              
              {/* Pointer */}
              <div 
                className="absolute top-[81px] transform -translate-y-full" 
                style={{ left: `calc(${pointerPosition * 100}%)` }}
              >
                <div className="h-0 w-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-black -mt-[2px]"></div>
              </div>
              
              {/* Score and Rating */}
              <div className="absolute top-[90px] left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-[48px] font-bold leading-tight">{data.score}</p>
                <div className="flex items-center justify-center">
                  <span className="text-base text-gray-400">{data.scoreRating}</span>
                  <Info size={16} className="ml-1 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Last updated */}
          {data.lastUpdated && (
            <p className="text-xs text-gray-500 text-center">
              Updated on: {data.lastUpdated}
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