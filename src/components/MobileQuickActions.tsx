"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, FileText } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function MobileQuickActions() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  if (isKeyboardOpen) {
    return null;
  }

  const smsUrl = `sms:${entreprise.telephone.raw}?body=${encodeURIComponent(
    "Bonjour, je vous contacte depuis votre site."
  )}`;

  const handleDevisClick = () => {
    const el = document.getElementById("devis");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Actions rapides d'appel et de contact mobile"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--bg-header)] backdrop-blur-lg border-t border-[var(--border-subtle)] shadow-2xl transition-transform duration-200"
      style={{
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="px-3 pt-2 pb-1.5 flex items-center justify-between gap-2 max-w-lg mx-auto">
        {/* 1. APPEL : Bouton prioritaire le plus grand et contrasté */}
        <a
          href={entreprise.telephone.href}
          aria-label={`Appeler au ${entreprise.telephone.display}`}
          className="flex-[2] min-h-[48px] theme-btn-call px-2.5 py-1.5 flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer whitespace-nowrap"
        >
          <Phone className="w-4 h-4 shrink-0 fill-current" />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">Appel direct</span>
            <span className="text-xs sm:text-sm font-black tracking-tight">{entreprise.telephone.display}</span>
          </div>
        </a>

        {/* 2. SMS : Lien sms: avec message pré-rempli */}
        <a
          href={smsUrl}
          aria-label={`Envoyer un SMS au ${entreprise.telephone.display}`}
          className="flex-1 min-h-[48px] theme-btn-secondary px-2.5 py-2.5 text-xs font-bold flex items-center justify-center gap-1 shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>SMS</span>
        </a>

        {/* 3. DEMANDE : Défilement fluide vers le formulaire */}
        <button
          type="button"
          onClick={handleDevisClick}
          aria-label="Faire défiler jusqu'au formulaire de demande"
          className="flex-1 min-h-[48px] theme-btn-secondary px-2.5 py-2.5 text-xs font-bold flex items-center justify-center gap-1 shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>Demande</span>
        </button>
      </div>
    </aside>
  );
}
