'use client';

import React from 'react';

// Define font CSS variables for the subdomain
const fontStyles = `
  :root {
    --font-geist-sans: 'Geist Sans', system-ui, -apple-system, sans-serif;
    --font-geist-mono: 'Geist Mono', monospace;
    --font-rethink-sans: 'Rethink Sans', system-ui, -apple-system, sans-serif;
    --font-merriweather: 'Merriweather', Georgia, serif;
    
    /* Ensure these CSS variables are defined for use in other components */
    --body-font: var(--font-geist-sans);
    --heading-font: var(--font-rethink-sans);
    --numeric-font: var(--font-merriweather);
  }
  
  /* Apply fonts to elements */
  body {
    font-family: var(--body-font);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--heading-font);
  }
  
  .numeric {
    font-family: var(--numeric-font);
  }
`;

export default function FundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Define font variables for this layout */}
      <style jsx global>{fontStyles}</style>
      
      <div className="min-h-screen bg-[var(--background-alt)]">
        {children}
      </div>
    </>
  );
} 