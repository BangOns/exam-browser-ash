import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exam Browser — Secure Online Examination Platform",
  description:
    "A modern, secure exam browser for administering and taking online examinations with real-time monitoring and role-based dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        suppressHydrationWarning={false}
        className="min-h-full flex flex-col font-sans"
      >
        {children}
      </body>
    </html>
  );
}
