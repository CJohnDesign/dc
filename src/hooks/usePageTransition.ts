'use client';

import { useState, useEffect, useRef } from 'react';

interface UsePageTransitionOptions {
  exitDuration?: number;
  threshold?: number;
}

export function usePageTransition({ exitDuration = 800, threshold = 0.2 }: UsePageTransitionOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  // Handle entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Handle exit animation
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsExiting(true);
      // Delay navigation to allow exit animation to play
      return 'Are you sure you want to leave?';
    };

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      // Only handle internal links
      if (link && link.href && link.href.startsWith(window.location.origin) && !link.hasAttribute('target')) {
        e.preventDefault();
        setIsExiting(true);
        
        // Delay navigation to allow exit animation to play
        setTimeout(() => {
          window.location.href = link.href;
        }, exitDuration);
      }
    };

    // Add event listeners
    document.addEventListener('click', handleLinkClick);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [exitDuration]);

  return { isVisible, isExiting, elementRef };
} 