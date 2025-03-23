'use client';

import React from 'react';
import CreditActionCard from './components/credit-action-card';
import CreditSummaryPanel from './components/credit-summary-panel';
import AccountsTable from './components/accounts-table';
import ProgramOfferCards from './components/program-offer-cards';
import { getCreditActionItems, getCreditSummary, getAccounts } from './utils/dataProvider';

export default function FundDashboardPage() {
  // Get data from our data provider
  const creditActionItems = getCreditActionItems();
  const creditSummary = getCreditSummary();
  const accounts = getAccounts();

  return (
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-[#1e3a4f]">Credit Dashboard</h2>
          <button className="px-4 py-2 bg-[#1e3a4f] text-white rounded-lg hover:bg-[#1e3a4f]/90 transition-colors">
            Refresh Data
          </button>
        </div>

        {/* Program Offers */}
        <ProgramOfferCards />

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Action Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-heading font-bold mb-3 text-[#1e3a4f]">Credit Action Items</h3>
              <div className="space-y-4">
                {creditActionItems.length > 0 ? (
                  creditActionItems.map((item, index) => (
                    <CreditActionCard key={index} item={item} />
                  ))
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-green-700">No action items needed! Your credit is in good shape.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Accounts Table */}
            <div>
              <h3 className="text-lg font-heading font-bold mb-3 text-[#1e3a4f]">Credit Accounts</h3>
              <AccountsTable accounts={accounts} />
            </div>
          </div>
          
          {/* Right Column - Credit Summary */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-3 text-[#1e3a4f]">Credit Overview</h3>
            <CreditSummaryPanel data={creditSummary} />
          </div>
        </div>
      </div>
  );
} 