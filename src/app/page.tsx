"use client";

import React from "react";
import MobileCallBar from "@/components/MobileCallBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StyleSwitcher from "@/components/StyleSwitcher";
import { useTheme } from "@/context/ThemeContext";

import UrgenceLayout from "@/layouts/UrgenceLayout";
import SobreLayout from "@/layouts/SobreLayout";
import ModerneLayout from "@/layouts/ModerneLayout";
import SombreLayout from "@/layouts/SombreLayout";
import ChaleureuxLayout from "@/layouts/ChaleureuxLayout";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] transition-colors selection:bg-[var(--accent-call)] selection:text-[var(--accent-call-text)] pb-16 md:pb-0">
      {/* 1. Bandeau d'appel fixe en haut sur mobile */}
      <MobileCallBar />

      {/* 2. En-tête de navigation */}
      <Header />

      {/* 3. Dispositions de blocs radicalement différentes selon le style choisi */}
      <main>
        {theme === "urgence" && <UrgenceLayout />}
        {theme === "sobre" && <SobreLayout />}
        {theme === "moderne" && <ModerneLayout />}
        {theme === "sombre" && <SombreLayout />}
        {theme === "chaleureux" && <ChaleureuxLayout />}
      </main>

      {/* 4. Pied de page conforme */}
      <Footer />

      {/* 5. Sélecteur de styles flottant interactif */}
      <StyleSwitcher />
    </div>
  );
}
