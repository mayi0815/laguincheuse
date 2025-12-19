"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const CONSENT_KEY = "lg_cookie_notice_accepted";
const CONSENT_EVENT = "lg-cookie-consent-change";

const getConsentSnapshot = () => {
  if (typeof window === "undefined") {
    return true;
  }
  return localStorage.getItem(CONSENT_KEY) === "true";
};

const subscribeToConsent = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CONSENT_EVENT, handler);
  };
};

export function CookieNotice() {
  const consentGiven = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => true,
  );
  const visible = !consentGiven;

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 w-[90vw] max-w-[320px] rounded-2xl border border-bistro-ink/10 bg-bistro-card/95 px-4 py-4 text-bistro-ink shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-bistro-ink/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-bistro-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            Cookies
          </div>
          <p className="mt-3 text-sm font-body text-bistro-ink/80">
            Nous utilisons des cookies pour améliorer l&apos;expérience sur le site.
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleAccept}
          className="rounded-full bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/20 transition hover:bg-primary/90"
        >
          Compris
        </button>
        <Link
          href="/politique-de-confidentialite"
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-bistro-ink/70 underline-offset-4 transition hover:text-primary hover:underline"
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
}
