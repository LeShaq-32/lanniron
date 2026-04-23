// ================================================================
// TYPES — L'Orangerie de Lanniron
// Compatible CMS : chaque interface correspond à un type de contenu
// ================================================================

// ----------------------------------------------------------------
// Hébergements
// ----------------------------------------------------------------

export type AccommodationType = 'Cottage' | 'Lodge' | 'Villa' | 'Glamping' | 'Roulotte';

export type AccommodationFeature =
  | 'Climatisation'
  | 'Piscine privée'
  | 'Animaux acceptés'
  | 'Vue jardin'
  | 'Vue rivière'
  | 'Vue château'
  | 'Terrasse'
  | 'Terrasse bois'
  | 'Poêle à bois'
  | 'Bois chauffant'
  | 'Isolé'
  | 'Cuisine équipée'
  | 'Lave-linge'
  | 'Parking privé';

export type SortOption = 'price-asc' | 'price-desc' | 'capacity-desc' | 'newest';

export interface AccommodationImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Accommodation {
  id:           string;
  slug:         string;
  name:         string;
  type:         AccommodationType;
  capacity:     number;          // Nombre max de personnes
  bedrooms:     number;
  bathrooms:    number;
  priceFrom:    number;          // Prix par nuit en €
  features:     AccommodationFeature[];
  badge?:       string;          // Étiquette optionnelle : "Prestige", "Nouveauté"...
  description:  string;          // Description courte (card)
  longDesc?:    string;          // Description longue (page détail)
  images:       AccommodationImage[];
  featured:     boolean;         // Affiché dans la section vedette
  isNew?:       boolean;
  minNights?:   number;          // Durée minimum de séjour
  surface?:     number;          // Surface en m²
}

// ----------------------------------------------------------------
// Expériences
// ----------------------------------------------------------------

export interface Experience {
  id:          string;
  category:    string;           // "Jardins & Patrimoine"
  title:       string;
  description: string;
  image:       AccommodationImage;
  isLarge?:    boolean;          // Occupe 2 rows dans la grille
}

// ----------------------------------------------------------------
// Filtres
// ----------------------------------------------------------------

export interface FilterState {
  types:      AccommodationType[];
  capacityMin: number | null;    // null = pas de filtre
  bedroomsMin: number | null;
  features:    AccommodationFeature[];
  priceMax:    number | null;
  sortBy:      SortOption;
}

export const DEFAULT_FILTERS: FilterState = {
  types:       [],
  capacityMin: null,
  bedroomsMin: null,
  features:    [],
  priceMax:    null,
  sortBy:      'price-asc',
};

// ----------------------------------------------------------------
// Helpers de filtre
// ----------------------------------------------------------------

export function filterAccommodations(
  list: Accommodation[],
  filters: FilterState,
): Accommodation[] {
  return list
    .filter((a) => {
      if (filters.types.length > 0 && !filters.types.includes(a.type)) return false;
      if (filters.capacityMin !== null && a.capacity < filters.capacityMin)    return false;
      if (filters.bedroomsMin !== null && a.bedrooms < filters.bedroomsMin)    return false;
      if (filters.priceMax    !== null && a.priceFrom > filters.priceMax)      return false;
      if (filters.features.length > 0) {
        const hasAll = filters.features.every((f) => a.features.includes(f));
        if (!hasAll) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':      return a.priceFrom - b.priceFrom;
        case 'price-desc':     return b.priceFrom - a.priceFrom;
        case 'capacity-desc':  return b.capacity - a.capacity;
        case 'newest':         return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:               return 0;
      }
    });
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.types.length > 0)    count += filters.types.length;
  if (filters.capacityMin !== null) count++;
  if (filters.bedroomsMin !== null) count++;
  if (filters.features.length > 0) count += filters.features.length;
  if (filters.priceMax !== null)    count++;
  return count;
}
