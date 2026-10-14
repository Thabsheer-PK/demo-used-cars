"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Car,
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Award,
  FileCheck,
  RefreshCw,
  Star,
  Layers,
  Flame,
} from "lucide-react";
import { useCars } from "@/context/CarContext";
import CarCard from "@/components/CarCard";
import { SHOWROOM_INFO, createWhatsAppUrl } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const { cars } = useCars();

  // Hero Quick Search State
  const [heroBrand, setHeroBrand] = useState("all");
  const [heroBodyType, setHeroBodyType] = useState("all");
  const [heroBudget, setHeroBudget] = useState("all");
  const [heroFuel, setHeroFuel] = useState("all");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (heroBrand !== "all") params.set("brand", heroBrand);
    if (heroBodyType !== "all") params.set("bodyType", heroBodyType);
    if (heroBudget !== "all") params.set("priceRange", heroBudget);
    if (heroFuel !== "all") params.set("fuelType", heroFuel);
    router.push(`/cars?${params.toString()}`);
  };

  const featuredCars = cars.filter((c) => c.featured && c.status === "Available").slice(0, 4);

  const categories = [
    {
      name: "Hatchback",
      slug: "Hatchback",
      description: "Agile, fuel-efficient & perfect for Kerala city traffic",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
      count: cars.filter((c) => c.bodyType === "Hatchback").length,
      startingPrice: "From ₹6.95 Lakh",
    },
    {
      name: "Sedan",
      slug: "Sedan",
      description: "Executive comfort, generous boot space & luxury highway driving",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
      count: cars.filter((c) => c.bodyType === "Sedan").length,
      startingPrice: "From ₹11.20 Lakh",
    },
    {
      name: "SUV",
      slug: "SUV",
      description: "High ground clearance, powerful road presence & monsoon capability",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80",
      count: cars.filter((c) => c.bodyType === "SUV").length,
      startingPrice: "From ₹10.45 Lakh",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white pt-16 sm:pt-24 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Decorative Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 right-10 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto">
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Kerala&apos;s Certified Used Car Showroom • Kochi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">Used Car</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              100% verified Kerala registered cars with genuine kilometres, 150-point inspection certificates, and instant WhatsApp support.
            </p>
          </div>

          {/* Quick Search Widget */}
          <div className="mt-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 text-slate-800">
            <form onSubmit={handleHeroSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Brand */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Brand / Make
                  </label>
                  <select
                    value={heroBrand}
                    onChange={(e) => setHeroBrand(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white cursor-pointer"
                  >
                    <option value="all">All Makes & Brands</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Tata">Tata</option>
                    <option value="Kia">Kia</option>
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Body Style
                  </label>
                  <select
                    value={heroBodyType}
                    onChange={(e) => setHeroBodyType(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white cursor-pointer"
                  >
                    <option value="all">All Body Styles</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="MUV">MUV / 7-Seater</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Price Range
                  </label>
                  <select
                    value={heroBudget}
                    onChange={(e) => setHeroBudget(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white cursor-pointer"
                  >
                    <option value="all">Any Price</option>
                    <option value="under-5">Under ₹5 Lakhs</option>
                    <option value="5-10">₹5 Lakhs – ₹10 Lakhs</option>
                    <option value="10-20">₹10 Lakhs – ₹20 Lakhs</option>
                    <option value="above-20">Above ₹20 Lakhs</option>
                  </select>
                </div>

                {/* Fuel */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Fuel Type
                  </label>
                  <select
                    value={heroFuel}
                    onChange={(e) => setHeroFuel(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white cursor-pointer"
                  >
                    <option value="all">All Fuel Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric (EV)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Showing {cars.length} cars currently in Kerala showroom</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Matching Cars</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xs">
              <p className="text-2xl sm:text-3xl font-black text-blue-400">150+</p>
              <p className="text-xs text-slate-300 mt-1">Inspection Points</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xs">
              <p className="text-2xl sm:text-3xl font-black text-blue-400">100%</p>
              <p className="text-xs text-slate-300 mt-1">Verified KL Numbers</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xs">
              <p className="text-2xl sm:text-3xl font-black text-blue-400">7 Days</p>
              <p className="text-xs text-slate-300 mt-1">Exchange Guarantee</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xs">
              <p className="text-2xl sm:text-3xl font-black text-blue-400">48 Hrs</p>
              <p className="text-xs text-slate-300 mt-1">Loan & RC Process</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Hatchback, Sedan, SUV) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Browse By Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white-900 tracking-tight mt-1">
              Popular Body Styles
            </h2>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/cars?bodyType=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-bold shadow-xs">
                  {cat.count} Available
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}s
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {cat.startingPrice}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore {cat.name} Inventory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED CARS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Handpicked Showroom Picks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white-900 tracking-tight">
              Featured Pre-Owned Cars
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Certified, non-accidental vehicles with full service histories ready for immediate delivery.
            </p>
          </div>

          <Link
            href="/cars"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>View All ({cars.length}) Cars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* 4. WHATSAPP ENQUIRY CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-2xl overflow-hidden border border-emerald-500/20">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Official WhatsApp Helpdesk: +91 94008 11787</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-snug">
              Looking for a specific model or need a live video walkthrough?
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Our showroom executives are available on WhatsApp to share high-definition videos, complete service records, and arrange free doorstep inspection visits anywhere in Ernakulam.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Chat on WhatsApp Now</span>
              </a>

              <a
                href={`tel:${SHOWROOM_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Call Showroom Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE YEM KEY CARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            The YEM KEY Assurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Why Kerala Chooses YEM KEY Used Cars
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            We eliminate the uncertainty in buying used cars with strict quality checks, transparent pricing, and comprehensive paperwork support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              150-Point Technical Check
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every engine, gearbox, chassis, electrical system, and suspension is thoroughly tested by certified technicians. We reject vehicles with flood damage or odometer tampering.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              100% Kerala MVD RC Transfer
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              End-to-end assistance with Kerala Motor Vehicles Department (MVD) RC ownership transfer, NOC clearance, hypothecation termination, and fast insurance endorsements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">
              7-Day Money Back / Exchange
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Drive with total peace of mind. If you are not completely satisfied with your certified purchase, exchange it with any vehicle in our inventory within 7 days.
            </p>
          </div>
        </div>
      </section>

      {/* 6. ABOUT SHOWROOM & CONTACT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Showroom Location</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Visit YEM KEY Used Cars in Kochi
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Located conveniently on the NH-66 Bypass Road near Lulu Mall, Edappally. Our sprawling indoor showroom houses over 50 inspected pre-owned cars in a comfortable setting.
              </p>

              <div className="space-y-3 text-sm text-slate-300 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                  <span>
                    <strong>Sample Address:</strong> {SHOWROOM_INFO.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Direct Desk: {SHOWROOM_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{SHOWROOM_INFO.workingHours}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
                >
                  <span>Book a Test Drive</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Location Pin</span>
                </a>
              </div>
            </div>

            {/* Visual Showroom Preview Card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-700 shadow-2xl bg-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
                alt="YEM KEY Showroom display"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Premium Experience
                </span>
                <p className="text-white text-lg font-bold">
                  State-of-the-Art Pre-Owned Automotive Showroom
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Air-conditioned customer lounge, transparent vehicle histories & immediate paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
