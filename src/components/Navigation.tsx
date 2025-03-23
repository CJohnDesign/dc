'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/src/components/logo";
import { cn } from '@/lib/utils';
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-5",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo className="text-xl relative z-10" />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors text-foreground hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            
            <Button asChild variant="default" size="default">
              <Link href="/assessment">
                Get Funded
              </Link>
            </Button>
          </nav>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <nav className="flex flex-col space-y-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Button asChild variant="default" size="lg" className="w-full mt-4">
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