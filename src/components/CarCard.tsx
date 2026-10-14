"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Fuel,
  Gauge,
  Calendar,
  Settings2,
  MapPin,
  MessageCircle,
  Eye,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { Car } from "@/types/car";
import { formatIndianPrice, formatLakhPrice, formatKm, createWhatsAppUrl } from "@/lib/utils";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [imgSrc, setImgSrc] = useState(car.images[0] || "/placeholder-car.jpg");
  const [imgIndex, setImgIndex] = useState(0);

  const fallbackImage =
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <Image
          src={imgSrc}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(fallbackImage)}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/10 flex items-center gap-1 shadow-xs">
              <MapPin className="w-3 h-3 text-blue-400" />
              {car.rtoLocation.split(" ")[0]} ({car.registrationNumber.split(" ").slice(0, 2).join(" ")})
            </span>
            {car.ownerCount === 1 && (
              <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md shadow-xs">
                1st Owner
              </span>
            )}
          </div>

          {car.status === "Sold" ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600 text-white shadow-xs">
              Sold Out
            </span>
          ) : car.featured ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 fill-slate-950" />
              Certified
            </span>
          ) : null}
        </div>

        {/* Bottom Image Indicators / Thumbnails preview if multiple */}
        {car.images.length > 1 && (
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 pointer-events-auto">
            {car.images.slice(0, 3).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setImgSrc(car.images[idx]);
                  setImgIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  imgIndex === idx ? "bg-white w-4" : "bg-white/60 hover:bg-white"
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Car Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Body pill */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
            <span className="text-blue-700 uppercase tracking-wider">{car.brand}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {car.bodyType}
            </span>
          </div>

          {/* Car Title */}
          <Link href={`/cars/${car.id}`} className="block">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
              {car.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{car.variant}</p>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{car.year} Model</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{formatKm(car.kilometres)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Settings2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{car.transmission}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-4 pt-2">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Price (RC Transfer Ready)
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {formatLakhPrice(car.price)}
                </span>
                {car.originalPrice && car.originalPrice > car.price && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatLakhPrice(car.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified KL Car
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/cars/${car.id}`}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors text-center"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </Link>

            <a
              href={createWhatsAppUrl(car.name, car.price, car.registrationNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors text-center shadow-xs"
              title="Chat with showroom on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
