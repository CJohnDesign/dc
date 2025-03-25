import React from 'react';
import { ArrowUp, ArrowDown, HelpCircle, TrendingUp, Info } from 'lucide-react';
import CreditScoreIndicator from '@/components/credit-score-indicator';
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  // This function is no longer needed as the CreditScoreIndicator handles color coding
  const getUtilizationColor = (utilization: number) => {
    if (utilization > 50) return 'text-red-500';
    if (utilization > 30) return 'text-amber-500';
    return 'text-green-500';
  };

  const MetricItem = ({ 
    label, 
    value, 
    tooltip, 
    status 
  }: { 
    label: string; 
    value: string | number; 
    tooltip?: string; 
    status?: 'positive' | 'negative' | 'neutral' 
  }) => (
    <Card className="border-0 shadow-none">
      <CardContent className="flex justify-between items-center p-2 border-b border-gray-100 last:border-0">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">{label}</span>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle size={14} className="text-muted-foreground/50" />
                </TooltipTrigger>
                <TooltipContent className="w-48">
                  <p className="text-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className={`font-medium ${
            status === 'positive' ? 'text-green-500' : 
            status === 'negative' ? 'text-red-500' : 
            'text-foreground'
          }`}>
            {value}
          </span>
          {status === 'positive' && <ArrowUp size={14} className="text-green-500" />}
          {status === 'negative' && <ArrowDown size={14} className="text-red-500" />}
        </div>
      </CardContent>
    </Card>
  );

  // Score recommendations based on the demo implementation
  const getScoreRecommendation = (score: number) => {
    if (score < 580) return "Your score needs improvement. Consider paying bills on time and reducing debt.";
    if (score < 670) return "Your score is fair. Continue making payments on time to improve it.";
    if (score < 740) return "Your score is good. You qualify for most loans at competitive rates.";
    if (score < 800) return "Your score is very good. You qualify for premium rates on most loans.";
    return "Your score is exceptional. You qualify for the best rates available.";
  };

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
        
        {/* Credit Score Component - Updated to use new UI */}
        <div className="flex flex-col items-center">
          <CreditScoreIndicator score={data.score} />
          
          {/* Add recommendation text similar to the demo */}
          <p className="text-sm text-muted-foreground text-center mt-4 px-4">
            {getScoreRecommendation(data.score)}
          </p>
          
          {/* Last updated */}
          {data.lastUpdated && (
            <p className="text-xs text-gray-500 text-center mt-2">
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