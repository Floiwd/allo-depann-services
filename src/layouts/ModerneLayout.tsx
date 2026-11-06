"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, ArrowUpRight, ArrowDown } from "lucide-react";
import { entreprise } from "@/data/entreprise";
import FormulaireDevis from "@/components/FormulaireDevis";
import ZoneIntervention from "@/components/ZoneIntervention";

export default function ModerneLayout() {
  const [selectedSituation, setSelectedSituation] = useState(entreprise.services[0]?.titre || "Porte claquée");

  const zoneAffichee = entreprise.localisation.isZoneConfirmee
    ? entreprise.localisation.zoneLibelle
    : "Secteur d'intervention en cours de confirmation";

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white space-y-0 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* 1. HERO ÉDITORIAL MINIMALISTE XXL */}
      <section className="pt-16 pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Studio Dépannage • {entreprise.nom}
              </span>
              <span className="font-mono text-xs text-neutral-500">
                {zoneAffichee}
              </span>
            </div>

            <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              Serrurerie<br />
              <span className="font-light italic text-neutral-400 dark:text-neutral-500 lowercase">d&apos;urgence.</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-end">
              <div className="md:col-span-7 space-y-4">
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-xl">
                  Ouverture fine sans dégât de serrure, extraction de clé cassée, remplacement immédiat de cylindre. Devis clair avant déplacement.
                </p>
                <div className="flex items-center gap-6 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  <span>0% plateforme</span>
                  <span>/</span>
                  <span>100% direct</span>
                  <span>/</span>
                  <span>Devis préalable</span>
                </div>
              </div>

              {/* ACTION MONUMENTALE EN NOIR & BLANC */}
              <div className="md:col-span-5 flex flex-col gap-3">
                <a
                  href={entreprise.telephone.href}
                  className="flex items-center justify-between px-6 py-5 bg-black dark:bg-white text-white dark:text-black text-base sm:text-lg font-bold tracking-tight hover:opacity-90 transition-opacity"
                >
                  <span className="font-mono text-sm uppercase">Ligne directe</span>
                  <span className="font-black text-xl">{entreprise.telephone.display}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>

                <a
                  href="#devis-moderne"
                  className="flex items-center justify-between px-6 py-3.5 border border-neutral-300 dark:border-neutral-700 text-xs font-mono uppercase tracking-wider hover:border-black dark:hover:border-white transition-colors"
                >
                  <span>Formulaire express en ligne</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SITUATIONS D'URGENCE : LISTE ÉDITORIALE INTERACTIVE SANS CARTE */}
      <section className="py-16 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              01 / Cas d&apos;interventions
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              6 protocoles confirmés
            </span>
          </div>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {entreprise.services.filter((s) => s.confirmed).map((s, idx) => (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedSituation(s.titre);
                  const el = document.getElementById("devis-moderne");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="py-6 group flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900/40 px-2 transition-colors"
              >
                <div className="flex items-start md:items-center gap-6">
                  <span className="font-mono text-xs text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                    [0{idx + 1}]
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight group-hover:translate-x-1 transition-transform">
                      {s.titre}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xl">
                      {s.descriptionCourte} — <span className="italic">{s.descriptionDetaillee}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono uppercase text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                    Sélectionner →
                  </span>
                  <a
                    href={entreprise.telephone.href}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors"
                    title="Appeler"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCESSUS EN 3 CHIFFRES MONUMENTAUX */}
      <section className="py-16 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              02 / Protocole d&apos;intervention
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {entreprise.processus.etapes.map((etape) => (
              <div key={etape.numero} className="space-y-4">
                <span className="block text-4xl sm:text-6xl font-black font-mono tracking-tighter text-neutral-300 dark:text-neutral-700">
                  {etape.numero}
                </span>
                <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900 dark:text-white">
                  {etape.titre}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {etape.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ZONE D'INTERVENTION */}
      <ZoneIntervention />

      {/* 5. FORMULAIRE MINIMALISTE */}
      <section id="devis-moderne" className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              03 / Contact direct
            </span>
            <h2 className="text-2xl font-bold uppercase tracking-tight mt-1">
              Demande d&apos;intervention rapide
            </h2>
          </div>

          <FormulaireDevis initialSituation={selectedSituation} />
        </div>
      </section>
    </div>
  );
}
