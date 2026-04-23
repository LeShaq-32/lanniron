// ================================================================
// DATA — Données statiques (seed)
// Pour brancher un CMS : remplacer ces exports par des fetch()
// dans lib/api.ts — ces interfaces restent identiques.
// ================================================================

import type { Accommodation, Experience } from './types';

// ----------------------------------------------------------------
// Hébergements
// ----------------------------------------------------------------

export const ACCOMMODATIONS_DATA: Accommodation[] = [
  {
    id:          '1',
    slug:        'cottage-magnolia',
    name:        'Cottage Magnolia',
    type:        'Cottage',
    capacity:    4,
    bedrooms:    2,
    bathrooms:   1,
    priceFrom:   185,
    features:    ['Terrasse', 'Vue jardin', 'Animaux acceptés', 'Cuisine équipée'],
    badge:       'Coup de cœur',
    description: 'Un havre de sérénité niché au cœur du parc arboré. Baies vitrées donnant sur les massifs de magnolias.',
    longDesc:    'Le Cottage Magnolia est l\'un des hébergements les plus prisés du domaine. Situé à l\'écart des allées principales, il offre une intimité rare avec une vue directe sur le parc historique. La terrasse couverte, idéale pour les matins bretons, prolonge l\'espace de vie vers les jardins.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=82',
        alt: 'Cottage Magnolia entouré de végétation, terrasse avec vue sur le parc',
      },
    ],
    featured:   false,
    minNights:  2,
    surface:    65,
  },
  {
    id:          '2',
    slug:        'suite-orangerie',
    name:        'Suite Orangerie',
    type:        'Villa',
    capacity:    6,
    bedrooms:    3,
    bathrooms:   2,
    priceFrom:   245,
    features:    ['Climatisation', 'Terrasse', 'Vue château', 'Cuisine équipée', 'Lave-linge'],
    badge:       'Signature',
    description: 'Dans les dépendances de l\'Orangerie historique, une suite d\'exception mêlant pierre bretonne et mobilier contemporain.',
    longDesc:    'Aménagée dans les volumes de l\'Orangerie du XVIIe siècle, cette suite exceptional bénéficie de plafonds hauts, de murs en pierre apparente et d\'une vue privilégiée sur les terrasses du château. Trois chambres soignées, une grande cuisine ouverte et deux salles de bain.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=82',
        alt: 'Suite Orangerie — façade et terrasse avec vue sur le château',
      },
    ],
    featured:   false,
    minNights:  3,
    surface:    120,
  },
  {
    id:          '3',
    slug:        'lodge-foret',
    name:        'Lodge Forêt',
    type:        'Lodge',
    capacity:    4,
    bedrooms:    2,
    bathrooms:   1,
    priceFrom:   145,
    features:    ['Bois chauffant', 'Vue rivière', 'Terrasse bois', 'Animaux acceptés'],
    badge:       undefined,
    description: 'Un lodge en bois noble au plus proche de la nature. Chaleureux, discret, face au cours de l\'Odet.',
    longDesc:    'Le Lodge Forêt est construit en bois de mélèze et de douglas, matériaux nobles qui lui conferent un caractère naturel et chaleureux. Depuis sa terrasse, le murmure de l\'Odet et le chant des oiseaux rythment les journées.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=82',
        alt: 'Lodge Forêt en bois dans les sous-bois du domaine',
      },
    ],
    featured:   false,
    minNights:  2,
    surface:    55,
  },
  {
    id:          '4',
    slug:        'villa-lanniron',
    name:        'Villa Lanniron',
    type:        'Villa',
    capacity:    8,
    bedrooms:    4,
    bathrooms:   3,
    priceFrom:   385,
    features:    ['Climatisation', 'Piscine privée', 'Vue jardin', 'Vue château', 'Terrasse', 'Cuisine équipée', 'Lave-linge', 'Parking privé'],
    badge:       'Prestige',
    description: 'La villa la plus prestigieuse du domaine. Grande terrasse panoramique, piscine privée, face aux jardins du château.',
    longDesc:    'La Villa Lanniron représente le summum de l\'expérience Lanniron. Sur deux niveaux, elle offre 4 chambres dont une suite parentale, une grande cuisine ouverte sur le salon, et une terrasse panoramique dominant les jardins à la française. La piscine privée chauffée complète cet ensemble d\'exception.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=82',
        alt: 'Villa Lanniron — terrasse panoramique avec vue sur les jardins du château',
      },
    ],
    featured:   true,
    minNights:  4,
    surface:    200,
    isNew:      false,
  },
  {
    id:          '5',
    slug:        'tente-riviere',
    name:        'Tente Rivière',
    type:        'Glamping',
    capacity:    2,
    bedrooms:    1,
    bathrooms:   1,
    priceFrom:   120,
    features:    ['Vue rivière', 'Animaux acceptés', 'Isolé', 'Terrasse bois'],
    badge:       'Romantique',
    description: 'Une tente lodge romantique au bord de l\'Odet. Pour se reconnecter à l\'essentiel, deux.',
    longDesc:    'La Tente Rivière est notre hébergement le plus intime. Implantée sur une plateforme en bois surplombant l\'Odet, elle offre une connexion directe avec la nature bretonne. La tente toile de haute qualité, le lit king-size et la terrasse face à la rivière en font l\'adresse idéale pour un séjour romantique.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1537565266759-34e6b88ead28?auto=format&fit=crop&w=900&q=82',
        alt: 'Tente lodge de glamping au bord de l\'Odet',
      },
    ],
    featured:   false,
    minNights:  2,
    surface:    30,
    isNew:      true,
  },
  {
    id:          '6',
    slug:        'roulotte-prestige',
    name:        'Roulotte Prestige',
    type:        'Roulotte',
    capacity:    4,
    bedrooms:    2,
    bathrooms:   1,
    priceFrom:   165,
    features:    ['Terrasse bois', 'Vue jardin', 'Poêle à bois', 'Animaux acceptés'],
    badge:       undefined,
    description: 'Une roulotte vintage entièrement rénovée. Décor soigné entre brocante bretonne et confort moderne.',
    longDesc:    'Entièrement restaurée et décorée par des artisans locaux, la Roulotte Prestige joue la carte de l\'authenticité avec son âme vintage et son confort contemporain. Le poêle à bois crée une atmosphère incomparable lors des soirées fraîches du Finistère.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=82',
        alt: 'Roulotte prestige au cœur du parc du domaine de Lanniron',
      },
    ],
    featured:   false,
    minNights:  2,
    surface:    28,
    isNew:      true,
  },
];

// ----------------------------------------------------------------
// Expériences
// ----------------------------------------------------------------

export const EXPERIENCES_DATA: Experience[] = [
  {
    id:       'jardins',
    category: 'Jardins & Patrimoine',
    title:    'Des jardins hors du temps',
    description: 'Vingt hectares de jardins à la française, d\'allées centenaires et de roseraies. Un domaine classé, vivant, respirant.',
    image: {
      src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=82',
      alt: 'Jardins à la française du domaine de Lanniron au coucher du soleil',
    },
    isLarge: true,
  },
  {
    id:       'eaux',
    category: 'Eaux & Détente',
    title:    'Nager entre ciel et forêt',
    description: 'Piscines extérieures, rivière privée, espaces aquatiques nichés dans la végétation.',
    image: {
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=82',
      alt: 'Piscine extérieure du domaine entourée de verdure',
    },
  },
  {
    id:       'lodges',
    category: 'Séjours de prestige',
    title:    'Dormir autrement',
    description: 'Lodges, cottages, roulottes et suites — chaque hébergement est une histoire à lui seul.',
    image: {
      src: 'https://images.unsplash.com/photo-1537565266759-34e6b88ead28?auto=format&fit=crop&w=900&q=82',
      alt: 'Intérieur d\'un lodge de luxe au domaine de Lanniron',
    },
  },
  {
    id:       'famille',
    category: 'Famille & Joie',
    title:    'Des vacances qui marquent',
    description: 'Espace jeux, animations, liberté de mouvement — le bonheur d\'une famille en plein air.',
    image: {
      src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=82',
      alt: 'Famille profitant d\'un coucher de soleil en Bretagne',
    },
  },
  {
    id:       'bienetre',
    category: 'Bien-être & Sérénité',
    title:    'L\'art du ralentissement',
    description: 'Yoga au lever du soleil, promenade en forêt, lectures sous les arbres. Le vrai luxe est ici.',
    image: {
      src: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=900&q=82',
      alt: 'Atmosphère sereine au lever du soleil dans les jardins du domaine',
    },
  },
];
