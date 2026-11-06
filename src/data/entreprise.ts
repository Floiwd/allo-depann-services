/**
 * DONNÉES DE L'ENTREPRISE : ALLO DEPANN'SERVICES
 * 
 * RÈGLE D'EXACTITUDE STRICTE (PRIORITÉ ABSOLUE) :
 * - Aucune information n'est inventée (pas de fausse ville, pas de faux avis, pas d'années d'expérience,
 *   pas de délai inventé type "15 minutes", pas de promesse non vérifiée type "24h/24").
 * - Toutes les données à valider avec le client comportent la mention `// À CONFIRMER`.
 * - Ce fichier centralise l'intégralité des données modifiables pour tout mettre à jour en un seul endroit.
 */

export interface ServiceSituation {
  id: string;
  titre: string;
  descriptionCourte: string;
  descriptionDetaillee: string;
  placeholderImage: string;
  confirmed: boolean; // Si faux, n'est pas affiché publiquement
  niveauUrgenceDefaut: "maintenant" | "aujourdhui" | "planifie";
}

export interface ReassurancePoint {
  id: string;
  titre: string;
  description: string;
  confirmed: boolean;
}

export interface EntrepriseData {
  // Identification commerciale
  nom: string; // // À CONFIRMER : orthographe exacte (apostrophe, tiret, majuscules)
  nomLegal: string; // // À CONFIRMER : raison sociale ou nom de l'exploitant
  metier: string;
  baseline: string;

  // Contact vérifié
  telephone: {
    display: string;
    href: string;
    raw: string;
  };
  emailContact: string; // Reçu via process.env.CONTACT_TO_EMAIL

  // Localisation & Zone d'intervention
  // // À CONFIRMER : La zone et les villes seront fournies par le client
  localisation: {
    villeSiege: string; // // À CONFIRMER : Ville principale du siège
    adressePostale: string; // // À CONFIRMER : Adresse physique
    codePostal: string; // // À CONFIRMER : Code postal
    departement: string; // // À CONFIRMER : Département d'intervention
    zoneLibelle: string; // // À CONFIRMER : Libellé synthétique de zone (ex: "Secteur à définir avec le client")
    villesDesservies: string[]; // // À CONFIRMER : Liste exacte des communes desservies
    rayonKm: number | null; // // À CONFIRMER : Rayon d'action en kilomètres
    isZoneConfirmee: boolean; // Si faux, affiche un message neutre
  };

  // Horaires & Disponibilité
  // // À CONFIRMER : Horaires réels et politique de permanence d'urgence
  disponibilite: {
    horairesTexte: string; // // À CONFIRMER : ex. "Du lundi au samedi"
    plageUrgence: string; // // À CONFIRMER : modalité d'astreinte ou d'urgence
    isDisponibiliteConfirmee: boolean;
  };

  // Services et situations d'urgence
  services: ServiceSituation[];

  // Processus d'intervention en 3 étapes
  processus: {
    confirmed: boolean; // // À CONFIRMER : Validation du protocole d'intervention
    etapes: {
      numero: string;
      titre: string;
      description: string;
    }[];
  };

  // Éléments de réassurance (uniquement des engagements vérifiés/éthiques)
  reassurance: ReassurancePoint[];

  // Données légales & administratives
  legal: {
    siret: string; // // À CONFIRMER : Numéro SIRET (14 chiffres)
    rcsRm: string; // // À CONFIRMER : Immatriculation RCS ou Répertoire des Métiers
    tvaIntracommunautaire: string; // // À CONFIRMER : Numéro de TVA ou mention franchise
    formeJuridique: string; // // À CONFIRMER : Micro-entreprise, SARL, SASU, etc.
    capitalSocial: string; // // À CONFIRMER
    assuranceDecennaleRc: string; // // À CONFIRMER : Nom de la compagnie d'assurance RC Pro
    numeroContratAssurance: string; // // À CONFIRMER : Numéro de police d'assurance
    responsablePublication: string; // // À CONFIRMER : Nom du gérant ou responsable
    hebergeur: {
      nom: string;
      adresse: string;
    };
  };
}

export const entreprise: EntrepriseData = {
  // Nom vérifié
  // // À CONFIRMER : Orthographe exacte ("Allo Depann'Services", "Allo Dépann Services", etc.)
  nom: "Allo Depann'Services",
  nomLegal: "Allo Depann'Services", // // À CONFIRMER
  metier: "Serrurerie & Dépannage",
  baseline: "Dépannage d'urgence et ouverture de porte en serrurerie",

  // Téléphone vérifié
  telephone: {
    display: "06 99 77 32 36",
    href: "tel:+33699773236",
    raw: "+33699773236",
  },

  // Email de réception des demandes (ne jamais l'écrire en dur)
  // // À CONFIRMER : Adresse email réelle du client à renseigner dans CONTACT_TO_EMAIL
  emailContact: process.env.CONTACT_TO_EMAIL || "",

  // Zone d'intervention
  // // À CONFIRMER : Villes et rayon d'action exacts à fournir par le client
  localisation: {
    villeSiege: "", // // À CONFIRMER
    adressePostale: "", // // À CONFIRMER
    codePostal: "", // // À CONFIRMER
    departement: "", // // À CONFIRMER
    zoneLibelle: "Secteur d'intervention à confirmer avec le client", // Libellé neutre d'attente
    villesDesservies: [
      // // À CONFIRMER : Exemples de communes à valider par le client
      // "Commune 1", "Commune 2", "Commune 3"
    ],
    rayonKm: null, // // À CONFIRMER
    isZoneConfirmee: false, // Flag pour n'afficher que des éléments confirmés
  },

  // Disponibilité
  // // À CONFIRMER : Aucune promesse "24h/24" ou "15 minutes" sans validation écrite du client
  disponibilite: {
    horairesTexte: "Horaires et astreinte à confirmer", // // À CONFIRMER
    plageUrgence: "Assistance téléphonique directe",
    isDisponibiliteConfirmee: false,
  },

  // Situations d'urgence courantes (toutes renvoient au formulaire avec situation pré-sélectionnée)
  services: [
    {
      id: "porte-claquee",
      titre: "Porte claquée",
      descriptionCourte: "Clé restée à l'intérieur, porte claquée non verrouillée.",
      descriptionDetaillee: "Intervention ciblée par techniques fines (by-pass / radio) pour préserver la serrure et le cylindre dès que la configuration le permet.",
      placeholderImage: "/placeholders/porte-claquee.svg",
      confirmed: true, // Service standard de serrurerie
      niveauUrgenceDefaut: "maintenant",
    },
    {
      id: "cle-perdue-cassee",
      titre: "Clé perdue ou cassée",
      descriptionCourte: "Clé cassée dans le cylindre ou trousseau égaré.",
      descriptionDetaillee: "Extraction du morceau de clé cassé au moyen d'extracteurs spécialisés ou ouverture et remplacement du cylindre si nécessaire.",
      placeholderImage: "/placeholders/cle-perdue.svg",
      confirmed: true,
      niveauUrgenceDefaut: "maintenant",
    },
    {
      id: "serrure-bloquee",
      titre: "Serrure bloquée",
      descriptionCourte: "Clé tourne dans le vide, pêne coincé ou mécanisme dur.",
      descriptionDetaillee: "Diagnostic du mécanisme, déblocage mécanique sans forcer inutilement et réajustement ou changement de la pièce défectueuse.",
      placeholderImage: "/placeholders/serrure-bloquee.svg",
      confirmed: true,
      niveauUrgenceDefaut: "maintenant",
    },
    {
      id: "effraction-porte-forcee",
      titre: "Porte forcée / Après effraction",
      descriptionCourte: "Sécurisation immédiate et fermeture provisoire du logement.",
      descriptionDetaillee: "Mise en sécurité d'urgence après tentative ou cambriolage : fermeture provisoire, remplacement de serrure et attestation pour votre assurance.",
      placeholderImage: "/placeholders/effraction.svg",
      confirmed: true,
      niveauUrgenceDefaut: "maintenant",
    },
    {
      id: "changement-serrure",
      titre: "Changement de serrure",
      descriptionCourte: "Remplacement de barillet, nouveau logement ou vétusté.",
      descriptionDetaillee: "Remplacement de cylindre standard ou haute sécurité, pose de nouvelles serrures monopoint ou multipoints adaptées à votre porte.",
      placeholderImage: "/placeholders/changement-serrure.svg",
      confirmed: true,
      niveauUrgenceDefaut: "aujourdhui",
    },
    {
      id: "porte-blindee",
      titre: "Porte blindée",
      descriptionCourte: "Dépannage sur bloc-porte blindé et serrure de haute sécurité.",
      descriptionDetaillee: "Intervention technique sur portes blindées et serrures certifiées multipoints nécessitant outillage et savoir-faire spécifiques.",
      placeholderImage: "/placeholders/porte-blindee.svg",
      confirmed: true,
      niveauUrgenceDefaut: "maintenant",
    },
  ],

  // Processus en 3 étapes (affiché uniquement car validé par consigne)
  processus: {
    confirmed: true,
    etapes: [
      {
        numero: "01",
        titre: "Vous appelez en direct",
        description: "Échange immédiat par téléphone au 06 99 77 32 36. Vous décrivez le problème (porte claquée, serrure bloquée, clé perdue) et votre localisation.",
      },
      {
        numero: "02",
        titre: "Tarif annoncé avant départ",
        description: "Analyse de la situation et indication préalable du tarif de l'intervention avant tout déplacement. Aucune surprise sur place.",
      },
      {
        numero: "03",
        titre: "Intervention & Facture claire",
        description: "Intervention soignée avec outillage professionnel adapté. Remise immédiate d'une facture détaillée conforme pour vos démarches.",
      },
    ],
  },

  // Réassurance (aucun faux avis, aucune fausse certification)
  reassurance: [
    {
      id: "tarif-annonce",
      titre: "Tarif annoncé avant d'intervenir",
      description: "Vous connaissez le prix ou la fourchette d'intervention avant que le professionnel ne se déplace.",
      confirmed: true,
    },
    {
      id: "contact-direct",
      titre: "Contact direct sans plateforme intermédiaire",
      description: "Vous échangez directement avec le dépanneur au téléphone, sans centrale d'appel ni intermédiaire commissionné.",
      confirmed: true,
    },
    {
      id: "facture-conforme",
      titre: "Facture détaillée et transparente",
      description: "Chaque prestation donne lieu à une facture claire spécifiant main d'œuvre, déplacement et matériel éventuel.",
      confirmed: true,
    },
  ],

  // Données légales à compléter par le client
  legal: {
    siret: "", // // À CONFIRMER : 14 chiffres
    rcsRm: "", // // À CONFIRMER : ex. "RCS Ville XXX XXX XXX" ou "RM"
    tvaIntracommunautaire: "", // // À CONFIRMER : ex. "FRXX..." ou "Franchise en base de TVA (art. 293 B du CGI)"
    formeJuridique: "", // // À CONFIRMER : ex. "Entreprise individuelle" ou "SARL"
    capitalSocial: "", // // À CONFIRMER
    assuranceDecennaleRc: "", // // À CONFIRMER : Nom compagnie
    numeroContratAssurance: "", // // À CONFIRMER : N° police
    responsablePublication: "", // // À CONFIRMER
    hebergeur: {
      nom: "Vercel Inc.",
      adresse: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    },
  },
};
