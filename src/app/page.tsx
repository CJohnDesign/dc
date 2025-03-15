import { Metadata } from 'next';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import OurStorySection from '../components/OurStorySection';
import CoreProcessSection from '../components/CoreProcessSection';
import ClientJourneySection from '../components/ClientJourneySection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Deliver Capital | Financial Optimization for Small Businesses',
  description: 'We help small businesses qualify for loans by underwriting, structuring, and optimizing financial profiles for improved bank approvals.',
  keywords: 'business loans, financial optimization, small business funding, loan qualification, business growth',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navigation />
      
      {/* Main content sections */}
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <HeroSection />
        <OurStorySection />
        <CoreProcessSection />
        <ClientJourneySection />
        <CtaSection />
      </div>
      
      <Footer />
    </main>
  );
} 