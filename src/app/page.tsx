import { Metadata } from 'next';
import Navigation from '../components/navigation';
import HeroSection from '../components/hero-section';
import OurStorySection from '../components/our-story-section';
import CoreProcessSection from '../components/core-process-section';
import ClientJourneySection from '../components/client-journey-section';
import CtaSection from '../components/cta-section';
import Footer from '../components/footer';

export const metadata: Metadata = {
  title: 'Deliver Capital | Financial Optimization for Small Businesses',
  description: 'We help small businesses qualify for loans by underwriting, structuring, and optimizing financial profiles for improved bank approvals.',
  keywords: 'business loans, financial optimization, small business funding, loan qualification, business growth',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[var(--background)] to-white text-[var(--foreground)] overflow-hidden">
      <Navigation />
      
      {/* Main content sections with subtle spacing and flow */}
      <div className="relative">
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[var(--primary-light)]/5 blur-[120px] -z-10" />
        <div className="absolute top-[40%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[var(--secondary)]/5 blur-[150px] -z-10" />
        
        <div className="space-y-0">
          <HeroSection />
          
          <div className="relative z-10 bg-white py-20 rounded-t-[3rem] -mt-12 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">
            <OurStorySection />
          </div>
          
          <div className="relative z-20 bg-[var(--background-warm)] py-20 -mt-12 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">
            <CoreProcessSection />
          </div>
          
          <div className="relative z-30 bg-white py-20 -mt-12 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">
            <ClientJourneySection />
          </div>
          
          <div className="relative z-40 bg-[var(--primary)] text-white py-20 rounded-t-[3rem] -mt-12 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
            <CtaSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 