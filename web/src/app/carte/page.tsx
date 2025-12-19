"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// Types to fix lint errors
interface MenuItem {
    title: string;
    price: string;
    description: string;
    image: string | null;
    tags?: string[];
    large?: boolean;
}

interface MenuCategory {
    title: string;
    items: MenuItem[];
}

interface MenuItems {
    [key: string]: MenuCategory;
}

const menuItems: MenuItems = {
    entrees: {
        title: "Pour Commencer",
        items: [
            {
                title: "Oeuf pané",
                price: "8.00€",
                description: "Crémeux de parmesan, copeaux de parmesan",
                image: null,
            },
            {
                title: "Gratiné à l'oignon",
                price: "8.00€",
                description: "",
                image: null,
            },
            {
                title: "Croustillant de chèvre",
                price: "6.00€",
                description: "Oignons confits, menthe, cébette",
                image: null,
            },
            {
                title: "Saumon gravlax maison",
                price: "12.00€",
                description: "Crème ciboulette, toast de pain grillé",
                image: null,
            },
            {
                title: "Nem",
                price: "8.60€",
                description: "Légumes ou poulet, 6 pièces, sauce nem",
                tags: ["Halal"],
                image: null,
            },
        ],
    },
    plats: {
        title: "Plats Principaux",
        items: [
            {
                title: "Linguine",
                price: "11.20€",
                description: "Sauce aux trois fromages",
                image: null,
                large: true,
            },
            {
                title: "Bavette",
                price: "13.40€",
                description: "Frites, sauce à l'échalote",
                image: null,
                large: true,
            },
            {
                title: "Entrecôte 200 g",
                price: "21.50€",
                description: "Frites, sauce au poivre",
                image: "/common/entrecote.webp",
                large: true,
            },
            {
                title: "Côte de porc",
                price: "12.00€",
                description: "Frites ou légumes",
                image: null,
                large: true,
            },
            {
                title: "Pluma de cochon",
                price: "13.20€",
                description: "Sauce laquée, purée maison",
                image: null,
                large: true,
            },
            {
                title: "Croque-monsieur du chef",
                price: "16.80€",
                description: "Béchamel, cheddar, jambon blanc, salade",
                image: null,
                large: true,
            },
            {
                title: "Confit de canard du Sud-Ouest",
                price: "17.20€",
                description: "Pommes sarladaises, jus corsé",
                image:
                    "/common/confit_de_canard_apercu.webp",
                large: true,
            },
            {
                title: "Blanquette de saumon",
                price: "16.80€",
                description: "Riz aux oignons confits",
                image: "/common/saumonpave.webp",
                large: true,
            },
            {
                title: "Filet de bar",
                price: "18.80€",
                description: "Légumes",
                image: null,
                large: true,
            },
            {
                title: "Tentacules de poulpe",
                price: "21.20€",
                description: "Sauce chorizo, légumes",
                image: "/common/calmar.webp",
                large: true,
            },
        ],
    },
    desserts: {
        title: "Desserts",
        items: [
            {
                title: "Mi-cuit au chocolat",
                price: "8.00€",
                description: "",
                image: null,
            },
            {
                title: "Crème brûlée",
                price: "6.00€",
                description: "",
                image: null,
            },
            {
                title: "Tarte tatin",
                price: "8.00€",
                description: "",
                image: null,
            },
            {
                title: "Brioche perdue au caramel beurre salé",
                price: "7.00€",
                description: "",
                image: null,
            },
            {
                title: "Assiette de fromage",
                price: "10.00€",
                description: "Fromage d'arrivage",
                image: null,
            },
        ],
    },
    apartager: {
        title: "À partager",
        items: [
            {
                title: "Planche de charcuterie",
                price: "18.00€",
                description:
                    "Saucisse à la perche de l'Aveyron, jambon de pays français, saucisse de Morteau (Franche-Comté), rillettes du Mans",
                image: null,
            },
            {
                title: "Planche mixte",
                price: "18.00€",
                description: "Fromage d'arrivage",
                image: null,
            },
        ],
    },
    plateaux: {
        title: "Plateau de fruits de mer",
        items: [
            {
                title: "",
                price: "",
                description:
                    "Grand (4 personnes) ou Petit (2 personnes) : huîtres, crabe, coques, petites crevettes roses. Sur commande 24h à l'avance, prix selon arrivage.",
                image: null,
            },
        ],
    },
};

export default function CartePage() {
    const [activeSection, setActiveSection] = useState("entrees");
    const [showWineModal, setShowWineModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["entrees", "plats", "desserts", "apartager", "plateaux", "vins"];
            for (const id of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!showWineModal) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowWineModal(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [showWineModal]);

    return (
        <div className="min-h-screen bg-[#EFE6D5] text-[#111] font-body">
            <Header variant="opaque" />

            {/* Main Container with top padding for Fixed Header */}
            <main className="max-w-3xl mx-auto px-6 pb-32 pt-24 md:pt-32">
                {/* Page Title - Moved ABOVE sticky nav so it's not covered */}
                <header className="text-center mb-12">
                    <h1 className="font-geom text-6xl md:text-8xl text-primary uppercase leading-[0.9] tracking-normal mb-4">
                        La Carte
                    </h1>
                    <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#444]">
                        Produits Frais & De Saison
                    </p>
                    <div className="mt-6 mx-auto w-24 h-[10px] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXG2pIa5ntC1b_mZC-1Tinqy0JWo3uqU-aNKK-HpORQNPaPAKQZ7O4LUUZfxcIyiI6WtxE_plOzkUScf-1tpC1eYsXNg_Seg_IoHGcDC-LTCdFOZ1_PzELupwS7qxcQmdC512U79LskCCNqSGCLVtzJe2BwL_FT_muCNy8pkx_CQK-AY8KLY4jjpunCw3MeQpQPmpJ2icKifEWYcVW52OSpt--5LiThqIueT2n3uAQZUUU1cFHdpTbECI8WlHHEH6_6IlJDTzUL4M')] bg-repeat-x opacity-80 filter invert" />
                </header>

                {/* Sticky Sub-navigation - Moved inside Main but configured to stick */}
                <div className="sticky top-[88px] md:top-[65px] z-40 bg-[#EFE6D5]/95 backdrop-blur-md border-b border-[#111]/10 pt-2 pb-1 mb-12 transition-all -mx-6 px-6 md:mx-0 md:px-0">
                    <div className="max-w-4xl mx-auto overflow-x-auto no-scrollbar">
                        <div className="flex justify-start md:justify-center min-w-max">
                            {Object.keys(menuItems).map((key) => (
                                <a
                                    key={key}
                                    href={`#${key}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(key)?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        });
                                        setActiveSection(key);
                                    }}
                                    className={`group flex flex-col items-center justify-center mr-8 md:mx-6 pb-3 border-b-4 transition-colors ${activeSection === key
                                        ? "border-primary"
                                        : "border-transparent hover:border-primary/30"
                                        }`}
                                >
                                    <span
                                        className={`text-sm font-bold tracking-wider uppercase ${activeSection === key
                                            ? "text-primary"
                                            : "text-[#444] group-hover:text-primary"
                                            }`}
                                    >
                                        {key}
                                    </span>
                                </a>
                            ))}
                            <a
                                href="#vins"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("vins")?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                    });
                                    setActiveSection("vins");
                                }}
                                className={`group flex flex-col items-center justify-center mr-8 md:mx-6 pb-3 border-b-4 transition-colors ${activeSection === "vins"
                                    ? "border-primary"
                                    : "border-transparent hover:border-primary/30"
                                    }`}
                            >
                                <span
                                    className={`text-sm font-bold tracking-wider uppercase ${activeSection === "vins"
                                        ? "text-primary"
                                        : "text-[#444] group-hover:text-primary"
                                        }`}
                                >
                                    Vins
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Menu Sections */}
                {Object.entries(menuItems).map(([key, category]) => {
                    const isSeafoodSection = category.title === "Plateau de fruits de mer";
                    const sectionTitleClass = isSeafoodSection
                        ? "font-geom text-2xl md:text-4xl uppercase tracking-wide text-primary px-2 whitespace-nowrap md:whitespace-normal"
                        : "font-geom text-3xl md:text-4xl uppercase tracking-wide text-primary px-2";
                    const isSeafoodItem = key === "plateaux";

                    return (
                        <section key={key} id={key} className="mb-16 scroll-mt-40">
                            {/* Section Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px bg-black/20 flex-grow" />
                                <h2 className={sectionTitleClass}>{category.title}</h2>
                                <div className="h-px bg-black/20 flex-grow" />
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-0">
                                {category.items.map((item, index) => {
                                    const hasTitle = item.title.trim().length > 0;
                                    const highlightPhrase = "Sur commande 24h à l'avance";
                                    let descriptionNode: ReactNode = item.description;
                                    const isSeafoodPlateauDescription =
                                        isSeafoodItem && item.description.startsWith("Grand (4 personnes)");

                                    if (isSeafoodItem && item.description.includes(highlightPhrase)) {
                                        const [before, after = ""] = item.description.split(highlightPhrase);
                                        descriptionNode = (
                                            <>
                                                {before}
                                                <span className="font-semibold">{highlightPhrase}</span>
                                                {after}
                                            </>
                                        );
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className={`group px-2 md:px-0 py-6 border-b border-primary/20 last:border-0 hover:bg-black/5 transition-colors rounded-lg md:rounded-none ${item.large ? "flex-col" : ""
                                                }`}
                                        >
                                            {item.large ? (
                                                // Large Image Layout (Steak Frites) - Unchanged Layout Logic
                                                <>
                                                    {item.image && (
                                                        <div className="relative w-full h-48 md:h-80 overflow-hidden rounded mb-4 bg-black/10">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.title || category.title}
                                                                fill
                                                                sizes="(max-width: 768px) 100vw, 700px"
                                                                className="object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-700"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 w-full">
                                                        <div className={`flex items-baseline mb-2 ${hasTitle ? "justify-between" : "justify-end"}`}>
                                                            <div className={hasTitle ? "flex items-center gap-2" : "hidden"}>
                                                                <h3
                                                                    className={`font-bold uppercase tracking-tight text-primary font-display ${isSeafoodItem
                                                                        ? "text-base md:text-xl whitespace-nowrap md:whitespace-normal"
                                                                        : "text-lg md:text-xl"
                                                                        }`}
                                                                >
                                                                    {item.title}
                                                                </h3>
                                                                {item.tags &&
                                                                    item.tags.map((tag) => (
                                                                        <span
                                                                            key={tag}
                                                                            className="border border-primary px-1 py-0.5 rounded text-[10px] font-bold text-primary uppercase tracking-widest"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                            </div>
                                                            <span className="font-geom text-xl md:text-2xl font-bold text-primary">
                                                                {item.price}
                                                            </span>
                                                        </div>
                                                        <p
                                                            className={`text-[#444] font-normal leading-relaxed ${isSeafoodPlateauDescription
                                                                ? "text-lg md:text-xl"
                                                                : "text-sm md:text-base"
                                                                }`}
                                                        >
                                                            {descriptionNode}
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                // Standard Layout (List Items)
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
                                                    {/* Left Content: Title + Desc */}
                                                    <div className="flex-1">
                                                        <div className={`flex items-baseline mb-2 ${hasTitle ? "justify-between" : "justify-end"}`}>
                                                            <div className={hasTitle ? "flex items-center gap-2" : "hidden"}>
                                                                <h3
                                                                    className={`font-bold uppercase tracking-tight text-primary font-display ${isSeafoodItem
                                                                        ? "text-base md:text-xl whitespace-nowrap md:whitespace-normal"
                                                                        : "text-lg md:text-xl"
                                                                        }`}
                                                                >
                                                                    {item.title}
                                                                </h3>
                                                                {item.tags &&
                                                                    item.tags.map((tag) => (
                                                                        <span
                                                                            key={tag}
                                                                            className="border border-primary px-1 py-0.5 rounded text-[10px] font-bold text-primary uppercase tracking-widest"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                            </div>
                                                            {/* Mobile Price */}
                                                            <span className="font-geom text-xl font-bold text-primary md:hidden">
                                                                {item.price}
                                                            </span>
                                                        </div>
                                                        <p
                                                            className={`text-[#444] font-normal leading-relaxed ${isSeafoodPlateauDescription
                                                                ? "text-lg md:text-xl"
                                                                : "text-sm md:text-base"
                                                                }`}
                                                        >
                                                            {descriptionNode}
                                                        </p>
                                                    </div>

                                                    {/* Desktop Right Side: Image + Price */}
                                                    <div className="hidden md:flex items-center gap-6 shrink-0">
                                                        {item.image && (
                                                            <div className="relative w-32 h-24 overflow-hidden rounded bg-black/10">
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.title || category.title}
                                                                    fill
                                                                    sizes="200px"
                                                                    className="object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-500"
                                                                />
                                                            </div>
                                                        )}
                                                        <span className="font-geom text-2xl font-bold text-primary min-w-[3rem] text-right">
                                                            {item.price}
                                                        </span>
                                                    </div>

                                                    {/* Mobile Image (Below Desc) */}
                                                    {item.image && (
                                                        <div className="relative w-full h-32 flex-shrink-0 overflow-hidden rounded bg-black/10 md:hidden mt-2">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.title || category.title}
                                                                fill
                                                                sizes="(max-width: 767px) 100vw, 0px"
                                                                className="object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}

                {/* Vins Section */}
                <section
                    id="vins"
                    className="border border-primary p-8 md:p-12 text-center bg-transparent rounded-sm scroll-mt-40"
                >
                    <span className="material-symbols-outlined text-primary !text-5xl mb-3 block">
                        wine_bar
                    </span>
                    <h3 className="font-geom text-3xl md:text-5xl uppercase tracking-wide text-primary mb-4">
                        Carte Des Vins
                    </h3>
                    <p className="text-[#444] font-medium mb-8 max-w-md mx-auto">
                        Découvrez notre sélection de vins bio français, soigneusement choisis pour
                        accompagner nos plats.
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowWineModal(true)}
                        className="bg-primary text-[#EFE6D5] hover:bg-black px-8 py-3 text-sm font-bold tracking-widest uppercase transition-colors"
                    >
                        Voir Les Vins
                    </button>
                </section>
                {/* Sticky Mobile/Desktop Button - Stops before footer */}
                <div className="sticky bottom-6 w-full z-40 mt-12 pb-6">
                    <Link
                        href="/reservation"
                        className="w-full bg-primary text-[#EFE6D5] font-bold text-base py-4 shadow-xl shadow-black/20 active:scale-[0.98] transition-all uppercase tracking-widest flex items-center justify-center gap-3 border border-primary"
                    >
                        <span className="material-symbols-outlined text-[22px]">
                            calendar_today
                        </span>
                        Réserver une table
                    </Link>
                </div>
            </main>

            {showWineModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
                    onClick={() => setShowWineModal(false)}
                >
                    <div
                        className="relative bg-[#EFE6D5] max-w-4xl w-full max-h-[85vh] p-4 md:p-6 rounded shadow-2xl border border-primary/30 overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-geom text-2xl md:text-3xl uppercase tracking-wide text-primary">
                                Carte des vins
                            </h3>
                            <button
                                type="button"
                                className="text-primary hover:text-black font-bold text-lg"
                                onClick={() => setShowWineModal(false)}
                                aria-label="Fermer la carte des vins"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="relative w-full overflow-hidden rounded bg-black/5">
                            <Image
                                src="/common/carte_vin.webp"
                                alt="Carte des vins"
                                width={1200}
                                height={1600}
                                className="w-full h-auto object-contain max-h-[70vh] md:max-h-[75vh]"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
