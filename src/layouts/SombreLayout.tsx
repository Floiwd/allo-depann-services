"use client";

import React, { useState } from "react";
import IllustrativeImage from "@/components/IllustrativeImage";
import { Phone, Shield, Lock, ArrowRight } from "lucide-react";
import { entreprise } from "@/data/entreprise";
import FormulaireDevis from "@/components/FormulaireDevis";
import ProcessEtapes from "@/components/ProcessEtapes";
import ZoneIntervention from "@/components/ZoneIntervention";
import AvisClients from "@/components/AvisClients";

export default function SombreLayout() {
  const [selectedSituation, setSelectedSituation] = useState(entreprise.services[0]?.titre || "Porte claquée");

  const zoneAffichee = entreprise.localisation.isZoneConfirmee
    ? entreprise.localisation.zoneLibelle
    : "Secteur d'intervention en cours de confirmation";

  return (
    <div className="bg-[#0b0c10] text-[#e0e2ec] space-y-0 selection:bg-[#d4af37] selection:text-black">
      
      {/* 1. HERO IMMERSIF SOMBRE & LAITON DORÉ */}
      <section className="relative py-10 sm:py-14 border-b border-[#252836] overflow-hidden">
        {/* Lueur d'ambiance laiton feutrée */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a24] border border-[#d4af37]/40 text-[#f0d57e] text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Haute Serrurerie &amp; Sécurisation d&apos;Urgence</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Intervention d&apos;Élite en Serrurerie
          </h1>

          <p className="text-xs sm:text-base text-[#9da3b4] max-w-2xl mx-auto leading-relaxed">
            {entreprise.nom} intervient avec précision pour l&apos;ouverture non destructive, le blindage et le remplacement de serrures de haute sécurité.
          </p>

          <div className="text-xs text-[#828898] font-mono">
            {zoneAffichee} • Estimation préalable sans surprise
          </div>

          {/* Action Dorée Prestigieuse */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
            <a
              href={entreprise.telephone.href}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c59b27] hover:from-[#e2c26e] hover:to-[#d4af37] text-neutral-950 font-black text-sm sm:text-base shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Ligne Directe : {entreprise.telephone.display}</span>
            </a>

            <a
              href="#devis-sombre"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#141620] hover:bg-[#1a1e2c] border border-[#303446] text-white text-xs font-semibold transition-all"
            >
              Demander une intervention
            </a>
          </div>

          {/* Visuel Hero Doré */}
          <div className="relative max-w-3xl mx-auto h-48 sm:h-64 rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl mt-6 bg-[#13151f]">
            <IllustrativeImage imageId="hero" className="w-full h-full" priority />
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID ASYMÉTRIQUE DES SITUATIONS D'URGENCE */}
      <section className="py-8 sm:py-10 border-b border-[#252836]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                Périmètre d&apos;expertise
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                Situations techniques prises en charge
              </h2>
            </div>
            <p className="text-xs text-[#828898] max-w-xs">
              Outillage de pointe et techniques fines préservant le cylindre quand la configuration le permet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Grande carte Bento vedette : Porte blindée / Effraction */}
            <div className="md:col-span-2 p-5 sm:p-6 rounded-2xl bg-[#13151f] border border-[#d4af37]/30 flex flex-col justify-between relative overflow-hidden group">
              <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-4 border border-[#252836] bg-[#0f1118]">
                <IllustrativeImage imageId="porte-blindee" className="w-full h-full" />
              </div>
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#d4af37]/10 text-[#f0d57e] text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Haute Sécurité &amp; Multipoints</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Portes blindées &amp; Sécurisation après effraction
                </h3>
                <p className="text-xs sm:text-sm text-[#9da3b4] leading-relaxed max-w-lg">
                  Mise en sécurité immédiate, fermetures provisoires d&apos;urgence, diagnostic de cylindre de sécurité et attestation détaillée conforme pour votre compagnie d&apos;assurance.
                </p>
              </div>

              <div className="pt-4 relative z-10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedSituation("Porte blindée");
                    const el = document.getElementById("devis-sombre");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-neutral-950 font-bold text-xs flex items-center gap-2 hover:bg-[#e2c26e] transition-colors cursor-pointer"
                >
                  <span>Pré-sélectionner ce cas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-[#828898] font-mono">Protocole A2P</span>
              </div>
            </div>

            {/* Carte satellite : Porte claquée */}
            <div className="p-5 rounded-2xl bg-[#13151f] border border-[#252836] hover:border-[#d4af37]/50 flex flex-col justify-between transition-colors">
              <div>
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3.5 border border-[#252836] bg-[#0f1118]">
                  <IllustrativeImage imageId="porte-claquee" className="w-full h-full" />
                </div>
                <span className="text-[10px] font-mono text-[#d4af37] uppercase">Technique fine</span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1">Porte claquée</h3>
                <p className="text-xs text-[#828898] mt-1.5 leading-relaxed">
                  Ouverture fine non destructive par radio/by-pass pour préserver votre mécanisme sans perçage.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedSituation("Porte claquée");
                  const el = document.getElementById("devis-sombre");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-3 pt-2.5 border-t border-[#252836] text-xs text-[#d4af37] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Choisir cette situation</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Autres cartes en grille inférieure */}
            {entreprise.services
              .filter((s) => s.confirmed && s.id !== "porte-blindee" && s.id !== "porte-claquee")
              .map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-xl bg-[#13151f] border border-[#252836] hover:border-[#d4af37]/40 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 border border-[#252836] bg-[#0f1118]">
                      <IllustrativeImage imageId={s.id} className="w-full h-full" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">{s.titre}</h3>
                    <p className="text-xs text-[#828898] mt-1 leading-relaxed">{s.descriptionCourte}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSituation(s.titre);
                      const el = document.getElementById("devis-sombre");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-3 pt-2 border-t border-[#252836] text-[11px] text-[#f0d57e] font-semibold flex items-center justify-between cursor-pointer"
                  >
                    <span>Sélectionner</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 3. DÉROULEMENT EN 3 TEMPS */}
      <ProcessEtapes />

      {/* 4. ZONE D'INTERVENTION */}
      <ZoneIntervention />

      {/* 5. AVIS CLIENTS (ILLUSTRATIFS) */}
      <AvisClients />

      {/* 6. FORMULAIRE EN COFFRET SOMBRE & OR */}
      <section id="devis-sombre" className="py-8 sm:py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              Transmission sécurisée
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              Demande d&apos;intervention rapide
            </h2>
          </div>

          <div className="p-0.5 rounded-2xl bg-gradient-to-b from-[#d4af37]/30 to-transparent">
            <div className="bg-[#10121b] rounded-2xl p-4 sm:p-6">
              <FormulaireDevis initialSituation={selectedSituation} showHeader={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
