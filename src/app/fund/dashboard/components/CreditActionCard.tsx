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
        return 'text-red-500 ring-red-200';
      case 'caution':
        return 'text-amber-500 ring-amber-200';
      case 'good':
        return 'text-green-500 ring-green-200';
      default:
        return 'text-blue-500 ring-blue-200';
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

  const getIconBackground = (status: string) => {
    switch (status) {
      case 'warning':
        return 'bg-red-50';
      case 'caution':
        return 'bg-amber-50';
      case 'good':
        return 'bg-green-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 p-5 mb-4 bg-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-2.5 ${getIconBackground(item.status)} flex-shrink-0`}>
            {getStatusIcon(item.status)}
          </div>
          <div>
            <h4 className="text-base font-heading font-bold text-[#1e3a4f]">{getTypeTitle(item.type)}</h4>
            <p className="text-sm mt-1.5">
              Current: <span className="font-medium">{item.metric}</span> | Target: <span className="font-medium">{item.threshold}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Impact: <span className={`font-medium ${getStatusColor(item.status)}`}>{item.impact}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-5 pl-12 pt-3 border-t border-gray-100">
          <h5 className="font-bold text-sm mb-3">How to Fix:</h5>
          {item.actions.map((action, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium text-sm text-[#1e3a4f]">{action.title}</p>
              <p className="text-sm text-gray-600 mb-2">{action.description}</p>
              <ul className="list-disc pl-5 text-sm space-y-1.5 text-gray-700">
                {action.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
          <button className="mt-2 text-sm font-medium px-3 py-1.5 rounded-md bg-gray-100 text-[#1e3a4f] hover:bg-gray-200 transition-colors">
            Mark as Addressed
          </button>
        </div>
      )}
    </div>
  );
};

export default CreditActionCard; 