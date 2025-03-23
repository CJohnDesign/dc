import type { Metadata } from "next";
import "./globals.css";
import { getUser } from "@/lib/auth/middleware";
import { UserProvider } from "@/lib/auth";
import { fontVariables } from "@/lib/fonts";


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
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();
  return (
    <html lang="en" 
    className={`bg-white dark:bg-gray-950 text black dark:text-white ${fontVariables}`}>
      <body className="min-h-[100dvh] bg-gray-50 antialiased">
        <UserProvider userPromise={userPromise}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
