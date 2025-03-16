import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Rethink_Sans } from "next/font/google";
import { Merriweather } from "next/font/google";
import "./globals.css";

// Define fonts with preload: false to prevent automatic preloading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: false,
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "900"],
  preload: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#223f47',
}

export const metadata: Metadata = {
  title: "Deliver Capital | Financial Optimization for Small Businesses",
  description: "We help small businesses qualify for loans by underwriting, structuring, and optimizing financial profiles for improved bank approvals.",
  keywords: "business loans, financial optimization, small business funding, loan qualification, business growth",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Deliver Capital'
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: false
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Apply font variables to all pages - font preloading is disabled
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${rethinkSans.variable} ${merriweather.variable}`}>
      <head>
        {/* Add Google Fonts as a backup to ensure they're available in all contexts */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Geist+Mono&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@400;500;600;700;800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&display=swap');
        ` }} />
      </head>
      <body className="antialiased overflow-x-hidden">
        <a href="#content" className="sr-only focus:not-sr-only">Skip to content</a>
        <div id="content">
          {children}
        </div>
      </body>
    </html>
  );
}
