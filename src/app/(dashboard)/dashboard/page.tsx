"use client";

import React, { use } from "react";
import { useUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CreditProfileOverview from "./components/credit-profile-overview";
import AccountsTable from "./components/accounts-table";
import ProgramOfferCards from "./components/program-offer-cards";
import { getAccounts, getCreditSummary } from "./utils/dataProvider";

export default function HomePage() {
  const { userPromise } = useUser();
  const user = use(userPromise);

  // Get data from our data provider
  const accounts = getAccounts();
  const creditSummary = getCreditSummary();

  return (
    <div className="space-y-6">
      {user && (
        <div className="text-foreground font-medium">
          Welcome back,{" "}
          <span className="text-primary">{user.firstName || "Admin"}</span>
        </div>
      )}

      {/* Page Title and Program Offers */}
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-[#1e3a4f]">
          Recommended Programs <span className="text-sm text-gray-500">Here are some loan options you may qualify for</span>
        </p>
        <Button variant="link" className="text-sm text-[#1e3a4f] font-thin hover:underline flex items-center gap-1">View All Programs <ArrowRight size={14} /></Button>
      </div>
      <ProgramOfferCards />

      {/* Credit Profile Overview with Banner and Credit Summary */}
      <CreditProfileOverview 
        utilization={creditSummary.utilization} 
        creditScore={{
          score: creditSummary.score,
          rating: creditSummary.scoreRating,
          lastUpdated: creditSummary.lastUpdated
        }}
      />
      
      {/* Credit Accounts */}
      <div>
        <h3 className="text-lg font-heading font-bold mb-3 text-[#1e3a4f]">
          Credit Accounts
        </h3>
        <AccountsTable accounts={accounts} />
      </div>
    </div>
  );
}
