import React from 'react';
import { Metadata } from 'next';
import SuccessContent from '@/components/assessment/success-content';

export const metadata: Metadata = {
  title: 'Application Submitted | Deliver Capital',
  description: 'Your business funding application has been successfully submitted. Our team will review your information and contact you shortly.',
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[var(--background-alt)] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <SuccessContent />
      </div>
    </main>
  );
} 