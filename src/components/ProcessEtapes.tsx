"use client";

import React from "react";
import { entreprise } from "@/data/entreprise";
import { PhoneCall, Calculator, Wrench } from "lucide-react";

export default function ProcessEtapes() {
  if (!entreprise.processus.confirmed) {
    return null;
  }

  const icons = [PhoneCall, Calculator, Wrench];

  return (
    <section id="processus" className="py-12 md:py-18 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-badge-text)]">
            Transparence &amp; Méthode
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] mt-1.5 mb-3">
            Comment ça se passe ?
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Un protocole clair et prévisible pour vous éviter toute mauvaise surprise en situation de stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {entreprise.processus.etapes.map((etape, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={etape.numero}
                className="theme-surface p-6 flex flex-col justify-between border border-[var(--border-subtle)] relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[var(--text-muted)] opacity-60 font-mono">
                      {etape.numero}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[var(--accent-badge-bg)] text-[var(--accent-badge-text)] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-main)] mb-2 tracking-tight">
                    {etape.titre}
                  </h3>

                  <p className="text-xs text-[var(--text-body)] leading-relaxed">
                    {etape.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
