"use client";

import React, { useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  AlertCircle,
  Zap,
  ArrowRight,
  Car as CarIcon,
  Award,
} from "lucide-react";
import { useCars } from "@/context/CarContext";
import {
  SHOWROOM_INFO,
  formatIndianPrice,
  formatLakhPrice,
  formatKm,
  createWhatsAppUrl,
} from "@/lib/utils";
import EmiCalculator from "@/components/EmiCalculator";
import TestDriveModal from "@/components/TestDriveModal";
import CarCard from "@/components/CarCard";

function CarDetailsContent() {
  const router = useRouter();
  const params = useParams();
  const carId = params?.id as string;
  const { getCarById, cars } = useCars();

  const car = getCarById(carId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Car Listing Not Found</h1>
        <p className="text-slate-500 text-sm mb-6">
          The vehicle you are looking for may have been sold or removed from our inventory.
        </p>
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Browse Available Inventory</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const images = car.images && car.images.length > 0 ? car.images : ["/placeholder-car.jpg"];
  const similarCars = cars.filter((c) => c.id !== car.id && c.bodyType === car.bodyType).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Test Drive Modal */}
      <TestDriveModal
        car={car}
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
      />

      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/cars" className="hover:text-blue-600 transition-colors">
            Inventory
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {car.name}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copiedLink ? "Link Copied!" : "Share"}</span>
          </button>
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back to Inventory</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left 7 Columns: Image Gallery & Specs */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Hero Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={car.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              {/* Status and KL Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  {car.rtoLocation}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                  {car.registrationNumber}
                </span>
              </div>

              {/* Left/Right controls if multiple */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950/80 backdrop-blur-xs transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950/80 backdrop-blur-xs transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-blue-600 scale-105 shadow-md"
                        : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${car.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Specifications Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Vehicle Specifications</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                150-Point Certified
              </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
              <div>
                <p className="text-xs text-slate-500 font-medium">Model Year</p>
                <p className="font-semibold text-slate-800 mt-0.5">{car.year}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Kilometres Driven</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {formatKm(car.kilometres)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Fuel Type</p>
                <p className="font-semibold text-slate-800 mt-0.5">{car.fuelType}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Transmission</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {car.transmission}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Ownership</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {car.ownerCount === 1 ? "1st Owner (Single Owner)" : `${car.ownerCount} Owners`}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Registration State</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  Kerala ({car.rtoLocation})
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Registration Number</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {car.registrationNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Insurance Validity</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {car.insuranceType}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Body Style</p>
                <p className="font-semibold text-slate-800 mt-0.5">{car.bodyType}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Engine / Battery</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {car.engineCapacityCc > 0 ? `${car.engineCapacityCc} cc` : "Electric Motor"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Certified Mileage</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {car.fuelType === "Electric"
                    ? `${car.mileageKmpl} km/charge`
                    : `${car.mileageKmpl} kmpl (ARAI)`}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium">Exterior Color</p>
                <p className="font-semibold text-slate-800 mt-0.5">{car.color}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
              Vehicle Overview & Condition
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {car.description}
            </p>
          </div>

          {/* Key Features & Equipments */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Key Features & Equipments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {car.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EMI Calculator */}
          <EmiCalculator carPrice={car.price} />
        </div>

        {/* Right 5 Columns: Price Card & Immediate Action CTAs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Price & Purchase Card (Sticky on desktop) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl sticky top-28 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span className="uppercase tracking-wider text-blue-700 font-bold">
                  {car.brand}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  {car.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {car.name}
              </h1>
              <p className="text-xs text-slate-500 mt-1">{car.variant}</p>
            </div>

            {/* Price section */}
            <div className="py-4 border-y border-slate-100">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">
                    Showroom Offer Price
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black text-blue-950">
                      {formatIndianPrice(car.price)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Lakh Format</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatLakhPrice(car.price)}
                  </span>
                </div>
              </div>

              {car.originalPrice && car.originalPrice > car.price && (
                <div className="mt-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center justify-between">
                  <span>Price Drop Discount Applied</span>
                  <span className="line-through text-slate-400">
                    {formatIndianPrice(car.originalPrice)}
                  </span>
                </div>
              )}
            </div>

            {/* Key highlights pill */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[11px]">Inspection Score</span>
                <span className="text-slate-800 font-bold flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  {car.inspectionScore || "9.5"} / 10
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[11px]">RC & Paperwork</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Transfer Ready
                </span>
              </div>
            </div>

            {/* PRIMARY CTA: WhatsApp Enquiry */}
            <div className="space-y-3 pt-2">
              <a
                href={createWhatsAppUrl(car.name, car.price, car.registrationNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsTestDriveOpen(true)}
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all hover:scale-[1.01]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Showroom Test Drive</span>
              </button>

              <a
                href={`tel:${SHOWROOM_INFO.phoneRaw}`}
                className="w-full py-3 px-6 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Showroom: {SHOWROOM_INFO.phone}</span>
              </a>
            </div>

            {/* Warranty note */}
            {car.certificationWarranty && (
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Showroom Warranty Included:</span>
                  <p className="mt-0.5 text-blue-800">{car.certificationWarranty}</p>
                </div>
              </div>
            )}

            {/* Kerala Showroom Location snippet */}
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 space-y-1">
              <p className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>YEM KEY Used Cars — Edappally, Kochi</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Vehicle parked at showroom. Available for inspection during 9:00 AM – 8:00 PM.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Cars Section */}
      {similarCars.length > 0 && (
        <section className="mt-20 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Recommendations
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Similar {car.bodyType}s in Stock
              </h2>
            </div>
            <Link
              href={`/cars?bodyType=${car.bodyType}`}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View All {car.bodyType}s</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarCars.map((simCar) => (
              <CarCard key={simCar.id} car={simCar} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function CarDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
          Loading car details...
        </div>
      }
    >
      <CarDetailsContent />
    </Suspense>
  );
}

