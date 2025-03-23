'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, Store, User, LucideIcon, ArrowRight } from 'lucide-react';

// Import the program data
import programsData from '../data/programs.json';

// Define the icon mapping
const iconMap: Record<string, LucideIcon> = {
  'CreditCard': CreditCard,
  'Store': Store,
  'User': User
};

interface Program {
  id: string;
  title: string;
  amount?: string;
  shortDescription: string;
  iconType: string;
  iconColor: string;
}

const ProgramOfferCards: React.FC = () => {
  // Get the program data (first 3 programs or fewer)
  const programs: Program[] = programsData.slice(0, 3);

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-bold text-[#1e3a4f]">Recommended Offers</h3>
        <Link 
          href="/dashboard/programs"
          className="text-sm text-[#1e3a4f] font-medium hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {programs.map((program) => {
          const Icon = iconMap[program.iconType];
          return (
            <div 
              key={program.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                style={{ backgroundColor: `${program.iconColor}20` }}
              >
                {Icon && <Icon size={20} style={{ color: program.iconColor }} />}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{program.title}</h4>
                {program.amount && (
                  <p className="text-lg font-bold text-gray-900">${program.amount}</p>
                )}
              </div>

              <Link 
                href={`/dashboard/programs#${program.id}`}
                className="flex-shrink-0 px-3 py-1.5 rounded text-sm font-medium text-white"
                style={{ backgroundColor: program.iconColor }}
              >
                Apply
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramOfferCards; 