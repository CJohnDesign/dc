import React from 'react';
import { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Funding Portal | Deliver Capital',
  description: 'Access your business funding portal to track your application status and optimize your financial profile.',
};

export default function FundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background-alt)]">
        <header className="bg-[var(--primary)] text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Deliver Capital</h1>
              <span className="ml-2 px-2 py-1 bg-white/20 rounded-md text-sm">Funding Portal</span>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/fund/dashboard" className="hover:underline">Dashboard</a></li>
                <li><a href="/fund/profile" className="hover:underline">Profile</a></li>
                <li><a href="/fund/documents" className="hover:underline">Documents</a></li>
                <li><a href="/fund/support" className="hover:underline">Support</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-[var(--secondary)] text-white py-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Deliver Capital. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
} 