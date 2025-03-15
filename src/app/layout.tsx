import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Rethink_Sans } from "next/font/google";
import { Merriweather } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "900"],
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
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${rethinkSans.variable} ${merriweather.variable}`}>
      <body className="antialiased">
        <a href="#content" className="sr-only focus:not-sr-only">Skip to content</a>
        <div id="content">
          {children}
        </div>
      </body>
    </html>
  );
}
