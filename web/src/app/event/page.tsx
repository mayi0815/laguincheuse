import Image from "next/image";
import Link from "next/link";

import { getEvents, type EventItem } from "@/lib/events";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const runtime = "nodejs";

const PARIS_TIMEZONE = "Europe/Paris";

const MONTH_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  month: "short",
  timeZone: PARIS_TIMEZONE,
});
const DAY_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  timeZone: PARIS_TIMEZONE,
});
const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  timeZone: PARIS_TIMEZONE,
});
const TIME_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: PARIS_TIMEZONE,
});

const SAMPLE_EVENT: EventItem = {
  id: "fallback-nawal-michel-2025-12-19",
  title: "Pablo Lopez-Nussa",
  start: "2025-12-23T21:00:00.000Z",
  end: "2025-12-23T22:30:00.000Z",
  type: "guitare",
  desc: "Musique Cubaine: La musique de Pablo est intimiste à la fois douce et mélodieuse, rythmique et joyeuse, avec un répertoire concocté pour chaque occasion…",
  image: "/common/event_example.webp",
  imgalt: "guitare-chanteur",
};

const fallbackEvents: EventItem[] = [
  {
    id: "fallback-sophie-2025-10-21",
    title: "Sophie & The Piano",
    start: "2025-10-21T19:00:00.000Z",
    end: "2025-10-21T21:00:00.000Z",
    type: "Chanson Française",
    desc: "Une voix feutrée et un piano délicat pour revisiter les grands classiques : Piaf, Gainsbourg, mais aussi quelques surprises.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDG417HoH-jD_OikFRbRCD4NYBTfswsS27jZ8BpK3XwCNi87P3kUkfhZmp4-4iwinDzV1j4L963tW0IF5vCMfczFZi-xnGzNJYz3KwfXk19LBeoylcMM5LPvUKDr3jXDEKwmMA2E2DHeG0k55OeRliGPyI6UiObgTg2FbvfwKy8dI6I1h5ogvcrjMjKGcMAk6e6dWypd5WcEPwoDvBVl9LpivKQWk3RgyTSclPEifANePOoa_lFelPH0DGMhqoWZK9XsO94KUsuPRG1",
    imgalt: "Chanteuse au micro sur scène intimiste",
  },
  {
    id: "fallback-midnight-blues-2025-10-28",
    title: "The Midnight Blues",
    start: "2025-10-28T20:00:00.000Z",
    end: "2025-10-28T22:00:00.000Z",
    type: "Blues Rock",
    desc: "Une énergie brute venue de Chicago : riffs électriques, voix grave et solos qui font vibrer le comptoir jusque tard.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNAn36tw14uNWmAYB20fmc8g1DG5eeV9eHMajDK-hJ2MNisER1b2S-PsZ6TkHqLBeONHI5HaZO3iTn3imLMx3UeoTRyxb4i-uC6W__R9PCZUuZDzFlKU1clPOoyAcssUi5jgThUIZ6DBS-l0q_lIFLhZ3JnFZxVEwLjq7rP_xT0vhEfKuhWuA7BAtJL05OTYebflP2pIRwTnNxg3jnGbmkKgAHUMqQXBJZionvDGH9II04X0vAd1Goe_Uu7nhQC6oTIYPUsDF8LCii",
    imgalt: "Ambiance de club blues avec lumière tamisée",
  },
  {
    id: "fallback-le-jazz-hot-2025-11-04",
    title: "Le Jazz Hot",
    start: "2025-11-04T19:30:00.000Z",
    end: "2025-11-04T21:30:00.000Z",
    type: "Swing",
    desc: "Prêts à danser ? Un set swing incandescent, cuivres brillants et cadence soutenue pour une soirée tout feu tout flamme.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDE4fM9tz7v9wbsjDHhIQWftHRLG8X05NJNC8h-rGXhgmWhwuHmMijiaQA1Vk3Sh2QA37tJEP6WlMXE1o_uI4HyubxdO-lA6KB91PDaALdqRuVhuVrVVUaML7om_sxKlCrRoFIQ_eZTz7VOEF2CgHtJiiUE6JmAit-M5LLRZYpnlIVYgd_Pzx8haStwGVRZOorVen6-BCV8FIduFZjiXVJCuADB5U6NnFwRdjNUa9KaJzDMbl1BXWbaGjD2eIe64mhpwAcL01eit3rX",
    imgalt: "Silhouette d'un saxophoniste sur scène",
  },
];

export default async function EventPage() {
  let events: EventItem[] = [];
  let loadError: string | null = null;

  try {
    events = await getEvents();
  } catch (error) {
    console.error("Failed to load events from ICS", error);
    loadError = "Impossible de charger le calendrier pour le moment. Programme indicatif affiché en attendant.";
  }

  const hasLiveEvents = events.length > 0;
  const baseEvents = hasLiveEvents ? events : loadError ? fallbackEvents : [];
  const eventsToDisplay = mergeWithSampleEvent(baseEvents, SAMPLE_EVENT);

  return (
    <div className="relative min-h-screen bg-[#EFE6D5] text-[#111]">
      <Header variant="opaque" />

      <main className="relative mx-auto max-w-6xl px-6 pb-28 pt-24 md:pb-32 md:pt-32">
        <header className="mb-8 space-y-5 md:mb-12 md:text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span>Live Music</span>
          </div>
          <h1 className="font-geom text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-[#111] md:text-7xl">
            Concerts<span className="text-primary">.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#3c362f] md:text-xl">
            Concerts intimistes chaque semaine : jazz, swing, chanson française et invités surprises.
            Ambiance chaleureuse, <strong>entrée libre</strong>, service continu au bar comme en salle.
          </p>
        </header>

        {loadError ? (
          <div className="mb-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary shadow-sm">
            {loadError}
          </div>
        ) : null}

        <section className="overflow-hidden rounded-2xl border border-[#d8caa5] bg-white/50 shadow-[0_26px_120px_-70px_rgba(0,0,0,0.55)] backdrop-blur-sm">
          {eventsToDisplay.length === 0 ? (
            <div className="px-6 py-12 text-center text-[#4d433b]">
              Aucun concert n&apos;est planifié pour le moment. Repassez très bientôt.
            </div>
          ) : (
            <div className="divide-y divide-[#d8caa5]/90">
              {eventsToDisplay.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <Link
        href="/reservation"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
      >
        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
        Réserver
      </Link>
    </div>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const { month, day, weekday, time, range } = formatEventDate(startDate, endDate);
  const description = clampDescription(event.desc);
  const canUseOptimizedImage = canUseNextImage(event.image);
  const imageAlt = event.imgalt ?? event.title;

  return (
    <article className="group overflow-hidden px-5 py-7 transition-colors duration-300 hover:bg-white/80 md:px-7 md:py-9">
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
        <div className="relative h-56 w-full overflow-hidden rounded-xl border border-[#d8caa5]/90 bg-[#d8caa5]/25 shadow-md md:h-80 md:w-[46%]">
          {event.image ? (
            canUseOptimizedImage ? (
              <Image
                src={event.image}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                priority
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.image}
                alt={imageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )
          ) : (
            <div className="flex h-full items-center justify-center bg-[#d8caa5]/40 text-sm font-semibold uppercase tracking-[0.14em] text-[#6b6054]">
              Visuel à venir
            </div>
          )}
          <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-primary shadow-sm">
            {month} {day}
          </div>
          <div className="absolute right-4 bottom-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
            <span className="material-symbols-outlined text-[17px] align-middle">schedule</span>{" "}
            {time}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-4 text-[#6b6054] text-xs uppercase tracking-[0.16em]">
            <span className="font-bold text-primary">{month}</span>
            <span className="font-geom text-4xl text-[#111]">{day}</span>
            <span className="text-[11px]">{weekday}</span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-geom text-3xl font-extrabold leading-tight text-[#111] transition-colors duration-300 group-hover:text-primary md:text-4xl">
              {event.title}
            </h3>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              {event.type?.trim() || "Live music"} {range ? `• ${range}` : ""}
            </p>
          </div>

          <p className="max-w-3xl text-base leading-relaxed text-[#4d433b] md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

function formatEventDate(start: Date, end?: Date) {
  const month = capitalize(MONTH_FORMATTER.format(start).replace(".", ""));
  const weekday = capitalize(WEEKDAY_FORMATTER.format(start).replace(".", ""));
  const day = DAY_FORMATTER.format(start);
  const time = TIME_FORMATTER.format(start);
  const endTime = end ? TIME_FORMATTER.format(end) : null;

  return {
    month,
    weekday,
    day,
    time,
    range: endTime ? `${time} - ${endTime}` : "",
  };
}

function clampDescription(text?: string, limit = 200) {
  if (!text) {
    return "Plus d'informations à venir.";
  }

  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit).trimEnd()}...`;
}

function capitalize(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function canUseNextImage(src?: string | null) {
  if (!src) {
    return false;
  }

  if (src.startsWith("/")) {
    return true;
  }

  try {
    const { hostname } = new URL(src);
    return hostname === "lh3.googleusercontent.com";
  } catch {
    return false;
  }
}

function mergeWithSampleEvent(events: EventItem[], sample: EventItem) {
  const hasSample = events.some(
    (event) =>
      event.id === sample.id ||
      (event.title === sample.title && event.start === sample.start),
  );

  const merged = hasSample ? events : [sample, ...events];

  return merged.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
}
