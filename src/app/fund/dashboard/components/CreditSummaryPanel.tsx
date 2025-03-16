import React from 'react';
import { ArrowUp, ArrowDown, HelpCircle, TrendingUp } from 'lucide-react';

export interface CreditSummary {
  score: number;
  scoreRating: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  utilization: number;
  activeTradelines: number;
  highUtilizationCount: number;
  negativeItemsCount: number;
  profileAge: string;
  inquiryCount: number;
}

interface CreditSummaryPanelProps {
  data: CreditSummary;
}

const CreditSummaryPanel: React.FC<CreditSummaryPanelProps> = ({ data }) => {
  const getScoreColor = (rating: string) => {
    switch (rating) {
      case 'Poor':
        return 'text-red-500';
      case 'Fair':
        return 'text-amber-500';
      case 'Good':
        return 'text-green-500';
      case 'Excellent':
        return 'text-emerald-500';
      default:
        return 'text-blue-500';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 50) return 'text-red-500';
    if (utilization > 30) return 'text-amber-500';
    return 'text-green-500';
  };

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
        <div className="flex items-center justify-between">
          <h4 className="text-base font-heading font-bold text-[#1e3a4f]">Credit Summary</h4>
          <button className="text-sm text-[#1e3a4f] font-medium hover:underline flex items-center gap-1">
            <TrendingUp size={14} />
            View History
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70">Credit Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-heading font-bold numeric">{data.score}</span>
              <span className={`text-sm font-medium ${getScoreColor(data.scoreRating)}`}>
                {data.scoreRating}
              </span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-[#1e3a4f] flex items-center justify-center">
            <span className="font-bold text-lg text-[#1e3a4f]">{Math.floor(data.score / 8.5)}%</span>
          </div>
        </div>
      </div>

      {/* Metrics List */}
      <div className="p-6">
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