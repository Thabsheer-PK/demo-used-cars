import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DemoBanner from "@/components/DemoBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { CarProvider } from "@/context/CarContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YEM KEY USED CARS | Premium Pre-Owned Car Showroom Kerala",
  description:
    "Explore Kerala's certified pre-owned cars at YEM KEY USED CARS, Kochi. 150+ point inspection, verified KL registration, hassle-free RC transfer, and direct WhatsApp enquiry.",
  keywords: [
    "Used cars Kerala",
    "Pre owned cars Kochi",
    "Second hand cars Ernakulam",
    "YEM KEY USED CARS",
    "Certified used cars Kerala",
    "Buy used cars Thrissur Trivandrum Calicut",
  ],
  authors: [{ name: "Dev Canvas Business Solutions" }],
  openGraph: {
    title: "YEM KEY USED CARS - Kerala's Trusted Pre-Owned Dealership",
    description:
      "Find quality certified used cars in Kerala. 150+ point inspection, verified ownership, instant WhatsApp enquiry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <CarProvider>
          <DemoBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </CarProvider>
      </body>
    </html>
  );
}
