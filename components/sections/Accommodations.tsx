'use client';

import { useState, useMemo, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Accommodation, AccommodationType, AccommodationFeature, FilterState, SortOption } from '@/lib/types';
import { filterAccommodations, DEFAULT_FILTERS, countActiveFilters } from '@/lib/types';
import AccommodationCard from '@/components/ui/AccommodationCard';
import FilterBar from '@/components/ui/FilterBar';
import { useReveal } from '@/components/animations/useReveal';

interface Props {
  accommodations: Accommodation[];
}

export default function Accommodations({ accommodations }: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const headingRef = useReveal<HTMLElement>({ direction: 'up' });
  const headerId = useId();

  // ----------------------------------------------------------------
  // Filtrage et tri — mémorisé pour éviter les re-calculs inutiles
  // ----------------------------------------------------------------
  const filtered = useMemo(
    () => filterAccommodations(accommodations, filters),
    [accommodations, filters],
  );

  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  // ----------------------------------------------------------------
  // Handlers filtres
  // ----------------------------------------------------------------
  const toggleType = useCallback((type: AccommodationType) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  }, []);

  const setCapacity = useCallback((cap: number | null) => {
    setFilters((prev) => ({
      ...prev,
      capacityMin: prev.capacityMin === cap ? null : cap,
    }));
  }, []);

  const setBedrooms = useCallback((beds: number | null) => {
    setFilters((prev) => ({
      ...prev,
      bedroomsMin: prev.bedroomsMin === beds ? null : beds,
    }));
  }, []);

  const toggleFeature = useCallback((feature: AccommodationFeature) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  }, []);

  const setPriceMax = useCallback((price: number | null) => {
    setFilters((prev) => ({
      ...prev,
      priceMax: prev.priceMax === price ? null : price,
    }));
  }, []);

  const setSort = useCallback((sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // ----------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------
  return (
    <section
      id="hebergements"
      className="py-section"
      style={{ background: 'var(--warm-white)' }}
      aria-labelledby={headerId}
    >
      {/* En-tête */}
      <div
        className="mx-auto px-[var(--gutter)] mb-0"
        style={{ maxWidth: 'var(--container)' }}
      >
        <header
          ref={headingRef}
          className="text-center mb-14"
          id={headerId}
        >
          <span className="label block mb-5">Nos hébergements</span>
          <h2
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
          >
            Trouvez votre
            <br />
            <em className="italic" style={{ color: 'var(--bronze)' }}>
              havre idéal
            </em>
          </h2>
          <p className="section-sub mt-4 mx-auto" style={{ maxWidth: 440 }}>
            Six hébergements de prestige, chacun avec son caractère, sa vue, son histoire.
          </p>
        </header>
      </div>

      {/* Barre de filtres sticky */}
      <FilterBar
        filters={filters}
        activeCount={activeCount}
        onToggleType={toggleType}
        onSetCapacity={setCapacity}
        onSetBedrooms={setBedrooms}
        onToggleFeature={toggleFeature}
        onSetPriceMax={setPriceMax}
        onSetSort={setSort}
        onReset={resetFilters}
        totalResults={filtered.length}
      />

      {/* Grille */}
      <div
        className="mx-auto px-[var(--gutter)] mt-14"
        style={{ maxWidth: 'var(--container)' }}
      >
        {filtered.length === 0 ? (
          <div className="text-center py-24" role="status" aria-live="polite">
            <p
              className="font-serif italic font-light"
              style={{ fontSize: '1.4rem', color: 'var(--text-light)' }}
            >
              Aucun hébergement ne correspond à votre recherche.
            </p>
            <button
              onClick={resetFilters}
              className="btn-ghost mt-6 mx-auto"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none"
            aria-label={`${filtered.length} hébergement${filtered.length > 1 ? 's' : ''} disponible${filtered.length > 1 ? 's' : ''}`}
            aria-live="polite"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((acc, idx) => (
                <motion.li
                  key={acc.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <AccommodationCard accommodation={acc} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </section>
  );
}
