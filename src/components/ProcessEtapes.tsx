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
    <section id="processus" className="py-8 sm:py-10 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-badge-text)]">
            Transparence &amp; Méthode
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-main)] mt-0.5 mb-1.5">
            Comment ça se passe ?
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Un protocole clair et prévisible pour vous éviter toute mauvaise surprise en situation de stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 relative">
          {entreprise.processus.etapes.map((etape, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={etape.numero}
                className="theme-surface p-4 sm:p-5 flex flex-col justify-between border border-[var(--border-subtle)] relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-black text-[var(--text-muted)] opacity-60 font-mono">
                      {etape.numero}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-badge-bg)] text-[var(--accent-badge-text)] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--text-main)] mb-1.5 tracking-tight">
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
