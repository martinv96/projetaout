# CookerMaster - Site de recettes de cuisine

Cookmaster est une application web de recettes de cuisine. Elle propose des recettes simples, avec étapes illustrées, astuces cullinaires et un quiz interactif.

Le projet est une application Next.js pensée pour être utilisé sur mobile ou sur ordinateur.

---

## Fonctionnalités

- **Accueil cullinaire :** mise en avant de recettes, citation du jour et astuces de cuisine
- **Catalogue de recettes :** recherche par nom et affichage moderne (cards)
- **Fiches détaillées :** ingrédients, étapes de préparation illustrées et conseils
- **Quiz interactif :** questions à choix multiples, score final et chronomètre de 10 secondes
- **Newsletter :** envoi d'un e-mail de bienvenu avec rappel et lien vers les recettes
- **Contact :** formulaire de contact avec notification par e-mail
- **Interface responsive :** navigation et contenus adaptés aux écrans mobiles et pc
- **Animations :** transitions et apparitions réalisées avec Framer Motion

## Stack technique

- **Framework :** Next.js 15 App Router
- **Langage :** TypeScript et JavaScript
- **Interface :** React 19 et Tailwind CSS 4
- **Animations :** Framer Motion
- **Icones :** Lucide React
- **E-mails :** API Brevo via les Routes Handlers Next.js
- **Déploiement recommandé :** Vercel

Les recettes et leurs images sont stockées localement dans le projet. Aucune base de données n'est nécessaire pour le fonctionnement actuel du catalogue.

## Prérequis

- Node.js 20 ou version supérieure recommandée
- npm
- Un compte Brevo et une clé API pour activer le contact et la newsletter

## Installation locale

Cloner le projet, installer les dépendances, puis lancer le serveur de développement :

```bash
git clone <url-du-depot>
cd projetaout
npm install
npm run dev
```

L'application est ensuite disponible à l'adresse [http://localhost:3000](http://localhost:3000).

## Configuration des e-mails

Créer un fichier `.env.local` à la racine du projet :

```bash
BREVO_API_KEY=votre-clé-api-brevo
BREVO_SENDER_EMAIL=no-reply@example.com
BREVO_SENDER_NAME=CookMaster
BREVO_CONTACT_EMAIL=votre-adresse-de-contact@example.com
```

Variables utilisées :

- `BREVO_API_KEY`: clé d'authentification de l'API Brevo
- `BREVO_SENDER_EMAIL`: adresse utilisée comme expéditeur
- `BREVO_SENDER_NAME`: nom affiché comme expéditeur, optionnel
- `BREVO_CONTACT_EMAIL`: adresse qui recoit les messages du formulaire de contact

Ne jamais versionner `.env.local` ni exposer la clé Brevo dans un composant client. Les variables sont lues uniquement par les routes serveur :

- `POST /api/contact`
- `POST /api/subscribe`

## Commandes utiles

```bash
# lancer le serveur de développement
npm run build

# Vérifier la compilation de production
npm run build

# Vérifier la compilation de production
npm run build

# lancer la version de production après le build
npm run start

#Lancer ESLint
npm run lint
```

## Organisation du projet

```text
src/
    app/
        page.tsx                # page d'accueil
        about/                  # présentation de CookMaster
        contact/                # Formulaire de contact
        quiz/                   # Quiz culinaire chronométré
        recipes/                # Catalogue et fiches recettes
        viandes/                # Catalogue et fiches recettes de viande
        api/contact/            # Envoi des messages de contact
        api/subcribe/           # Inscription à la newsletter
        components/             # Header, footer et composants partagés
    data/
        recipes.ts              # Données des recettes principales
        viandes.ts              # Données des recettes de viande
public/
    steps/                      # Images utilisées pour les étapes de préparations
```

## Ajouter une recette

Les recettes principales sont définies dans `src/data/recipes.ts`et les recettes de viande dans `src/data/viandes.ts`.

Chaque recette contient au minimum :

```ts
{
    id: "6",
    title: "Nom de la recette",
    description: "Description courte",
    image: "/non-image.jpg",
    ingredients: ["Ingrédient 1"],
    steps: [
        { text: "Première étape", image: "/steps/nom-recette/step1.jpg" }
    ],
    tips: ["Conseil de préparation"]
}
```

les images principales doivent être ajoutées dans `public/`. Les images des étapes doivent respecter le chemin déclaré dans la recette, par exemple `public/steps/nom-recette/step1.jpg`.

## Déploiement

Le déploiement peut être réalisé directement avec Vercel :

1. Importer le dépot Git dnas Vercel.
2. Conserver la commande de build `npm run build`.
3. Ajouter les variables `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDEER_NAME`et `BREVO_CONTACT_EMAIL` dans les variables d'environnement Vercel.
4. Déployer l'application.

Avant chaque mise en production, vérifier la compilation et les deux parcours e-mail : inscription à la newsletter et envoi du formulaire de contact.

## Ressouces

-[Documentation Next.js](https://next.js.org/docs)
-[Documentation Reac](htpps://react.dev/)
-[Documentation Tailwind CSS](https://tailwind.com/docs)
-[Documentation Framer Motion](https://motion.dev/docs)
-[Documentation Brevo API](https://developers.brevo.com/)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font),a new font family for Vercel.

## Learn More

To learn more about next;js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [learn next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js Github repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platfrom](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment deocumentation](https:nextjs.org/docs/app/building-your-application/deploying) for more details.
