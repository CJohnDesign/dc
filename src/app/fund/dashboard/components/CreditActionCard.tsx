import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export interface CreditActionItem {
  type: 'utilization' | 'inquiries' | 'revolving_limit';
  status: 'caution' | 'warning' | 'good';
  metric: string;
  threshold: string;
  impact: string;
  actions: {
    title: string;
    description: string;
    steps: string[];
  }[];
}

interface CreditActionCardProps {
  item: CreditActionItem;
}

export const CreditActionCard: React.FC<CreditActionCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'warning':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'caution':
        return <AlertTriangle size={20} className="text-amber-500" />;
      case 'good':
        return <CheckCircle size={20} className="text-green-500" />;
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'warning':
        return 'border-red-200 bg-red-50';
      case 'caution':
        return 'border-amber-200 bg-amber-50';
      case 'good':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getTypeTitle = (type: string) => {
    switch (type) {
      case 'utilization':
        return 'Credit Utilization';
      case 'inquiries':
        return 'Credit Inquiries';
      case 'revolving_limit':
        return 'Revolving Credit Limit';
      default:
        return 'Credit Item';
    }
  };

  return (
    <div className={`rounded-xl border p-4 mb-4 ${getStatusColor(item.status)}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className="mt-1">{getStatusIcon(item.status)}</div>
          <div>
            <h4 className="text-base font-heading font-bold text-[#1e3a4f]">{getTypeTitle(item.type)}</h4>
            <p className="text-sm mt-1">
              Current: <span className="font-medium">{item.metric}</span> | Target: <span className="font-medium">{item.threshold}</span>
            </p>
            <p className="text-sm opacity-80 mt-1">
              Impact: <span className="font-medium">{item.impact}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-black/5"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pl-9">
          <h5 className="font-bold text-sm mb-2">How to Fix:</h5>
          {item.actions.map((action, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium text-sm">{action.title}</p>
              <p className="text-sm opacity-80 mb-2">{action.description}</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {action.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
          <button className="mt-2 text-sm font-medium text-[#1e3a4f] hover:underline">
            Mark as Addressed
          </button>
        </div>
      )}
    </div>
  );
};

export default CreditActionCard; 