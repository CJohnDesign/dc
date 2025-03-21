'use client';

import React from 'react';
import BarChart from './BarChart';
import { usePageTransition } from '../hooks/usePageTransition';

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
      className={`py-12 md:py-16 bg-[var(--background)] ${className} overflow-hidden`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div 
            className="order-2 lg:order-1 transition-all duration-1000"
            style={{
              transform: isVisible && !isExiting 
                ? 'translateY(0)' 
                : isExiting 
                  ? 'translateY(-40px)' 
                  : 'translateY(40px)',
              opacity: isVisible && !isExiting ? 1 : 0,
              transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
            }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Funding for Small Businesses When Banks Say No
            </h1>
            <p className="text-lg mb-6 text-gray-700 max-w-xl">
              We provide fast, flexible funding solutions for small businesses that don't qualify for traditional bank loans. Get approved in 24 hours with minimal paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/apply" 
                className="btn-primary text-center"
              >
                Apply Now
              </a>
              <a 
                href="/how-it-works" 
                className="btn-secondary text-center"
              >
                How It Works
              </a>
            </div>
          </div>
          
          <div 
            className="order-1 lg:order-2 chart-container transition-all duration-1000 delay-300"
            style={{
              transform: isVisible && !isExiting 
                ? 'translateY(0)' 
                : isExiting 
                  ? 'translateY(-40px)' 
                  : 'translateY(40px)',
              opacity: isVisible && !isExiting ? 1 : 0,
              transition: isExiting
                ? 'transform 0.6s ease-in, opacity 0.6s ease-in'
                : 'transform 0.8s ease-out 0.3s, opacity 0.8s ease-out 0.3s'
            }}
          >
            <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-md mx-auto">
              <h3 className="chart-title mb-2">Approval Rate Comparison</h3>
              <BarChart 
                data={chartData} 
                height={300} 
                width={450}
                title="Approval Rate Comparison"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  <span className="chart-label">Data Source:</span> Small Business Funding Report 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
