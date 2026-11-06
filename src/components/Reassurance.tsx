"use client";

import React from "react";
import { ShieldCheck, Tag, FileText } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function Reassurance() {
  const pointsConfirmes = entreprise.reassurance.filter((r) => r.confirmed);

  if (pointsConfirmes.length === 0) return null;

  const iconsMap: Record<string, React.ElementType> = {
    "tarif-annonce": Tag,
    "contact-direct": ShieldCheck,
    "facture-conforme": FileText,
  };

  return (
    <section className="py-8 sm:py-10 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-badge-text)]">
            Transparence garantie
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-main)] mt-0.5 mb-1.5">
            Des engagements stricts et vérifiés
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Pas de fausses promesses : nous appliquons les bonnes pratiques déontologiques de la profession.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {pointsConfirmes.map((item) => {
            const Icon = iconsMap[item.id] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="theme-surface p-4 sm:p-5 border border-[var(--border-subtle)] flex flex-col justify-start"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-badge-bg)] text-[var(--accent-badge-text)] flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] mb-1">
                  {item.titre}
                </h3>
                <p className="text-xs text-[var(--text-body)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
