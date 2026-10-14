"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Car } from "@/types/car";
import { INITIAL_CARS } from "@/data/cars";

interface CarContextType {
  cars: Car[];
  isLoaded: boolean;
  getCarById: (id: string) => Car | undefined;
  addCar: (car: Omit<Car, "id">) => Car;
  updateCar: (id: string, updated: Partial<Car>) => boolean;
  deleteCar: (id: string) => boolean;
  resetToDefaults: () => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "yem_key_used_cars_inventory_v1";

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCars(parsed);
        } else {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CARS));
        }
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CARS));
      }
    } catch (e) {
      console.error("Failed to load inventory from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveToStorage = (updatedCars: Car[]) => {
    setCars(updatedCars);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCars));
    } catch (e) {
      console.error("Failed to save inventory to localStorage:", e);
    }
  };

  const getCarById = (id: string): Car | undefined => {
    return cars.find((c) => c.id === id);
  };

  const addCar = (newCarData: Omit<Car, "id">): Car => {
    const newCar: Car = {
      ...newCarData,
      id: `car-${Date.now()}`,
    };
    const updated = [newCar, ...cars];
    saveToStorage(updated);
    return newCar;
  };

  const updateCar = (id: string, updatedData: Partial<Car>): boolean => {
    const index = cars.findIndex((c) => c.id === id);
    if (index === -1) return false;

    const updatedCars = [...cars];
    updatedCars[index] = {
      ...updatedCars[index],
      ...updatedData,
    };
    saveToStorage(updatedCars);
    return true;
  };

  const deleteCar = (id: string): boolean => {
    const filtered = cars.filter((c) => c.id !== id);
    if (filtered.length === cars.length) return false;
    saveToStorage(filtered);
    return true;
  };

  const resetToDefaults = () => {
    saveToStorage(INITIAL_CARS);
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        isLoaded,
        getCarById,
        addCar,
        updateCar,
        deleteCar,
        resetToDefaults,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCars must be used within a CarProvider");
  }
  return context;
}
