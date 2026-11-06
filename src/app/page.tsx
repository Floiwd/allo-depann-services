"use client";

import React, { useState } from "react";
import MobileCallBar from "@/components/MobileCallBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SituationsUrgence from "@/components/SituationsUrgence";
import ProcessEtapes from "@/components/ProcessEtapes";
import ZoneIntervention from "@/components/ZoneIntervention";
import Reassurance from "@/components/Reassurance";
import FormulaireDevis from "@/components/FormulaireDevis";
import Footer from "@/components/Footer";
import StyleSwitcher from "@/components/StyleSwitcher";
import { entreprise } from "@/data/entreprise";

export default function Home() {
  const [selectedSituation, setSelectedSituation] = useState(
    entreprise.services[0]?.titre || "Porte claquée"
  );

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] transition-colors selection:bg-[var(--accent-call)] selection:text-[var(--accent-call-text)] pb-16 md:pb-0">
      <MobileCallBar />
      <Header />
      <main>
        <Hero />
        <SituationsUrgence onSelectSituation={(titre) => setSelectedSituation(titre)} />
        <ProcessEtapes />
        <ZoneIntervention />
        <Reassurance />
        <FormulaireDevis initialSituation={selectedSituation} />
      </main>
      <Footer />
      <StyleSwitcher />
    </div>
  );
}
