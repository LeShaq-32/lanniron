'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxOptions {
  /**
   * Intensité du parallaxe (0 = aucun, 1 = plein).
   * Valeurs recommandées : 0.10 – 0.25 (subtil)
   * @default 0.15
   */
  speed?: number;

  /**
   * Direction du mouvement
   * @default 'y'
   */
  direction?: 'y' | 'x';

  /**
   * ScrollTrigger start position
   * @default 'top bottom'
   */
  start?: string;

  /**
   * ScrollTrigger end position
   * @default 'bottom top'
   */
  end?: string;

  /**
   * Lag de smoothing du scrub (secondes)
   * 0 = lié instantanément, 1.5 = très fluide
   * @default 1.2
   */
  scrubLag?: number;
}

/**
 * useParallax — Crée un effet de parallaxe GSAP sur un élément.
 *
 * Usage :
 *   const bgRef = useParallax<HTMLDivElement>({ speed: 0.15 });
 *   <div ref={bgRef} />
 *
 * Notes :
 * - Désactivé automatiquement si prefers-reduced-motion est actif
 * - Se nettoie proprement sur unmount (pas de leak)
 * - Utilise will-change: transform pour les perfs GPU
 */
export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {},
): RefObject<T> {
  const {
    speed     = 0.15,
    direction = 'y',
    start     = 'top bottom',
    end       = 'bottom top',
    scrubLag  = 1.2,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Respecter prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Désactiver sur mobile (performances)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (prefersReduced || isMobile) return;

    const el = ref.current;
    const axis = direction === 'y' ? 'yPercent' : 'xPercent';

    // Amplitude : ±(speed * 100)%
    // Avec speed=0.15 → déplacement de ±15% — très subtil
    const amplitude = speed * 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { [axis]: -amplitude * 0.5 },
        {
          [axis]: amplitude * 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: scrubLag,
            // Invalidate on resize pour recalculer les positions
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => {
      // Cleanup GSAP context + ScrollTrigger associé
      ctx.revert();
    };
  }, [speed, direction, start, end, scrubLag]);

  return ref;
}
