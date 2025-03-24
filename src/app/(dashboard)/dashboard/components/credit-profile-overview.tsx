"use client";

import Image from "next/image";
import TradelineStats from "./tradeline-stats";
import { CreditUtilizationCard } from "./credit-utilization-card";
import { CreditScoreCard } from "./credit-score-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CreditScoreProps {
  score: number;
  rating: string;
  lastUpdated?: string;
}

interface CreditProfileOverviewProps {
  utilization: number; // Credit utilization percentage (0-100)
  creditScore: CreditScoreProps;
}

export default function CreditProfileOverview({
  utilization = 20,
  creditScore = {
    score: 720,
    rating: "Excellent",
    lastUpdated: "Mar 28, 2024",
  },
}: CreditProfileOverviewProps) {
  // Score recommendations based on the score value
  const getScoreRecommendation = (score: number) => {
    if (score < 580) return "Your score needs improvement. Consider paying bills on time and reducing debt.";
    if (score < 670) return "Your score is fair. Continue making payments on time to improve it.";
    if (score < 740) return "Your score is good. You qualify for most loans at competitive rates.";
    if (score < 800) return "Your score is very good. You qualify for premium rates on most loans.";
    return "Your score is exceptional. You qualify for the best rates available.";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between">

      <h2 className="text-2xl font-bold text-[#1e3a4f]">Credit Profile Overview</h2>
      <h2 className="text-2xl font-bold text-[#1e3a4f]">Credit Summary</h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Promotional Banner */}
        <div className="relative overflow-hidden rounded-xl md:col-span-2">
          <Image
            src="/marketing/Banner.png"
            alt="Congratulations! Promo module with exclusive offer"
            width={700}
            height={300}
            className="w-full h-auto"
            priority
          />
          
          <div className="mt-6">
            <TradelineStats />
          </div>
        </div>

        {/* Credit Summary Section */}
        <div className="space-y-6">
          <CreditUtilizationCard utilization={utilization} />
          <CreditScoreCard 
            score={creditScore.score}
            rating={creditScore.rating}
            lastUpdated={creditScore.lastUpdated}
          />
          
          {/* Additional Stats Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Additional Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Inquiries</div>
                  <div className="text-lg font-medium">2</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Age</div>
                  <div className="text-lg font-medium">13y 4m</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 