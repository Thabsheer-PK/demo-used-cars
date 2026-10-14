"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Car as CarIcon,
  Search,
  FilterX,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useCars } from "@/context/CarContext";
import { FilterState } from "@/types/car";
import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";

function CarsInventoryContent() {
  const searchParams = useSearchParams();
  const { cars, isLoaded } = useCars();

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    brand: searchParams.get("brand") || "all",
    bodyType: searchParams.get("bodyType") || "all",
    fuelType: searchParams.get("fuelType") || "all",
    transmission: searchParams.get("transmission") || "all",
    priceRange: searchParams.get("priceRange") || "all",
    sortBy: (searchParams.get("sortBy") as FilterState["sortBy"]) || "featured",
  });

  // Unique brands list
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    cars.forEach((c) => brandSet.add(c.brand));
    return Array.from(brandSet).sort();
  }, [cars]);

  // Filter & Sort Logic
  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        // Search text
        if (filters.search) {
          const query = filters.search.toLowerCase().trim();
          const matchName = car.name.toLowerCase().includes(query);
          const matchBrand = car.brand.toLowerCase().includes(query);
          const matchModel = car.model.toLowerCase().includes(query);
          const matchVariant = car.variant.toLowerCase().includes(query);
          const matchReg = car.registrationNumber.toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchModel && !matchVariant && !matchReg) {
            return false;
          }
        }

        // Brand
        if (filters.brand !== "all" && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
          return false;
        }

        // Body Type
        if (filters.bodyType !== "all" && car.bodyType.toLowerCase() !== filters.bodyType.toLowerCase()) {
          return false;
        }

        // Fuel Type
        if (filters.fuelType !== "all" && car.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) {
          return false;
        }

        // Transmission
        if (
          filters.transmission !== "all" &&
          car.transmission.toLowerCase() !== filters.transmission.toLowerCase()
        ) {
          return false;
        }

        // Price Range
        if (filters.priceRange === "under-5" && car.price >= 500000) return false;
        if (filters.priceRange === "5-10" && (car.price < 500000 || car.price > 1000000)) return false;
        if (filters.priceRange === "10-20" && (car.price < 1000000 || car.price > 2000000)) return false;
        if (filters.priceRange === "above-20" && car.price < 2000000) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "year-desc") return b.year - a.year;
        if (filters.sortBy === "km-asc") return a.kilometres - b.kilometres;
        // Default featured: featured first, then newest
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.year - a.year;
      });
  }, [cars, filters]);

  const resetAllFilters = () => {
    setFilters({
      search: "",
      brand: "all",
      bodyType: "all",
      fuelType: "all",
      transmission: "all",
      priceRange: "all",
      sortBy: "featured",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Used Cars Inventory</span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Showroom Inventory ({cars.length} Cars)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore All Certified Used Cars
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl">
            Filter through our curated stock of inspected vehicles in Kerala. All vehicles include service history and complete RC documentation.
          </p>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        totalResults={filteredCars.length}
        brands={availableBrands}
      />

      {/* Loading State */}
      {!isLoaded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-slate-200 rounded-2xl h-96" />
          ))}
        </div>
      )}

      {/* Cars Grid */}
      {isLoaded && filteredCars.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {isLoaded && filteredCars.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs my-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <FilterX className="w-8 h-8 text-blue-600" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            No Cars Matching Your Filters
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed">
            We couldn&apos;t find any vehicles matching your current search criteria. Try relaxing your filters or resetting to view all available cars.
          </p>

          <div className="pt-2">
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AllCarsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
          Loading inventory...
        </div>
      }
    >
      <CarsInventoryContent />
    </Suspense>
  );
}
