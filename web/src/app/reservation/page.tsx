"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type ReservationForm = {
  name: string;
  email: string;
  partySize: string;
  date: string;
  time: string;
  notes: string;
};

const lunchSlots = ["12:00", "12:30", "13:00", "13:30"];
const dinnerSlots = ["18:00", "18:30", "19:30", "20:30", "21:30"];
const todayIso = new Date().toISOString().split("T")[0];

export default function ReservationPage() {
  const [form, setForm] = useState<ReservationForm>({
    name: "",
    email: "",
    partySize: "2",
    date: todayIso,
    time: dinnerSlots[2],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mailtoLink = useMemo(() => {
    const subject = `Demande de réservation - ${form.name || "client"}`;
    const body = [
      "Bonjour La Guincheuse,",
      "",
      "Je souhaite réserver :",
      `- Nom : ${form.name || "non précisé"}`,
      `- Email : ${form.email || "non communiqué"}`,
      `- Nombre de personnes : ${form.partySize}`,
      `- Date : ${form.date}`,
      `- Créneau : ${form.time}`,
      `- Remarques : ${form.notes || "aucune"}`,
      "",
      "Merci de me confirmer la disponibilité.",
    ].join("\n");

    return `mailto:contact@laguincheuse.fr?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const updateForm = (field: keyof ReservationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-6 h-36 w-36 rounded-full bg-primary/10 blur-3xl sm:left-16 sm:top-12" />
        <div className="absolute right-4 bottom-6 h-40 w-40 rounded-full bg-primary/15 blur-3xl sm:right-16 sm:bottom-10" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition hover:-translate-y-0.5 hover:border-primary/40"
          >
            ← Accueil
          </Link>
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-brand-bg">
            Réservation
          </span>
        </div>

        <header className="flex flex-col items-center text-center gap-3">
          <div className="flex w-full items-center justify-center gap-4">
            <DecorativeLine direction="left" />
            <p className="font-archivo tracking-[0.3em] text-sm uppercase text-brand-text/80">
              Bistrot &amp; Bar
            </p>
            <DecorativeLine direction="right" />
          </div>
          <h1 className="mt-1 font-logo text-5xl uppercase leading-[0.9] tracking-[0.12em] text-primary sm:text-6xl">
            La Guincheuse
          </h1>
          <div className="flex w-full items-center justify-center">
            <DecorativeLine direction="left" />
            <DecorativeLine direction="right" />
          </div>
          <p className="mt-2 text-base text-brand-text/80 sm:text-lg">
            Choisissez votre créneau et envoyez un email prérempli. Nous vous
            confirmons la disponibilité dès réception.
          </p>
        </header>

        <section className="rounded-2xl border border-brand-text/10 bg-card p-7 shadow-[0_18px_60px_rgba(20,20,20,0.08)] backdrop-blur">
          <p className="font-archivo text-xs uppercase tracking-[0.2em] text-brand-text/70">
            Réservation par email
          </p>
          <p className="mt-3 text-sm text-brand-text/70">
            Remplissez les infos ci-dessous : nous ouvrons votre logiciel
            d&apos;email avec toutes les données. Relisez, envoyez, et attendez
            notre confirmation.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Nom"
                value={form.name}
                onChange={(value) => updateForm("name", value)}
                placeholder="Prénom Nom"
                required
              />
              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => updateForm("email", value)}
                placeholder="vous@email.fr"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                label="Personnes"
                as="select"
                value={form.partySize}
                onChange={(value) => updateForm("partySize", value)}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((size) => (
                  <option key={size} value={size}>
                    {size} {size === 1 ? "pers." : "pers."}
                  </option>
                ))}
              </FormField>
              <FormField
                label="Date"
                type="date"
                value={form.date}
                min={todayIso}
                onChange={(value) => updateForm("date", value)}
                required
              />
              <FormField
                label="Créneau"
                as="select"
                value={form.time}
                onChange={(value) => updateForm("time", value)}
              >
                <optgroup label="Service déjeuner">
                  {lunchSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Service du soir">
                  {dinnerSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </optgroup>
              </FormField>
            </div>

            <FormField
              label="Remarques (allergies, occasion…)"
              as="textarea"
              value={form.notes}
              onChange={(value) => updateForm("notes", value)}
              placeholder="Dites-nous en plus pour vous préparer le meilleur moment."
              rows={3}
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-bg shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0"
            >
              Envoyer la demande
            </button>
          </form>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-brand-text/10 bg-white/70 px-4 py-3 text-sm text-brand-text/80">
              <p className="font-semibold text-primary">Comment ça marche ?</p>
              <p className="mt-1">
                Nous ouvrons votre logiciel d&apos;email avec toutes les infos.
                Relisez et envoyez : vous recevrez la confirmation directement
                par retour d&apos;email.
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-2 py-1 font-semibold text-primary">
                  Sans serveur
                </span>
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href={mailtoLink}
                >
                  Ouvrir l&apos;email manuellement
                </a>
                {submitted && (
                  <span className="text-primary">Email prérempli lancé ✔︎</span>
                )}
              </div>
            </div>
            <div className="rounded-lg border border-brand-text/10 bg-white/70 px-4 py-3 text-sm text-brand-text/80">
              <p className="font-semibold text-primary">Besoin d&apos;aide ?</p>
              <p className="mt-1">
                Téléphone :{" "}
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="tel:+33123456789"
                >
                  01 23 45 67 89
                </a>
              </p>
              <p className="mt-1">
                Email direct :{" "}
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="mailto:contact@laguincheuse.fr"
                >
                  contact@laguincheuse.fr
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function DecorativeLine({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="h-2.5 w-32 text-brand-text/60 sm:w-44"
      fill="none"
      viewBox="0 0 200 10"
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "M0 5C10 15, 20 -5, 30 5C40 15, 50 -5, 60 5C70 15, 80 -5, 90 5C100 15, 110 -5, 120 5C130 15, 140 -5, 150 5C160 15, 170 -5, 180 5C190 15, 200 -5, 200 5"
            : "M0 5C10 -5, 20 15, 30 5C40 -5, 50 15, 60 5C70 -5, 80 15, 90 5C100 -5, 110 15, 120 5C130 -5, 140 15, 150 5C160 -5, 170 15, 180 5C190 -5, 200 15, 200 5"
        }
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}


type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  as?: "input" | "select" | "textarea";
  type?: string;
  placeholder?: string;
  min?: string;
  required?: boolean;
  rows?: number;
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
  children,
}: FormFieldProps) {
  const commonClasses =
    "w-full rounded-xl border border-brand-text/10 bg-white/80 px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/50 shadow-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-primary">
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
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}
