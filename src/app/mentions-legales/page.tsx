import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, FileText } from "lucide-react";
import { entreprise } from "@/data/entreprise";

export const metadata = {
  title: `Mentions Légales & RGPD | ${entreprise.nom}`,
  description: `Mentions légales et politique de confidentialité du site vitrine d'urgence de serrurerie ${entreprise.nom}.`,
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l&apos;accueil</span>
        </Link>

        <div className="theme-surface p-6 sm:p-10 border border-[var(--border-subtle)] space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full theme-badge text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Conformité juridique</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] mb-2">
              Mentions Légales &amp; Confidentialité
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")} • Site vitrine {entreprise.nom}
            </p>
          </div>

          <section className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <h2 className="text-base font-bold text-[var(--text-main)]">
              1. Éditeur de la plateforme
            </h2>
            <div className="text-xs text-[var(--text-body)] leading-relaxed space-y-1.5">
              <p>
                <strong>Dénomination commerciale :</strong> {entreprise.nom}
              </p>
              <p>
                <strong>Activité :</strong> {entreprise.metier}
              </p>
              <p>
                <strong>Téléphone direct :</strong>{" "}
                <a href={entreprise.telephone.href} className="text-[var(--text-main)] font-semibold underline">
                  {entreprise.telephone.display}
                </a>
              </p>
              <p>
                <strong>Raison sociale légale :</strong>{" "}
                <span className="italic text-[var(--text-muted)]">
                  {entreprise.legal.formeJuridique || "[À CONFIRMER AVEC LE CLIENT : Statut juridique & dénomination]"}
                </span>
              </p>
              <p>
                <strong>Numéro SIRET :</strong>{" "}
                <span className="italic text-[var(--text-muted)]">
                  {entreprise.legal.siret || "[À CONFIRMER AVEC LE CLIENT : Numéro SIRET 14 chiffres]"}
                </span>
              </p>
              <p>
                <strong>Immatriculation :</strong>{" "}
                <span className="italic text-[var(--text-muted)]">
                  {entreprise.legal.rcsRm || "[À CONFIRMER AVEC LE CLIENT : Immatriculation RCS ou Répertoire des Métiers]"}
                </span>
              </p>
              <p>
                <strong>Siège social :</strong>{" "}
                <span className="italic text-[var(--text-muted)]">
                  {entreprise.legal.adressePostale || "[À CONFIRMER AVEC LE CLIENT : Adresse du siège social]"}
                </span>
              </p>
              <p>
                <strong>Assurance Responsabilité Civile Professionnelle :</strong>{" "}
                <span className="italic text-[var(--text-muted)]">
                  {entreprise.legal.assuranceDecennaleRc || "[À CONFIRMER AVEC LE CLIENT : Nom de la compagnie d'assurance]"}
                </span>
              </p>
            </div>
          </section>

          <section className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <h2 className="text-base font-bold text-[var(--text-main)]">
              2. Hébergement du site
            </h2>
            <div className="text-xs text-[var(--text-body)] leading-relaxed space-y-1">
              <p>
                <strong>Hébergeur :</strong> {entreprise.legal.hebergeur.nom}
              </p>
              <p>
                <strong>Adresse :</strong> {entreprise.legal.hebergeur.adresse}
              </p>
              <p>
                Plateforme d&apos;hébergement mondialement reconnue, assurant une disponibilité et une sécurité optimales conformes aux standards de l&apos;industrie.
              </p>
            </div>
          </section>

          <section id="rgpd" className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <h2 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>3. Politique de confidentialité &amp; RGPD</span>
            </h2>
            <div className="text-xs text-[var(--text-body)] leading-relaxed space-y-2">
              <p>
                Dans le cadre de l&apos;utilisation du formulaire de contact d&apos;urgence, les informations transmises (nom, numéro de téléphone, commune, situation de dépannage) sont recueillies dans l&apos;unique but de permettre au professionnel de vous rappeler immédiatement pour répondre à votre demande d&apos;intervention.
              </p>
              <div className="p-3 bg-[var(--bg-page)] rounded-md border border-[var(--border-subtle)] space-y-1">
                <p className="font-semibold text-[var(--text-main)]">Garanties de protection :</p>
                <ul className="list-disc list-inside space-y-0.5 text-[var(--text-muted)]">
                  <li>Aucune donnée n&apos;est stockée dans une base de données sur ce site.</li>
                  <li>Les données ne sont ni cédées, ni louées, ni revendues à des tiers.</li>
                  <li>Aucun tracker publicitaire ni cookie tiers intrusif n&apos;est déployé sur ce site.</li>
                </ul>
              </div>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés », vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, vous pouvez vous adresser directement par téléphone au {entreprise.telephone.display}.
              </p>
            </div>
          </section>

          <section className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <h2 className="text-base font-bold text-[var(--text-main)]">
              4. Transparence tarifaire et dépannage à domicile
            </h2>
            <div className="text-xs text-[var(--text-body)] leading-relaxed space-y-1.5 text-[var(--text-muted)]">
              <p>
                Conformément à l&apos;arrêté du 24 janvier 2017 relatif à la publicité des prix des prestations de dépannage, réparation et entretien dans le secteur du bâtiment et de l&apos;équipement de la maison :
              </p>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Le consommateur est informé des tarifs applicables préalablement à tout déplacement et à toute intervention.</li>
                <li>Un devis écrit préalable ou une confirmation détaillée est remis au client avant la réalisation des travaux.</li>
                <li>Une facture détaillée est systématiquement remise après intervention.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
