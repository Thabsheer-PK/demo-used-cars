"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { SHOWROOM_INFO, createWhatsAppUrl } from "@/lib/utils";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block mr-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-700">
        Chat with YEM KEY Showroom
        <span className="block text-[10px] text-emerald-400 font-semibold">Online • Quick Response</span>
      </div>

      <a
        href={createWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with YEM KEY Showroom on WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-110 active:scale-95 transition-all duration-300 relative"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-white/20" />
      </a>
    </div>
  );
}
