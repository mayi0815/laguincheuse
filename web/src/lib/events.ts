import ical, { VEvent } from "node-ical";

export type EventItem = {
  id: string;
  title: string;
  start: string;
  end: string;
  type?: string;
  image?: string | null;
  imgalt?: string | null;
  desc?: string;
};

const DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000;
const DEFAULT_REVALIDATE = 300;

export async function getEvents(): Promise<EventItem[]> {
  const icsUrl = process.env.GCAL_ICS_URL;

  if (!icsUrl) {
    throw new Error("GCAL_ICS_URL is not defined");
  }

  const response = await fetch(icsUrl, {
    next: { revalidate: getRevalidateSeconds() },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ICS (${response.status})`);
  }

  const icsData = await response.text();

  let parsed;

  try {
    parsed = ical.parseICS(icsData);
  } catch (error) {
    console.error("Failed to parse ICS data", error);
    throw new Error("Failed to parse ICS data");
  }

  const now = new Date();
  const horizon = new Date(now);
  horizon.setFullYear(horizon.getFullYear() + 1);

  const items: EventItem[] = [];

  for (const component of Object.values(parsed)) {
    if (!component || component.type !== "VEVENT") {
      continue;
    }

    const event = component as VEvent;

    if (event.status && event.status.toUpperCase() === "CANCELLED") {
      continue;
    }

    if (event.rrule) {
      const durationMs = getDurationMs(event);
      const rangeStart = new Date(now.getTime() - durationMs);
      const recurrenceDates = event.rrule.between(rangeStart, horizon, true);

      for (const occurrence of recurrenceDates) {
        if (isException(occurrence, event.exdate)) {
          continue;
        }

        const occurrenceKey = occurrence.toISOString();
        const override = event.recurrences?.[occurrenceKey];

        const startDate = toDate(override?.start) ?? new Date(occurrence);
        const endDate =
          toDate(override?.end) ?? new Date(startDate.getTime() + durationMs);

        const item = buildEventItem(override ?? event, startDate, endDate);

        if (item && new Date(item.end) >= now) {
          items.push(item);
        }
      }

      continue;
    }

    const startDate = toDate(event.start);
    if (!startDate) {
      continue;
    }

    const endDate = deriveEndDate(startDate, toDate(event.end));
    const item = buildEventItem(event, startDate, endDate);

    if (item && endDate >= now) {
      items.push(item);
    }
  }

  return items.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
}

type JsDateLike = { toJSDate?: () => Date };

function toDate(
  value: string | number | Date | JsDateLike | null | undefined,
): Date | null {
  if (!value) {
    return null;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toJSDate" in value &&
    typeof value.toJSDate === "function"
  ) {
    return toDate(value.toJSDate());
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const date = new Date(
    typeof value === "string" || typeof value === "number" ? value : `${value}`,
  );
  return Number.isNaN(date.getTime()) ? null : date;
}

function deriveEndDate(start: Date, explicitEnd?: Date | null): Date {
  if (explicitEnd && !Number.isNaN(explicitEnd.getTime())) {
    return explicitEnd;
  }

  return new Date(start.getTime() + DEFAULT_DURATION_MS);
}

function getDurationMs(event: VEvent): number {
  const start = toDate(event.start);
  const end = toDate(event.end);

  if (start && end) {
    const duration = end.getTime() - start.getTime();
    if (duration > 0) {
      return duration;
    }
  }

  return DEFAULT_DURATION_MS;
}

type ExdateValue =
  | Date
  | JsDateLike
  | string
  | number
  | null
  | undefined;

function isException(date: Date, exdate: VEvent["exdate"]): boolean {
  if (!exdate || typeof exdate !== "object") {
    return false;
  }

  const occurrenceTime = date.getTime();

  return (Object.values(exdate) as ExdateValue[]).some((exdateValue) => {
    const exceptionDate = toDate(exdateValue);

    if (!exceptionDate) {
      return false;
    }

    return exceptionDate.getTime() === occurrenceTime;
  });
}

function parseEventDescription(raw?: string): {
  type: string;
  image: string | null;
  imgalt: string | null;
  desc?: string;
} {
  if (!raw) {
    return { type: "", image: null, imgalt: null, desc: undefined };
  }

  const normalized = raw
    .replace(/\\n/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<a[^>]*href="([^"]+)"[^>]*>[^<]*<\/a>/gi, "$1")
    .replace(/<[^>]+>/g, "");

  const lines = normalized.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  let type = "";
  let image: string | null = null;
  let imgalt: string | null = null;
  let desc: string | undefined;
  const fallback: string[] = [];

  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z ]+)\s*:\s*(.*)\s*$/);

    if (match) {
      const key = match[1].replace(/\s+/g, "").trim().toLowerCase();
      const value = match[2].trim();

      if (key === "type") {
        type = value;
        continue;
      }

      if (key === "image") {
        image = value || null;
        continue;
      }

      if (key === "imgalt" || key === "imagealt" || key === "imagalt") {
        imgalt = value || null;
        continue;
      }

      if (key === "desc") {
        desc = value;
        continue;
      }

      continue;
    }

    if (line.trim().length) {
      fallback.push(line.trim());
    }
  }

  const resolvedDesc =
    desc && desc.trim().length ? desc.trim() : fallback.length ? fallback.join(" ") : undefined;

  return { type, image, imgalt, desc: resolvedDesc };
}

function buildEventItem(event: VEvent, start: Date, end: Date): EventItem | null {
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return null;
  }

  const { type, image, imgalt, desc } = parseEventDescription(event.description);

  return {
    id: `${event.uid || event.summary || "event"}-${start.toISOString()}`,
    title: event.summary || "Événement",
    start: start.toISOString(),
    end: end.toISOString(),
    type,
    image: image ?? null,
    imgalt: imgalt ?? (event.summary ? `Affiche pour ${event.summary}` : null),
    desc,
  };
}

function getRevalidateSeconds() {
  const value = process.env.FETCH_REVALIDATE;
  if (!value) {
    return DEFAULT_REVALIDATE;
  }

  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }

  return DEFAULT_REVALIDATE;
}
