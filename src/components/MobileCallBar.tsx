"use client";

import React from "react";
import { Phone, ShieldAlert } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function MobileCallBar() {
  return (
    <div className="sticky top-0 z-30 w-full bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] md:hidden">
      <div className="px-3.5 py-2 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-badge-text)] flex items-center gap-1 truncate">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Urgence Dépannage</span>
          </p>
          <p className="text-xs font-semibold text-[var(--text-main)] truncate">
            {entreprise.nom}
          </p>
        </div>

        {/* Bandeau haut : uniquement le numéro cliquable sans doublon de gros bouton */}
        <a
          href={entreprise.telephone.href}
          className="text-xs font-black text-[var(--accent-call)] flex items-center gap-1.5 py-1 px-2.5 rounded-md hover:bg-[var(--accent-badge-bg)] transition-colors shrink-0 whitespace-nowrap"
          aria-label={`Ligne directe au ${entreprise.telephone.display}`}
        >
          <Phone className="w-3.5 h-3.5 shrink-0 fill-current" />
          <span className="whitespace-nowrap tracking-wide">{entreprise.telephone.display}</span>
        </a>
      </div>
    </div>
  );
}
