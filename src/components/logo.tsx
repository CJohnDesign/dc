'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

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
      <motion.div 
        className={cn(
          "relative font-['Merriweather'] font-black text-primary tracking-tight",
          className
        )}
        initial={{ opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="mr-1">Deliver</span>
        <motion.span 
          className="text-primary relative inline-block"
          animate={{ 
            y: isHovered ? -2 : 0,
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          Capital
          <motion.span 
            className="absolute -bottom-[3px] left-0 h-[2px] bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
              width: isHovered ? "100%" : "0%",
              opacity: isHovered ? 1 : 0
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              delay: isHovered ? 0.1 : 0
            }}
          />
        </motion.span>
        
        {/* Decorative element with improved animation */}
        <motion.span 
          className="absolute -top-1 -right-3 rounded-full bg-primary"
          initial={{ width: "8px", height: "8px" }}
          animate={{ 
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 1 : 0.7,
          }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1],
            delay: isHovered ? 0.1 : 0
          }}
        />
        
        {/* Additional subtle particle effect */}
        {isHovered && (
          <motion.span
            className="absolute -right-1 top-1/2 w-1 h-1 rounded-full bg-primary"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [0, 12],
              y: [-5, -15]
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              times: [0, 0.3, 1]
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default Logo;
