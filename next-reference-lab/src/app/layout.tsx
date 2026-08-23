import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Field Guide",
  description: "A practical TypeScript reference for Next.js and React fundamentals",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header><Link href="/">Team Desk</Link><Navigation /></header>
        {children}
      </body>
    </html>
  );
}
