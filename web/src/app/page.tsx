import type { ReactNode } from "react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-6 h-36 w-36 rounded-full bg-primary/10 blur-3xl sm:left-16 sm:top-12" />
        <div className="absolute right-4 bottom-6 h-40 w-40 rounded-full bg-primary/15 blur-3xl sm:right-16 sm:bottom-10" />
      </div>

      <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12 pb-16 sm:px-8 sm:py-16">
        <header className="flex flex-col items-center text-center gap-3">
          <div className="relative mt-1 flex w-full max-w-xl justify-center">
            <WaveLine className="h-4 w-full text-primary" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="bg-brand-bg px-3 font-geom text-sm uppercase tracking-[0.2em] text-primary">
                Bistrot
              </span>
            </span>
          </div>
          <h1 className="mt-2 font-logo text-6xl uppercase leading-[0.9] tracking-[0.12em] text-primary sm:text-7xl md:text-8xl">
            La Guincheuse
          </h1>
          <WaveLine className="mt-1 h-4 w-full max-w-xl text-primary" />
          <p className="mt-2 max-w-2xl text-balance text-base text-brand-text/80 sm:text-lg">
            Site Web en Construction. En attendant, retrouvez nos informations
            ci-dessous.
          </p>
        </header>

        <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 font-geom">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-full border border-primary/15 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
              Infos pratiques
            </span>
            <p className="text-sm text-brand-text/75">
              Notre équipe vous accueille du déjeuner jusqu&apos;au dernier
              verre. Retrouvez les horaires, le téléphone et l&apos;adresse en
              un coup d&apos;œil.
            </p>
          </div>

          <div className="rounded-3xl border border-brand-text/15 bg-white p-8 text-center shadow-[0_22px_60px_rgba(20,20,20,0.08)]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoCard title="Horaires">
                Lundi - Jeudi : 10:30 - 14:30, 18:30 - 22:30
                <br />
                Vendredi et Samedi : 10:30 - 14:30, 18:30 - 00:00
              </InfoCard>
              <InfoCard title="Téléphone">
                <a
                  className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
                  href="tel:0956671472"
                >
                  <span aria-hidden>📞</span>
                  <span>09 56 67 14 72</span>
                </a>
              </InfoCard>
              <InfoCard title="Adresse">
                <a
                  className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
                  href="https://www.google.com/maps/search/?api=1&query=266+Rue+du+Faubourg+Saint-Martin,+75010+Paris"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden>📍</span>
                  <span>266 Rue du Faubourg Saint-Martin, 75010 Paris</span>
                </a>
                <br />
                M°2 / M°7 Stalingrad
              </InfoCard>
              <InfoCard title="Contact direct">
                <a
                  className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
                  href="mailto:guincheuse@gmail.com"
                >
                  <span aria-hidden>✉️</span>
                  <span>GUINCHEUSE@gmail.com</span>
                </a>
              </InfoCard>
            </div>
            <div className="mt-8 flex justify-center">
              <video
                src="/chinchin.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-70 w-full max-w-md rounded-xl object-cover"
                aria-label="Deux verres qui trinquent"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="mb-4 mt-auto flex flex-col items-center gap-4 px-4 text-center text-sm text-brand-text/80 sm:flex-row sm:justify-center sm:gap-6 sm:text-center sm:px-8 font-geom">
        <div className="flex items-center gap-3">
          <div>
            <p>© 2025 La Guincheuse. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-brand-text/10 bg-white/70 px-4 py-3 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-text/70">
        {title}
      </p>
      <p className="mt-2 text-sm text-brand-text/90">{children}</p>
    </div>
  );
}

function WaveLine({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 25"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 16 C10 8 20 8 30 16 S50 24 60 16 S80 8 90 16 S110 24 120 16 S140 8 150 16 S170 24 180 16 S200 8 210 16 S230 24 240 16 S260 8 270 16 S290 24 300 16 S320 8 330 16 S350 24 360 16 S380 8 390 16 S410 24 420 16 S440 8 450 16 S470 24 480 16 S500 8 510 16 S530 24 540 16 S560 8 570 16 S590 24 600 16"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
