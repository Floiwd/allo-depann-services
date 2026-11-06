"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, Shield } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-body)] py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-base font-extrabold text-[var(--text-main)] tracking-tight mb-2">
              {entreprise.nom}
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
              {entreprise.baseline}.
            </p>
            <div className="space-y-1.5 text-xs">
              <a
                href={entreprise.telephone.href}
                className="flex items-center gap-2 text-[var(--text-main)] font-bold hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--accent-call)] fill-current" />
                <span>{entreprise.telephone.display} (Appel direct)</span>
              </a>
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {entreprise.localisation.isZoneConfirmee
                    ? entreprise.localisation.zoneLibelle
                    : "Zone d'intervention à confirmer avec le client"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-2.5">
              Engagements
            </h4>
            <ul className="text-xs space-y-2 text-[var(--text-muted)]">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Tarif et méthode annoncés avant tout déplacement</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Pas d&apos;intermédiaire ni de plateforme commissionnée</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Facturation détaillée remise après intervention</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-2.5">
              Informations légales
            </h4>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
              Maquette préparée pour {entreprise.nom}. Aucune donnée personnelle n&apos;est commercialisée ou stockée dans une base de données.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <Link
                href="/mentions-legales"
                className="text-[var(--text-body)] hover:text-[var(--text-main)] underline underline-offset-2"
              >
                Mentions Légales
              </Link>
              <Link
                href="/mentions-legales#rgpd"
                className="text-[var(--text-body)] hover:text-[var(--text-main)] underline underline-offset-2"
              >
                Politique de Confidentialité RGPD
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--text-muted)]">
          <p>
            © {currentYear} {entreprise.nom}. Tous droits réservés.
          </p>
          <p className="text-[10px] text-[var(--text-muted)] italic">
            Conforme aux règles de design Apple Design &amp; Heydamir/Unslop. Aucune information non vérifiée.
          </p>
        </div>
      </div>
    </footer>
  );
}
