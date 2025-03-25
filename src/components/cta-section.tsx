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
        if (entry && entry.isIntersecting) {
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
      <div className="absolute inset-0 bg-[#6271EB]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#6271EB] to-indigo-700"></div>
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <div className={`mb-10 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Stop Applying, Start Getting Funded
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-white">
              Join the <span className="numeric font-bold">90%+</span> of our clients who secure the funding they need 
              within <span className="numeric font-bold">30</span> days. Your business deserves expert financial guidance.
            </p>
          </div>
          
          {/* Stats */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="stat-value text-white mb-2">90%+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider font-medium">Approval Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="stat-value text-white mb-2">30</div>
              <div className="text-white/80 text-sm uppercase tracking-wider font-medium">Days to Funding</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="stat-value text-white mb-2">$500K</div>
              <div className="text-white/80 text-sm uppercase tracking-wider font-medium">Maximum Funding</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a 
              href="/assessment" 
              className="px-8 py-4 bg-white text-[#6271EB] text-lg font-bold inline-block 
                hover:bg-gray-100 transition-colors rounded-lg shadow-xl hover:shadow-2xl"
            >
              Book Your Free Assessment Now
            </a>
            <p className="mt-6 text-white/80 text-sm">
              No obligation. No pressure. Just expert guidance to unlock your business potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 