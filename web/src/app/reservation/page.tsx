"use client";

import Link from "next/link";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

type ReservationForm = {
  fullName: string;
  phone: string;
  email: string;
  partySize: string;
  date: string;
  time: string;
  notes: string;
};

const lunchSlots = [
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
];
const dinnerSlots = [
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
];
const today = new Date();
const toIso = (date: Date) => date.toISOString().split("T")[0];
const getNextNonSunday = (date: Date) => {
  const next = new Date(date);
  while (next.getDay() === 0) {
    next.setDate(next.getDate() + 1);
  }
  return next;
};
const minBookableDate = toIso(getNextNonSunday(today));

export default function ReservationPage() {
  const [form, setForm] = useState<ReservationForm>({
    fullName: "",
    phone: "",
    email: "",
    partySize: "2",
    date: minBookableDate,
    time: dinnerSlots[3],
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [dateWarning, setDateWarning] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          payload?.error || "Impossible d'envoyer votre demande pour le moment."
        );
      }

      setStatus("success");
      setServerMessage(
        payload?.message ||
          "Merci ! Nous avons bien reçu votre demande. Un email de confirmation vient d'être envoyé."
      );
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'envoyer votre demande pour le moment."
      );
    }
  };

  const updateForm = (field: keyof ReservationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setServerMessage("");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#ECE3D0] text-[#161512]">
      <Header variant="opaque" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-8 h-52 w-52 rounded-full bg-[#DC3D00]/10 blur-3xl sm:left-6 sm:top-12" />
        <div className="absolute right-0 bottom-6 h-56 w-56 rounded-full bg-[#DC3D00]/15 blur-3xl sm:right-10 sm:bottom-10" />
      </div>

      <main className="font-geom relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-28 pb-14 lg:gap-12 lg:pt-32 lg:pb-20">
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#DC3D00] transition hover:-translate-y-0.5 hover:border-[#DC3D00]/50"
            >
              ← Accueil
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DC3D00] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#DC3D00]/20">
              Réservation
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-geom text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              <span className="text-[#161512]">Réservez votre</span>{" "}
              <span className="font-geom italic text-[#DC3D00]">table.</span>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-[#5B564D]">
              Une table conviviale, un service attentif. Réservez en ligne en quelques secondes et venez profiter
              de l’ambiance du bistrot.
            </p>
          </div>
        </header>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <section className="lg:col-span-7 rounded-[20px] border border-black/5 bg-white/80 p-6 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.3)] backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B564D]">
                  Formulaire
                </p>
              </div>
              <span className="rounded-full bg-[#DC3D00] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                 1 min
              </span>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Nom Prénom"
                  value={form.fullName}
                  onChange={(value) => updateForm("fullName", value)}
                  placeholder="Marie Dupont"
                  required
                />
                <FormField
                  label="Téléphone"
                  type="tel"
                  value={form.phone}
                  inputMode="tel"
                  onChange={(value) => updateForm("phone", value.replace(/\D/g, ""))}
                  placeholder="06 12 34 56 78"
                  required
                />
              </div>

              <FormField
                label="E-mail"
                type="email"
                value={form.email}
                onChange={(value) => updateForm("email", value)}
                placeholder="vous@email.fr"
                required
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  label="Personnes"
                  as="select"
                  value={form.partySize}
                  onChange={(value) => updateForm("partySize", value)}
                >
                  {Array.from({ length: 8 }, (_, i) => i + 2).map((size) => (
                    <option key={size} value={size}>
                      {size} personnes
                    </option>
                  ))}
                  <option value="10">10 personnes</option>
                </FormField>
                <FormField
                  label="Date"
                  type="date"
                  min={minBookableDate}
                  value={form.date}
                  onChange={(value) => {
                    const parsed = new Date(value);
                    if (!isNaN(parsed.getTime()) && parsed.getDay() === 0) {
                      const nextAvailable = toIso(getNextNonSunday(parsed));
                      updateForm("date", nextAvailable);
                      setDateWarning(
                        `Le bistrot est fermé le dimanche. Nous vous proposons le ${nextAvailable}.`
                      );
                      return;
                    }
                    updateForm("date", value);
                    setDateWarning("");
                  }}
                  required
                />
                <FormField
                  label="Heure"
                  as="select"
                  value={form.time}
                  onChange={(value) => updateForm("time", value)}
                >
                  <optgroup label="Déjeuner">
                    {lunchSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Dîner">
                    {dinnerSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </optgroup>
                </FormField>
              </div>
              {dateWarning && (
                <p className="text-xs font-semibold text-[#DC3D00]">{dateWarning}</p>
              )}

              <FormField
                label="Notes / Allergies"
                as="textarea"
                rows={4}
                value={form.notes}
                onChange={(value) => updateForm("notes", value)}
                placeholder="Précisez vos demandes : table en terrasse, allergie, occasion spéciale..."
              />

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#5B564D]">
                  En confirmant, vous acceptez nos conditions de réservation et la
                  politique d’annulation.
                </p>
                <div className="flex flex-col items-end gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DC3D00] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#DC3D00]/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Confirmer la réservation"}
                  </button>
                  {serverMessage && (
                    <span
                      className={`text-sm ${
                        status === "error" ? "text-[#DC3D00]" : "text-[#1E7A46]"
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      {serverMessage}
                    </span>
                  )}
                </div>
              </div>
            </form>

            {/* <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/70 p-4 ring-1 ring-black/5">
                <p className="font-semibold text-[#DC3D00]">Besoin d&apos;aide ?</p>
                <p className="mt-1 text-sm text-[#5B564D]">
                  Téléphone :{" "}
                  <a
                    className="underline underline-offset-4 transition hover:text-[#DC3D00]"
                    href="tel:+33956671472"
                  >
                    09 56 67 14 72
                  </a>
                </p>
                <p className="mt-1 text-sm text-[#5B564D]">
                  Email direct :{" "}
                  <a
                    className="underline underline-offset-4 transition hover:text-[#DC3D00]"
                    href="mailto:contact@laguincheuse.fr"
                  >
                    contact@laguincheuse.fr
                  </a>
                </p>
              </div>
            </div> */}
          </section>
          <section className="space-y-8 lg:col-span-5">
            <div className="space-y-4 rounded-2xl bg-white/70 p-5 ring-1 ring-black/5">
              <h2 className="font-geom text-2xl">Avant votre venue</h2>
              <ul className="space-y-3 text-[#5B564D]">
                <InfoItem
                  title="Service midi & soir"
                  description="Réservation ouverte pour le déjeuner et le dîner."
                />
                <InfoItem
                  title="Groupes jusqu’à 10"
                  description="Pour plus de 10 personnes, appelez-nous pour préparer votre arrivée."
                />
                <InfoItem
                  title="Allergies & demandes"
                  description="Précisez vos contraintes alimentaires, nous adapterons le menu."
                />
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B564D]">
                  Adresse
                </p>
                <a
                  href="https://www.google.com/maps?q=266+Rue+du+Faubourg+Saint-Martin+75010+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-semibold text-[#161512] underline-offset-4 hover:underline"
                >
                  266 Rue du Faubourg Saint-Martin
                </a>
                <p className="text-sm text-[#5B564D]">75010 Paris</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B564D]">
                  Contact
                </p>
                <a
                  className="mt-1 block font-semibold text-[#161512] underline-offset-4 hover:underline"
                  href="tel:+33956671472"
                >
                  09 56 67 14 72
                </a>
                <a
                  className="text-sm text-[#5B564D] underline-offset-4 hover:underline"
                  href="mailto:contact@laguincheuse.fr"
                >
                  contact@laguincheuse.fr
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5B564D]">
                Horaires
              </p>
              <div className="mt-2 flex flex-col gap-1 text-sm text-[#5B564D]">
                <p>Lundi - Jeudi : 10:30 - 22:30</p>
                <p>Vendredi et Samedi : 10:30 - 23:30</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InfoItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 h-2 w-2 rounded-full bg-[#DC3D00]" />
      <div className="space-y-1">
        <p className="font-semibold text-[#161512]">{title}</p>
        <p className="text-sm text-[#5B564D]">{description}</p>
      </div>
    </li>
  );
}

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  as?: "input" | "select" | "textarea";
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  min?: string;
  required?: boolean;
  rows?: number;
  pattern?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  children?: ReactNode;
};

function FormField({
  label,
  value,
  onChange,
  as = "input",
  type = "text",
  placeholder,
  min,
  required = false,
  rows,
  pattern,
  inputMode,
  children,
}: FormFieldProps) {
  const commonClasses =
    "w-full rounded-xl border border-black/10 bg-[#F5EEE0]/60 px-4 py-3 text-sm text-[#161512] placeholder:text-[#5B564D]/70 shadow-sm outline-none transition focus:border-[#DC3D00] focus:ring-2 focus:ring-[#DC3D00]/20";

  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-[#5B564D]">
      {label}
      {as === "textarea" ? (
        <textarea
          className={commonClasses}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : as === "select" ? (
        <select
          className={commonClasses}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {children}
        </select>
      ) : (
        <input
          className={commonClasses}
          type={type}
          value={value}
          min={min}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          inputMode={inputMode}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}
