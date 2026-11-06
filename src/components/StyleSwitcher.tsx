"use client";

import React, { useState } from "react";
import { siteConfig, ThemeId } from "@/config/site";
import { useTheme } from "@/context/ThemeContext";
import { Palette, Check, X, Copy, CheckCheck, SlidersHorizontal, Sparkles } from "lucide-react";

export default function StyleSwitcher() {
  const { theme: currentTheme, setTheme, showSwitcher } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!showSwitcher) {
    return null;
  }

  const activeStyleInfo =
    siteConfig.stylesDisponibles.find((s) => s.id === currentTheme) || siteConfig.stylesDisponibles[0];

  const summaryText = `Bonjour Florian,

Concernant la maquette du site Allo Depann'Services, j'ai sélectionné la direction graphique suivante :

• Style retenu : ${activeStyleInfo.nom} (identifiant : ${activeStyleInfo.id})
• Ambiance : ${activeStyleInfo.ambiance}
• Description : ${activeStyleInfo.description}

Commentaire / Précisions complémentaires :
- La disposition des blocs et le positionnement du formulaire pour ce thème correspondent bien à mes attentes.
- Merci de m'indiquer la suite pour la validation finale.`;

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      {/* Bouton déclencheur flottant : en haut à droite sous le bandeau sur mobile, en bas à gauche sur desktop */}
      <div className="fixed top-14 right-3 md:top-auto md:bottom-6 md:left-4 z-30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Changer la direction visuelle et la disposition des blocs"
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full shadow-lg border border-neutral-300 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-900 dark:text-neutral-100 text-xs font-semibold hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <span
            className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-black/20"
            style={{ backgroundColor: activeStyleInfo.accentColor }}
          />
          <span className="hidden sm:inline">Style :</span>
          <span className="font-bold text-[11px] md:text-xs">{activeStyleInfo.nom}</span>
          <SlidersHorizontal className="w-3 h-3 md:w-3.5 md:h-3.5 text-neutral-500 ml-0.5" />
        </button>
      </div>

      {/* Panneau de sélection */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-3 md:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-5 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                  <h3 className="text-base font-bold tracking-tight">5 Directions & Dispositions de Blocs</h3>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Chaque direction modifie radicalement le positionnement des blocs, la hiérarchie et l&apos;ambiance.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                aria-label="Fermer le sélecteur"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 my-4">
              {siteConfig.stylesDisponibles.map((style) => {
                const isSelected = style.id === currentTheme;
                return (
                  <button
                    key={style.id}
                    onClick={() => {
                      setTheme(style.id);
                    }}
                    type="button"
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800/80 ring-2 ring-neutral-900 dark:ring-white"
                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 pt-0.5">
                      <div
                        className="w-5 h-5 rounded-full border border-black/15 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: style.accentColor }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-neutral-900 dark:text-white">
                          {style.nom}
                        </span>
                        {isSelected && (
                          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            Actif
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5 leading-relaxed">
                        {style.description}
                      </p>
                      <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 italic">
                        {style.ambiance}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setShowSummaryModal(true);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 active:scale-98 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Valider et envoyer ce style
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 underline cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="flex items-start justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <h4 className="text-base font-bold">Direction retenue pour votre site</h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Copiez ce texte pour me confirmer votre choix par email ou message.
                </p>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4">
              <textarea
                readOnly
                value={summaryText}
                rows={9}
                className="w-full text-xs font-mono p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-200 leading-relaxed resize-none focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={copySummary}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-4 h-4" />
                    Texte copié dans le presse-papier !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copier le résumé pour envoi
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
