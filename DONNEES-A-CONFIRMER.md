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
- [ ] **Remplacement des photos illustratives par de vraies photos d'intervention** :
  - La maquette intègre actuellement 7 photographies illustratives réalistes dans `/public/images/illustratives/`.
  - *À fournir* : 3 à 7 vraies photos d'interventions de l'artisan (portes débloquées, cylindres de haute sécurité posés, serrure multipoints, véhicule d'intervention).

---

## 6. Avis Clients & Témoignages
- [ ] **Obtenir 3 à 5 avis réels avec l'accord du client, le lien d'avis Google de l'entreprise et la note Google réelle.**
  - *Actuel* : Gabarits illustratifs neutres (sans note chiffrée, sans avis inventé, badge « Exemple illustratif » automatique via `src/data/avis.ts`).
  - *À fournir dès que possible* :
    - 3 à 5 avis clients réels avec l'accord écrit préalable du client pour publication sur le site.
    - Le lien d'avis Google My Business pour alimenter le bouton « Laisser un avis ».
    - La note moyenne Google vérifiable (le cas échéant).

---

## 7. Nom de Domaine Officiel
- [ ] **Nom de domaine souhaité pour le déploiement** :
  - *Suggestions* : `allo-depann-services.fr`, `allodepannservices.fr`
  - *Déploiement actuel* : `https://allo-depann-services.vercel.app`
