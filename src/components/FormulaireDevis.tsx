"use client";

import React, { useState, useEffect } from "react";
import { Phone, Send, CheckCircle2, AlertCircle, Camera, Loader2, ArrowRight } from "lucide-react";
import { entreprise } from "@/data/entreprise";

interface FormulaireDevisProps {
  initialSituation?: string;
  showHeader?: boolean;
  className?: string;
}

export default function FormulaireDevis({
  initialSituation,
  showHeader = true,
  className = "",
}: FormulaireDevisProps) {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [commune, setCommune] = useState("");
  const [situation, setSituation] = useState(
    initialSituation || entreprise.services[0]?.titre || "Porte claquée"
  );
  const [urgence, setUrgence] = useState<"maintenant" | "aujourdhui" | "planifie">("maintenant");
  const [message, setMessage] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot anti-spam
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  useEffect(() => {
    if (initialSituation) {
      setSituation(initialSituation);
    }
  }, [initialSituation]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("La photo ne doit pas dépasser 5 Mo.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!telephone.trim()) {
      setErrorMsg("Veuillez renseigner votre numéro de téléphone afin que nous puissions vous recontacter.");
      return;
    }
    if (!commune.trim()) {
      setErrorMsg("Veuillez indiquer votre commune ou secteur géographique.");
      return;
    }
    if (!consentement) {
      setErrorMsg("Veuillez cocher la case autorisant le dépanneur à vous rappeler.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: nom.trim() || "Client en urgence",
          telephone: telephone.trim(),
          email: email.trim() || undefined,
          commune: commune.trim(),
          situation,
          urgence,
          message: message.trim() || undefined,
          consentement,
          website, // Honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'envoi.");
      }

      setSuccess(true);
      setSuccessInfo(data.message || "Votre demande a bien été transmise.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Impossible d'envoyer votre demande. Pour toute urgence, veuillez appeler le 06 99 77 32 36.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="devis" className={`w-full ${className}`}>
      {showHeader && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full theme-badge text-xs font-semibold mb-2">
            <span>Intervention rapide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] mb-1.5">
            Demander une intervention
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            Remplissage en moins de 10 secondes. Vous recevez un appel direct pour confirmation et tarif avant départ.
          </p>
        </div>
      )}

      {success ? (
        <div className="theme-surface p-6 sm:p-8 border border-emerald-500/30 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
            Demande bien reçue !
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-body)] mb-6 max-w-md mx-auto leading-relaxed">
            {successInfo} Le dépanneur prend connaissance de votre situation pour vous rappeler au plus vite.
          </p>

          <div className="pt-4 border-t border-[var(--border-subtle)]">
            <p className="text-xs text-[var(--text-muted)] mb-3">
              Vous êtes bloqué sur le palier ou le problème s&apos;aggrave ?
            </p>
            <a
              href={entreprise.telephone.href}
              className="theme-btn-call inline-flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-md cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Appeler directement le {entreprise.telephone.display}</span>
            </a>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="theme-surface p-5 sm:p-6 border border-[var(--border-subtle)] space-y-4"
        >
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Ne pas remplir ce champ si vous êtes humain</label>
            <input
              type="text"
              id="website"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{errorMsg}</p>
                <p className="mt-0.5 text-[11px] text-red-700 dark:text-red-300">
                  En cas de doute, joignez directement le {entreprise.telephone.display}.
                </p>
              </div>
            </div>
          )}

          {/* Degré d'urgence */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-1.5">
              Niveau d&apos;urgence *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "maintenant", label: "Urgent", sub: "Bloqué dehors" },
                { id: "aujourdhui", label: "Aujourd'hui", sub: "Dans la journée" },
                { id: "planifie", label: "Planifié", sub: "Sur RDV" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setUrgence(item.id as "maintenant" | "aujourdhui" | "planifie")}
                  className={`py-2 px-1 text-center rounded-lg border transition-all cursor-pointer ${
                    urgence === item.id
                      ? "border-[var(--text-main)] bg-[var(--bg-surface-elevated)] ring-1 ring-[var(--text-main)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-page)] opacity-75 hover:opacity-100"
                  }`}
                >
                  <span className="block text-xs font-bold text-[var(--text-main)]">
                    {item.label}
                  </span>
                  <span className="block text-[10px] text-[var(--text-muted)]">
                    {item.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Situation */}
          <div>
            <label
              htmlFor="situation"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-1"
            >
              Votre situation *
            </label>
            <select
              id="situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-strong)] text-[16px] sm:text-xs font-semibold text-[var(--text-main)] focus:outline-none focus:ring-1 focus:ring-[var(--text-main)] cursor-pointer"
            >
              {entreprise.services
                .filter((s) => s.confirmed)
                .map((s) => (
                  <option key={s.id} value={s.titre}>
                    {s.titre} — {s.descriptionCourte}
                  </option>
                ))}
              <option value="Autre demande de serrurerie">Autre demande de serrurerie</option>
            </select>
          </div>

          {/* Téléphone */}
          <div>
            <label
              htmlFor="telephone"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-1"
            >
              Numéro de téléphone *
            </label>
            <div className="relative">
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="next"
                id="telephone"
                required
                placeholder="06 XX XX XX XX"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full pl-9 pr-3 py-3 rounded-lg bg-[var(--bg-page)] border-2 border-[var(--border-strong)] text-[16px] sm:text-sm font-bold text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-main)]"
              />
              <Phone className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Numéro utilisé uniquement pour vous rappeler et confirmer le tarif.
            </p>
          </div>

          {/* Nom & Commune */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="nom"
                className="block text-xs font-medium text-[var(--text-main)] mb-1"
              >
                Votre nom ou prénom
              </label>
              <input
                type="text"
                autoComplete="name"
                enterKeyHint="next"
                id="nom"
                placeholder="Ex : Dupont"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[16px] sm:text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]"
              />
            </div>

            <div>
              <label
                htmlFor="commune"
                className="block text-xs font-bold text-[var(--text-main)] mb-1"
              >
                Commune / Ville *
              </label>
              <input
                type="text"
                autoComplete="address-level2"
                enterKeyHint="next"
                id="commune"
                required
                placeholder="Ex : Votre ville"
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-strong)] text-[16px] sm:text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]"
              />
            </div>
          </div>

          {/* Email facultatif */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[var(--text-muted)] mb-1"
            >
              Email (facultatif, pour recevoir la confirmation écrite)
            </label>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              enterKeyHint="next"
              id="email"
              placeholder="Ex : contact@exemple.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[16px] sm:text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]"
            />
          </div>

          {/* Précisions facultatives */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-[var(--text-muted)] mb-1"
            >
              Précisions (étage, modèle de clé ou serrure si connu...)
            </label>
            <input
              type="text"
              enterKeyHint="done"
              id="message"
              placeholder="Facultatif : digicode, étage..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[16px] sm:text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--text-main)]"
            />
          </div>

          {/* Photo facultative : accepte l'appareil photo directement */}
          <div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-page)] border border-dashed border-[var(--border-strong)] text-[16px] sm:text-xs text-[var(--text-main)] hover:bg-[var(--bg-surface-elevated)] cursor-pointer transition-colors min-h-[44px]">
                <Camera className="w-4 h-4 text-[var(--text-muted)]" />
                <span>Prendre ou joindre photo serrure (facultatif)</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>

              {photoPreview && (
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreview}
                    alt="Aperçu"
                    className="w-8 h-8 rounded object-cover border border-[var(--border-strong)]"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="text-xs text-red-600 underline cursor-pointer"
                  >
                    Effacer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Consentement */}
          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consentement}
                onChange={(e) => setConsentement(e.target.checked)}
                className="mt-0.5 rounded border-[var(--border-strong)] text-[var(--accent-call)] focus:ring-[var(--accent-call)]"
              />
              <span className="text-[11px] text-[var(--text-muted)] leading-tight">
                J&apos;accepte d&apos;être rappelé(e) au téléphone par {entreprise.nom} pour mon dépannage.
              </span>
            </label>
          </div>

          {/* Bouton Envoyer */}
          <button
            type="submit"
            disabled={loading}
            className="w-full theme-btn-call py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Envoi...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer ma demande de rappel</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
