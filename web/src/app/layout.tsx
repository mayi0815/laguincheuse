import type { Metadata } from "next";
import {
  Anton,
  Archivo_Narrow,
  Plus_Jakarta_Sans,
} from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "600", "700"],
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
});

const txManifesto = localFont({
  src: "../../public/txmanifesto.ttf",
  variable: "--font-manifesto",
  weight: "700",
  display: "swap",
});

const geom = localFont({
  src: "../../public/Geom-VariableFont_wght.ttf",
  variable: "--font-geom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Guincheuse | Bistrot & Bar à Paris",
  description:
    "Bistrot bar La Guincheuse à Paris : horaires, contact et demandes de réservation par email.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${plusJakarta.variable} ${anton.variable} ${archivoNarrow.variable} ${txManifesto.variable} ${geom.variable} antialiased bg-brand-bg text-brand-text`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
