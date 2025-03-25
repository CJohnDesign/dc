"use client";

import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";

interface CreditUtilizationCardProps {
  utilization: number;
}

// Maps utilization to credit score scale (inverted since lower utilization is better)
function mapUtilizationToScore(utilization: number): number {
  // Invert the scale (0% utilization = 850 score, 100% utilization = 300 score)
  return Math.round(850 - (utilization * 5.5));
}

function getUtilizationDetails(utilization: number) {
  const mappedScore = mapUtilizationToScore(utilization);
  
  let category = "Poor";
  if (utilization <= 10) category = "Exceptional";
  else if (utilization <= 30) category = "Very Good";
  else if (utilization <= 50) category = "Good";
  else if (utilization <= 75) category = "Fair";

  // Use the same color logic as CreditScoreIndicator
  const normalizedScore = Math.min(Math.max(mappedScore - 300, 0), 550);
  const hue = (normalizedScore / 550) * 120;
  const saturation = utilization <= 10 ? 90 : utilization >= 75 ? 100 : 100;
  const lightness = utilization <= 10 ? 45 : utilization >= 75 ? 45 : 50;

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
  // Get text color class based on category
  const textColorClass = 
    utilization <= 10 ? "text-emerald-700 bg-emerald-100" :
    utilization <= 30 ? "text-green-700 bg-green-100" :
    utilization <= 50 ? "text-yellow-700 bg-yellow-100" :
    utilization <= 75 ? "text-orange-700 bg-orange-100" :
    "text-red-700 bg-red-100";

  return { category, color, textColorClass };
}

function getUtilizationMessage(utilization: number) {
  if (utilization <= 10) return "Exceptional utilization. Keep it up!";
  if (utilization <= 30) return "Great utilization. You're on the right track.";
  if (utilization <= 50) return "Good utilization. Consider reducing if possible.";
  if (utilization <= 75) return "High utilization. Try to reduce your credit usage.";
  return "Very high utilization. Focus on reducing credit usage.";
}

export function CreditUtilizationCard({ utilization }: CreditUtilizationCardProps) {
  const { category, color, textColorClass } = getUtilizationDetails(utilization);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900">Credit Utilization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Utilization</span>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{utilization}%</span>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                textColorClass
              )}>
                {category}
              </span>
            </div>
          </div>
          
          <Slider 
            value={[utilization]} 
            max={100} 
            disabled
            className="bg-gray-100"
            style={{
              "--slider-color": color
            } as React.CSSProperties}
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            {getUtilizationMessage(utilization)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}