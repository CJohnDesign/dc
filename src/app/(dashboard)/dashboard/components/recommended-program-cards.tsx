'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCardIcon, LoanIcon, LoanApprovedIcon } from '@/components/icons';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';

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
    <div className="flex flex-row gap-4 justify-center">
      {programs.map((program) => {
        const { IconComponent } = program;
        return (
          <Card key={program.id} className="flex flex-col w-[280px]">
            <CardHeader className="flex-row items-center gap-4">
              <IconComponent className="w-16 h-16 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm text-gray-900">{program.title}</h4>
                {program.amount && (
                  <p className="text-lg font-bold text-gray-900">${program.amount}</p>
                )}
              </div>
            </CardHeader>
            <CardFooter>
              <Link 
                href={program.href}
                className="w-1/2 text-center px-3 py-1.5 rounded text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Learn More
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ProgramOfferCards; 