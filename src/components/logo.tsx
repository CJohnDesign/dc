'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  href?: string;
  onClick?: () => void;
}

const Logo = ({ className, href = '/', onClick }: LogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={href} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div 
        className={cn(
          "relative font-['Merriweather'] font-black text-[var(--primary)] tracking-tight transition-all duration-500",
          className
        )}
      >
        <span className="mr-1">Deliver</span>
        <span 
          className="text-[var(--secondary)] relative inline-block"
          style={{
            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
            transition: 'transform 0.5s var(--easing-emphasized)'
          }}
        >
          Capital
          <span 
            className="absolute -bottom-[3px] left-0 h-[2px] bg-[var(--secondary)] rounded-full"
            style={{
              width: isHovered ? '100%' : '0%',
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.5s var(--easing-emphasized)'
            }}
          />
        </span>
        
        {/* Subtle decorative element */}
        <span 
          className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-[var(--accent)]"
          style={{
            opacity: isHovered ? 1 : 0.7,
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'all 0.5s var(--easing-emphasized)'
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;
