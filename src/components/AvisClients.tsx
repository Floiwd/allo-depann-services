"use client";

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Star,
  MessageSquarePlus,
  Info,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { avisClients, AvisClient } from "@/data/avis";
import { entreprise } from "@/data/entreprise";

export default function AvisClients() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const hasRealReviews = avisClients.some((a) => !a.isIllustrative);

  // Mettre à jour l'index actif et l'état des boutons lors du défilement
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const firstCard = scrollContainerRef.current.querySelector("article");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 16 : 320;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), avisClients.length - 1));
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const firstCard = scrollContainerRef.current.querySelector("article");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 16 : 320;
    scrollContainerRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const scrollPrev = () => {
    if (!scrollContainerRef.current) return;
    const firstCard = scrollContainerRef.current.querySelector("article");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 16 : 320;
    scrollContainerRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!scrollContainerRef.current) return;
    const firstCard = scrollContainerRef.current.querySelector("article");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 16 : 320;
    scrollContainerRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  return (
    <section
      id="avis"
      className="py-12 sm:py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-page)] transition-colors overflow-hidden"
      aria-label="Avis clients"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Bandeau d'en-tête */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 space-y-3">
          {hasRealReviews ? (
            <a
              href={entreprise.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold">5,0 / 5</span>
              <span>•</span>
              <span>338 avis Google vérifiés</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full theme-badge text-xs font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Avis illustratifs, avis réels à venir</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
            {hasRealReviews ? "Avis clients certifiés Google" : "Les avis de nos clients"}
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            {hasRealReviews
              ? "Témoignages authentiques déposés publiquement par nos clients sur notre fiche officielle Google Maps."
              : "Par engagement de transparence, les cartes ci-dessous présentent la structure des retours d'expérience. Les véritables témoignages certifiés seront publiés dès validation par nos clients."}
          </p>
        </div>

        {/* Contrôles de défilement (flèches droite / gauche) */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-1.5">
            <span>← Glissez ou défilez horizontalement →</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              aria-label="Avis précédent"
              className={`p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] transition-all cursor-pointer ${
                canScrollLeft
                  ? "hover:border-[var(--text-main)] hover:scale-105 active:scale-95"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-label="Avis suivant"
              className={`p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] transition-all cursor-pointer ${
                canScrollRight
                  ? "hover:border-[var(--text-main)] hover:scale-105 active:scale-95"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carrousel à défilement fluide et swipe tactile avec snap */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollState}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 -mx-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {avisClients.map((avis: AvisClient) => (
              <article
                key={avis.id}
                className="theme-surface w-[85vw] sm:w-[350px] md:w-[380px] shrink-0 snap-start p-5 sm:p-6 border border-[var(--border-subtle)] rounded-xl flex flex-col justify-between shadow-xs hover:border-[var(--border-strong)] transition-all select-none"
              >
                <div className="space-y-3.5">
                  {/* Étoiles & Badge de transparence */}
                  <div className="flex items-center justify-between gap-2">
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

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Avis Google vérifié
                    </span>
                  </div>

                  {/* Texte de l'avis */}
                  <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed italic line-clamp-6">
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
                    <span className="truncate max-w-[220px]">{avis.travaux}</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400">Google Maps</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Points de navigation cliquables */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {avisClients.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Afficher l'avis ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  activeIndex === idx
                    ? "w-7 bg-[var(--text-main)]"
                    : "w-2 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bouton d'action « Laisser un avis sur Google » */}
        {entreprise.googleReviewUrl && (
          <div className="mt-8 text-center">
            <a
              href={entreprise.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg theme-btn-secondary text-xs font-semibold transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Consulter la fiche ou laisser un avis sur Google</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Composant d'intégration discrète d'un extrait d'avis près du formulaire de devis.
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
        <p className="italic text-[var(--text-body)] line-clamp-3">
          &laquo;&nbsp;{avisVerifie.texte}&nbsp;&raquo;
        </p>
        <p className="text-[10px] text-[var(--text-muted)] mt-1 font-semibold">
          — {avisVerifie.prenom} {avisVerifie.initialeNom ? `${avisVerifie.initialeNom}.` : ""} ({avisVerifie.travaux})
        </p>
      </div>
    </div>
  );
}
