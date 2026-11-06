/**
 * CONFIGURATION DES IMAGES DU SITE - ALLO DEPANN'SERVICES
 *
 * RÈGLE DE TRANSPARENCE ABSOLUE :
 * En l'absence de photos réelles fournies par l'artisan, les images ci-dessous sont
 * des photographies illustratives représentatives du métier.
 * Chaque image porte le drapeau `isIllustrative: true` qui affiche automatiquement
 * un badge discret « Photo illustrative » à l'écran.
 *
 * Pour remplacer une image par une vraie photo de l'artisan :
 * 1. Déposez la photo dans /public/images/
 * 2. Modifiez `src` ci-dessous
 * 3. Passez `isIllustrative: false` (le badge disparaîtra automatiquement)
 */

export interface SiteImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  usage: string;
  isIllustrative: boolean;
  placeholderFallback: string;
}

export const siteImages: Record<string, SiteImage> = {
  hero: {
    id: "hero",
    src: "/images/illustratives/hero-serrurerie.webp",
    alt: "Illustration : Porte d'entrée résidentielle moderne avec poignée en inox et serrure de haute sécurité",
    width: 1400,
    height: 781,
    usage: "En-tête principal du site (Hero)",
    isIllustrative: true,
    placeholderFallback: "/placeholders/porte-claquee.svg",
  },
  "porte-claquee": {
    id: "porte-claquee",
    src: "/images/illustratives/porte-claquee.webp",
    alt: "Illustration : Porte d'entrée d'appartement fermée avec serrure à cylindre européen propre",
    width: 1000,
    height: 746,
    usage: "Fiche d'intervention Porte claquée",
    isIllustrative: true,
    placeholderFallback: "/placeholders/porte-claquee.svg",
  },
  "cle-perdue": {
    id: "cle-perdue",
    src: "/images/illustratives/cle-perdue.webp",
    alt: "Illustration : Trousseau de clés de sécurité crantées posé à plat sur une table en bois",
    width: 1000,
    height: 746,
    usage: "Fiche d'intervention Clé perdue ou cassée",
    isIllustrative: true,
    placeholderFallback: "/placeholders/cle-perdue.svg",
  },
  "serrure-bloquee": {
    id: "serrure-bloquee",
    src: "/images/illustratives/serrure-bloquee.webp",
    alt: "Illustration : Gros plan sur un cylindre de serrure européen de précision en laiton",
    width: 1000,
    height: 746,
    usage: "Fiche d'intervention Serrure bloquée",
    isIllustrative: true,
    placeholderFallback: "/placeholders/serrure-bloquee.svg",
  },
  "porte-forcee": {
    id: "porte-forcee",
    src: "/images/illustratives/effraction.webp",
    alt: "Illustration : Porte d'entrée sécurisée avec cornière anti-pince et gâche renforcée en acier",
    width: 1000,
    height: 746,
    usage: "Fiche d'intervention Sécurisation après effraction",
    isIllustrative: true,
    placeholderFallback: "/placeholders/effraction.svg",
  },
  "changement-serrure": {
    id: "changement-serrure",
    src: "/images/illustratives/changement-serrure.webp",
    alt: "Illustration : Cylindre de sécurité neuf en laiton satiné avec ses clés de précision",
    width: 1000,
    height: 746,
    usage: "Fiche d'intervention Changement de serrure et cylindre",
    isIllustrative: true,
    placeholderFallback: "/placeholders/changement-serrure.svg",
  },
  "porte-blindee": {
    id: "porte-blindee",
    src: "/images/illustratives/porte-blindee.webp",
    alt: "Illustration : Porte d'entrée blindée contemporaine avec serrure multipoints de sécurité",
    width: 1000,
    height: 746,
    usage: "Fiche d'intervention Porte blindée",
    isIllustrative: true,
    placeholderFallback: "/placeholders/porte-blindee.svg",
  },
};
