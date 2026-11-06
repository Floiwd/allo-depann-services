"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { entreprise } from "@/data/entreprise";

interface SituationsUrgenceProps {
  onSelectSituation?: (situationTitre: string) => void;
}

export default function SituationsUrgence({ onSelectSituation }: SituationsUrgenceProps) {
  const servicesConfirmes = entreprise.services.filter((s) => s.confirmed);

  const handleSelect = (titre: string) => {
    if (onSelectSituation) {
      onSelectSituation(titre);
    }
    const formElement = document.getElementById("devis");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="urgences" className="py-12 md:py-18 border-b border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] mb-3">
            Situations d&apos;urgence courantes
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)]">
            Sélectionnez votre cas ci-dessous pour pré-remplir instantanément votre demande ou nous joindre directement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesConfirmes.map((service) => (
            <div
              key={service.id}
              className="theme-surface flex flex-col justify-between overflow-hidden border border-[var(--border-subtle)] p-5 transition-all group"
            >
              <div>
                <div className="relative w-full h-40 bg-[var(--bg-page)] rounded-lg overflow-hidden border border-[var(--border-subtle)] mb-4">
                  <Image
                    src={service.placeholderImage}
                    alt={`Schéma technique d'intervention : ${service.titre}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 right-2 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-surface)]/90 px-1.5 py-0.5 rounded">
                    Photo à confirmer
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-[var(--text-main)] tracking-tight">
                    {service.titre}
                  </h3>
                  <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                    Serrurerie
                  </span>
                </div>

                <p className="text-xs text-[var(--text-body)] leading-relaxed mb-3">
                  {service.descriptionCourte}
                </p>

                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed italic border-l-2 border-[var(--border-strong)] pl-2 mb-4">
                  {service.descriptionDetaillee}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleSelect(service.titre)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold theme-btn-secondary cursor-pointer"
                >
                  <span>Pré-remplir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={entreprise.telephone.href}
                  className="theme-btn-call p-2 flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label={`Appeler pour ${service.titre}`}
                  title="Appeler directement"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
