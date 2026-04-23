# L'Orangerie de Lanniron — Site web premium

Site vitrine immersif pour le domaine de Lanniron à Quimper, Finistère.
Construit avec Next.js 14, GSAP, Lenis, Framer Motion et Tailwind CSS.

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Stack technique

| Technologie | Usage |
|---|---|
| Next.js 14 (App Router) | Framework React, SSR, optimisation images |
| TypeScript | Typage strict de bout en bout |
| Tailwind CSS | Utilitaires de layout et responsive |
| GSAP + ScrollTrigger | Animations parallaxe et scroll |
| Lenis | Smooth scroll fluide |
| Framer Motion | Micro-animations cartes et filtres |

## Structure du projet

```
app/
  layout.tsx          → Layout racine (fonts, metadata, LenisProvider)
  page.tsx            → Page principale (Server Component)
  globals.css         → Design tokens, reset, composants partagés

components/
  animations/
    LenisProvider.tsx → Provider smooth scroll + sync GSAP
    useParallax.ts    → Hook parallaxe (speed configurable)
    useReveal.ts      → Hook révélation au scroll
  layout/
    Nav.tsx           → Navigation sticky glassmorphism
    Footer.tsx        → Footer 4 colonnes
  sections/
    Hero.tsx          → Hero plein écran + parallaxe
    Manifeste.tsx     → Section éditoriale avec parallaxe image
    Experiences.tsx   → Grille d'expériences
    Accommodations.tsx→ Explorateur avec filtres complets
    Featured.tsx      → Hébergement en vedette
    Territoire.tsx    → Domaine / localisation
    BookingCta.tsx    → CTA réservation avec formulaire
  ui/
    AccommodationCard.tsx → Carte hébergement avec favoris
    FilterBar.tsx         → Barre de filtres sticky avancée

lib/
  types.ts            → Interfaces TypeScript + helpers de filtre
  data.ts             → Données statiques (seed)
  api.ts              → Couche abstraction CMS (à remplacer)

hooks/
  useMediaQuery.ts    → Media queries réactives
```

## Brancher un CMS

Toutes les données passent par `lib/api.ts`. Pour brancher Sanity, Contentful ou une API REST :

```ts
// lib/api.ts — remplacer le corps des fonctions

// Sanity
import { client } from './sanity'
export async function getAccommodations() {
  return client.fetch(`*[_type == "accommodation"] | order(priceFrom asc)`)
}

// Contentful
import { createClient } from 'contentful'
const contentful = createClient({ space: '...', accessToken: '...' })
export async function getAccommodations() {
  const entries = await contentful.getEntries({ content_type: 'accommodation' })
  return entries.items.map(mapContentfulAccommodation)
}

// API REST
export async function getAccommodations() {
  const res = await fetch(`${process.env.API_URL}/accommodations`, {
    next: { revalidate: 3600 }, // cache 1h côté Next.js
  })
  return res.json()
}
```

## Variables d'environnement

Créer `.env.local` à la racine :

```env
# Pour le CMS (optionnel)
CMS_API_URL=https://your-cms.io/api
NEXT_PUBLIC_BOOKING_URL=https://booking.lanniron.com
```

## Performance

- Images Unsplash → remplacer par des images `.webp` dans `/public/images/`
- `next/image` avec `sizes` adaptatifs pour chaque breakpoint
- GSAP ScrollTrigger avec `once: true` sur les révélations
- Parallaxe désactivé sur mobile (`max-width: 768px`)
- `prefers-reduced-motion` respecté sur tous les effets

## Déploiement

```bash
npm run build
npm run start
# ou déployer sur Vercel : vercel --prod
```
