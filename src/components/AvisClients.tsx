"use client";

import React, { useState, useRef } from "react";
import { Star, MessageSquarePlus, Info, CheckCircle2 } from "lucide-react";
import { avisClients, AvisClient } from "@/data/avis";
import { entreprise } from "@/data/entreprise";

export default function AvisClients() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Détecter l'élément actif lors du défilement tactile mobile
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), avisClients.length - 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section
      id="avis"
      className="py-12 sm:py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-page)] transition-colors"
      aria-label="Avis clients"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Bandeau d'en-tête sobre et transparent (sans aucune note chiffrée inventée) */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full theme-badge text-xs font-semibold">
            <Info className="w-3.5 h-3.5" />
            <span>Avis illustratifs, avis réels à venir</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
            Les avis de nos clients
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Par engagement de transparence, les cartes ci-dessous présentent la structure des retours d&apos;expérience. Les véritables témoignages certifiés seront publiés dès validation par nos clients.
          </p>
        </div>

        {/* Grille desktop / Carrousel mobile avec défilement tactile fluide */}
        <div className="relative">
          {/* Conteneur défilant tactile sur mobile & grille 3 colonnes sur desktop */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {avisClients.map((avis: AvisClient, idx: number) => (
              <article
                key={avis.id}
                className="theme-surface w-[85vw] sm:w-[360px] md:w-auto shrink-0 snap-center p-5 sm:p-6 border border-[var(--border-subtle)] flex flex-col justify-between shadow-xs transition-colors"
              >
                <div className="space-y-3.5">
                  {/* Étoiles & Badge de transparence */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Étoiles vectorielles : grisées si illustratif, dorées si réel */}
                    <div
                      className="flex items-center gap-1"
                      aria-label={
                        avis.isIllustrative
                          ? "Étoiles illustratives non notées"
                          : `Note de ${avis.note} sur 5`
                      }
                    >
                      {[...Array(5)].map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className={`w-4 h-4 ${
                            avis.isIllustrative
                              ? "text-neutral-300 dark:text-neutral-700 stroke-neutral-400 dark:stroke-neutral-600 fill-transparent"
                              : "text-amber-400 fill-amber-400"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    {/* Badge obligatoire si exemple illustratif */}
                    {avis.isIllustrative && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 select-none">
                        Exemple illustratif
                      </span>
                    )}
                  </div>

                  {/* Texte de l'avis ou gabarit neutre */}
                  <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed italic">
                    &laquo;&nbsp;{avis.texte}&nbsp;&raquo;
                  </p>
                </div>

                {/* Métadonnées de l'intervention : Auteur, Prestation, Date */}
                <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text-main)]">
                      {avis.prenom} {avis.initialeNom ? `${avis.initialeNom}.` : ""}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      {avis.mois}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span className="truncate max-w-[200px]">{avis.travaux}</span>
                    <span className="capitalize">{avis.source === "direct" ? "Retour client" : avis.source}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Points de navigation du carrousel sur mobile */}
          <div className="flex md:hidden items-center justify-center gap-2 pt-3">
            {avisClients.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Afficher l'avis ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  activeIndex === idx
                    ? "w-6 bg-[var(--text-main)]"
                    : "bg-[var(--border-strong)] hover:bg-[var(--text-muted)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bouton d'action « Laisser un avis » (affiché uniquement si le lien Google Review existe) */}
        {entreprise.googleReviewUrl && entreprise.googleReviewUrl.trim().length > 0 && (
          <div className="mt-8 text-center">
            <a
              href={entreprise.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg theme-btn-secondary text-xs font-semibold transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Laisser un avis sur Google</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Composant d'intégration discrète d'un extrait d'avis près du formulaire de devis.
 * Règle stricte : Ne s'affiche QUE lorsqu'un avis réel et autorisé existe.
 * Retourne null tant que tous les avis sont des exemples illustratifs.
 */
export function AvisCourtDevis() {
  const avisVerifie = avisClients.find(
    (a) => !a.isIllustrative && a.autorisationClient
  );

  if (!avisVerifie) {
    return null;
  }

  return (
    <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs flex items-start gap-2.5 mb-4">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
      <div>
        <p className="italic text-[var(--text-body)]">
          &laquo;&nbsp;{avisVerifie.texte}&nbsp;&raquo;
        </p>
        <p className="text-[10px] text-[var(--text-muted)] mt-1 font-semibold">
          — {avisVerifie.prenom} {avisVerifie.initialeNom ? `${avisVerifie.initialeNom}.` : ""} ({avisVerifie.travaux})
        </p>
      </div>
    </div>
  );
}
