"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, HeartHandshake, CheckCircle2, MapPin, ArrowRight, Smile } from "lucide-react";
import { entreprise } from "@/data/entreprise";
import FormulaireDevis from "@/components/FormulaireDevis";
import ProcessEtapes from "@/components/ProcessEtapes";
import ZoneIntervention from "@/components/ZoneIntervention";

export default function ChaleureuxLayout() {
  const [selectedSituation, setSelectedSituation] = useState(entreprise.services[0]?.titre || "Porte claquée");

  const zoneAffichee = entreprise.localisation.isZoneConfirmee
    ? entreprise.localisation.zoneLibelle
    : "Secteur d'intervention en cours de confirmation";

  return (
    <div className="bg-[#fdfbf7] text-[#2b211a] space-y-0 selection:bg-[#c2410c] selection:text-white">
      
      {/* 1. HERO ARTISANAL CHALEUREUX & ARRONDIS */}
      <section className="pt-12 pb-18 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#f7efe4] rounded-3xl p-8 sm:p-14 border border-[#ebdcd0] relative overflow-hidden shadow-xs">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#fed7aa] text-[#9a3412] text-xs font-bold shadow-xs">
                <HeartHandshake className="w-4 h-4 text-[#c2410c]" />
                <span>Artisan serrurier de proximité • Dépannage sans stress</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2b211a] tracking-tight leading-tight">
                Une porte bloquée ?<br />
                <span className="text-[#c2410c]">On vous aide tout de suite.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#5c4a3e] leading-relaxed">
                Chez <strong className="text-[#2b211a]">{entreprise.nom}</strong>, nous savons qu&apos;être enfermé dehors est un moment stressant. Nous intervenons rapidement, avec le sourire et en vous donnant le prix exact avant de partir.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={entreprise.telephone.href}
                  className="px-6 py-4 rounded-full bg-[#c2410c] hover:bg-[#9a3412] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Appeler Florian au {entreprise.telephone.display}</span>
                </a>

                <a
                  href="#devis-chaleureux"
                  className="px-6 py-4 rounded-full bg-white hover:bg-neutral-50 text-[#2b211a] font-semibold text-xs border border-[#cbb4a3] flex items-center justify-center transition-all cursor-pointer"
                >
                  <span>M&apos;envoyer une demande</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-[#786457]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c2410c]" />
                  Prix annoncé au téléphone
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c2410c]" />
                  Direct avec l&apos;artisan
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c2410c]" />
                  Facture claire
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LE FONCTIONNEMENT MIS EN AVANT IMMÉDIATEMENT */}
      <section className="py-12 border-y border-[#ebdcd0] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c2410c]">
              Simple et serein
            </span>
            <h2 className="text-2xl font-extrabold text-[#2b211a] mt-1">
              Comment ça se passe avec nous ?
            </h2>
            <p className="text-xs text-[#786457] mt-1">
              3 étapes limpides, sans intermédiaire ni mauvaise surprise sur place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {entreprise.processus.etapes.map((etape) => (
              <div
                key={etape.numero}
                className="bg-[#fdfbf7] p-6 rounded-2xl border border-[#ebdcd0] space-y-3"
              >
                <span className="inline-block w-8 h-8 rounded-full bg-[#fed7aa] text-[#9a3412] font-black text-xs text-center leading-8">
                  {etape.numero}
                </span>
                <h3 className="text-sm font-bold text-[#2b211a]">{etape.titre}</h3>
                <p className="text-xs text-[#5c4a3e] leading-relaxed">{etape.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SITUATIONS D'URGENCE EN CARTES DOUCES */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c2410c]">
              À votre écoute
            </span>
            <h2 className="text-2xl font-extrabold text-[#2b211a] mt-1">
              Quel est votre souci de porte ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {entreprise.services.filter((s) => s.confirmed).map((s) => (
              <div
                key={s.id}
                className="bg-white p-6 rounded-3xl border border-[#ebdcd0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-[#f7efe4] border border-[#ebdcd0]">
                    <Image src={s.placeholderImage} alt={s.titre} fill className="object-contain p-2" />
                  </div>
                  <h3 className="text-base font-bold text-[#2b211a]">{s.titre}</h3>
                  <p className="text-xs text-[#5c4a3e] leading-relaxed">{s.descriptionCourte}</p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#f0e4d7] flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedSituation(s.titre);
                      const el = document.getElementById("devis-chaleureux");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-bold text-[#c2410c] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Choisir ce cas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={entreprise.telephone.href}
                    className="w-8 h-8 rounded-full bg-[#fed7aa] text-[#9a3412] flex items-center justify-center hover:bg-[#c2410c] hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOCUS ZONE LOCALE */}
      <ZoneIntervention />

      {/* 5. FORMULAIRE AMICAL ET ARRONDIS */}
      <section id="devis-chaleureux" className="py-14 bg-white border-t border-[#ebdcd0]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c2410c]">
              Contact humain et direct
            </span>
            <h2 className="text-2xl font-extrabold text-[#2b211a] mt-1">
              Laissez-nous vos coordonnées
            </h2>
            <p className="text-xs text-[#786457] mt-1">
              On vous rappelle dans les minutes qui suivent pour vous aider.
            </p>
          </div>

          <FormulaireDevis initialSituation={selectedSituation} />
        </div>
      </section>
    </div>
  );
}
