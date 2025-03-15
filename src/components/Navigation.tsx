'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = '' }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Process', href: '/process' },
    { name: 'Results', href: '/results' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-[var(--background)]/95 backdrop-blur-sm shadow-md py-3' 
          : 'bg-transparent py-5'}
        ${className}
      `}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image 
              src="/dc_logo.png" 
              alt="Deliver Capital Logo" 
              width={160} 
              height={40} 
              className="h-10 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  text-sm font-medium transition-colors
                  ${isScrolled 
                    ? 'text-[var(--foreground)] hover:text-[var(--primary)]' 
                    : 'text-[var(--foreground)] hover:text-[var(--primary)]'}
                `}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              href="/assessment"
              className={`
                px-4 py-2 text-sm font-semibold rounded-md transition-all
                ${isScrolled 
                  ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]' 
                  : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'}
              `}
            >
              Get Funded
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`
                  absolute left-0 top-0 w-full h-0.5 transition-all duration-300
                  ${isMobileMenuOpen 
                    ? 'rotate-45 translate-y-2 bg-[var(--foreground)]' 
                    : isScrolled ? 'bg-[var(--foreground)]' : 'bg-[var(--foreground)]'}
                `}
              />
              <span 
                className={`
                  absolute left-0 top-2 w-full h-0.5 transition-all duration-300
                  ${isMobileMenuOpen 
                    ? 'opacity-0' 
                    : isScrolled ? 'bg-[var(--foreground)]' : 'bg-[var(--foreground)]'}
                `}
              />
              <span 
                className={`
                  absolute left-0 top-4 w-full h-0.5 transition-all duration-300
                  ${isMobileMenuOpen 
                    ? '-rotate-45 -translate-y-2 bg-[var(--foreground)]' 
                    : isScrolled ? 'bg-[var(--foreground)]' : 'bg-[var(--foreground)]'}
                `}
              />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`
          fixed inset-0 bg-[var(--background)] z-40 transition-all duration-300 md:hidden
          ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="container mx-auto px-4 sm:px-8 pt-24 pb-12">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-[var(--foreground)] hover:text-[var(--primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              href="/assessment"
              className="px-6 py-3 bg-[var(--primary)] text-white text-center font-semibold rounded-md hover:bg-[var(--primary-dark)] mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Funded
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation; 