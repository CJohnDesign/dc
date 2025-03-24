"use client";

import { InfoIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CreditScoreIndicator from "@/components/credit-score-indicator";

interface CreditScoreProps {
  score: number;
  rating: string;
  lastUpdated?: string;
}

function getScoreRecommendation(score: number) {
  if (score < 580) return "Your score needs improvement. Consider paying bills on time and reducing debt.";
  if (score < 670) return "Your score is fair. Continue making payments on time to improve it.";
  if (score < 740) return "Your score is good. You qualify for most loans at competitive rates.";
  if (score < 800) return "Your score is very good. You qualify for premium rates on most loans.";
  return "Your score is exceptional. You qualify for the best rates available.";
}

export function CreditScoreCard({ score, rating, lastUpdated }: CreditScoreProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900">Your Score</CardTitle>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <InfoIcon className="h-3 w-3" />
            Details
          </span>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col items-center">
          <CreditScoreIndicator score={score} className="scale-75" />
          <p className="text-xs text-muted-foreground text-center mt-2">
            {getScoreRecommendation(score)}
          </p>
          {lastUpdated && (
            <div className="text-xs text-muted-foreground mt-2">
              Updated on {lastUpdated}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}