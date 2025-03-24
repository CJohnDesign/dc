"use client";

import React, { use } from "react";
import CreditActionCard from "./components/credit-action-card";
import CreditSummaryPanel from "./components/credit-summary-panel";
import AccountsTable from "./components/accounts-table";
import ProgramOfferCards from "./components/program-offer-cards";
import {
  getCreditActionItems,
  getCreditSummary,
  getAccounts,
} from "./utils/dataProvider";
import { useUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  // Get data from our data provider
  const creditActionItems = getCreditActionItems();
  const creditSummary = getCreditSummary();
  const accounts = getAccounts();

  return (
    <div className="space-y-6">
      {user && (
        <div className="text-foreground font-medium">
          Welcome back,{" "}
          <span className="text-primary">{user.firstName || "Admin"}</span>
        </div>
      )}
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-[#1e3a4f]">
          Recommended Programs <span className="text-sm text-gray-500">Here are some loan options you may qualify for</span>
        </p>
        <Button variant="link" className="text-sm text-[#1e3a4f] font-thin hover:underline flex items-center gap-1">View All Programs <ArrowRight size={14} /></Button>
      </div>
      <ProgramOfferCards />
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Action Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-heading font-bold mb-3 text-[#1e3a4f]">
              Credit Profile Overview
            </h3>
            <div className="space-y-4">
              {creditActionItems.length > 0 ? (
                creditActionItems.map((item, index) => (
                  <CreditActionCard key={index} item={item} />
                ))
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-green-700">
                    No action items needed! Your credit is in good shape.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Accounts Table */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-3 text-[#1e3a4f]">
              Credit Accounts
            </h3>
            <AccountsTable accounts={accounts} />
          </div>
        </div>

        {/* Right Column - Credit Summary */}
        <div>
          <h3 className="text-lg font-heading font-bold mb-3 text-[#1e3a4f]">
            Credit Overview
          </h3>
          <CreditSummaryPanel data={creditSummary} />
        </div>
      </div>
    </div>
  );
}
