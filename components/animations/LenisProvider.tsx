'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ----------------------------------------------------------------
// Enregistrement GSAP — une seule fois, côté client
// ----------------------------------------------------------------
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------------------
// Context — permet aux composants enfants d'accéder à l'instance Lenis
// ----------------------------------------------------------------
const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

// ----------------------------------------------------------------
// LenisProvider
// ----------------------------------------------------------------

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respecter prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Pas de smooth scroll si l'utilisateur préfère
      return;
    }

    // Initialiser Lenis avec des paramètres équilibrés
    const lenis = new Lenis({
      lerp:        0.1,      // Fluidité : plus bas = plus fluide/lent
      smoothWheel: true,
      infinite:    false,
    });

    lenisRef.current = lenis;

    // Synchroniser Lenis avec GSAP ScrollTrigger
    // CRUCIAL : sans cette sync, les animations scroll seront décalées
    lenis.on('scroll', ScrollTrigger.update);

    // Ticker GSAP pilote le raf de Lenis
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0); // Évite les sauts d'animation après un tab focus

    return () => {
      // Cleanup complet pour éviter les memory leaks
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
