"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CreditScoreIndicator from "./credit-score-indicator"

export default function CreditScoreDemo() {
  const [score, setScore] = useState(720)

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Credit Score</CardTitle>
          <CardDescription>Your current credit score and rating</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CreditScoreIndicator score={score} />

          <div className="mt-8 w-full space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Adjust Score</span>
              <span className="text-sm font-medium">{score}</span>
            </div>
            <Slider
              value={[score]}
              min={300}
              max={850}
              step={1}
              onValueChange={(value) => setScore(value[0] ?? 0)}
              className="h-4"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {score < 580 && "Your score needs improvement. Consider paying bills on time and reducing debt."}
              {score >= 580 && score < 670 && "Your score is fair. Continue making payments on time to improve it."}
              {score >= 670 && score < 740 && "Your score is good. You qualify for most loans at competitive rates."}
              {score >= 740 && score < 800 && "Your score is very good. You qualify for premium rates on most loans."}
              {score >= 800 && "Your score is exceptional. You qualify for the best rates available."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

