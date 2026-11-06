"use client";

import React, { useState } from "react";
import { Phone, Scale, BookOpen } from "lucide-react";
import { entreprise } from "@/data/entreprise";
import FormulaireDevis from "@/components/FormulaireDevis";
import ProcessEtapes from "@/components/ProcessEtapes";
import ZoneIntervention from "@/components/ZoneIntervention";
import AvisClients from "@/components/AvisClients";
import IllustrativeImage from "@/components/IllustrativeImage";

export default function SobreLayout() {
  const [selectedSituation, setSelectedSituation] = useState(entreprise.services[0]?.titre || "Porte claquée");

  const zoneAffichee = entreprise.localisation.isZoneConfirmee
    ? entreprise.localisation.zoneLibelle
    : "Secteur d'intervention en cours de confirmation";

  return (
    <div className="space-y-0 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* 1. HERO INSTITUTIONNEL & FOND BLEU NUIT */}
      <section className="bg-slate-900 text-white py-10 sm:py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-sky-400 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Artisanat certifié • Pratiques déontologiques strictes</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Interventions de Serrurerie &amp; Dépannage
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {entreprise.nom} assure un service rigoureux de dépannage, d&apos;ouverture de porte et de sécurisation. Devis préalable et annonce systématique du tarif avant tout déplacement.
          </p>

          <div className="pt-1 text-xs text-slate-400">
            Zone couverte : {zoneAffichee} • Contact direct par téléphone
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
            <a
              href={entreprise.telephone.href}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Appeler le {entreprise.telephone.display}</span>
            </a>
            <a
              href="#devis-sobre"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
            >
              <span>Demande d&apos;intervention</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. RÉASSURANCE & CHARTE ÉTHIQUE PLACÉE IMMÉDIATEMENT EN PREMIER */}
      <section className="py-8 sm:py-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Charte de transparence
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-0.5">
              Pourquoi nous confier votre porte ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div className="p-4 sm:p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
              <div className="w-8 h-8 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Prix annoncé au préalable</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Aucun déplacement n&apos;est engagé sans que vous n&apos;ayez validé la méthode d&apos;ouverture et le montant estimé.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
              <div className="w-8 h-8 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Artisan direct, sans intermédiaire</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Vous conversez immédiatement avec le dépanneur. Aucune commission de plateforme tierce n&apos;est répercutée.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
              <div className="w-8 h-8 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Facturation conforme aux assurances</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Délivrance systématique d&apos;une facture détaillée mentionnant le déplacement, la main d&apos;œuvre et le matériel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TABLEAU TECHNIQUE DES INTERVENTIONS (Disposition en fiches structurées) */}
      <section className="py-8 sm:py-10 bg-slate-100/60 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Catalogue technique
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-0.5">
              Fiches d&apos;interventions certifiées
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Nos méthodes privilégient toujours l&apos;ouverture non destructive pour préserver votre serrure.
            </p>
          </div>

          <div className="space-y-4">
            {entreprise.services.filter((s) => s.confirmed).map((s) => (
              <div
                key={s.id}
                className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs hover:border-sky-500 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 w-full">
                  <div className="relative w-full sm:w-52 h-40 sm:h-32 rounded-lg bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <IllustrativeImage imageId={s.id} className="w-full h-full" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{s.titre}</h3>
                      <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        Serrurerie
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{s.descriptionCourte}</p>
                    <p className="text-xs text-slate-500 italic mt-0.5">{s.descriptionDetaillee}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setSelectedSituation(s.titre);
                      const el = document.getElementById("devis-sobre");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer transition-colors"
                  >
                    Sélectionner
                  </button>
                  <a
                    href={entreprise.telephone.href}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-sky-700 hover:bg-sky-600 text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>Appeler</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DÉROULEMENT EN 3 ÉTAPES */}
      <ProcessEtapes />

      {/* 5. ZONE D'INTERVENTION */}
      <ZoneIntervention />

      {/* 6. AVIS CLIENTS (ILLUSTRATIFS) */}
      <AvisClients />

      {/* 7. FORMULAIRE ENCADRÉ AVEC CADRE JURIDIQUE DE CONFIANCE */}
      <section id="devis-sobre" className="py-8 sm:py-10 bg-white dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-4 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-sky-700 dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white">Engagement de clarté préalable :</strong> En soumettant ce formulaire, vous recevrez une estimation claire par téléphone avant tout déplacement physique du serrurier.
            </div>
          </div>

          <FormulaireDevis initialSituation={selectedSituation} showHeader={false} />
        </div>
      </section>
    </div>
  );
}
