# ALLO DEPANN'SERVICES — Données à Confirmer avant Mise en Ligne

Ce document recense l'ensemble des informations manquantes nécessaires pour finaliser le site vitrine officiel de **Allo Depann'Services** et assurer sa conformité légale et commerciale.

---

## 1. Photos et Visuels
- [ ] **Remplacer toutes les images illustratives par de vraies photos de chantiers** :
  - *Actuel* : 7 photographies illustratives générées par IA avec badge discret automatique « Photo illustrative » (`src/data/images.ts`).
  - *À fournir* : vraies photos de l'artisan (portes débloquées, serrures remplacées, cylindres haute sécurité, camionnette ou matériel).

---

## 2. Coordonnées & Localisation
- [ ] **Orthographe exacte de la dénomination commerciale** :
  - *Actuel* : `Allo Depann'Services` (ou Allo Dépann' Services)
- [ ] **Ville de base / Siège & Zone desservie** :
  - *À confirmer* : ville de rattachement principale et liste exacte des communes d'intervention prioritaires.
- [ ] **Email de réception des demandes** :
  - *Actuel* : variable d'environnement `CONTACT_TO_EMAIL`
  - *À confirmer* : l'adresse email professionnelle définitive de l'artisan.

---

## 3. Informations Juridiques & Légales Obligatoires
- [ ] **Numéro SIRET / RCS / RM**
- [ ] **Forme juridique & capital social**
- [ ] **Assurance Responsabilité Civile Professionnelle**

---

## 4. Disponibilité & Tarifs
- [ ] **Horaires réels et astreinte d'urgence**
- [ ] **Tarifs ou fourchettes autorisés à l'affichage public**

---

## 5. Photographies Réelles des Chantiers
- [ ] **Remplacement des schémas temporaires** :
  - La maquette intègre 16 schémas techniques vectoriels neutres dans `/public/placeholders/`.
  - *À fournir* (idéalement 1 à 3 photos haute définition par prestation) :
    1. Charpente (pose ou rénovation de fermettes/bois)
    2. Couverture tuiles / zinc / bac acier
    3. Zinguerie (gouttières, chéneaux, abergements de cheminée)
    4. Étanchéité (toit plat, solins)
    5. Démoussage (avant/après nettoyage et traitement hydrofuge)
    6. Habillage dessous de toit (rives, frisette PVC/alu)
    7. Fenêtres de toit (pose de Velux)
    8. Ramonage (conduits et poêles)
  - *4 paires Avant / Après* pour la galerie interactive.

---

## 6. Avis Clients & Témoignages
- [ ] **Avis certifiés à mettre en avant** :
  - *Donnée vérifiée* : 5/5 sur PagesJaunes (4 avis certifiés, dernier avis en juin 2023).
  - *À confirmer* : texte exact des avis que l'artisan souhaite citer avec l'accord des clients, ou lien vers d'autres plateformes (Google My Business si existant).

---

## 7. Nom de Domaine Officiel
- [ ] **Nom de domaine souhaité pour le déploiement** :
  - *Suggestions* : `tb-toitures-nancy.fr`, `tb-toitures.fr`, `tbtoitures-nancy.fr`
  - *À configurer* dans le dashboard Vercel une fois le domaine réservé.
