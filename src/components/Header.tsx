"use client";

import React from "react";
import Link from "next/link";
import { Phone, Clock, ArrowRight } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function Header() {
  return (
    <header className="hidden md:block sticky top-0 z-30 w-full bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-6">
        {/* Logo & Métier */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center font-bold text-base tracking-tighter">
            AD
          </div>
          <div>
            <span className="block text-base font-extrabold tracking-tight text-[var(--text-main)] group-hover:opacity-90">
              {entreprise.nom}
            </span>
            <span className="block text-xs text-[var(--text-muted)] font-medium">
              {entreprise.metier}
            </span>
          </div>
        </Link>

        {/* Navigation sobre */}
        <nav className="flex items-center gap-6 text-xs font-semibold text-[var(--text-body)]">
          <a
            href="#urgences"
            className="hover:text-[var(--text-main)] transition-colors"
          >
            Situations d&apos;urgence
          </a>
          {entreprise.processus.confirmed && (
            <a
              href="#processus"
              className="hover:text-[var(--text-main)] transition-colors"
            >
              Déroulement
            </a>
          )}
          <a
            href="#zone"
            className="hover:text-[var(--text-main)] transition-colors"
          >
            Zone d&apos;intervention
          </a>
          <a
            href="#devis"
            className="hover:text-[var(--text-main)] transition-colors"
          >
            Demande en ligne
          </a>
        </nav>

        {/* Action prioritaire : Appel direct */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block text-[11px] font-semibold text-[var(--text-muted)] flex items-center justify-end gap-1">
              <Clock className="w-3 h-3 text-[var(--text-muted)]" />
              Ligne directe dépanneur
            </span>
            <span className="text-xs font-bold text-[var(--text-main)]">
              {entreprise.telephone.display}
            </span>
          </div>

          <a
            href={entreprise.telephone.href}
            className="theme-btn-call flex items-center gap-2 px-5 py-2.5 text-xs font-bold shadow-sm hover:shadow cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>Appeler maintenant</span>
            <ArrowRight className="w-3 h-3 ml-0.5 opacity-80" />
          </a>
        </div>
      </div>
    </header>
  );
}
