"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, ArrowRight, CheckCircle2, ShieldCheck, Clock, ArrowDown } from "lucide-react";
import { entreprise } from "@/data/entreprise";
import FormulaireDevis from "@/components/FormulaireDevis";
import ProcessEtapes from "@/components/ProcessEtapes";
import ZoneIntervention from "@/components/ZoneIntervention";
import AvisClients from "@/components/AvisClients";
import IllustrativeImage from "@/components/IllustrativeImage";

export default function UrgenceLayout() {
  const [selectedSituation, setSelectedSituation] = useState(entreprise.services[0]?.titre || "Porte claquée");

  const zoneAffichee = entreprise.localisation.isZoneConfirmee
    ? entreprise.localisation.zoneLibelle
    : "Secteur d'intervention en cours de confirmation";

  return (
    <div className="space-y-0 text-[var(--text-body)]">
      {/* 1. HERO SPLIT D'URGENCE : Compact, direct, formulaire et bouton d'appel côte à côte */}
      <section className="relative bg-[var(--bg-page)] pt-6 pb-10 border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Colonne Gauche : Appel & Accès d'urgence direct */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-badge text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-call)] animate-ping shrink-0" />
                <span>Intervention Immédiate • Porte claquée, serrure bloquée</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight leading-[1.1]">
                Bloqué dehors ?<br />
                <span className="text-[var(--accent-call)]">On vous dépanne sans délai.</span>
              </h1>

              <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed max-w-xl">
                <strong className="font-semibold text-[var(--text-main)]">{entreprise.nom}</strong> intervient pour vos urgences en serrurerie. Tarif et méthode annoncés au téléphone avant tout déplacement. {zoneAffichee}.
              </p>

              {/* GROS BOUTON D'APPEL DIRECT */}
              <div className="p-4 rounded-xl bg-[var(--accent-call)] text-[var(--accent-call-text)] shadow-md space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold opacity-90 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Ligne directe sans intermédiaire
                  </span>
                  <span>Contact prioritaire</span>
                </div>

                <a
                  href={entreprise.telephone.href}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-lg bg-[var(--bg-surface)] text-[var(--text-main)] text-xl font-black hover:opacity-95 active:scale-98 transition-all shadow-sm text-center"
                >
                  <Phone className="w-5 h-5 fill-current shrink-0 text-[var(--accent-call)]" />
                  <span>{entreprise.telephone.display}</span>
                </a>

                <p className="text-[10px] opacity-80 text-center">
                  Cliquer pour lancer l&apos;appel directement depuis votre smartphone
                </p>
              </div>

              {/* Pastilles de situations rapides */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Ou cliquez sur votre cas pour pré-remplir :
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {entreprise.services
                    .filter((s) => s.confirmed)
                    .map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedSituation(service.titre)}
                        className={`text-xs px-2.5 py-1.5 rounded-md border font-semibold transition-all cursor-pointer ${
                          selectedSituation === service.titre
                            ? "border-[var(--accent-call)] bg-[var(--accent-badge-bg)] text-[var(--accent-badge-text)] ring-1 ring-[var(--accent-call)]"
                            : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:border-[var(--border-strong)]"
                        }`}
                      >
                        {service.titre}
                      </button>
                    ))}
                </div>
              </div>

              {/* Réassurance 3 points */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-[var(--text-muted)]">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Tarif avant départ</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Sans intermédiaire</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Facture claire</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Formulaire express compact sans double titre */}
            <div className="lg:col-span-5 w-full">
              <div className="theme-surface rounded-xl border border-[var(--border-subtle)] shadow-md overflow-hidden">
                <div className="bg-[var(--accent-call)] text-[var(--accent-call-text)] px-4 py-2.5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold tracking-tight">Demande express de rappel</h3>
                    <p className="text-[10px] opacity-80">Rappel téléphonique prioritaire</p>
                  </div>
                  <span className="text-[10px] bg-black/20 font-mono px-2 py-0.5 rounded">
                    &lt; 10 sec
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <FormulaireDevis initialSituation={selectedSituation} showHeader={false} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Situations d'urgence compactes */}
      <section className="py-10 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-badge-text)]">
                Nos interventions
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] mt-0.5">
                Pannes prises en charge
              </h2>
            </div>
            <a
              href={entreprise.telephone.href}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-main)] hover:underline"
            >
              <span>Autre panne ? Appelez le {entreprise.telephone.display}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entreprise.services.filter((s) => s.confirmed).map((s) => (
              <div
                key={s.id}
                className="theme-surface p-4 rounded-xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-all shadow-xs"
              >
                <div>
                  <div className="relative w-full h-44 sm:h-48 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-page)] mb-3">
                    <IllustrativeImage
                      imageId={s.id}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[var(--text-main)] truncate">{s.titre}</h3>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
                      Dépannage rapide
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                    {s.descriptionCourte}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <a
                    href={entreprise.telephone.href}
                    className="text-xs font-bold text-[var(--accent-call)] hover:underline flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Appeler</span>
                  </a>
                  <button
                    onClick={() => {
                      setSelectedSituation(s.titre);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-xs font-bold text-[var(--text-main)] hover:text-[var(--accent-call)] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Pré-remplir le devis</span>
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Déroulement */}
      <ProcessEtapes />

      {/* 4. Avis clients illustratifs */}
      <AvisClients />

      {/* 5. Zone d'intervention */}
      <ZoneIntervention />
    </div>
  );
}
