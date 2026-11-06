"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Copy, Check } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function Header() {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(entreprise.telephone.display);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <header className="hidden md:block sticky top-0 z-30 w-full bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
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

        {/* Navigation desktop (visible à partir de 1024px pour préserver l'espace tablette) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-semibold text-[var(--text-body)]">
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

        {/* Action prioritaire Ordinateur : Numéro en texte + Copier + Bouton Demander */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] flex items-center justify-end gap-1">
              <Clock className="w-3 h-3 text-[var(--text-muted)]" />
              Ligne directe
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[var(--text-main)] select-all whitespace-nowrap tracking-wide">
                {entreprise.telephone.display}
              </span>
              <button
                type="button"
                onClick={handleCopyPhone}
                title="Copier le numéro de téléphone"
                aria-label="Copier le numéro de téléphone"
                className="p-1 rounded hover:bg-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
              >
                {copied ? (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" />
                    Copié
                  </span>
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>

          <a
            href="#devis"
            className="theme-btn-call flex items-center gap-2 px-4 py-2 text-xs font-bold shadow-sm hover:shadow cursor-pointer"
          >
            <span>Demander une intervention</span>
            <ArrowRight className="w-3 h-3 ml-0.5 opacity-80" />
          </a>
        </div>
      </div>
    </header>
  );
}
