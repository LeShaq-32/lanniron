'use client';

import { useState, useEffect } from 'react';

/**
 * useMediaQuery — Détecte si une media query CSS est vérifiée.
 * Retourne false côté serveur (SSR-safe) puis s'initialise côté client.
 *
 * Exemples :
 *   const isMobile  = useMediaQuery('(max-width: 768px)');
 *   const isTablet  = useMediaQuery('(max-width: 1024px)');
 *   const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export function useMediaQuery(query: string): boolean {
  // Initialisation à false pour éviter les hydration mismatches
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    // Set initial value
    setMatches(mql.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);

    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
