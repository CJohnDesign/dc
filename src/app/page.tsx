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
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-20" />
      
      {/* Animated gradients */}
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-gradient-radial from-[var(--chart-3)]/5 to-transparent opacity-70 animate-pulse -z-10" style={{ animationDuration: '15s' }} />
      <div className="fixed bottom-0 right-0 w-[100vw] h-[100vh] bg-gradient-radial from-[var(--chart-1)]/5 to-transparent opacity-70 animate-pulse -z-10" style={{ animationDuration: '18s' }} />
      
      <Navigation />
      
      {/* Main content sections with enhanced visual hierarchy */}
      <div className="relative">
        {/* Hero section with full bleed design */}
        <div className="relative">
          <HeroSection className="mb-0" />
        </div>
        
        {/* Story section with dramatic curve and enhanced shadow */}
        <div className="relative z-10">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
          <div className="bg-white pt-14 pb-32 rounded-t-[4rem] -mt-16 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.08)]">
            <OurStorySection />
          </div>
        </div>
        
        {/* Core process with richer background and improved transitions */}
        <div className="relative z-20">
          <div className="bg-gradient-to-br from-[hsl(197,37%,96%)] to-[hsl(197,37%,92%)] pt-20 pb-32 -mt-16 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)]">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent"></div>
            <CoreProcessSection />
          </div>
        </div>
        
        {/* Client journey with cleaner background and stronger shadow */}
        <div className="relative z-30">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(197,37%,92%)] to-transparent"></div>
          <div className="bg-white pt-20 pb-40 -mt-16 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.12)]">
            <ClientJourneySection />
          </div>
        </div>
        
        {/* CTA with more dramatic curve and gradient background */}
        <div className="relative z-40">
          <div className="bg-gradient-to-br from-[var(--chart-3)] to-[hsl(210,50%,25%)] text-white pt-24 pb-32 rounded-t-[5rem] -mt-24 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 bg-[url('/images/texture-overlay.png')] opacity-5 mix-blend-overlay"></div>
            <CtaSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 