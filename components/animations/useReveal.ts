'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'fade';

interface RevealOptions {
  /**
   * Direction de l'animation d'entrée
   * @default 'up'
   */
  direction?: RevealDirection;

  /**
   * Délai avant l'animation (secondes)
   * @default 0
   */
  delay?: number;

  /**
   * Durée de l'animation (secondes)
   * @default 0.9
   */
  duration?: number;

  /**
   * Si > 0, anime les enfants directs en cascade
   * @default 0
   */
  stagger?: number;

  /**
   * Position de déclenchement ScrollTrigger
   * @default 'top 88%'
   */
  triggerPoint?: string;
}

/**
 * useReveal — Anime un élément (ou ses enfants) à l'entrée dans le viewport.
 *
 * Usage simple :
 *   const ref = useReveal<HTMLHeadingElement>({ direction: 'up' });
 *   <h2 ref={ref}>Titre</h2>
 *
 * Avec stagger (animer les enfants) :
 *   const ref = useReveal<HTMLUListElement>({ stagger: 0.1 });
 *   <ul ref={ref}><li>...</li><li>...</li></ul>
 */
export function useReveal<T extends HTMLElement>(
  options: RevealOptions = {},
): RefObject<T> {
  const {
    direction    = 'up',
    delay        = 0,
    duration     = 0.9,
    stagger      = 0,
    triggerPoint = 'top 88%',
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Respecter prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Afficher directement sans animation
      gsap.set(ref.current, { opacity: 1, clearProps: 'all' });
      return;
    }

    const el = ref.current;

    // Construire les valeurs initiales selon la direction
    const fromVars: gsap.TweenVars = {
      opacity:   0,
      y:     direction === 'up'    ?  32 : 0,
      x:     direction === 'left'  ? -32 : direction === 'right' ? 32 : 0,
      scale: direction === 'scale' ? 0.96 : 1,
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y:       0,
      x:       0,
      scale:   1,
      duration,
      delay,
      ease:    'power3.out',
    };

    const targets = stagger > 0 ? Array.from(el.children) : el;

    if (stagger > 0) {
      (toVars as gsap.TweenVars).stagger = stagger;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger:  el,
          start:    triggerPoint,
          once:     true, // Se déclenche une seule fois
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [direction, delay, duration, stagger, triggerPoint]);

  return ref;
}
