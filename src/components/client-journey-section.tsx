'use client';

import { useEffect, useState, useRef } from 'react';
import Timeline from './timeline';

interface ClientJourneySectionProps {
  className?: string;
}

const ClientJourneySection = ({ className = '' }: ClientJourneySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const journeySteps = [
    {
      id: 1,
      title: 'Discovery',
      description: 'Begin with a complimentary consultation to understand your business goals, current financial situation, and funding needs.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Assessment',
      description: 'Our experts conduct a comprehensive financial analysis to identify strengths, weaknesses, and opportunities for optimization.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Transformation',
      description: 'We implement strategic financial optimization techniques to align your profile with lender requirements and maximize approval odds.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Funding',
      description: 'Our team guides you through the application process with our banking partners, ensuring all documentation is optimally presented.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Growth',
      description: 'After securing funding, we provide strategic capital utilization advice to maximize the impact on your business growth.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-12 sm:py-16 md:py-20 bg-white ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        {/* Section header */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-[var(--secondary)]">
            Your Clear Path to Funding
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-[var(--foreground)]">
            Our structured approach ensures a seamless journey from initial consultation to 
            securing the funding your business needs to thrive.
          </p>
        </div>
        
        {/* Timeline component */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Timeline steps={journeySteps} />
        </div>
        
        {/* Testimonial */}
        <div className={`mt-10 sm:mt-16 bg-[var(--background-alt)] p-4 sm:p-6 md:p-8 rounded-lg shadow-md max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <svg className="h-8 w-8 sm:h-12 sm:w-12 text-[var(--primary)] opacity-30 mb-4 sm:mb-0 sm:mr-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <div>
              <p className="text-base sm:text-lg italic mb-4 text-[var(--foreground)] text-center sm:text-left">
                "The structured approach from Deliver Capital made all the difference. Even at the beginning of my business, 
                Anthony helped me fix key issues, got me the startup capital I needed, and gave valuable recommendations on 
                how to deploy it. After being rejected by three banks, their optimization process helped us secure $250K in 
                just 28 days. The step-by-step guidance was invaluable for PostScarcity's growth."
              </p>
              <div className="flex flex-col sm:flex-row items-center">
                <div className="h-10 w-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold mb-2 sm:mb-0 sm:mr-3">
                  CJ
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-[var(--secondary)]">Chris Johnston</p>
                  <p className="text-sm text-[var(--foreground)]">Founder, PostScarcity AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className={`mt-10 sm:mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="/assessment" 
            className="px-6 sm:px-8 py-3 sm:py-4 bg-[var(--primary)] text-white text-sm sm:text-base font-semibold inline-block 
              hover:bg-[var(--primary-dark)] transition-colors rounded-md shadow-lg hover:shadow-xl"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientJourneySection; 