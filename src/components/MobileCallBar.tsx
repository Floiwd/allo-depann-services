"use client";

import React from "react";
import { Phone, ShieldAlert } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function MobileCallBar() {
  return (
    <div className="sticky top-0 z-40 w-full bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] md:hidden">
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-badge-text)] flex items-center gap-1 truncate">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Urgence Dépannage</span>
          </p>
          <p className="text-xs font-semibold text-[var(--text-main)] truncate">
            {entreprise.nom}
          </p>
        </div>

        {/* Bouton d'appel mobile ultra visible */}
        <a
          href={entreprise.telephone.href}
          className="theme-btn-call flex items-center gap-2 px-4 py-2.5 text-xs font-bold shadow-md shrink-0 active:scale-95 transition-transform"
          aria-label={`Appeler immédiatement le dépanneur au ${entreprise.telephone.display}`}
        >
          <Phone className="w-4 h-4 shrink-0 fill-current" />
          <span>Appeler ({entreprise.telephone.display})</span>
        </a>
      </div>
    </div>
  );
}
