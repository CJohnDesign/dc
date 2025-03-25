'use client';

import React from 'react';
import Image from 'next/image';
import { usePageTransition } from '../hooks/use-page-transition';

interface OurStorySectionProps {
  className?: string;
}

const OurStorySection = ({ className = '' }: OurStorySectionProps) => {
  const { isVisible, isExiting, elementRef } = usePageTransition();

  const stats = [
    { value: '500+', label: 'Banking Partners', icon: '🏦' },
    { value: '20+', label: 'Years Experience', icon: '⏱️' },
    { value: '90%+', label: 'Success Rate', icon: '📈' },
  ];

  return (
    <section 
      ref={elementRef}
      className={`py-12 sm:py-16 md:py-20 bg-white ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left column - Text content */}
          <div className="transition-all duration-1000 delay-300"
               style={{
                 transform: isVisible && !isExiting 
                   ? 'translateX(0)' 
                   : isExiting 
                     ? 'translateX(100px)' 
                     : 'translateX(-100px)',
                 opacity: isVisible && !isExiting ? 1 : 0,
                 transition: isExiting
                   ? 'transform 0.6s ease-in, opacity 0.6s ease-in'
                   : 'transform 0.7s ease-out, opacity 0.7s ease-out'
               }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Insider Knowledge, <br className="hidden sm:block" />Exceptional Results
            </h2>
            
            <p className="text-base sm:text-lg mb-6 sm:mb-8 text-[var(--foreground)]">
              With access to a lending network of <span className="numeric font-bold">500+</span> banks nationwide 
              and deep insight into bank underwriting rules—including credit bureau preferences—we've spent 
              two decades perfecting the art of financial storytelling to unlock financing solutions for your business.
            </p>
            
            <div className="bg-[var(--background-alt)] p-4 sm:p-6 rounded-lg border-l-4 border-[var(--primary)] mb-6 sm:mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <Image 
                    src="/AV.jpeg" 
                    alt="Anthony Vanaki" 
                    width={60} 
                    height={60} 
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="italic text-sm sm:text-base text-[var(--foreground)]">
                    "Our insider knowledge of banking algorithms and credit bureau preferences gives your business 
                    an unparalleled advantage in securing the funding you need to grow."
                  </p>
                  <p className="text-sm font-semibold mt-2 text-[var(--primary)]">
                    Anthony Vanaki, Founder and CEO
                  </p>
                </div>
              </div>
            </div>
            
            <a 
              href="/about" 
              className="text-[var(--primary)] font-semibold flex items-center hover:underline text-sm sm:text-base"
            >
              Learn more about our approach
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          {/* Right column - Stats only */}
          <div className="transition-all duration-1000 delay-500">
            <div className="bg-[var(--background-alt)] p-6 md:p-8 rounded-lg shadow-lg">
              {/* Stats grid */}
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {/* First stat takes full width */}
                <div 
                  className="bg-white p-4 md:p-6 rounded-lg text-center shadow-sm"
                  style={{ 
                    transform: isVisible && !isExiting 
                      ? 'translateX(0)' 
                      : isExiting 
                        ? 'translateX(-100px)' 
                        : 'translateX(100px)',
                    opacity: isVisible && !isExiting ? 1 : 0,
                    transition: isExiting
                      ? 'transform 0.6s ease-in, opacity 0.6s ease-in'
                      : 'transform 0.7s ease-out, opacity 0.7s ease-out'
                  }}
                >
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">{stats[0].icon}</div>
                  <div className="numeric text-2xl md:text-3xl font-bold text-[var(--primary)]">{stats[0].value}</div>
                  <div className="text-sm md:text-base text-[var(--foreground)] mt-1">{stats[0].label}</div>
                </div>
                
                {/* Second row with two stats */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {stats.slice(1).map((stat, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-4 md:p-6 rounded-lg text-center shadow-sm"
                      style={{ 
                        transform: isVisible && !isExiting 
                          ? 'translateX(0)' 
                          : isExiting 
                            ? 'translateX(-100px)' 
                            : 'translateX(100px)',
                        opacity: isVisible && !isExiting ? 1 : 0,
                        transition: isExiting
                          ? `transform 0.6s ease-in ${index * 100}ms, opacity 0.6s ease-in ${index * 100}ms`
                          : `transform 0.7s ease-out ${(index + 1) * 200}ms, opacity 0.7s ease-out ${(index + 1) * 200}ms`
                      }}
                    >
                      <div className="text-3xl md:text-4xl mb-2 md:mb-3">{stat.icon}</div>
                      <div className="numeric text-2xl md:text-3xl font-bold text-[var(--primary)]">{stat.value}</div>
                      <div className="text-sm md:text-base text-[var(--foreground)] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;