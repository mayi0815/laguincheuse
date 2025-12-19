"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="contact"
            className="relative z-10 bg-[#f4ebd0] pb-10 pt-16 text-center text-bistro-ink"
        >
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-sm text-bistro-ink/80 mb-12">
                <p className="font-semibold">© {currentYear} LA GUINCHEUSE.Tous droits réservés.</p>
                <p className="opacity-70">
                    Bistrot Cozy,cuisine française & musique live.
                </p>
                <Link
                    href="/politique-de-confidentialite"
                    className="text-xs font-bold uppercase tracking-[0.18em] text-bistro-ink/70 underline-offset-4 transition hover:text-primary hover:underline"
                >
                    Politique de confidentialité
                </Link>
            </div>

            <div className="w-fit mx-auto px-6 flex flex-col items-center gap-2">
                {/* Top Section: Split Wave with BISTROT */}
                <div className="flex items-center w-full gap-4 text-bistro-ink">
                    <WavySeparator className="flex-1 min-w-[60px]" variant="short" />
                    <span className="font-sans text-sm font-bold uppercase tracking-[0.25em] translate-y-[2px]">
                        Bistrot
                    </span>
                    <WavySeparator className="flex-1 min-w-[60px]" variant="short" />
                </div>

                {/* Branding Text */}
                <span className="font-geom text-5xl md:text-8xl font-bold uppercase leading-none tracking-tight">
                    La Guincheuse
                </span>

                {/* Bottom Wave */}
                <WavySeparator />
            </div>
        </footer>
    );
}

function WavySeparator({
    className,
    variant = "default",
}: {
    className?: string;
    variant?: "default" | "short";
}) {
    // Default path has ~14 cycles for wide containers
    const DEFAULT_PATH =
        "M0,12 C2.5,28 5,-4 7.5,12 C10,28 12.5,-4 15,12 C17.5,28 20,-4 22.5,12 C25,28 27.5,-4 30,12 C32.5,28 35,-4 37.5,12 C40,28 42.5,-4 45,12 C47.5,28 50,-4 52.5,12 C55,28 57.5,-4 60,12 C62.5,28 65,-4 67.5,12 C70,28 72.5,-4 75,12 C77.5,28 80,-4 82.5,12 C85,28 87.5,-4 90,12 C92.5,28 95,-4 97.5,12 C100,28 102.5,-4 105,12";

    // Short path has ~4 cycles for narrow containers (to match visual density)
    const SHORT_PATH =
        "M0,12 C6,28 12.5,-4 18.75,12 C25,28 31.25,-4 37.5,12 C43.75,28 50,-4 56.25,12 C62.5,28 68.75,-4 75,12 C81.25,28 87.5,-4 93.75,12 C100,28 106.25,-4 112.5,12";

    return (
        <div className={`overflow-hidden text-bistro-ink ${className || "w-full"}`}>
            <svg
                viewBox="0 0 100 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-5 md:h-7"
                preserveAspectRatio="none"
            >
                <path
                    d={variant === "short" ? SHORT_PATH : DEFAULT_PATH}
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
}
