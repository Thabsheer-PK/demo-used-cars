import React from "react";
import { AlertCircle, Phone, MessageCircle } from "lucide-react";
import { SHOWROOM_INFO } from "@/lib/utils";

export default function DemoBanner() {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium text-[11px] border border-amber-500/30">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            {SHOWROOM_INFO.demoDisclaimer}
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300">
            Showroom: Edappally Bypass, Kochi, Kerala
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <a
            href={`tel:${SHOWROOM_INFO.phoneRaw}`}
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-blue-400" />
            <span>{SHOWROOM_INFO.phone}</span>
          </a>
          <span className="text-slate-600">•</span>
          <a
            href={`https://wa.me/${SHOWROOM_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp Quick Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
