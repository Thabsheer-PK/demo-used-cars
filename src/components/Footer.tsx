"use client";

import React from "react";
import Link from "next/link";
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { SHOWROOM_INFO, createWhatsAppUrl } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Value Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs sm:text-sm font-semibold">150+ Inspection Points</p>
                <p className="text-slate-400 text-xs">Certified quality guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs sm:text-sm font-semibold">Kerala Reg. Verified</p>
                <p className="text-slate-400 text-xs">Clear RC transfer history</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs sm:text-sm font-semibold">Quick RC Transfer</p>
                <p className="text-slate-400 text-xs">Kerala MVD seamless support</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs sm:text-sm font-semibold">Direct WhatsApp</p>
                <p className="text-slate-400 text-xs">Instant video call & quotes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Showroom Intro */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                YEM KEY <span className="text-blue-400">USED CARS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Kerala&apos;s trusted destination for verified, non-accidental pre-owned cars. Every vehicle is thoroughly inspected, documented, and prepared for seamless ownership.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300/90 flex items-start gap-2">
              <span className="font-semibold text-amber-400">Notice:</span>
              <span>{SHOWROOM_INFO.demoDisclaimer}</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
              Inventory
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/cars" className="hover:text-blue-400 transition-colors">
                  All Pre-Owned Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?bodyType=Hatchback" className="hover:text-blue-400 transition-colors">
                  Hatchbacks
                </Link>
              </li>
              <li>
                <Link href="/cars?bodyType=Sedan" className="hover:text-blue-400 transition-colors">
                  Sedans
                </Link>
              </li>
              <li>
                <Link href="/cars?bodyType=SUV" className="hover:text-blue-400 transition-colors">
                  SUVs & Compact SUVs
                </Link>
              </li>
              <li>
                <Link href="/cars?fuelType=Electric" className="hover:text-blue-400 transition-colors">
                  Electric Vehicles (EV)
                </Link>
              </li>
              <li>
                <Link href="/cars?priceRange=under-5" className="hover:text-blue-400 transition-colors">
                  Cars Under ₹5 Lakhs
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home Showroom
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Book Test Drive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Showroom Location
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-blue-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Dashboard (Demo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Kerala Showroom Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
              Kerala Showroom Info
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>
                  <strong className="text-slate-200">Sample Address:</strong>{" "}
                  {SHOWROOM_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`tel:${SHOWROOM_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {SHOWROOM_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{SHOWROOM_INFO.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp (+91 94008 11787)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 YEM KEY USED CARS (Demo). All rights reserved.</p>
          <div className="flex items-center gap-2 font-medium text-slate-400">
            <span>{SHOWROOM_INFO.demoCredit}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
