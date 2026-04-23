'use client';

import { useState } from 'react';
import type {
  FilterState,
  AccommodationType,
  AccommodationFeature,
  SortOption,
} from '@/lib/types';

const TYPES: AccommodationType[] = ['Cottage', 'Lodge', 'Villa', 'Glamping', 'Roulotte'];
const CAPACITIES = [2, 4, 6, 8] as const;
const BEDROOMS   = [1, 2, 3, 4] as const;
const PRICE_MAX  = [150, 200, 300, 400] as const;

const FEATURES: AccommodationFeature[] = [
  'Climatisation',
  'Piscine privée',
  'Animaux acceptés',
  'Terrasse',
  'Vue jardin',
  'Vue rivière',
  'Poêle à bois',
  'Isolé',
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'price-asc',      label: 'Prix croissant' },
  { value: 'price-desc',     label: 'Prix décroissant' },
  { value: 'capacity-desc',  label: 'Plus grande capacité' },
  { value: 'newest',         label: 'Nouveautés en premier' },
];

interface Props {
  filters:           FilterState;
  activeCount:       number;
  onToggleType:      (type: AccommodationType) => void;
  onSetCapacity:     (cap: number | null) => void;
  onSetBedrooms:     (beds: number | null) => void;
  onToggleFeature:   (feature: AccommodationFeature) => void;
  onSetPriceMax:     (price: number | null) => void;
  onSetSort:         (sortBy: SortOption) => void;
  onReset:           () => void;
  totalResults:      number;
}

export default function FilterBar({
  filters,
  activeCount,
  onToggleType,
  onSetCapacity,
  onSetBedrooms,
  onToggleFeature,
  onSetPriceMax,
  onSetSort,
  onReset,
  totalResults,
}: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div
      className="sticky border-b"
      style={{
        top:         'var(--nav-h)',
        zIndex:      50,
        background:  'var(--warm-white)',
        borderColor: 'var(--sand)',
      }}
      aria-label="Filtres hébergements"
    >
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--container)' }}
      >
        {/* -------- Ligne principale -------- */}
        <div className="flex items-center gap-5 py-4 overflow-x-auto scrollbar-none flex-nowrap">

          {/* Types */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-[0.62rem] font-medium tracking-[0.14em] uppercase flex-shrink-0"
              style={{ color: 'var(--text-light)' }}
            >
              Type
            </span>
            {TYPES.map((type) => (
              <button
                key={type}
                className={`filter-btn ${filters.types.includes(type) ? 'is-active' : ''}`}
                onClick={() => onToggleType(type)}
                aria-pressed={filters.types.includes(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Séparateur */}
          <div
            className="h-5 w-px flex-shrink-0 hidden md:block"
            style={{ background: 'var(--sand)' }}
            aria-hidden="true"
          />

          {/* Capacité */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-[0.62rem] font-medium tracking-[0.14em] uppercase flex-shrink-0"
              style={{ color: 'var(--text-light)' }}
            >
              Pers.
            </span>
            {CAPACITIES.map((cap) => (
              <button
                key={cap}
                className={`filter-btn ${filters.capacityMin === cap ? 'is-active' : ''}`}
                onClick={() => onSetCapacity(cap)}
                aria-pressed={filters.capacityMin === cap}
                aria-label={`${cap} personnes minimum`}
              >
                {cap === 8 ? '8+' : cap}
              </button>
            ))}
          </div>

          {/* Séparateur */}
          <div
            className="h-5 w-px flex-shrink-0 hidden md:block"
            style={{ background: 'var(--sand)' }}
            aria-hidden="true"
          />

          {/* Filtres avancés toggle */}
          <button
            className="filter-btn flex-shrink-0 flex items-center gap-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
            aria-expanded={showAdvanced}
            aria-controls="advanced-filters"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-3 h-3"
              aria-hidden="true"
            >
              <path d="M3 5h18M6 12h12M9 19h6" />
            </svg>
            Filtres
            {activeCount > 0 && (
              <span
                className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[0.55rem] font-medium"
                style={{ background: 'var(--gold)', color: 'var(--forest)' }}
              >
                {activeCount}
              </span>
            )}
          </button>

          {/* Résultats + tri */}
          <div className="flex items-center gap-4 ml-auto flex-shrink-0">
            <span
              className="text-[0.68rem] hidden sm:block"
              style={{ color: 'var(--text-light)' }}
              role="status"
              aria-live="polite"
            >
              {totalResults} hébergement{totalResults > 1 ? 's' : ''}
            </span>

            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-[0.62rem] font-medium tracking-[0.14em] uppercase hidden md:block"
                style={{ color: 'var(--text-light)' }}
              >
                Trier
              </label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => onSetSort(e.target.value as SortOption)}
                className="text-[0.7rem] border rounded-sm px-3 py-[6px] appearance-none cursor-pointer"
                style={{
                  borderColor: 'var(--sand)',
                  color: 'var(--text-mid)',
                  background: 'var(--warm-white)',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%238A8480' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  paddingRight: '28px',
                }}
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {activeCount > 0 && (
              <button
                onClick={onReset}
                className="text-[0.62rem] tracking-[0.1em] uppercase underline underline-offset-2"
                style={{ color: 'var(--text-light)' }}
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* -------- Filtres avancés (panneau extensible) -------- */}
        {showAdvanced && (
          <div
            id="advanced-filters"
            className="pb-5 pt-2 flex flex-wrap gap-x-8 gap-y-4 border-t"
            style={{ borderColor: 'rgba(232,220,200,0.5)' }}
          >

            {/* Chambres */}
            <div className="flex items-center gap-2">
              <span
                className="text-[0.62rem] font-medium tracking-[0.14em] uppercase"
                style={{ color: 'var(--text-light)' }}
              >
                Chambres min.
              </span>
              {BEDROOMS.map((beds) => (
                <button
                  key={beds}
                  className={`filter-btn ${filters.bedroomsMin === beds ? 'is-active' : ''}`}
                  onClick={() => onSetBedrooms(beds)}
                  aria-pressed={filters.bedroomsMin === beds}
                >
                  {beds === 4 ? '4+' : beds}
                </button>
              ))}
            </div>

            {/* Budget max */}
            <div className="flex items-center gap-2">
              <span
                className="text-[0.62rem] font-medium tracking-[0.14em] uppercase"
                style={{ color: 'var(--text-light)' }}
              >
                Budget / nuit
              </span>
              {PRICE_MAX.map((price) => (
                <button
                  key={price}
                  className={`filter-btn ${filters.priceMax === price ? 'is-active' : ''}`}
                  onClick={() => onSetPriceMax(price)}
                  aria-pressed={filters.priceMax === price}
                  aria-label={`Maximum ${price}€ par nuit`}
                >
                  ≤ {price}€
                </button>
              ))}
            </div>

            {/* Équipements */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[0.62rem] font-medium tracking-[0.14em] uppercase flex-shrink-0"
                style={{ color: 'var(--text-light)' }}
              >
                Équipements
              </span>
              {FEATURES.map((feature) => (
                <button
                  key={feature}
                  className={`filter-btn ${filters.features.includes(feature) ? 'is-active' : ''}`}
                  onClick={() => onToggleFeature(feature)}
                  aria-pressed={filters.features.includes(feature)}
                >
                  {feature}
                </button>
              ))}
            </div>

          </div>
        )}

        {/* -------- Chips des filtres actifs -------- */}
        {activeCount > 0 && (
          <div className="pb-3 flex flex-wrap gap-2" role="list" aria-label="Filtres actifs">
            {filters.types.map((type) => (
              <button
                key={type}
                className="filter-chip"
                onClick={() => onToggleType(type)}
                role="listitem"
                aria-label={`Supprimer le filtre : ${type}`}
              >
                {type}
                <span className="filter-chip__remove" aria-hidden="true">×</span>
              </button>
            ))}
            {filters.capacityMin && (
              <button
                className="filter-chip"
                onClick={() => onSetCapacity(null)}
                role="listitem"
                aria-label="Supprimer le filtre capacité"
              >
                {filters.capacityMin}+ pers.
                <span className="filter-chip__remove" aria-hidden="true">×</span>
              </button>
            )}
            {filters.bedroomsMin && (
              <button
                className="filter-chip"
                onClick={() => onSetBedrooms(null)}
                role="listitem"
                aria-label="Supprimer le filtre chambres"
              >
                {filters.bedroomsMin}+ ch.
                <span className="filter-chip__remove" aria-hidden="true">×</span>
              </button>
            )}
            {filters.priceMax && (
              <button
                className="filter-chip"
                onClick={() => onSetPriceMax(null)}
                role="listitem"
                aria-label="Supprimer le filtre budget"
              >
                ≤ {filters.priceMax}€
                <span className="filter-chip__remove" aria-hidden="true">×</span>
              </button>
            )}
            {filters.features.map((feature) => (
              <button
                key={feature}
                className="filter-chip"
                onClick={() => onToggleFeature(feature)}
                role="listitem"
                aria-label={`Supprimer le filtre : ${feature}`}
              >
                {feature}
                <span className="filter-chip__remove" aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
