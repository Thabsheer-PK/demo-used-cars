export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG";
export type TransmissionType = "Manual" | "Automatic";
export type BodyType = "Hatchback" | "Sedan" | "SUV" | "MUV";
export type CarStatus = "Available" | "Reserved" | "Sold";

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number; // in INR (e.g. 850000)
  originalPrice?: number;
  kilometres: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  registrationNumber: string; // e.g. KL 07 CA 4921
  registrationYear: number;
  ownerCount: number; // 1 = 1st Owner
  insuranceType: string; // e.g. Comprehensive valid till Nov 2026
  rtoLocation: string; // e.g. Kochi (KL-07), Kozhikode (KL-11)
  engineCapacityCc: number; // e.g. 1498
  mileageKmpl: number; // e.g. 18.5
  color: string;
  featured: boolean;
  status: CarStatus;
  images: string[];
  description: string;
  features: string[];
  inspectionScore?: number; // e.g. 9.4 / 10
  certificationWarranty?: string; // e.g. 6 Months Warranty + 3 Free Services
}

export interface FilterState {
  search: string;
  brand: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  priceRange: string; // "all" | "under-5" | "5-10" | "10-20" | "above-20"
  sortBy: "featured" | "price-asc" | "price-desc" | "year-desc" | "km-asc";
}
