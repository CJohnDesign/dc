"use client";

import { InfoIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreditScoreIndicator from "@/components/credit-score-indicator";

interface CreditScoreProps {
  score: number;
  rating: string;
  lastUpdated?: string;
}

function getCreditScoreInfo() {
  return (
    <div className="space-y-2 max-w-xs">
      <p className="font-medium text-foreground">Credit Score Ranges:</p>
      <ul className="text-sm space-y-1">
        <li className="flex justify-between text-foreground">
          <span className="font-medium text-emerald-500">Exceptional:</span>
          <span>800-850</span>
        </li>
        <li className="flex justify-between text-foreground">
          <span className="font-medium text-green-500">Very Good:</span>
          <span>740-799</span>
        </li>
        <li className="flex justify-between text-foreground">
          <span className="font-medium text-yellow-500">Good:</span>
          <span>670-739</span>
        </li>
        <li className="flex justify-between text-foreground">
          <span className="font-medium text-orange-500">Fair:</span>
          <span>580-669</span>
        </li>
        <li className="flex justify-between text-foreground">
          <span className="font-medium text-red-500">Poor:</span>
          <span>300-579</span>
        </li>
      </ul>
      <div className="border-t border-border/50 pt-2 mt-2">
        <p className="text-xs text-muted-foreground">
          Your credit score is calculated based on your payment history, credit utilization, 
          length of credit history, credit mix, and new credit inquiries.
        </p>
      </div>
    </div>
  );
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <InfoIcon className="h-3 w-3" />
                <span>Details</span>
              </TooltipTrigger>
              <TooltipContent 
                side="left" 
                align="start"
                className="bg-card p-3 shadow-lg rounded-lg"
              >
                {getCreditScoreInfo()}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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