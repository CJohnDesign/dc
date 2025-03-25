'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/components/logo";
import { cn } from '@/lib/cn';

interface NavigationProps {
  className?: string;
}

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'Results', href: '/results' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function Navigation({ className = '' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] py-3" 
          : "bg-transparent py-6",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative z-10 transition-transform duration-300 hover:scale-[1.02]">
            <Logo className="text-xl" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-10 mr-4">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium py-2 transition-colors text-foreground/90 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                  <div className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 ease-out",
                    activeIndex === index ? "w-full opacity-100" : "w-0 opacity-0"
                  )} />
                </div>
              ))}
            </div>
            
            <Button 
              asChild 
              variant="default" 
              size="default"
              className="rounded-full px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary-dark"
            >
              <Link href="/assessment">
                Get Funded
              </Link>
            </Button>
          </nav>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden hover:bg-primary/5 transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full sm:w-80 border-l-0 shadow-[0_0_40px_10px_rgba(0,0,0,0.1)]"
            >
              <nav className="flex flex-col space-y-7 mt-14">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 transform hover:translate-x-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Button 
                  asChild 
                  variant="default" 
                  size="lg" 
                  className="w-full mt-6 rounded-full py-6 shadow-sm bg-primary hover:bg-primary-dark transition-all duration-300"
                >
                  <Link
                    href="/assessment"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Funded
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navigation; 