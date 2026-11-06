/**
 * CONFIGURATION DU SITE - ALLO DEPANN'SERVICES
 * 
 * Ce fichier configure les options de la maquette, notamment le sélecteur de styles.
 * Pour retirer le sélecteur de style flottant en production, changez simplement :
 * SHOW_STYLE_SWITCHER = false;
 */

// // SWITCH EN UNE SEULE LIGNE POUR DÉSACTIVER LE MENU FLOTTANT EN PRODUCTION
export const SHOW_STYLE_SWITCHER = true;

export const siteConfig = {
  nom: "Allo Depann'Services",
  defaultTheme: "urgence" as const,
  stylesDisponibles: [
    {
      id: "urgence",
      nom: "Urgence claire",
      description: "Fond clair, rouge signal d'alerte pour l'appel, lisibilité et contraste maximum pour les situations critiques.",
      accentColor: "#dc2626",
      ambiance: "Contraste fort, bouton d'appel rouge signal, orientation conversion immédiate",
    },
    {
      id: "sobre",
      nom: "Sérieux et sobre",
      description: "Bleu nuit profond et blanc, rassurant, typographie équilibrée, forte crédibilité institutionnelle.",
      accentColor: "#0284c7",
      ambiance: "Bleu de confiance, design posé et sérieux, réassurance technique",
    },
    {
      id: "moderne",
      nom: "Moderne épuré",
      description: "Noir, blanc, accent unique, grande typographie, structure minimale de style suisse / studio.",
      accentColor: "#18181b",
      ambiance: "Noir & blanc strict, grande typographie, lignes franches et contemporaines",
    },
    {
      id: "sombre",
      nom: "Sombre premium",
      description: "Fond anthracite profond, accents laiton et métal doré chaud, rendu haut de gamme discret.",
      accentColor: "#d4af37",
      ambiance: "Ambiance nocturne raffinée, métal brossé, contraste feutré",
    },
    {
      id: "chaleureux",
      nom: "Local et chaleureux",
      description: "Tons chauds naturels (terracotta, crème), formes arrondies, tonalité de proximité artisanale.",
      accentColor: "#c2410c",
      ambiance: "Artisan de quartier, formes douces, contact humain et direct",
    },
  ] as const,
};

export type ThemeId = (typeof siteConfig.stylesDisponibles)[number]["id"];
