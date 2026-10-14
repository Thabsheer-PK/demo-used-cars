"use client";

import React from "react";
import { Search, X, RotateCcw, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { FilterState } from "@/types/car";

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
  brands: string[];
}

export default function FilterBar({
  filters,
  setFilters,
  totalResults,
  brands,
}: FilterBarProps) {
  const handleInputChange = (field: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
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

  const isAnyFilterActive =
    filters.search !== "" ||
    filters.brand !== "all" ||
    filters.bodyType !== "all" ||
    filters.fuelType !== "all" ||
    filters.transmission !== "all" ||
    filters.priceRange !== "all" ||
    filters.sortBy !== "featured";

  const bodyTypes = [
    { label: "All Types", value: "all" },
    { label: "Hatchback", value: "Hatchback" },
    { label: "Sedan", value: "Sedan" },
    { label: "SUV", value: "SUV" },
    { label: "MUV", value: "MUV" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-8">
      {/* Top Search & Reset Row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by car name, model or brand (e.g. Creta, Swift, Toyota)..."
            value={filters.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white text-sm transition-all"
          />
          {filters.search && (
            <button
              onClick={() => handleInputChange("search", "")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Reset Actions */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial min-w-[170px]">
            <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={filters.sortBy}
              onChange={(e) => handleInputChange("sortBy", e.target.value as FilterState["sortBy"])}
              className="w-full pl-9 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden focus:border-blue-600 cursor-pointer appearance-none"
              aria-label="Sort cars"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="km-asc">Kilometres: Lowest</option>
            </select>
          </div>

          {isAnyFilterActive && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200 shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Body Type Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-3 scrollbar-none border-b border-slate-100 mb-4">
        <span className="text-xs font-semibold text-slate-400 mr-2 shrink-0">Body:</span>
        {bodyTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handleInputChange("bodyType", type.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filters.bodyType === type.value
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Dropdown Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Brand */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => handleInputChange("brand", e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600 cursor-pointer"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleInputChange("priceRange", e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600 cursor-pointer"
          >
            <option value="all">All Budgets</option>
            <option value="under-5">Under ₹5 Lakhs</option>
            <option value="5-10">₹5 Lakhs – ₹10 Lakhs</option>
            <option value="10-20">₹10 Lakhs – ₹20 Lakhs</option>
            <option value="above-20">Above ₹20 Lakhs</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Fuel Type
          </label>
          <select
            value={filters.fuelType}
            onChange={(e) => handleInputChange("fuelType", e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600 cursor-pointer"
          >
            <option value="all">All Fuels</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="CNG">CNG</option>
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Transmission
          </label>
          <select
            value={filters.transmission}
            onChange={(e) => handleInputChange("transmission", e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600 cursor-pointer"
          >
            <option value="all">All Transmissions</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
      </div>

      {/* Result Counter & Active indicator */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">{totalResults}</span>
          <span>{totalResults === 1 ? "car found" : "cars found"} in inventory</span>
        </div>

        {isAnyFilterActive && (
          <span className="text-blue-600 font-medium">Filtered results applied</span>
        )}
      </div>
    </div>
  );
}
