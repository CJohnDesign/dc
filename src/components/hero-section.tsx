"use client";

import React from "react";
import BarChart from "./bar-chart";
import { usePageTransition } from "../hooks/use-page-transition";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { AvatarGroup } from "@/components/avatar-group";

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
  const { isVisible, isExiting, elementRef } = usePageTransition();

  // Sample data for the bar chart with on-brand colors
  const chartData = [
    { label: "Traditional\nBanks", value: 15, color: "#1E3A8A" }, // blue-900 equivalent
    { label: "Deliver\nCapital", value: 90, color: "#6271EB" }, // primary color
  ];

  return (
    <section
      ref={elementRef}
      className={`pt-32 pb-40 md:pt-36 md:pb-52 overflow-hidden ${className} relative`}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white -z-10" />
      <div
        className="absolute top-20 left-1/4 w-96 h-96 bg-primary/15 rounded-full filter blur-[80px] -z-10 animate-pulse"
        style={{ animationDuration: "10s" }}
      />
      <div
        className="absolute bottom-20 right-1/4 w-64 h-64 bg-blue-900/15 rounded-full filter blur-[60px] -z-10 animate-pulse"
        style={{ animationDuration: "14s" }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              className="space-y-8 relative"
              style={{
                transform:
                  isVisible && !isExiting
                    ? "translateY(0)"
                    : isExiting
                    ? "translateY(-40px)"
                    : "translateY(40px)",
                opacity: isVisible && !isExiting ? 1 : 0,
                transition:
                  "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-black">
                <div className="relative mb-3 inline-block">
                  <span
                    className="px-2 relative z-10 text-primary font-extrabold tracking-tight drop-shadow-sm"
                    style={{ fontSize: "115%" }}
                  >
                    Funding
                  </span>
                  <span className="absolute -inset-1 -skew-y-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg blur-[1px] z-0"></span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-[6px] bg-primary transform origin-left rounded-full shadow-md"
                    style={{
                      transform:
                        isVisible && !isExiting ? "scaleX(1)" : "scaleX(0)",
                      transition:
                        "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.3s",
                    }}
                  />
                </div>
                <br className="md:hidden" />
                <span>
                  for Small Businesses <br className="hidden md:block" />
                  When Banks Say No
                </span>
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-2xl font-light">
                We provide fast, flexible funding solutions that empower small
                businesses to thrive when traditional options fail.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 pt-6">
                <div className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="rounded-full px-8 h-14 text-base font-medium shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 border-none transition-all duration-300 ease-out w-full relative overflow-hidden group"
                  >
                    <a href="/apply">
                      <span className="relative z-10 font-semibold">Apply Now</span>
                      <span className="absolute inset-0 bg-white/10 transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </a>
                  </Button>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 text-base border-blue-900/80 hover:bg-blue-900/5 hover:text-gray-800 hover:border-blue-900 transition-all duration-300 ease-out w-full sm:w-auto"
                >
                  <a href="/how-it-works" className="flex items-center gap-2">
                    How It Works
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-8 flex flex-row justify-start">
              <AvatarGroup 
                count={12} 
                maxDisplay={6} 
                overlapPercent={25} 
                className="shrink-0"
              />
              <div>
              <p className="text-sm md:text-base">
                <span className="text-primary font-semibold">500+</span>{" "}
                businesses funded this year
              </p>
              </div>
           </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div
              className="chart-container relative"
              style={{
                transform:
                  isVisible && !isExiting
                    ? "translateY(0)"
                    : isExiting
                    ? "translateY(-40px)"
                    : "translateY(40px)",
                opacity: isVisible && !isExiting ? 1 : 0,
                transition: isExiting
                  ? "transform 0.6s ease-in, opacity 0.6s ease-in"
                  : "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
              }}
            >
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-8 w-full max-w-md mx-auto transform hover:translate-y-[-5px] transition-all duration-300 ease-out border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Approval Rate Comparison
                </h3>
                <BarChart
                  data={chartData}
                  height={300}
                  width={450}
                  title="Approval Rate Comparison"
                />
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Data Source:</span> Small
                    Business Funding Report 2023
                  </p>
                </div>
              </div>

              {/* Enhanced decorative elements */}
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-900/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
