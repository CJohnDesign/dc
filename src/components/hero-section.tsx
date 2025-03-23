'use client';

import React from 'react';
import Image from 'next/image';
import BarChart from './bar-chart';
import { usePageTransition } from '../hooks/use-page-transition';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  const { isVisible, isExiting, elementRef } = usePageTransition();

  // Sample data for the bar chart with on-brand colors
  const chartData = [
    { label: 'Traditional\nBanks', value: 15, color: 'var(--primary-light)' },
    { label: 'Deliver\nCapital', value: 90, color: 'var(--secondary)' },
  ];

  return (
    <section 
      ref={elementRef}
      className={`pt-32 pb-40 md:pt-36 md:pb-52 overflow-hidden ${className} relative`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-white to-[var(--background-alt)] -z-10" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--secondary)]/10 rounded-full filter blur-[80px] -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[var(--primary)]/10 rounded-full filter blur-[60px] -z-10 animate-pulse" style={{ animationDuration: '14s' }} />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div 
              className="space-y-8 relative"
              style={{
                transform: isVisible && !isExiting 
                  ? 'translateY(0)' 
                  : isExiting 
                    ? 'translateY(-40px)' 
                    : 'translateY(40px)',
                opacity: isVisible && !isExiting ? 1 : 0,
                transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-[var(--primary)]">
                <span className="text-[var(--secondary)] relative inline-block pb-1 overflow-hidden">
                  Funding
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--secondary)] transform origin-left" 
                    style={{
                      transform: isVisible && !isExiting ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.3s'
                    }}
                  />
                </span>{' '}
                for Small Businesses When Banks Say No
              </h1>
              
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--text-dark)] max-w-2xl font-light">
                We provide fast, flexible funding solutions that empower small businesses to thrive when traditional options fail.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                <Button 
                  asChild
                  variant="default" 
                  size="lg"
                  className="rounded-full px-8 h-14 text-base shadow-lg hover:shadow-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition-all duration-300 ease-out w-full sm:w-auto relative overflow-hidden group"
                >
                  <a href="/apply">
                    <span className="relative z-10">Apply Now</span>
                    <span className="absolute inset-0 bg-white/10 transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </a>
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="rounded-full px-8 h-14 text-base border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)]/5 hover:text-[var(--secondary)] hover:border-[var(--secondary)] transition-all duration-300 ease-out w-full sm:w-auto"
                >
                  <a href="/how-it-works" className="flex items-center gap-2">
                    How It Works
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
              
              <div className="flex items-center pt-6 space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                      <Image src={`/images/avatar-${i}.jpg`} width={40} height={40} alt={`Customer ${i}`} className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-[var(--primary)] font-semibold">500+</span> businesses funded this year
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div 
              className="chart-container relative"
              style={{
                transform: isVisible && !isExiting 
                  ? 'translateY(0)' 
                  : isExiting 
                    ? 'translateY(-40px)' 
                    : 'translateY(40px)',
                opacity: isVisible && !isExiting ? 1 : 0,
                transition: isExiting
                  ? 'transform 0.6s ease-in, opacity 0.6s ease-in'
                  : 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s'
              }}
            >
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 w-full max-w-md mx-auto transform hover:translate-y-[-5px] transition-all duration-300 ease-out">
                <h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">Approval Rate Comparison</h3>
                <BarChart 
                  data={chartData} 
                  height={300} 
                  width={450}
                  title="Approval Rate Comparison"
                />
                <div className="mt-6 text-center">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    <span className="font-semibold">Data Source:</span> Small Business Funding Report 2023
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--accent)]/10 rounded-full -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--primary)]/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
