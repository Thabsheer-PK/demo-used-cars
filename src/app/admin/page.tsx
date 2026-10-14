"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Unlock,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Car as CarIcon,
  Search,
  DollarSign,
  Fuel,
  Gauge,
  Layers,
  X,
  Eye,
  Info,
} from "lucide-react";
import { useCars } from "@/context/CarContext";
import { Car, FuelType, TransmissionType, BodyType, CarStatus } from "@/types/car";
import { formatIndianPrice, formatLakhPrice, formatKm } from "@/lib/utils";

export default function AdminPage() {
  const { cars, addCar, updateCar, deleteCar, resetToDefaults } = useCars();

  // Authentication State (Demo only)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Search in admin table
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarId, setEditingCarId] = useState<string | null>(null);

  // Form State
  const initialFormState: Omit<Car, "id"> = {
    name: "",
    brand: "Hyundai",
    model: "",
    variant: "",
    year: 2022,
    price: 850000,
    originalPrice: 900000,
    kilometres: 25000,
    fuelType: "Petrol" as FuelType,
    transmission: "Manual" as TransmissionType,
    bodyType: "SUV" as BodyType,
    registrationNumber: "KL 07 CA 1234",
    registrationYear: 2022,
    ownerCount: 1,
    insuranceType: "Comprehensive (Valid till 2027)",
    rtoLocation: "Kochi (KL-07)",
    engineCapacityCc: 1498,
    mileageKmpl: 18.0,
    color: "Polar White",
    featured: false,
    status: "Available" as CarStatus,
    inspectionScore: 9.5,
    certificationWarranty: "1 Year Engine & Gearbox Warranty",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Well maintained single-owner vehicle in pristine condition.",
    features: ["Sunroof", "Touchscreen Infotainment", "Alloy Wheels", "Dual Airbags"],
  };

  const [formData, setFormData] = useState<Omit<Car, "id">>(initialFormState);
  const [imagesInput, setImagesInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // Auto-login check in sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = sessionStorage.getItem("yem_key_admin_logged");
      if (logged === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
      sessionStorage.setItem("yem_key_admin_logged", "true");
    } else {
      setLoginError("Invalid credentials. Please use demo credentials: admin / admin123");
    }
  };

  const handleQuickDemoFill = () => {
    setUsername("admin");
    setPassword("admin123");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("yem_key_admin_logged");
  };

  // Trigger Add
  const handleOpenAdd = () => {
    setEditingCarId(null);
    setFormData(initialFormState);
    setImagesInput(initialFormState.images.join("\n"));
    setFeaturesInput(initialFormState.features.join(", "));
    setIsModalOpen(true);
  };

  // Trigger Edit
  const handleOpenEdit = (car: Car) => {
    setEditingCarId(car.id);
    const { id, ...rest } = car;
    setFormData(rest);
    setImagesInput(car.images.join("\n"));
    setFeaturesInput(car.features.join(", "));
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse images and features
    const parsedImages = imagesInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parsedFeatures = featuresInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      ...formData,
      images: parsedImages.length > 0 ? parsedImages : initialFormState.images,
      features: parsedFeatures.length > 0 ? parsedFeatures : initialFormState.features,
    };

    if (editingCarId) {
      updateCar(editingCarId, payload);
      setSuccessToast(`Car "${payload.name}" updated successfully!`);
    } else {
      addCar(payload);
      setSuccessToast(`Car "${payload.name}" added to showroom inventory!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleDelete = (car: Car) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${car.name}" (${car.registrationNumber}) from demo inventory?`
      )
    ) {
      deleteCar(car.id);
      setSuccessToast(`Listing "${car.name}" removed.`);
      setTimeout(() => setSuccessToast(""), 4000);
    }
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "Reset inventory to default 10 sample vehicles? All your custom added or edited cars will be restored to initial showroom state."
      )
    ) {
      resetToDefaults();
      setSuccessToast("Inventory successfully reset to factory sample cars.");
      setTimeout(() => setSuccessToast(""), 4000);
    }
  };

  // Filtered cars for table
  const displayCars = cars.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics
  const totalValue = cars.reduce((acc, curr) => acc + curr.price, 0);
  const activeCount = cars.filter((c) => c.status === "Available").length;
  const soldCount = cars.filter((c) => c.status === "Sold").length;

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Admin Portal Demo</h1>
            <p className="text-xs text-slate-500">
              YEM KEY USED CARS • Showroom Inventory Manager
            </p>
          </div>

          {/* Prominent Demo Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Interactive Demonstration Only</p>
              <p className="text-amber-800 mt-0.5">
                This is a front-end demo with client-side localStorage. Do not treat as production security.
              </p>
            </div>
          </div>

          {/* Demo Credentials Box with 1-Click Button */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Demo Username:</span>
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-800">
                admin
              </code>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Demo Password:</span>
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-800">
                admin123
              </code>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="w-full mt-2 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              Click to Auto-fill Demo Credentials
            </button>
          </div>

          {loginError && (
            <div className="text-xs font-semibold text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              ← Return to Public Showroom
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner & Demo Notice */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              Demo Admin Mode
            </span>
            <span className="text-xs text-slate-400">LocalStorage Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Showroom Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Add, update, or remove cars. Changes are preserved in your browser and instantly update the live website showroom.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Car</span>
          </button>

          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors border border-slate-700"
            title="Reset data back to initial 10 cars"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs sm:text-sm font-semibold transition-colors border border-rose-500/30"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Total Cars Listed</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {cars.length}
          </p>
          <span className="text-[11px] text-blue-600 font-medium">In Showroom Database</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Active Listings</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
            {activeCount}
          </p>
          <span className="text-[11px] text-slate-400">Ready for delivery</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Marked as Sold</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-600 mt-1">
            {soldCount}
          </p>
          <span className="text-[11px] text-slate-400">Archive / Delivered</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Inventory Valuation</p>
          <p className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">
            {formatLakhPrice(totalValue)}
          </p>
          <span className="text-[11px] text-slate-400">Total asset value</span>
        </div>
      </div>

      {/* Table Section with search */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Table Top Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search table by name, brand or KL reg number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Showing {displayCars.length} of {cars.length} vehicles</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Vehicle</th>
                <th className="py-3.5 px-4">Reg & Location</th>
                <th className="py-3.5 px-4">Specs</th>
                <th className="py-3.5 px-4">Showroom Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayCars.map((car) => (
                <tr key={car.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={car.images[0] || "/placeholder-car.jpg"}
                          alt={car.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/cars/${car.id}`}
                          className="font-bold text-slate-900 hover:text-blue-600 block line-clamp-1"
                        >
                          {car.name}
                        </Link>
                        <span className="text-[11px] text-slate-400">
                          {car.year} • {car.bodyType} • {car.ownerCount === 1 ? "1st Owner" : `${car.ownerCount} Owners`}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800 block">
                      {car.registrationNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {car.rtoLocation}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-xs">
                    <div>{formatKm(car.kilometres)}</div>
                    <div className="text-slate-400">
                      {car.fuelType} • {car.transmission}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900 block">
                      {formatIndianPrice(car.price)}
                    </span>
                    <span className="text-[11px] text-blue-600 font-medium">
                      {formatLakhPrice(car.price)}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() =>
                        updateCar(car.id, {
                          status: car.status === "Available" ? "Sold" : "Available",
                        })
                      }
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        car.status === "Available"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                      }`}
                      title="Click to toggle status"
                    >
                      {car.status} ↺
                    </button>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/cars/${car.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        title="View Public Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(car)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                        title="Edit Vehicle"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(car)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. ADD / EDIT CAR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl my-8 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                  {editingCarId ? "Edit Car Listing" : "Add New Used Car"}
                </span>
                <h3 className="text-lg font-bold">
                  {editingCarId ? formData.name : "New Showroom Listing"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. 2021 Hyundai Creta SX (O)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Hyundai, Toyota, Maruti"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Model & Variant */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. Creta"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Variant & Trim
                  </label>
                  <input
                    type="text"
                    value={formData.variant}
                    onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                    placeholder="e.g. SX (O) 1.4 Turbo DCT"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Year, Price, Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Original Price (Strike)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, originalPrice: Number(e.target.value) || undefined })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* KM, Fuel, Transmission, Body */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kilometres *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.kilometres}
                    onChange={(e) => setFormData({ ...formData, kilometres: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fuel Type
                  </label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as FuelType })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-white"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Transmission
                  </label>
                  <select
                    value={formData.transmission}
                    onChange={(e) =>
                      setFormData({ ...formData, transmission: e.target.value as TransmissionType })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-white"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Body Style
                  </label>
                  <select
                    value={formData.bodyType}
                    onChange={(e) => setFormData({ ...formData, bodyType: e.target.value as BodyType })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-white"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="MUV">MUV</option>
                  </select>
                </div>
              </div>

              {/* Registration, RTO, Owners, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kerala Reg Number
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    placeholder="KL 07 CD 4482"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    RTO Location
                  </label>
                  <input
                    type="text"
                    value={formData.rtoLocation}
                    onChange={(e) => setFormData({ ...formData, rtoLocation: e.target.value })}
                    placeholder="Kochi (KL-07)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Owners Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.ownerCount}
                    onChange={(e) => setFormData({ ...formData, ownerCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Listing Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CarStatus })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              {/* Image URLs (newline separated) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image URLs (One per line)
                </label>
                <textarea
                  rows={3}
                  value={imagesInput}
                  onChange={(e) => setImagesInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-600 font-mono"
                />
              </div>

              {/* Features (comma separated) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Features (Comma separated)
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Sunroof, Touchscreen, 6 Airbags, Leather Seats"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive inspection details, previous owner care, etc."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="featuredToggle" className="text-xs font-semibold text-slate-700">
                  Mark as Featured on Showroom Homepage
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
                >
                  {editingCarId ? "Update Listing" : "Publish to Showroom"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
