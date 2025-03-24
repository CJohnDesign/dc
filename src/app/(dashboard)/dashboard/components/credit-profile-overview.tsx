"use client";

import Image from "next/image";
import { InfoIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
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
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1e3a4f]">Credit Profile Overview</h2>

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
        </div>

        {/* Credit Summary Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Credit Utilization */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Credit Utilization</span>
                  <span className="text-base font-medium">{utilization}%</span>
                </div>
                <Slider 
                  value={[utilization]} 
                  max={100} 
                  disabled 
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Credit Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Your Score</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <InfoIcon className="h-3 w-3" />
                    Details
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold">{creditScore.score}</div>
                  <div className="text-sm text-muted-foreground">{creditScore.rating}</div>
                  {creditScore.lastUpdated && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Updated on {creditScore.lastUpdated}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Stats */}
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