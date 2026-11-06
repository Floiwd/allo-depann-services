import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map<string, { count: number; firstRequestTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestHistory.get(ip);

  if (ipRequestHistory.size > 2000) {
    for (const [storedIp, data] of ipRequestHistory.entries()) {
      if (now - data.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
        ipRequestHistory.delete(storedIp);
      }
    }
  }

  if (!record) {
    ipRequestHistory.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }

  if (now - record.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    ipRequestHistory.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

const devisSchema = z.object({
  nom: z
    .string()
    .min(2, "Veuillez renseigner votre nom (au moins 2 caractères).")
    .max(100, "Nom trop long.")
    .trim(),
  telephone: z
    .string()
    .min(10, "Veuillez renseigner un numéro de téléphone valide à 10 chiffres.")
    .max(20, "Numéro de téléphone invalide.")
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Format de téléphone français invalide."),
  email: z
    .string()
    .email("Adresse email invalide.")
    .optional()
    .or(z.literal("")),
  commune: z
    .string()
    .min(2, "Veuillez indiquer votre commune ou code postal.")
    .max(100)
    .trim(),
  situation: z
    .string()
    .min(2, "Veuillez sélectionner la situation d'urgence rencontrée.")
    .max(100),
  urgence: z.enum(["maintenant", "aujourdhui", "planifie"], {
    error: "Veuillez préciser le degré d'urgence.",
  }),
  message: z.string().max(1000, "Message trop long.").optional().or(z.literal("")),
  consentement: z.literal(true, {
    error: "Vous devez accepter le traitement de vos coordonnées pour être recontacté.",
  }),
  website: z.string().max(0, "Tentative de spam détectée.").optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Trop de demandes envoyées depuis votre connexion. Pour une urgence immédiate, veuillez appeler directement le 06 99 77 32 36.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const validation = devisSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Données du formulaire invalides.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { nom, telephone, email, commune, situation, urgence, message } = validation.data;

    const urgenceLabel =
      urgence === "maintenant"
        ? "URGENT — Bloqué dehors / Intervention immédiate"
        : urgence === "aujourdhui"
        ? "Dans la journée"
        : "Planifié / Sur rendez-vous";

    const objetEmail = `Demande d'intervention : ${situation} à ${commune}`;

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!resendApiKey || !toEmail) {
      console.warn(
        `[Mode Maquette Allo Depann'Services] Clé RESEND_API_KEY ou CONTACT_TO_EMAIL non configuré. Demande reçue :`,
        { nom, telephone, email, commune, situation, urgence, message }
      );

      return NextResponse.json({
        success: true,
        mode: "simulation",
        message:
          "Votre demande a bien été prise en compte dans la maquette. En production, un email sera immédiatement transmis avec vos coordonnées.",
      });
    }

    const resend = new Resend(resendApiKey);

    const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${objetEmail}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #0f172a;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
    <div style="background-color: #0f172a; padding: 18px 24px; color: #ffffff;">
      <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8;">Allo Depann'Services • Nouvelle demande d'intervention</p>
      <h1 style="margin: 6px 0 0; font-size: 20px; font-weight: 700; color: #ffffff;">${situation} à ${commune}</h1>
    </div>

    <div style="background-color: #fef2f2; border-bottom: 2px solid #fecaca; padding: 20px 24px; text-align: center;">
      <p style="margin: 0 0 10px; font-size: 13px; font-weight: 600; color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em;">
        Numéro direct du demandeur :
      </p>
      <a href="tel:${telephone.replace(/\s+/g, "")}" style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; font-size: 22px; font-weight: 800; padding: 14px 28px; border-radius: 6px; letter-spacing: 0.02em;">
        Appeler : ${telephone}
      </a>
      <p style="margin: 8px 0 0; font-size: 12px; color: #64748b;">(Cliquer pour lancer l'appel directement depuis votre smartphone)</p>
    </div>

    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b; width: 140px; font-weight: 600;">Nom du client :</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">${nom}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Commune / Lieu :</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${commune}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Situation :</td>
          <td style="padding: 10px 0; color: #dc2626; font-weight: 700;">${situation}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Degré d'urgence :</td>
          <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${urgenceLabel}</td>
        </tr>
        ${
          email
            ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email :</td>
                <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #0284c7;">${email}</a></td>
              </tr>`
            : ""
        }
      </table>

      ${
        message
          ? `<div style="margin-top: 20px; background-color: #f8fafc; border-left: 3px solid #cbd5e1; padding: 12px 16px; border-radius: 4px;">
              <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b;">Précisions du client :</p>
              <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message}</p>
            </div>`
          : ""
      }
    </div>

    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 24px; font-size: 12px; color: #94a3b8; text-align: center;">
      Message généré automatiquement depuis le formulaire web d'Allo Depann'Services.<br>
      Aucune donnée n'a été conservée en base de données conformément au RGPD.
    </div>
  </div>
</body>
</html>
    `;

    const emailText = `NOUVELLE DEMANDE D'INTERVENTION — ALLO DEPANN'SERVICES

CLIENT : ${nom}
TÉLÉPHONE : ${telephone}
COMMUNE : ${commune}
SITUATION : ${situation}
URGENCE : ${urgenceLabel}
${email ? `EMAIL : ${email}\n` : ""}${message ? `PRÉCISIONS : ${message}\n` : ""}
Message généré automatiquement depuis le formulaire web d'Allo Depann'Services sans stockage en base.`;

    const fromAddress = process.env.RESEND_FROM_EMAIL || "Allo Depann'Services <onboarding@resend.dev>";

    await resend.emails.send({
      from: fromAddress,
      to: toEmail,
      replyTo: email && email.trim() !== "" ? email : undefined,
      subject: objetEmail,
      html: emailHtml,
      text: emailText,
    });

    return NextResponse.json({
      success: true,
      message: "Votre demande a été transmise. Vous allez être recontacté rapidement par téléphone.",
    });
  } catch (err: unknown) {
    console.error("Erreur lors du traitement de la demande de devis :", err);
    return NextResponse.json(
      {
        error:
          "Une erreur technique est survenue lors de l'envoi. Pour toute urgence, veuillez joindre directement le 06 99 77 32 36.",
      },
      { status: 500 }
    );
  }
}
