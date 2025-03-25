import { Geist, Geist_Mono } from "next/font/google";
import { Rethink_Sans } from "next/font/google";
import { Merriweather } from "next/font/google";

// Define fonts with preload: false to prevent automatic preloading
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: false,
});

export const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "900"],
  preload: false,
});

// Combined font variables string for easier use in className
export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${rethinkSans.variable} ${merriweather.variable}`; 