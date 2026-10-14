"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Car as CarIcon,
  Navigation,
} from "lucide-react";
import { SHOWROOM_INFO, createWhatsAppUrl, createGeneralWhatsAppUrl } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carInterest: "General Enquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello YEM KEY USED CARS,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nInterested in: ${formData.carInterest}\nNote: ${formData.message || "Looking to visit showroom."}`
    );
    window.open(`https://wa.me/${SHOWROOM_INFO.whatsappNumber}?text=${text}`, "_blank");
  };

  const faqs = [
    {
      q: "How does the RC ownership transfer work in Kerala?",
      a: "Our dedicated paperwork desk handles the entire Kerala Motor Vehicles Department (MVD) online portal application (Form 29 & 30 submission), RTO fee payments, and physical document submission. The updated Smart Card RC is delivered directly to your home address within 15–20 working days.",
    },
    {
      q: "Are the vehicles inspected for flood damage or odometer rollbacks?",
      a: "Yes! Every single car at YEM KEY undergoes our strict 150-Point Technical Inspection. We inspect the engine, undercarriage, cabin carpet seams, wiring harness, and cross-reference computerized manufacturer service records to guarantee 100% genuine kilometres and zero flood damage.",
    },
    {
      q: "Can I get car financing / loan support at your showroom?",
      a: "Absolutely. We have tie-ups with leading Kerala banking partners including SBI, HDFC Bank, Federal Bank, ICICI Bank, and Sundaram Finance. We assist with instant pre-approvals, low interest rates, and loan tenures up to 7 years.",
    },
    {
      q: "What is your 7-Day Exchange Policy?",
      a: "If you purchase a certified vehicle from YEM KEY USED CARS and feel it doesn't match your family's needs, you can exchange it within 7 days for any other vehicle in our active stock with zero deduction on your vehicle purchase value (subject to basic inspection).",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Kochi Showroom Desk</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Visit or Contact Us
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Have questions about a car, want to book a doorstep inspection, or ready to visit our showroom in Edappally, Kochi? We are here to help.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 5 Cols: Showroom Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Main Showroom
              </span>
              <h2 className="text-2xl font-black mt-1">YEM KEY USED CARS</h2>
              <p className="text-xs text-slate-400 mt-1">
                Kochi • Ernakulam • Kerala
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Showroom Address (Sample):</p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                    {SHOWROOM_INFO.address}
                  </p>
                  <p className="text-[11px] text-amber-300/80 mt-1 font-medium">
                    (Landmark: Opposite Metro Pillar 384, Edappally Toll)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Telephone / Calling Desk:</p>
                  <a
                    href={`tel:${SHOWROOM_INFO.phoneRaw}`}
                    className="text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    {SHOWROOM_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Direct WhatsApp Hotline:</p>
                  <a
                    href={createWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
                  >
                    +91 94008 11787 (Instant Reply)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Showroom Timings:</p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {SHOWROOM_INFO.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Open WhatsApp Chat Directly</span>
              </a>
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-amber-300/90">
              {SHOWROOM_INFO.demoDisclaimer}
            </div>
          </div>

          {/* Quick Assurance Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Inspection & Paperwork Guarantee</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              All vehicles on display have completed our 150-point diagnostic check and possess clear Kerala RTO records with no active legal disputes.
            </p>
          </div>
        </div>

        {/* Right 7 Cols: Interactive Enquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Online Enquiry
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Send Showroom Message
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Submit your inquiry and our showroom manager will get in touch immediately.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Thank You, {formData.name}!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your message regarding <strong>{formData.carInterest}</strong> has been received by our Edappally showroom team. We will call you on <strong>{formData.phone}</strong>.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 94008 11787)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 94008 11787"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="suresh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interested Car / Topic
                  </label>
                  <select
                    value={formData.carInterest}
                    onChange={(e) => setFormData({ ...formData, carInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Hyundai Creta Turbo">Hyundai Creta Turbo</option>
                    <option value="Toyota Fortuner 4x2 AT">Toyota Fortuner 4x2 AT</option>
                    <option value="Honda City ZX CVT">Honda City ZX CVT</option>
                    <option value="Maruti Suzuki Swift">Maruti Suzuki Swift</option>
                    <option value="Tata Nexon Dark Edition">Tata Nexon Dark Edition</option>
                    <option value="Sell My Existing Car (Exchange)">Sell / Exchange My Car</option>
                    <option value="Car Loan & Financing">Car Loan & Financing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Specific Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Share any specific requirements (e.g., preferred test drive date, down payment budget)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]"
                >
                  Send Enquiry to Showroom
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                We respect your privacy. No spam calls — our team only contacts regarding your selected car interest.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Map Landmark Showcase */}
      <div className="rounded-3xl border border-slate-200 overflow-hidden bg-slate-900 text-white p-6 sm:p-10 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Showroom Map & Location
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Easy Highway Access in Kochi
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Positioned conveniently on the Kochi Bypass Road, easily accessible from Aluva, Kakkanad InfoPark, Thripunithura, and Fort Kochi.
            </p>
            <p className="text-xs text-slate-400">
              <strong>Sample Coordinates:</strong> 10.0261° N, 76.3125° E • NH-66 Edappally Bypass
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://maps.google.com/?q=Edappally+Kochi+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors"
            >
              <Navigation className="w-4 h-4 text-blue-600" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get WhatsApp Live Location</span>
            </a>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between text-sm sm:text-base hover:text-blue-600"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openFaq === idx ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
