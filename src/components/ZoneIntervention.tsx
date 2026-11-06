"use client";

import React from "react";
import { MapPin, Phone, HelpCircle } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function ZoneIntervention() {
  const isConfirmee = entreprise.localisation.isZoneConfirmee;
  const villes = entreprise.localisation.villesDesservies;

  return (
    <section id="zone" className="py-8 sm:py-10 border-b border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full theme-badge text-xs font-semibold mb-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Secteur géographique</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-main)] mb-1">
            Zone d&apos;intervention
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Déplacements pour ouvertures de portes, dépannages et sécurisation.
          </p>
        </div>

        {isConfirmee && villes.length > 0 ? (
          <div className="theme-surface p-5 sm:p-6 border border-[var(--border-subtle)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              Communes prioritaires desservies :
            </p>
            <div className="flex flex-wrap gap-2">
              {villes.map((ville, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-md bg-[var(--bg-page)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-main)]"
                >
                  {ville}
                </span>
              ))}
            </div>
            {entreprise.localisation.rayonKm && (
              <p className="text-xs text-[var(--text-muted)] mt-3">
                Intervention dans un rayon de {entreprise.localisation.rayonKm} km autour de{" "}
                {entreprise.localisation.villeSiege}.
              </p>
            )}
          </div>
        ) : (
          <div className="theme-surface p-5 sm:p-6 border border-dashed border-[var(--border-strong)] text-center">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-page)] text-[var(--text-muted)] flex items-center justify-center mx-auto mb-2.5">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[var(--text-main)] mb-1">
              Liste des communes en cours de validation avec le client
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto mb-3 leading-relaxed">
              Pour respecter l&apos;exactitude des informations, aucune commune n&apos;est affichée avant confirmation officielle. Pour savoir si le dépanneur peut intervenir chez vous dans l&apos;immédiat :
            </p>
            <a
              href={entreprise.telephone.href}
              className="inline-flex items-center gap-2 px-4 py-2 theme-btn-call text-xs font-bold shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Demander confirmation au {entreprise.telephone.display}</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
