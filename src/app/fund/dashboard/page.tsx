import React from 'react';
import Link from 'next/link';

export default function FundDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-[var(--secondary)] mb-6">Funding Dashboard</h1>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-green-700 font-medium">Your application has been received and is currently under review.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-1">Application Status</h3>
            <p className="text-2xl font-bold text-blue-600">Under Review</p>
            <p className="text-sm text-blue-500 mt-1">Estimated completion: 24 hours</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-1">Funding Request</h3>
            <p className="text-2xl font-bold text-purple-600">$250,000</p>
            <p className="text-sm text-purple-500 mt-1">Business expansion</p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h3 className="font-medium text-amber-800 mb-1">Profile Completion</h3>
            <p className="text-2xl font-bold text-amber-600">85%</p>
            <p className="text-sm text-amber-500 mt-1">2 documents needed</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-[var(--secondary)] mb-4">Next Steps</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
              <div>
                <h3 className="font-medium">Upload Additional Documents</h3>
                <p className="text-gray-600 text-sm">We need your business tax returns and profit & loss statements.</p>
                <Link href="/fund/documents" className="text-[var(--primary)] text-sm font-medium hover:underline mt-1 inline-block">
                  Upload Documents →
                </Link>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
              <div>
                <h3 className="font-medium">Complete Financial Profile</h3>
                <p className="text-gray-600 text-sm">Add more details about your business finances to improve approval chances.</p>
                <Link href="/fund/profile" className="text-[var(--primary)] text-sm font-medium hover:underline mt-1 inline-block">
                  Complete Profile →
                </Link>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
              <div>
                <h3 className="font-medium">Schedule Advisor Call</h3>
                <p className="text-gray-600 text-sm">Speak with a funding advisor to discuss your application.</p>
                <Link href="/fund/support" className="text-[var(--primary)] text-sm font-medium hover:underline mt-1 inline-block">
                  Schedule Call →
                </Link>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-[var(--secondary)] mb-4">Financial Optimization</h2>
          <p className="text-gray-600 mb-4">Our analysis has identified these areas to improve your funding approval chances:</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Credit Utilization</span>
              <div className="w-32 bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-sm text-yellow-600 font-medium">65%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Debt-to-Income Ratio</span>
              <div className="w-32 bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-sm text-green-600 font-medium">40%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cash Reserves</span>
              <div className="w-32 bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-sm text-red-600 font-medium">25%</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link 
              href="/fund/optimization"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              View detailed optimization report →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 