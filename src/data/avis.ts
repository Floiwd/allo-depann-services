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
 * Registre centralisé des avis clients pour Allo Depann'Services.
 * Conformément à la règle de transparence et d'exactitude :
 * - Aucun avis n'est inventé ou fabriqué.
 * - Les cartes actuelles sont des gabarits illustratifs (isIllustrative: true).
 * - Le badge « Exemple illustratif » disparaît automatiquement dès qu'un avis réel
 *   est saisi et validé avec autorisationClient: true et isIllustrative: false.
 */
export const avisClients: AvisClient[] = [
  {
    id: "avis-gabarit-1",
    texte: "Emplacement pour un avis client : le texte réel sera ajouté après validation par l'entreprise.",
    prenom: "Client",
    initialeNom: "",
    travaux: "Ouverture de porte claquée",
    mois: "À venir",
    note: 5,
    source: "direct",
    autorisationClient: false,
    isIllustrative: true,
  },
  {
    id: "avis-gabarit-2",
    texte: "Emplacement pour un avis client : le texte réel sera ajouté après validation par l'entreprise.",
    prenom: "Client",
    initialeNom: "",
    travaux: "Remplacement de cylindre de sécurité",
    mois: "À venir",
    note: 5,
    source: "direct",
    autorisationClient: false,
    isIllustrative: true,
  },
  {
    id: "avis-gabarit-3",
    texte: "Emplacement pour un avis client : le texte réel sera ajouté après validation par l'entreprise.",
    prenom: "Client",
    initialeNom: "",
    travaux: "Mise en sécurité serrurerie",
    mois: "À venir",
    note: 5,
    source: "direct",
    autorisationClient: false,
    isIllustrative: true,
  },
];
