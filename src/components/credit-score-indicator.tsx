"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/cn"
interface CreditScoreIndicatorProps {
  score: number
  className?: string
}

export default function CreditScoreIndicator({ score, className }: CreditScoreIndicatorProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  // Animate the score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])

  // Calculate the percentage for the gauge (300-850 range)
  const percentage = Math.min(Math.max(((animatedScore - 300) / (850 - 300)) * 100, 0), 100)

  // Determine color dynamically based on exact score
  const getScoreDetails = (score: number) => {
    // Calculate a more granular category
    let category = "Poor"
    if (score >= 800) category = "Exceptional"
    else if (score >= 740) category = "Very Good"
    else if (score >= 670) category = "Good"
    else if (score >= 580) category = "Fair"

    // Dynamic color calculation - smooth gradient between ranges
    let color, textColor

    if (score >= 800) {
      // Exceptional: 800-850
      const intensity = Math.min((score - 800) / 50, 1) * 20
      color = `bg-gradient-to-r from-emerald-500 to-emerald-${Math.round(500 + intensity) * 10}`
      textColor = "text-emerald-500"
    } else if (score >= 740) {
      // Very Good: 740-799
      const ratio = (score - 740) / 60
      color = `bg-gradient-to-r from-green-500 to-emerald-${Math.round(400 + ratio * 100)}`
      textColor = "text-green-500"
    } else if (score >= 670) {
      // Good: 670-739
      const ratio = (score - 670) / 70
      color = `bg-gradient-to-r from-yellow-500 to-green-${Math.round(400 + ratio * 100)}`
      textColor = "text-yellow-500"
    } else if (score >= 580) {
      // Fair: 580-669
      const ratio = (score - 580) / 90
      color = `bg-gradient-to-r from-orange-500 to-yellow-${Math.round(400 + ratio * 100)}`
      textColor = "text-orange-500"
    } else {
      // Poor: 300-579
      const ratio = Math.max((score - 300) / 280, 0)
      color = `bg-gradient-to-r from-red-600 to-orange-${Math.round(400 + ratio * 100)}`
      textColor = "text-red-500"
    }

    return { category, color, textColor }
  }

  const { category, color, textColor } = getScoreDetails(score)

  // Get a dynamic color based on the exact score
  const getColorForScore = (score: number) => {
    // Map score from 300-850 to hue from 0-120 (red to green)
    const normalizedScore = Math.min(Math.max(score - 300, 0), 550)
    const hue = (normalizedScore / 550) * 120

    // Adjust saturation and lightness based on score ranges
    let saturation = 100
    let lightness = 50

    if (score >= 800) {
      // Make exceptional scores more vibrant
      saturation = 90
      lightness = 45
    } else if (score < 580) {
      // Make poor scores more intense
      saturation = 100
      lightness = 45
    }

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  return (
    <div className={cn("flex flex-col items-center p-6", className)}>
      <div className="relative flex h-48 w-48 items-center justify-center">
        {/* Background track */}
        <div className="absolute h-full w-full rounded-full bg-muted" />

        {/* Colored gauge */}
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle className="stroke-muted-foreground/20" cx="50" cy="50" r="40" fill="transparent" strokeWidth="8" />
          <circle
            className={cn("transition-all duration-1000 ease-out")}
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 2.51} 251`}
            style={{
              transition: "stroke-dasharray 1.5s ease-in-out, stroke 0.5s ease-in-out",
              stroke: getColorForScore(score),
            }}
          />
        </svg>

        {/* Score display */}
        <div className="z-10 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-bold tabular-nums transition-all duration-1000">
            {Math.round(animatedScore)}
          </span>
          <span className={cn("text-sm font-medium", textColor)}>{category}</span>
        </div>
      </div>

      {/* Score range labels */}
      <div className="mt-6 grid w-full grid-cols-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-muted-foreground">300</span>
          <div className="mt-1 h-3 w-0.5 bg-muted-foreground/30"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-red-500">Poor</span>
          <div className="mt-1 h-3 w-0.5 bg-muted-foreground/30"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-orange-500">Fair</span>
          <div className="mt-1 h-3 w-0.5 bg-muted-foreground/30"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-yellow-500">Good</span>
          <div className="mt-1 h-3 w-0.5 bg-muted-foreground/30"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-green-500">V.Good</span>
          <div className="mt-1 h-3 w-0.5 bg-muted-foreground/30"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-muted-foreground">850</span>
          <div className="mt-1 h-3 w-0.5 bg-muted-foreground/30"></div>
        </div>
      </div>

      {/* Score range indicator */}
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(to right, ${getColorForScore(300)}, ${getColorForScore(score)})`,
          }}
        />
      </div>
    </div>
  )
}

