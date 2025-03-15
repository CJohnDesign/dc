import React from 'react';
import { Metadata } from 'next';
import AssessmentFlow from '@/components/assessment/AssessmentFlow';

export const metadata: Metadata = {
  title: 'Business Funding Assessment | Deliver Capital',
  description: 'Complete our quick assessment to determine your business funding options and get personalized recommendations.',
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-[var(--background-alt)] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <AssessmentFlow />
      </div>
    </main>
  );
} 