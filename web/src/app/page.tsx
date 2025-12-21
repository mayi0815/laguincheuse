"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Slide {
  title: string;
  caption: string;
  image: string;
  mobileImage?: string;
}

const slides: Slide[] = [
  {
    title: "Bistrot Cosy",
    caption: "Ambiance chaleureuse, tables dressées et lumière feutrée.",
    image: "/env_table.webp",
    mobileImage: "/common/deco_ver.webp",
  },
  {
    title: "Bar & Musique Live",
    caption: "Cave à vins vivante et comptoir convivial.",
    image: "/common/bar3.webp",
    mobileImage: "/common/cocktail.webp",
  },
  {
    title: "Cuisine Fait Maison",
    caption: "Assiettes colorées, produits frais, musique live.",
    image: "/common/confit_de_canard_apercu.webp",
  },
  {
    title: "Souvenir d'antan",
    caption: "Tésors chinés, trouvailles & histoires.",
    image: "/common/deco_mur.webp",
    mobileImage: "/common/deco_mur.webp",
  },
];

const dishes = [
  {
    title: "Confit de Canard",
    description: "Peau croustillante, pommes de terre sautées, jus réduit.",
    image: "/common/confit_de_canard_apercu.webp",
  },
  {
    title: "Blanquette de saumon",
    description: "Riz aux oignons confits.",
    image: "/common/saumonpave.webp",
  },
  {
    title: "French Burger",
    description: "Crème légère, herbes fraîches, zeste de citron vert.",
    image: "/common/french_burger.webp",
  }
];

export default function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = useMemo(() => slides[active], [active]);

  return (
    <div className="relative min-h-screen bg-bistro-bg text-white">
      <div className="absolute inset-0 bg-black/5" aria-hidden />

      <Header />

      <main className="relative w-full overflow-hidden">
        <DesktopHero
          slides={slides}
          active={active}
          activeSlide={activeSlide}
          setActive={setActive}
        />
        <MobileHero
          slides={slides}
          active={active}
        />
        <ConceptSection />
        <MenuSection />
        <LiveSection />
      </main>
      <InfoSection />
      <Footer />
    </div>
  );
}



function DesktopHero({
  slides,
  active,
  activeSlide,
  setActive,
}: {
  slides: Slide[];
  active: number;
  activeSlide: Slide;
  setActive: (index: number) => void;
}) {
  return (
    <section className="relative hidden h-screen w-full overflow-hidden md:block">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 bg-black transition-all duration-[900ms] ease-out ${index === active ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[1.01]"
              }`}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="(max-width: 767px) 0px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />

      <div className="absolute bottom-12 left-12 z-10 max-w-xl space-y-3 text-left drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          <span>Paris 10ème</span>
        </div>
        <h1 className="font-display text-5xl font-extrabold uppercase leading-tight tracking-tight md:text-6xl">
          {activeSlide.title}
        </h1>
        <p className="max-w-xl text-base font-body text-white/85 md:text-lg">{activeSlide.caption}</p>
        <div className="flex items-center gap-3 pt-2">
          <a
            href="/reservation"
            className="pointer-events-auto ml-1 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/20 transition hover:bg-primary/90"
          >
            Réserver une table
          </a>
        </div>
      </div>

      <div className="absolute right-10 bottom-10 z-10 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/70">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2 w-8 rounded-full transition ${index === active ? "bg-white" : "bg-white/30 hover:bg-white/60"
              }`}
            aria-label={`Afficher la slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function MobileHero({
  slides,
  active,
}: {
  slides: Slide[];
  active: number;
}) {
  const mobileSlides = useMemo(() => slides.filter((s) => s.mobileImage), [slides]);
  const mobileIndex = active % mobileSlides.length;
  const activeMobileSlide = mobileSlides[mobileIndex];

  return (
    <section className="relative h-[78vh] w-full overflow-hidden md:hidden">
      <div className="absolute inset-0">
        {mobileSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 bg-black transition-all duration-[800ms] ease-out ${index === mobileIndex ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[1.01]"
              }`}
            aria-hidden={index !== mobileIndex}
          >
            {slide.mobileImage && (
              <Image
                src={slide.mobileImage}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(max-width: 767px) 100vw, 0px"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-5 bottom-5 z-10 space-y-3 rounded-2xl bg-black/45 px-4 py-4 shadow-[0_14px_38px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          <span>Paris 10ème</span>
        </div>
        <h1 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-white">
          {activeMobileSlide.title}
        </h1>
        <p className="max-w-xl text-xs font-body text-white/85">{activeMobileSlide.caption}</p>
        <div className="flex items-center justify-between pt-2">
          <a
            href="/reservation"
            className="rounded-full bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-black/25 transition hover:bg-primary/90"
          >
            Réserver
          </a>
        </div>
      </div>
    </section>
  );
}

function ConceptSection() {
  const conceptRef = useRef<HTMLElement>(null);
  const conceptBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = conceptRef.current;
    const bg = conceptBgRef.current;
    if (!section || !bg) return;

    const maxShift = 40; // px, kept safe to avoid edge reveal
    const baseTransform = `translate3d(0, 0, 0) scale(1.08)`;

    let rafId = 0;
    const update = () => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) {
        bg.style.transform = baseTransform;
        rafId = 0;
        return;
      }

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      if (rect.bottom < 0 || rect.top > vh) {
        bg.style.transform = baseTransform;
        rafId = 0;
        return;
      }

      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      const shift = progress * maxShift;
      bg.style.transform = `translate3d(0, ${shift}px, 0) scale(1.08)`;
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="relative z-10 bg-bistro-card px-3 py-20 text-bistro-ink md:px-6 overflow-hidden"
      ref={conceptRef}
    >
      <div id="concept" className="scroll-mt-24 md:scroll-mt-32" />
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block overflow-hidden">
        <div
          ref={conceptBgRef}
          className="absolute -inset-6 will-change-transform"
          style={{ transform: "translate3d(0, 0, 0) scale(1.08)" }}
        >
          <Image
            src="/common/deco_mur.webp"
            alt=""
            fill
            sizes="(max-width: 767px) 0px, 100vw"
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0ead6]/70 via-[#f0ead6]/45 to-[#f0ead6]/80" />
      </div>

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 z-10 -mr-20 -mt-20 h-64 w-64 rounded-full bg-[#E08E79] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 z-10 -ml-20 -mb-20 h-80 w-80 rounded-full bg-primary opacity-5 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-[98%] flex-col gap-12 md:flex-row md:items-center">
        {/* Text Content */}
        <div className="flex-1 space-y-8 text-center md:text-left md:pr-10 md:max-w-xl lg:max-w-2xl mx-auto md:mx-0">
          <div className="space-y-4">
            <span className="inline-block rounded-full border border-bistro-ink/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bistro-ink/70">
              Nos concepts
            </span>
            <h2 className="font-geom text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-black md:text-7xl">
              L&apos;Art du <br />
              <span className="text-primary italic">Bon</span> Bistrot
            </h2>
          </div>

          <div className="flex flex-col gap-6 font-body text-lg leading-relaxed text-bistro-ink/80 md:text-xl">
            <p>
              Ici, on vient comme on est : pour <strong className="font-semibold text-bistro-ink">bien manger</strong>,
              bien boire, et surtout passer un moment hors du temps.
            </p>
            <p>
              Dans un décor vintage rempli de jolis objets chinés, l’ambiance est
              cosy, simple et réconfortante. C&apos;est le rendez-vous des amis, des familles
              et des amoureux du bon goût.
            </p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5 md:h-[650px]">

            {/* Left Column Wrapper (Contents on mobile, Flex Col on Desktop) */}
            <div className="contents md:col-span-7 md:flex md:flex-col md:gap-5 md:h-full">

              {/* Top: Large Image env4 (Full width on mobile) */}
              <div className="col-span-2 relative md:flex-[3] w-full min-h-[280px] overflow-hidden rounded-2xl bg-black/5 shadow-xl rotate-1 hover:rotate-0 transition-all duration-500 ease-in-out group">
                <Image
                  src="/common/table.webp"
                  alt="Ambiance salle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom: Deco Image (Half width on mobile) */}
              <div className="col-span-1 relative md:flex-[2] w-full min-h-[160px] overflow-hidden rounded-2xl bg-black/5 shadow-lg rotate-1 hover:rotate-0 transition-transform duration-500 group">
                <Image
                  src="/deco1.png"
                  alt="Décoration"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover object-[50%_80%] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Column Wrapper (Contents on mobile, Flex Col on Desktop) */}
            <div className="contents md:col-span-5 md:flex md:flex-col md:gap-5 md:h-full">

              {/* Top: env_decor (Half width on mobile) */}
              <div className="col-span-1 relative md:flex-1 min-h-[160px] md:min-h-[220px] overflow-hidden rounded-2xl bg-black/5 shadow-xl rotate-1 hover:rotate-0 transition-all duration-500 ease-in-out group">
                <Image
                  src="/common/deco_mur.webp"
                  alt="Décoration d'ambiance"
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom: env2-mobile (Full width on mobile) */}
              <div className="col-span-2 relative md:flex-1 min-h-[220px] overflow-hidden rounded-2xl bg-black/5 shadow-xl -rotate-1 hover:rotate-0 transition-all duration-500 ease-in-out group">
                <Image
                  src="/common/decor1.webp"
                  alt="Détails"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-98 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="w-full bg-bistro-dark py-16 text-bistro-bg">
      <div className="mx-auto flex w-full max-w-none flex-col gap-8 px-4 md:px-8 lg:px-12">
        <div className="flex flex-row items-end justify-between gap-3">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-[0.22em]">La Cuisine</span>
            <h2 className="text-4xl font-extrabold uppercase leading-none text-white md:text-5xl">Nos Plats</h2>
          </div>
          <a
            href="/carte"
            className="text-sm font-bold uppercase tracking-[0.18em] text-white/70 border-b border-white/20 pb-1 transition hover:text-white hover:border-white"
          >
            Découvrir
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {dishes.map((dish, index) => (
            <DishCard key={dish.title} className={index > 1 ? "hidden md:block" : ""} {...dish} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoSection() {
  return (
    <section
      id="experience"
      className="relative z-10 bg-[#f4ebd0] px-5 py-12 text-bistro-ink shadow-[0_-12px_30px_rgba(0,0,0,0.12)] backdrop-blur md:px-10"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-between gap-8">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Infos pratiques</p>
          <p className="font-body text-base text-bistro-ink/80">
            Bistrot de quartier : cuisine de saison, cave vivante et énergie live. Grandes tablées, bois
            brut et équipe chaleureuse.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-bistro-ink/80">
          <div>
            <p className="font-semibold uppercase tracking-[0.14em] text-primary">Adresse</p>
            <a
              className="underline-offset-4 hover:underline"
              href="https://www.google.com/maps?q=266+Rue+du+Faubourg+Saint-Martin,+75010+Paris"
              target="_blank"
              rel="noopener noreferrer"
            >
              266 Rue du Faubourg Saint-Martin, 75010 Paris
            </a>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.14em] text-primary">Téléphone</p>
            <a className="underline-offset-4 hover:underline" href="tel:+33956671472">
              09 56 67 14 72
            </a>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.14em] text-primary">Horaires</p>
            <p>Lundi - Jeudi : 10:30 - 22:30</p>
            <p>Vendredi et Samedi : 10:30 - 23:30</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.14em] text-primary">Email</p>
            <a className="underline-offset-4 hover:underline" href="mailto:guincheuse@gmail.com">
              guincheuse@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DishCard({
  title,
  description,
  image,
  className = "",
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-none md:rounded-lg border border-white/10 bg-white/5 shadow-lg shadow-black/25 ${className}`}>
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold uppercase tracking-wide text-white">{title}</h3>
        <p className="mt-2 text-sm font-body italic text-white/85">{description}</p>
      </div>
    </div>
  );
}

function LiveSection() {
  return (
    <section
      id="live"
      className="relative z-10 w-full bg-bistro-card text-bistro-ink overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-screen lg:min-h-[700px] md:gap-10 lg:gap-0">

        {/* Text Content - Left 40% */}
        <div className="flex-1 lg:flex-[0.4] flex flex-col justify-center px-6 py-20 md:px-12 md:py-14 lg:px-16 lg:py-0 relative z-10 bg-bistro-card">
          <div className="space-y-8 relative">
            {/* Creative Heading */}
            <div className="relative">
              <span className="block font-geom text-[12vw] md:text-[5vw] leading-[0.8] text-bistro-ink/10 absolute -top-8 md:-top-12 -left-2 md:-left-12 select-none z-0">
                MUSIQUE
              </span>
              <h2 className="relative z-10 font-geom text-5xl md:text-7xl font-extrabold uppercase leading-[0.9] tracking-tight text-black">
                Ambiance <br />
                <span className="text-primary italic">Live.</span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-bistro-ink/20"></span>
              <p className="font-semibold uppercase tracking-[0.2em] text-xs text-bistro-ink/60">
                Chaque Semaine
              </p>
            </div>

            <p className="font-body text-lg md:text-xl leading-relaxed text-bistro-ink/80 max-w-md">
              La Guincheuse s’anime au rythme des concerts live. Jazz, swing ou chanson française,
              la musique accompagne vos dîners pour une atmosphère festive et inoubliable.
            </p>

            {/* Mobile Concert Info Card */}
            <div className="flex flex-col md:hidden gap-4 py-6">
              <div className="relative w-full h-64 overflow-hidden rounded-xl bg-black/10 shadow-lg border border-bistro-ink/10 rotate-1">
                <Image
                  src="/common/concert.webp"
                  alt="Détail musique"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover grayscale"
                />
              </div>
              <div className="text-bistro-ink pl-1">
                <p className="font-geom text-3xl uppercase leading-tight mb-1 break-words">Soirée Live</p>
                <p className="font-body text-lg text-bistro-ink/70 italic">Chaque Semaine</p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/event"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-bistro-ink/10 bg-white/40 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-bistro-ink/30"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  Voir Prochains Concerts
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Image Composition - Right 60% */}
        <div className="flex-1 lg:flex-[0.6] relative min-h-[420px] md:min-h-[520px] lg:min-h-[640px] lg:h-full overflow-hidden bg-black">
          {/* Main Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/live1.webp"
              alt="Ambiance concert"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-[20%_center] opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 md:to-transparent" />
          </div>

          {/* Overlapping Floating Element */}
          <div className="hidden md:block absolute bottom-6 left-4 right-4 md:bottom-24 md:left-12 md:right-auto md:w-[500px] bg-black/40 md:bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-8 rounded-xl shadow-2xl skew-y-0 md:skew-y-1 hover:skew-y-0 transition-transform duration-500">
            <div className="flex gap-4 md:gap-8 items-center">
              <div className="relative h-16 w-16 md:h-40 md:w-40 overflow-hidden rounded-lg bg-black/20 shrink-0">
                <Image
                  src="/live2.png"
                  alt="Détail musique"
                  fill
                  sizes="160px"
                  className="object-cover grayscale"
                />
              </div>
              <div className="text-white">
                <p className="font-geom text-xl md:text-5xl uppercase leading-tight md:leading-tight break-words mb-1 md:mb-3">Soirée Live</p>
                <p className="font-body text-xs md:text-lg text-white/90 md:text-white/70 italic">Chaque Semaine</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
