'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, Store, User, LucideIcon, ArrowRight } from 'lucide-react';
import programsData from '@/lib/db/examples/example-programs.json';

// Define a mapping of icon names to actual Lucide icons
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
  description: string;
  iconType: string;
  iconColor: string;
  keyFeatures: string[];
}

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  const Icon = iconMap[program.iconType];
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Card Header */}
      <div 
        className="p-6"
        style={{ backgroundColor: `${program.iconColor}10` }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
            style={{ backgroundColor: `${program.iconColor}30` }}
          >
            {Icon && <Icon size={22} style={{ color: program.iconColor }} />}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
        </div>
        
        {program.amount && (
          <div className="mb-2">
            <span className="text-sm text-gray-500">Up to</span>
            <p className="text-3xl font-bold" style={{ color: program.iconColor }}>
              ${program.amount}
            </p>
          </div>
        )}
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-600 mb-6">{program.shortDescription}</p>
        
        <div className="mb-6">
          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Features</h4>
          <ul className="space-y-2">
            {program.keyFeatures.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-gray-700 text-sm">
                • {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <Link 
          href={`/dashboard/programs/${program.id}`}
          className="flex items-center text-sm font-medium transition-colors"
          style={{ color: program.iconColor }}
        >
          Learn more <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {/* Card Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <button
          className="w-full py-2 px-4 rounded-md text-white text-sm font-medium transition-colors"
          style={{ backgroundColor: program.iconColor }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default function ProgramsPage() {
  const programs = programsData as Program[];

  return (
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-[#1e3a4f]">Funding Programs</h2>
        </div>
        
        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
  );
} 