'use client';

import { useEffect, useState, useRef } from 'react';

interface CoreProcessSectionProps {
  className?: string;
}

const CoreProcessSection = ({ className = '' }: CoreProcessSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  // Auto-rotate tabs every 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  const pillars = [
    {
      id: 0,
      title: 'Underwriting Intelligence',
      subtitle: 'Bank-Level Insight for Superior Outcomes',
      description: 'Using bank-level underwriting intelligence, we identify exactly what triggers approvals or rejections, ensuring your application meets precise lending standards.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      image: '/scaling-with-loans-home-11-1024x683-1.jpg'
    },
    {
      id: 1,
      title: 'Strategic Restructuring',
      subtitle: 'Aligning Your Financial Profile',
      description: 'Our experts strategically restructure your financials to perfectly align with current banking algorithms and credit bureau preferences.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      image: '/scaling-with-loans-home-16-1024x683-1.jpg'
    },
    {
      id: 2,
      title: 'Presentation Optimization',
      subtitle: 'Crafting a Compelling Financial Story',
      description: 'We expertly package your financial data, addressing potential weaknesses proactively and enhancing your strengths to resonate clearly with lenders.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      image: '/confrence.png'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-12 sm:py-16 md:py-20 bg-[var(--background-alt)] ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        {/* Section header */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-[var(--secondary)]">
            The Three Pillars of Financial Credibility
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-[var(--foreground)]">
            Our proprietary approach combines deep industry knowledge with strategic optimization 
            to position your business for funding success.
          </p>
        </div>
        
        {/* Tabs navigation - scrollable on mobile */}
        <div className={`flex justify-start md:justify-center mb-8 md:mb-12 overflow-x-auto pb-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex bg-white rounded-full p-1 shadow-md">
            {pillars.map((pillar, index) => (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(index)}
                className={`
                  whitespace-nowrap px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base
                  ${activeTab === index 
                    ? 'bg-[var(--primary)] text-white shadow-md' 
                    : 'text-[var(--foreground)] hover:bg-gray-100'}
                `}
              >
                <span className="font-medium">{pillar.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content area */}
        <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className={`
                grid md:grid-cols-2 gap-6 md:gap-12 items-center absolute inset-0 transition-all duration-500
                ${activeTab === index 
                  ? 'opacity-100 translate-x-0 z-10' 
                  : activeTab > index 
                    ? 'opacity-0 -translate-x-full z-0' 
                    : 'opacity-0 translate-x-full z-0'}
              `}
            >
              {/* Left column - Content */}
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
                <div className="text-[var(--primary)] mb-3 md:mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 md:mb-2 text-[var(--secondary)]">
                  {pillar.title}
                </h3>
                <h4 className="text-base sm:text-lg font-medium mb-3 md:mb-4 text-[var(--primary)]">
                  {pillar.subtitle}
                </h4>
                <p className="text-sm sm:text-base text-[var(--foreground)] mb-4 md:mb-6">
                  {pillar.description}
                </p>
                
                {/* Feature list */}
                <ul className="space-y-2 sm:space-y-3">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-start">
                      <svg className="h-5 w-5 text-[var(--secondary)] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm sm:text-base text-[var(--foreground)]">
                        Key benefit {item} of {pillar.title.toLowerCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Right column - Image */}
              <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(34,63,71,0.7)] to-transparent z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${pillar.image})` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress indicators */}
        <div className={`flex justify-center mt-6 md:mt-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {pillars.map((pillar, index) => (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(index)}
              className={`
                w-2 h-2 sm:w-3 sm:h-3 rounded-full mx-1 sm:mx-2 transition-all duration-300
                ${activeTab === index ? 'bg-[var(--primary)] scale-125' : 'bg-gray-300 hover:bg-gray-400'}
              `}
              aria-label={`View ${pillar.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreProcessSection; 