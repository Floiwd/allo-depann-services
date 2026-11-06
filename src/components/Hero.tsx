"use client";

import React from "react";
import { Phone, ArrowDown, ShieldCheck, CheckCircle2 } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function Hero() {
  const zoneAffichee = entreprise.localisation.isZoneConfirmee
    ? entreprise.localisation.zoneLibelle
    : "Secteur d'intervention en cours de confirmation";

  return (
    <section className="relative pt-6 pb-12 md:py-20 overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge de situation sobre */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full theme-badge text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          <span>Assistance d&apos;urgence en serrurerie &amp; dépannage</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.1] mb-5">
          Porte claquée, clé perdue ou serrure bloquée ?
        </h1>

        {/* Sous-titre */}
        <p className="text-base sm:text-lg md:text-xl text-[var(--text-body)] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          <strong className="font-semibold text-[var(--text-main)]">{entreprise.nom}</strong> intervient pour vos urgences en serrurerie.{" "}
          <span className="block mt-1 text-sm sm:text-base text-[var(--text-muted)]">
            Zone : {zoneAffichee} • Tarif annoncé par téléphone avant tout déplacement.
          </span>
        </p>

        {/* Deux CTAs prioritaires */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto mb-10">
          <a
            href={entreprise.telephone.href}
            className="theme-btn-call flex items-center justify-center gap-3 px-6 py-4 text-base font-bold shadow-lg text-center whitespace-nowrap"
            aria-label={`Appeler immédiatement le dépanneur au ${entreprise.telephone.display}`}
          >
            <Phone className="w-5 h-5 fill-current shrink-0" />
            <span>Appeler le <strong className="font-extrabold">{entreprise.telephone.display}</strong></span>
          </a>

          <a
            href="#devis"
            className="theme-btn-secondary flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-center"
          >
            <span>Demander une intervention</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Ligne de réassurance factuelle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <div className="flex items-center justify-center gap-1.5 py-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Tarif annoncé avant départ</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Contact direct sans intermédiaire</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Facture détaillée fournie</span>
          </div>
        </div>
      </div>
    </section>
  );
}
