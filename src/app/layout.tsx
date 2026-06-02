import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthInitializer from "@/components/layout/AuthInitializer";
import ContextProvider from "@/components/layout/ContextProvider";
import { TanstackProvider } from "@/components/layout/TanstackProvider";
import { ToastContainer } from "react-toastify";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body
        suppressHydrationWarning={true}
        className="min-h-full flex flex-col font-sans"
      >
        <TanstackProvider>
          <ContextProvider>
            <AuthInitializer />
            {children}
            <ToastContainer />
          </ContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
