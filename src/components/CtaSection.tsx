'use client';

import { useEffect, useState, useRef } from 'react';

interface CtaSectionProps {
  className?: string;
}

const CtaSection = ({ className = '' }: CtaSectionProps) => {
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

  return (
    <section 
      ref={sectionRef}
      className={`relative py-16 sm:py-20 md:py-24 overflow-hidden ${className}`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[var(--primary)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]"></div>
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[var(--secondary)] rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-[var(--secondary)] rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <div className={`mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white !text-white" style={{ color: 'white' }}>
              Stop Applying, Start Getting Funded
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Join the <span className="numeric font-bold">90%+</span> of our clients who secure the funding they need 
              within <span className="numeric font-bold">30</span> days. Your business deserves expert financial guidance.
            </p>
          </div>
          
          {/* Stats */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
              <div className="numeric text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">90%+</div>
              <div className="text-white/80 text-xs sm:text-sm uppercase tracking-wider">Approval Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
              <div className="numeric text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">30</div>
              <div className="text-white/80 text-xs sm:text-sm uppercase tracking-wider">Days to Funding</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
              <div className="numeric text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">$500K</div>
              <div className="text-white/80 text-xs sm:text-sm uppercase tracking-wider">Maximum Funding</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a 
              href="/assessment" 
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-[var(--primary)] text-base sm:text-lg font-bold inline-block 
                hover:bg-gray-100 transition-colors rounded-md shadow-xl hover:shadow-2xl"
            >
              Book Your Free Assessment Now
            </a>
            <p className="mt-4 sm:mt-6 text-white/80 text-xs sm:text-sm">
              No obligation. No pressure. Just expert guidance to unlock your business potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 