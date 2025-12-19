import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = Number(process.env.RESERVATION_RATE_LIMIT_MS ?? 60_000);
const globalRateLimit =
  (globalThis as unknown as { __reservationRateLimit?: Map<string, number> })
    .__reservationRateLimit ?? new Map<string, number>();

if (!(globalThis as unknown as { __reservationRateLimit?: Map<string, number> })
  .__reservationRateLimit) {
  (globalThis as unknown as { __reservationRateLimit: Map<string, number> }).__reservationRateLimit =
    globalRateLimit;
}

type ReservationPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  partySize?: string;
  date?: string;
  time?: string;
  notes?: string;
};

const accentColor = "#DC3D00";
const backgroundColor = "#F6F0E2";
const textColor = "#161512";
const mutedColor = "#5B564D";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildHtmlEmail = (data: Required<ReservationPayload>) => {
  const notes = data.notes.trim() || "Aucune précision pour le moment.";
  const safeNotes = escapeHtml(notes).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmation de demande - La Guincheuse</title>
  </head>
  <body style="margin:0;padding:0;background:${backgroundColor};color:${textColor};font-family:'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${backgroundColor};padding:28px 0;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:18px;box-shadow:0 18px 45px rgba(0,0,0,0.08);overflow:hidden;">
            <tr>
              <td style="background:${accentColor};color:#ffffff;padding:24px 32px;text-align:left;">
                <div style="font-size:13px;letter-spacing:0.24em;text-transform:uppercase;font-weight:700;opacity:0.92;">La Guincheuse</div>
                <div style="font-size:24px;font-weight:800;letter-spacing:0.04em;margin-top:6px;">Merci pour votre demande</div>
                <div style="margin-top:6px;font-size:14px;opacity:0.9;">Nous accusons réception et revenons vers vous très vite.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 12px 32px;">
                <p style="margin:0 0 12px 0;font-size:16px;line-height:26px;color:${textColor};">
                  Bonjour ${escapeHtml(data.fullName)},
                </p>
                <p style="margin:0 0 16px 0;font-size:15px;line-height:24px;color:${mutedColor};">
                  Merci pour votre demande de réservation à La Guincheuse. Nous l'avons bien reçue et nous vous
                  contactons prochainement pour confirmer la disponibilité du créneau souhaité.
                </p>
                <div style="margin:18px 0 10px 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${mutedColor};">
                  Récapitulatif
                </div>
                <table cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse:collapse;border-radius:14px;overflow:hidden;background:${backgroundColor};">
                  <tr>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;"><strong style="color:${textColor};">Date</strong></td>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;color:${textColor};">${escapeHtml(
                      data.date
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;"><strong style="color:${textColor};">Heure</strong></td>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;color:${textColor};">${escapeHtml(
                      data.time
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;"><strong style="color:${textColor};">Personnes</strong></td>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;color:${textColor};">${escapeHtml(
                      data.partySize
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;"><strong style="color:${textColor};">Téléphone</strong></td>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;color:${textColor};">${escapeHtml(
                      data.phone
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;"><strong style="color:${textColor};">E-mail</strong></td>
                    <td style="padding:14px 16px;border-bottom:1px solid #e6dcc5;color:${textColor};">${escapeHtml(
                      data.email
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;"><strong style="color:${textColor};">Notes</strong></td>
                    <td style="padding:14px 16px;color:${textColor};">${safeNotes}</td>
                  </tr>
                </table>
                <div style="margin:18px 0 8px 0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${mutedColor};">
                  English recap
                </div>
                <p style="margin:0 0 12px 0;font-size:15px;line-height:24px;color:${mutedColor};">
                  Hello ${escapeHtml(data.fullName)}, thank you for your booking request. We've received it and will confirm availability shortly.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px 26px 32px;background:${backgroundColor};color:${textColor};">
                <div style="padding:14px 16px;border-radius:14px;background:#ffffff;border:1px solid #e6dcc5;">
                  <div style="font-size:14px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;margin-bottom:6px;color:${textColor};">
                    Besoin d'aide ?
                  </div>
                  <div style="font-size:14px;line-height:22px;color:${mutedColor};">
                    Répondez directement à cet email ou contactez-nous au <a href="tel:+33956671472" style="color:${accentColor};text-decoration:none;font-weight:700;">09 56 67 14 72</a>.
                  </div>
                </div>
                <p style="margin:14px 0 0 0;font-size:12px;color:${mutedColor};line-height:20px;">
                  La Guincheuse · 266 Rue du Faubourg Saint-Martin, 75010 Paris
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

const buildTextEmail = (data: Required<ReservationPayload>) => {
  const notes = data.notes.trim() || "Aucune précision pour le moment.";
  return [
    `Bonjour ${data.fullName},`,
    "",
    "Merci pour votre demande de réservation à La Guincheuse. Nous l'avons bien reçue et revenons rapidement vers vous pour confirmer la disponibilité.",
    "",
    "Récapitulatif :",
    `- Date : ${data.date}`,
    `- Heure : ${data.time}`,
    `- Personnes : ${data.partySize}`,
    `- Téléphone : ${data.phone}`,
    `- E-mail : ${data.email}`,
    `- Notes : ${notes}`,
    "",
    "English recap:",
    `Hello ${data.fullName}, thank you for your booking request. We've received it and will confirm availability shortly.`,
    "",
    "La Guincheuse",
    "266 Rue du Faubourg Saint-Martin, 75010 Paris",
  ].join("\n");
};

const validatePayload = (data: ReservationPayload) => {
  if (!data.email || !data.fullName || !data.date || !data.time || !data.partySize) {
    return "Merci de remplir tous les champs obligatoires.";
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return "L'adresse e-mail n'est pas valide.";
  }
  return null;
};

export async function POST(request: Request) {
  let body: ReservationPayload;

  try {
    body = (await request.json()) as ReservationPayload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const validationError = validatePayload(body);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const rateKey = `${clientIp}:${body.email}`;
  const now = Date.now();
  const lastAttempt = globalRateLimit.get(rateKey);

  if (lastAttempt && now - lastAttempt < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      {
        error:
          "Merci d'attendre un peu avant de renvoyer une nouvelle demande. Si besoin, contactez-nous par téléphone.",
      },
      { status: 429 }
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromAddress = process.env.EMAIL_FROM || "contact@laguincheuse.fr";

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    return NextResponse.json(
      {
        error:
          "Configuration SMTP manquante côté serveur. Merci de compléter les variables d'environnement.",
      },
      { status: 500 }
    );
  }

  const reservation: Required<ReservationPayload> = {
    fullName: body.fullName?.trim() || "Client",
    phone: body.phone?.trim() || "Non communiqué",
    email: body.email!.trim(),
    partySize: body.partySize || "2",
    date: body.date!,
    time: body.time!,
    notes: body.notes || "",
  };

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: [reservation.email, fromAddress],
      subject: "La Guincheuse - Confirmation de demande de réservation",
      html: buildHtmlEmail(reservation),
      text: buildTextEmail(reservation),
      replyTo: reservation.email,
    });

    globalRateLimit.set(rateKey, now);

    return NextResponse.json({
      message:
        "Votre demande est bien envoyée. Un email de confirmation vient d'être adressé à votre boîte mail.",
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email de réservation:", error);
    return NextResponse.json(
      {
        error:
          "Impossible d'envoyer l'email pour le moment. Merci de réessayer ou de nous contacter par téléphone.",
      },
      { status: 500 }
    );
  }
}
