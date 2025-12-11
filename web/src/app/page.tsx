import Link from "next/link";

const highlights = [
  { title: "Cuisine de saison", text: "Carte courte, produits frais, plats du marché qui changent au fil des arrivages." },
  { title: "Bar convivial", text: "Cocktails maison, vins nature et bières locales servies dans une ambiance guinguette." },
  { title: "Groupes", text: "Privatisation partielle, grandes tablées et formules pour célébrer vos moments." },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-bg">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-12 -translate-y-16 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-10 translate-y-10 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-14 sm:px-10 sm:py-16">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Bistrot &amp; Bar · Paris 11e
            </p>
            <h1 className="font-logo text-5xl uppercase leading-[0.9] tracking-[0.12em] text-primary sm:text-6xl">
              La Guincheuse
            </h1>
            <p className="max-w-2xl text-base text-brand-text/80 sm:text-lg">
              Un bistrot vibrant et chaleureux pour boire un verre, dîner entre amis ou fêter un événement. Cuisine vivante, équipe aux petits soins et une carte qui met de bonne humeur.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/reservation"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-bg shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0"
              >
                Réserver une table
              </Link>
              <a
                href="mailto:contact@laguincheuse.fr"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                Nous écrire
              </a>
            </div>
          </div>
          <div className="relative mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border border-primary/15 bg-white/80 shadow-[0_18px_60px_rgba(20,20,20,0.12)] sm:mx-0 sm:h-56 sm:w-56">
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-primary/10" />
            <div className="relative flex items-center gap-3">
              <img src="/globe.svg" alt="" className="h-14 w-14 animate-clink-left opacity-90" />
              <img src="/globe.svg" alt="" className="h-14 w-14 animate-clink-right opacity-90" />
              <span className="absolute -top-3 right-0 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Santé !
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-6 rounded-2xl border border-brand-text/10 bg-card p-7 shadow-[0_18px_60px_rgba(20,20,20,0.08)] backdrop-blur sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="space-y-2">
              <p className="font-archivo text-xs uppercase tracking-[0.22em] text-primary/80">
                {item.title}
              </p>
              <p className="text-sm text-brand-text/80">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 sm:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-brand-text/10 bg-card p-7 shadow-[0_18px_60px_rgba(20,20,20,0.08)] backdrop-blur">
            <p className="font-archivo text-xs uppercase tracking-[0.22em] text-brand-text/70">
              Horaires
            </p>
            <div className="mt-4 grid gap-3 text-sm text-brand-text/80 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-primary">Midi</p>
                <p className="mt-1">Du mardi au vendredi · 12h00 — 14h30</p>
              </div>
              <div>
                <p className="font-semibold text-primary">Soir</p>
                <p className="mt-1">Du mardi au samedi · 18h00 — 00h30</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-brand-text/80">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                Happy hour 18h — 20h
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                Brunch le dimanche
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-text/10 bg-card p-7 shadow-[0_18px_60px_rgba(20,20,20,0.08)] backdrop-blur space-y-3">
            <p className="font-archivo text-xs uppercase tracking-[0.22em] text-brand-text/70">
              Contact
            </p>
            <div className="space-y-2 text-sm text-brand-text/80">
              <p>
                Téléphone :{" "}
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="tel:+33123456789"
                >
                  01 23 45 67 89
                </a>
              </p>
              <p>
                Email :{" "}
                <a
                  className="underline underline-offset-4 hover:text-primary"
                  href="mailto:contact@laguincheuse.fr"
                >
                  contact@laguincheuse.fr
                </a>
              </p>
              <p>Adresse : 12 rue de la Joie, 75011 Paris</p>
              <Link
                href="/reservation"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                Demander une réservation →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
