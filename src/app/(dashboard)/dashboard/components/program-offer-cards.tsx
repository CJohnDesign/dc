'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCardIcon, LoanIcon, LoanApprovedIcon } from '@/components/icons';

interface Program {
  id: string;
  title: string;
  amount: string;
  IconComponent: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }>;
  href: string;
}

const ProgramOfferCards: React.FC = () => {
  // Define the programs with their respective icons and data
  const programs: Program[] = [
    {
      id: 'credit-card',
      title: 'Credit Card Program',
      amount: '50,000',
      IconComponent: CreditCardIcon,
      href: '/dashboard/programs#credit-card'
    },
    {
      id: 'business-loan',
      title: 'Business Loan Program',
      amount: '250,000',
      IconComponent: LoanIcon,
      href: '/dashboard/programs#business-loan'
    },
    {
      id: 'personal-loan',
      title: 'Personal Loan Program',
      amount: '150,000',
      IconComponent: LoanApprovedIcon,
      href: '/dashboard/programs#personal-loan'
    }
  ];

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {programs.map((program) => {
          const { IconComponent } = program;
          return (
            <div 
              key={program.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <IconComponent className="w-16 h-16" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{program.title}</h4>
                {program.amount && (
                  <p className="text-lg font-bold text-gray-900">${program.amount}</p>
                )}
              </div>

              <Link 
                href={program.href}
                className="flex-shrink-0 px-3 py-1.5 rounded text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramOfferCards; 