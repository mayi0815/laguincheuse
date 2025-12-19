"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function MenuToggleButton({
  open,
  onClick,
  className = "",
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={open}
      className={`relative inline-flex h-16 w-16 items-center justify-center overflow-visible ${className}`}
    >
      <span
        className={`absolute left-1/2 top-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-in-out origin-center ${open ? "-translate-y-[0px] rotate-45" : "-translate-y-[7px]"}`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-current transition-all duration-200 ease-in-out origin-center ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-in-out origin-center ${open ? "translate-y-[0px] -rotate-45" : "translate-y-[7px]"}`}
      />
    </button>
  );
}

export function Header({ variant = "default" }: { variant?: "default" | "opaque" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOpaque = variant === "opaque";
  const showOpaqueStyle = isScrolled || isOpaque;

  const headerClasses = `fixed left-0 top-0 z-50 w-full items-center justify-between px-6 lg:px-10 xl:px-12 transition-all duration-300 ${showOpaqueStyle
    ? "bg-[#f4ebd0] text-bistro-ink shadow-sm py-4"
    : "bg-transparent text-white py-6"
    }`;

  const mobileHeaderClasses = `fixed left-0 top-0 z-50 w-full items-center justify-between px-4 pr-[calc(env(safe-area-inset-right)+2rem)] pl-[calc(env(safe-area-inset-left)+1.25rem)] overflow-visible transition-all duration-300 ${showOpaqueStyle
    ? "bg-[#f4ebd0] text-bistro-ink shadow-sm py-3"
    : "bg-transparent text-white py-5"
    }`;

  return (
    <>
      {/* Desktop Header */}
      <header className={`hidden md:flex ${headerClasses} uppercase tracking-[0.05em]`}>
        <Link
          href="/"
          className="shrink-0 text-3xl lg:text-4xl font-sullivan font-bold whitespace-nowrap hover:opacity-80 transition-opacity"
        >
          La Guincheuse
        </Link>
        <nav
          className={`flex flex-1 justify-center gap-4 lg:gap-6 xl:gap-8 text-xs lg:text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${showOpaqueStyle ? "text-bistro-ink" : "text-white"
            }`}
        >
          <Link
            className="opacity-80 hover:opacity-100 border-b border-transparent hover:border-current pb-0.5 transition-all"
            href="/#concept"
          >
            Concept
          </Link>
          <Link
            className="opacity-80 hover:opacity-100 border-b border-transparent hover:border-current pb-0.5 transition-all"
            href="/carte"
          >
            Carte
          </Link>
          <Link
            className="opacity-80 hover:opacity-100 border-b border-transparent hover:border-current pb-0.5 transition-all"
            href="/event"
          >
            Événements
          </Link>
          <Link
            className="opacity-80 hover:opacity-100 border-b border-transparent hover:border-current pb-0.5 transition-all"
            href="/#experience"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/reservation"
          className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 lg:px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] backdrop-blur-sm transition-all ${showOpaqueStyle
            ? "border-bistro-ink/30 hover:border-bistro-ink hover:bg-bistro-ink hover:text-bistro-bg"
            : "border-white/60 hover:border-white hover:bg-white/10"
            }`}
        >
          Réserver
        </Link>
      </header>

      {/* Mobile Header */}
      <header className={`flex md:hidden ${mobileHeaderClasses}`}>
        <Link
          href="/"
          className="text-2xl font-bold font-sullivan uppercase tracking-[0.05em] hover:opacity-80 transition-opacity"
        >
          La Guincheuse
        </Link>
        <MenuToggleButton
          open={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-current"
        />
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] transform transition-all duration-500 ease-in-out ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          } bg-[#f4ebd0]`}
      >
        <div className="flex flex-col h-full p-8 pt-[calc(env(safe-area-inset-top)+1.25rem)] pr-[calc(env(safe-area-inset-right)+2rem)] pl-[calc(env(safe-area-inset-left)+1.25rem)] pb-[calc(env(safe-area-inset-bottom)+1.25rem)] text-bistro-ink overflow-visible">
          <div className="flex w-full items-start justify-between gap-3 mb-10">
            <Link
              href="/"
              className="text-2xl font-bold font-sullivan uppercase tracking-[0.05em]"
              onClick={() => setMobileMenuOpen(false)}
            >
              La Guincheuse
            </Link>
            <MenuToggleButton
              open={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(false)}
              className="text-current shrink-0"
            />
          </div>

          <nav className="flex flex-col items-center justify-center gap-8 flex-1 text-2xl font-bold uppercase tracking-widest text-bistro-ink">
            <Link
              href="/#concept"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors font-geom tracking-widest text-3xl"
            >
              Concept
            </Link>
            <Link
              href="/carte"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors font-geom tracking-widest text-3xl"
            >
              Carte
            </Link>
            <Link
              href="/event"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors font-geom tracking-widest text-3xl"
            >
              Événements
            </Link>
            <Link
              href="/reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors font-geom tracking-widest text-3xl"
            >
              Réservation
            </Link>
            <Link
              href="/#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors font-geom tracking-widest text-3xl"
            >
              Info
            </Link>
          </nav>

          <div className="text-center text-xs text-bistro-ink/60 uppercase tracking-widest mt-auto pb-8">
            La Guincheuse © 2025
          </div>
        </div>
      </div>
    </>
  );
}
