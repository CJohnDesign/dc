import type { Metadata, Viewport } from "next";
import { fontVariables } from "../../lib/fonts";
import "./globals.css";

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
    <html lang="en" className={fontVariables}>
      <body className="antialiased overflow-x-hidden">
        <a href="#content" className="sr-only focus:not-sr-only">Skip to content</a>
        <div id="content">
          {children}
        </div>
      </body>
    </html>
  );
}
