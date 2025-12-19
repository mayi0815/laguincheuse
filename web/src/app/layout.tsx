import type { Metadata } from "next";
import {
  Anton,
  Archivo_Narrow,
  Plus_Jakarta_Sans,
} from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import { CookieNotice } from "@/components/CookieNotice";

const isProduction = process.env.NODE_ENV === "production";

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

const sullivan = localFont({
  src: "../../public/Sullivan-Fill.otf",
  variable: "--font-sullivan",
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
        className={`${plusJakarta.variable} ${anton.variable} ${archivoNarrow.variable} ${txManifesto.variable} ${geom.variable} ${sullivan.variable} antialiased bg-brand-bg text-brand-text`}
      >
        {isProduction && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-4H2D4KE5W5"
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-4H2D4KE5W5');
              `}
            </Script>
          </>
        )}
        {children}
        <CookieNotice />
        <Analytics />
      </body>
    </html>
  );
}
