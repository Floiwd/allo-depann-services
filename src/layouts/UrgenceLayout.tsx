"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, ArrowRight, CheckCircle2, ShieldCheck, Clock, AlertTriangle, ArrowDown } from "lucide-react";
import { entreprise } from "@/data/entreprise";
import FormulaireDevis from "@/components/FormulaireDevis";
import ProcessEtapes from "@/components/ProcessEtapes";
import ZoneIntervention from "@/components/ZoneIntervention";

export default function UrgenceLayout() {
  const [selectedSituation, setSelectedSituation] = useState(entreprise.services[0]?.titre || "Porte claquée");

  const zoneAffichee = entreprise.localisation.isZoneConfirmee
    ? entreprise.localisation.zoneLibelle
    : "Secteur d'intervention en cours de confirmation";

  return (
    <div className="space-y-0">
      {/* 1. HERO SPLIT D'URGENCE : Le formulaire et l'appel sont directement côte à côte dans le viewport */}
      <section className="relative bg-gradient-to-b from-red-50/50 via-white to-white dark:from-red-950/20 dark:via-neutral-900 dark:to-neutral-900 pt-8 pb-14 border-b border-red-100 dark:border-red-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Colonne Gauche : Appel & Accès d'urgence direct */}
            <div className="lg:col-span-7 space-y-6 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
                <span>Intervention Immédiate • Porte claquée, serrure bloquée</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white tracking-tight leading-[1.08]">
                Bloqué dehors ?<br />
                <span className="text-red-600">On vous dépanne sans délai.</span>
              </h1>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                <strong className="font-semibold text-neutral-900 dark:text-white">{entreprise.nom}</strong> : serrurerie & dépannage. Tarif et méthode annoncés au téléphone avant tout déplacement. {zoneAffichee}.
              </p>

              {/* ÉNORME BOUTON D'APPEL DIRECT D'URGENCE */}
              <div className="p-4 sm:p-5 rounded-2xl bg-red-600 text-white shadow-xl shadow-red-600/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-red-100 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Ligne directe sans centrale
                  </span>
                  <span>Contact immédiat</span>
                </div>

                <a
                  href={entreprise.telephone.href}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-white text-red-600 text-xl sm:text-2xl font-black hover:bg-neutral-50 active:scale-98 transition-all shadow-md text-center"
                >
                  <Phone className="w-6 h-6 fill-current shrink-0 animate-bounce" />
                  <span>{entreprise.telephone.display}</span>
                </a>

                <p className="text-[11px] text-red-100 text-center">
                  Appuyez pour appeler directement le technicien sans intermédiaire
                </p>
              </div>

              {/* Pastilles de situations rapides pour pré-remplir le formulaire en un clic */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Ou cliquez sur votre problème pour pré-remplir :
                </p>
                <div className="flex flex-wrap gap-2">
                  {entreprise.services
                    .filter((s) => s.confirmed)
                    .map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedSituation(service.titre)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                          selectedSituation === service.titre
                            ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 ring-1 ring-red-600"
                            : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        {service.titre}
                      </button>
                    ))}
                </div>
              </div>

              {/* Réassurance 3 points */}
              <div className="grid grid-cols-3 gap-3 pt-3 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tarif avant départ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sans intermédiaire</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Facture conforme</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : FORMULAIRE EXPRESS INTÉGRÉ DANS LE HERO */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border-2 border-red-500/30 shadow-2xl overflow-hidden">
                <div className="bg-red-600 text-white px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">Demande express de rappel</h3>
                    <p className="text-[11px] text-red-100">Le technicien vous rappelle dans les 5 min</p>
                  </div>
                  <span className="text-[10px] bg-red-700/60 font-mono px-2 py-1 rounded text-red-100">
                    &lt; 10 sec
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <FormulaireDevis initialSituation={selectedSituation} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Situations d'urgence en grille compacte avec action directe */}
      <section className="py-12 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Nos interventions
              </span>
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                Toutes les pannes prises en charge
              </h2>
            </div>
            <a
              href={entreprise.telephone.href}
              className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:underline"
            >
              <span>Autre panne ? Appelez au {entreprise.telephone.display}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entreprise.services.filter((s) => s.confirmed).map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between hover:border-red-400 transition-all shadow-sm"
              >
                <div className="flex gap-3 items-start">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50">
                    <Image
                      src={s.placeholderImage}
                      alt={s.titre}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{s.titre}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{s.descriptionCourte}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-600">Intervention rapide</span>
                  <button
                    onClick={() => {
                      setSelectedSituation(s.titre);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Choisir</span>
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Déroulement express */}
      <ProcessEtapes />

      {/* 4. Zone d'intervention */}
      <ZoneIntervention />
    </div>
  );
}
