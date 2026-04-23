// ================================================================
// API — Couche d'abstraction données / CMS
//
// Actuellement : données statiques depuis lib/data.ts
//
// Pour brancher Sanity CMS :
//   1. npm install @sanity/client
//   2. Remplacer le corps des fonctions par des requêtes GROQ
//   3. Exemple : const data = await client.fetch(`*[_type == "accommodation"]`)
//
// Pour brancher Contentful :
//   1. npm install contentful
//   2. Remplacer par : const entries = await client.getEntries({ content_type: 'accommodation' })
//
// Pour brancher une API REST :
//   1. const res = await fetch(`${process.env.API_URL}/accommodations`, { next: { revalidate: 3600 } })
//   2. const data = await res.json()
// ================================================================

import {
  ACCOMMODATIONS_DATA,
  EXPERIENCES_DATA,
} from './data';

import type { Accommodation, Experience } from './types';

// Simule une latence réseau en développement (optionnel)
// const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ----------------------------------------------------------------
// Hébergements
// ----------------------------------------------------------------

export async function getAccommodations(): Promise<Accommodation[]> {
  // À remplacer par un fetch CMS :
  // const res = await fetch(`${process.env.CMS_API_URL}/accommodations`, {
  //   next: { revalidate: 3600 }, // revalide toutes les heures
  // });
  // return res.json();

  return ACCOMMODATIONS_DATA;
}

export async function getAccommodationBySlug(
  slug: string,
): Promise<Accommodation | undefined> {
  const list = await getAccommodations();
  return list.find((a) => a.slug === slug);
}

export async function getFeaturedAccommodation(): Promise<Accommodation | undefined> {
  const list = await getAccommodations();
  return list.find((a) => a.featured);
}

// ----------------------------------------------------------------
// Expériences
// ----------------------------------------------------------------

export async function getExperiences(): Promise<Experience[]> {
  return EXPERIENCES_DATA;
}

// ----------------------------------------------------------------
// Configuration du site (pour une intégration CMS)
// ----------------------------------------------------------------

export interface SiteConfig {
  domain:      string;
  phone:       string;
  email:       string;
  address:     string;
  socialLinks: { platform: string; url: string }[];
  openingInfo: string;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  // Remplacer par un fetch de configuration CMS
  return {
    domain:      'www.lanniron.com',
    phone:       '02 98 90 02 00',
    email:       'contact@lanniron.com',
    address:     'Allée de Lanniron, 29000 Quimper',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'facebook',  url: 'https://facebook.com' },
      { platform: 'youtube',   url: 'https://youtube.com' },
    ],
    openingInfo: 'Ouvert toute l\'année',
  };
}
