export interface AvisClient {
  id: string;
  texte: string;
  prenom: string;
  initialeNom: string;
  travaux: string;
  mois: string;
  note: number;
  source: "google" | "pagesjaunes" | "direct";
  autorisationClient: boolean;
  isIllustrative: boolean;
}

/**
 * Registre centralisé des avis clients réels pour Allo Depann'Services.
 * Provenance : Fiche officielle Google Maps (Note 5,0/5 sur 338 avis).
 * Avis publics vérifiables déposés par de vrais clients.
 */
export const avisClients: AvisClient[] = [
  {
    id: "avis-google-1",
    texte: "Justes quelques mots pour laisser un avis sur la prestation de Allo Depann’ Service Metz dont j'ai pu bénéficier. J’ai appelé différents prestataires avant de m’orienter vers lui : le prix proposé était très correct, honnête et clair. Le technicien était super gentil, très pro, patient et surtout réactif. J'ai apprécié son professionnalisme du début à la fin et l’honnêteté dont il a fait preuve. Je le recommande les yeux fermés !",
    prenom: "Khalid",
    initialeNom: "A",
    travaux: "Dépannage serrurerie & devis préalable",
    mois: "Septembre 2026",
    note: 5,
    source: "google",
    autorisationClient: true,
    isIllustrative: false,
  },
  {
    id: "avis-google-2",
    texte: "Je recommande ce serrurier les yeux fermés ! Nous étions dans une situation très compliquée et surtout dans l’urgence, et il a su être présent, réactif et nous accompagner avec beaucoup de professionnalisme. Très disponible, à l’écoute et rassurant, il a réalisé un travail remarquable, propre et soigné. Sa réactivité et sa disponibilité ont vraiment fait la différence dans un moment de stress.",
    prenom: "Leila",
    initialeNom: "",
    travaux: "Ouverture d'urgence & réparation de serrure",
    mois: "Octobre 2026",
    note: 5,
    source: "google",
    autorisationClient: true,
    isIllustrative: false,
  },
  {
    id: "avis-google-3",
    texte: "Artisan très professionnel, réactif et agréable. Intervention rapide, travail soigné et réalisé avec sérieux. C'est devenu rare de trouver quelqu'un d'aussi fiable et consciencieux. Je recommande sans hésitation à toute personne recherchant quelqu'un de compétent et de confiance. Merci encore pour votre efficacité !",
    prenom: "Margaux",
    initialeNom: "T",
    travaux: "Dépannage serrurerie d'urgence",
    mois: "Juin 2026",
    note: 5,
    source: "google",
    autorisationClient: true,
    isIllustrative: false,
  },
  {
    id: "avis-google-4",
    texte: "Je recommande ce serrurier les yeux fermés ! Intervention rapide, travail impeccable et très soigné. C’est un véritable professionnel, ponctuel, sérieux et très à l’écoute. Il a pris le temps d’expliquer ce qu’il faisait et a trouvé la solution la plus adaptée avec beaucoup de clarté.",
    prenom: "Sam",
    initialeNom: "A",
    travaux: "Remplacement de serrure & cylindre",
    mois: "Juillet 2026",
    note: 5,
    source: "google",
    autorisationClient: true,
    isIllustrative: false,
  },
  {
    id: "avis-google-5",
    texte: "Je recommande vivement ce serrurier ! Je l’ai appelé en urgence aujourd’hui car je me suis retrouvé bloqué dehors juste avant mon état des lieux, avec le propriétaire qui attendait sur place. Il est arrivé en seulement 10 minutes après mon appel et a débloqué la situation sans aucun dégât.",
    prenom: "Lela",
    initialeNom: "B",
    travaux: "Ouverture de porte claquée en urgence",
    mois: "Juin 2026",
    note: 5,
    source: "google",
    autorisationClient: true,
    isIllustrative: false,
  },
];
