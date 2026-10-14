"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  Phone,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { SHOWROOM_INFO, createWhatsAppUrl } from "@/lib/utils";

function HeaderContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Cars", href: "/cars" },
    { name: "Hatchbacks", href: "/cars?bodyType=Hatchback" },
    { name: "Sedans", href: "/cars?bodyType=Sedan" },
    { name: "SUVs", href: "/cars?bodyType=SUV" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/cars?")) {
      return false;
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  YEM KEY
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200 rounded">
                  Kerala
                </span>
              </div>
              <span className="text-[11px] font-semibold tracking-widest text-blue-600 uppercase">
                Used Cars Showroom
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-blue-700 bg-blue-50/80"
                    : "text-slate-700 hover:text-blue-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin demo link */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
              title="Demo Management Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin Demo</span>
            </Link>

            {/* Direct Call */}
            <a
              href={`tel:${SHOWROOM_INFO.phoneRaw}`}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50/60 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{SHOWROOM_INFO.phone}</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-700/20 hover:shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/admin"
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold border border-slate-200"
              title="Admin Demo"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Admin Dashboard (Demo)
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                admin / admin123
              </span>
            </Link>

            <a
              href={`tel:${SHOWROOM_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call: {SHOWROOM_INFO.phone}</span>
            </a>

            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default function Header() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/80 shadow-xs h-20" />
      }
    >
      <HeaderContent />
    </Suspense>
  );
}

