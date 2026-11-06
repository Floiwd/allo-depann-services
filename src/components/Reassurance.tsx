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
    <section className="py-12 md:py-16 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-badge-text)]">
            Transparence garantie
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] mt-1 mb-2">
            Des engagements stricts et vérifiés
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Pas de fausses promesses : nous appliquons les bonnes pratiques déontologiques de la profession.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pointsConfirmes.map((item) => {
            const Icon = iconsMap[item.id] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="theme-surface p-5 sm:p-6 border border-[var(--border-subtle)] flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-badge-bg)] text-[var(--accent-badge-text)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-main)] mb-1.5">
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
