"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageCircle } from "lucide-react";
import { Car } from "@/types/car";
import { SHOWROOM_INFO } from "@/lib/utils";

interface TestDriveModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

export default function TestDriveModal({ car, isOpen, onClose }: TestDriveModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (10:00 AM - 1:00 PM)");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const forwardToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello YEM KEY USED CARS,\n\nI would like to book a Test Drive / Showroom Inspection:\n🚗 *${car.name}*\n🏷️ Price: ₹${car.price.toLocaleString("en-IN")}\n👤 Customer: ${name}\n📞 Phone: ${phone}\n📅 Date: ${date || "Flexible"}\n⏰ Slot: ${timeSlot}\n\nPlease confirm showroom slot availability at Edappally.`
    );
    window.open(`https://wa.me/${SHOWROOM_INFO.whatsappNumber}?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
              Free Showroom Test Drive
            </span>
            <h3 className="text-lg font-bold text-white">{car.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Test Drive Request Received!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>! Our showroom team at Edappally, Kochi will contact you shortly to confirm your slot for the {car.name}.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={forwardToWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Request on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Menon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98470 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white"
                    >
                      <option>Morning (10:00 AM - 1:00 PM)</option>
                      <option>Afternoon (1:00 PM - 4:00 PM)</option>
                      <option>Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all"
                >
                  Confirm Test Drive Appointment
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Valid driving license required for test drive. Location: Edappally Showroom.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
