# Allo Depann'Services — Maquette Vitrine & Urgence Serrurerie

Site vitrine haute performance conçu pour **Allo Depann'Services** (serrurerie & dépannage d'urgence), prêt pour un déploiement instantané sur **Vercel** (Next.js App Router, TypeScript, Tailwind CSS).

---

## 🎯 Objectif & Contexte d'urgence

Une personne bloquée sur son palier (porte claquée, clé cassée, serrure bloquée) clique sur le premier résultat sur son smartphone.  
**Le but unique du site : permettre d'appeler le 06 99 77 32 36 ou d'envoyer une demande d'intervention en moins de 10 secondes.**

- **Mobile-first absolu** : Bandeau d'appel fixe en haut avec cible tactile large (> 48px).
- **Règles Apple Design & Heydamir/Unslop respectées à la lettre** :
  - Aucun dégradé violet ou néon gratuit.
  - Aucun emoji décoratif dans les boutons, titres ou badges (remplacés par des icônes vectorielles nettes et une typographie précise).
  - Aucune carte générique répétitive.
  - Textes directs, honnêtes, sans jargon marketing vague.
- **Règle d'exactitude stricte** :
  - Aucune fausse commune, aucun faux délai (« 15 minutes » ou « 24h/24 » exclus sans confirmation écrite), aucun faux avis, aucun faux tarif.
  - Toutes les données modifiables sont centralisées dans [`src/data/entreprise.ts`](./src/data/entreprise.ts).
  - Le fichier [`DONNEES-A-CONFIRMER.md`](./DONNEES-A-CONFIRMER.md) dresse la liste exhaustive des éléments à faire valider par le client.

---

## 🎨 Sélecteur de styles en direct (5 Directions)

Pour permettre au client de choisir son identité visuelle favorite, un menu flottant discret permet de basculer instantanément entre 5 directions artistiques :

1. **Urgence claire** : Fond blanc épuré, bouton d'appel rouge signal, contraste et lisibilité immédiate.
2. **Sérieux et sobre** : Bleu nuit profond et blanc, rassurant, structure corporate équilibrée.
3. **Moderne épuré** : Noir et blanc strict, grande typographie, structure minimale de style suisse.
4. **Sombre premium** : Fond anthracite, accents laiton et métal doré chaud, rendu feutré.
5. **Local et chaleureux** : Tons chauds terracotta et crème, formes douces et arrondies, proximité artisanale.

- Le choix est mémorisé dans le `localStorage` du navigateur.
- Un bouton **« Valider et envoyer ce style »** génère un résumé prêt à être copié par le client pour vous faire part de son choix.
- **Désactivation en une ligne pour la production** :
  Dans [`src/config/site.ts`](./src/config/site.ts), passez simplement :
  ```ts
  export const SHOW_STYLE_SWITCHER = false;
  ```

---

## ⚡ Formulaire d'urgence & API `/api/devis`

- **Temps de saisie record** : Seul le numéro de téléphone et la commune sont obligatoires.
- **Synchronisation interactive** : Cliquer sur une carte d'urgence (porte claquée, clé perdue, serrure bloquée, etc.) pré-remplit automatiquement le formulaire.
- **Sécurité & Anti-spam** :
  - Validation des données avec **Zod** côté serveur.
  - Champ pot de miel (**honeypot**) invisible bloquant les robots.
  - **Rate-limiting par adresse IP** en mémoire (5 requêtes max par 10 minutes) sans base de données.
- **Envoi d'email optimisé pour smartphone via Resend** :
  - Objet clair : `Demande d'intervention : [situation] à [commune]`
  - Numéro de téléphone du demandeur cliquable immédiatement en grand au début de l'email pour rappeler en un geste depuis un smartphone.
  - Répondre directement (reply-to) à l'email du client s'il est renseigné.
  - Mode simulation automatique : si `RESEND_API_KEY` n'est pas configuré (tests locaux ou démonstration), la soumission affiche un succès sans planter.

---

## 🛠️ Installation & Démarrage local

### Prérequis
- Node.js 18+ (recommandé Node.js 20+)
- npm ou pnpm

### Commandes
```bash
# 1. Cloner ou ouvrir le projet
cd "Idee Vente de Site a Metz"

# 2. Installer les dépendances
npm install

# 3. Copier le fichier d'environnement
cp .env.example .env.local

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🔑 Variables d'environnement

Consultez `.env.example`. Deux variables principales sont utilisées :

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `CONTACT_TO_EMAIL` | Adresse de réception des demandes du client | `contact@allodepannservices.fr` |
| `RESEND_API_KEY` | Clé d'API Resend pour l'envoi d'emails réels | `re_123456...` |
| `RESEND_FROM_EMAIL` | Adresse d'expédition (optionnel) | `Allo Depann'Services <onboarding@resend.dev>` |
| `NEXT_PUBLIC_SITE_URL` | URL pour robots.txt et sitemap.xml | `https://allo-depann-services.vercel.app` |

---

## 🚀 Déploiement sur Vercel

### Option 1 : Déploiement via le CLI Vercel
```bash
npm install -g vercel
vercel
# Suivre les invites pour lier le projet
vercel --prod
```

### Option 2 : Déploiement via GitHub / Vercel Dashboard
1. Poussez le dépôt sur GitHub / GitLab.
2. Importez le projet dans votre tableau de bord [Vercel](https://vercel.com).
3. Ajoutez les variables d'environnement `CONTACT_TO_EMAIL` et `RESEND_API_KEY` dans les paramètres de votre projet Vercel (*Settings > Environment Variables*).
4. Cliquez sur **Deploy**.

---

## 📄 Données à confirmer

Consultez le document dédié [`DONNEES-A-CONFIRMER.md`](./DONNEES-A-CONFIRMER.md) pour obtenir la grille d'audit complète à valider avec l'artisan avant ouverture au public.
