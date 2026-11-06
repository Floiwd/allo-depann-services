import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { entreprise } from "@/data/entreprise";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

const villeSeo =
  entreprise.localisation.isZoneConfirmee && entreprise.localisation.villeSiege
    ? ` à ${entreprise.localisation.villeSiege}`
    : "";

const siteTitle = `Serrurier Dépannage d'Urgence${villeSeo} | ${entreprise.nom}`;
const siteDescription = `Besoin d'un serrurier en urgence${villeSeo} ? Dépannage rapide pour porte claquée, clé cassée, serrure bloquée. Tarif annoncé avant intervention. Contact direct au ${entreprise.telephone.display}.`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "serrurier",
    "dépannage serrurerie",
    "urgence serrurier",
    "ouverture de porte",
    "porte claquée",
    "clé cassée",
    "changement serrure",
    entreprise.nom,
  ],
  authors: [{ name: entreprise.nom }],
  creator: entreprise.nom,
  publisher: entreprise.nom,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: siteTitle,
    description: siteDescription,
    siteName: entreprise.nom,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: entreprise.nom,
    telephone: entreprise.telephone.raw,
    description: siteDescription,
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Check",
    ...(entreprise.localisation.isZoneConfirmee && entreprise.localisation.villeSiege
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: entreprise.localisation.villeSiege,
            addressCountry: "FR",
          },
        }
      : {}),
  };

  return (
    <html lang="fr" data-theme={siteConfig.defaultTheme} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
