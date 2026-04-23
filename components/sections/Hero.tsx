'use client';

import Image from 'next/image';
import { useParallax } from '@/components/animations/useParallax';

export default function Hero() {
  // Parallaxe subtil sur le fond — speed=0.15 → ±15% de déplacement
  const bgRef = useParallax<HTMLDivElement>({
    speed:   0.15,
    start:   'top top',
    end:     'bottom top',
    scrubLag: 1,
  });

  const handleAnchorClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72',
    );
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '100svh', minHeight: 600 }}
      aria-label="Bienvenue au domaine de Lanniron"
    >
      {/* -------- Fond parallaxe -------- */}
      <div
        ref={bgRef}
        className="absolute inset-[-15%] will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85"
          alt="Vue du domaine de Lanniron — jardins et piscine au coucher du soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
      </div>

      {/* -------- Overlays cinématiques -------- */}
      {/* Dégradé vertical pour la lisibilité du texte */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: `linear-gradient(180deg,
            rgba(28,43,32,0.52) 0%,
            rgba(28,43,32,0.12) 40%,
            rgba(28,43,32,0.22) 72%,
            rgba(28,43,32,0.62) 100%
          )`,
        }}
      />
      {/* Vignette radiale */}
      <div
        className="absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(8,16,10,0.4) 100%)',
        }}
      />

      {/* -------- Contenu -------- */}
      <div
        className="relative z-[3] text-center px-6 max-w-4xl mx-auto"
        style={{ color: 'var(--warm-white)' }}
      >
        {/* Badge lieu */}
        <div className="hero-badge">
          Quimper · Finistère · Bretagne
        </div>

        {/* Eyebrow */}
        <p
          className="font-serif italic tracking-[0.06em] mb-3 opacity-0 animate-fade-up"
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            fontWeight: 300,
            color: 'var(--gold-light)',
            animationDelay: '0.55s',
            animationFillMode: 'forwards',
          }}
        >
          Domaine d'exception
        </p>

        {/* Titre principal */}
        <h1
          className="font-serif font-light leading-[0.9] tracking-tight opacity-0 animate-fade-up"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            animationDelay: '0.75s',
            animationFillMode: 'forwards',
          }}
        >
          L'Orangerie
          <br />
          <em
            className="italic not-italic"
            style={{
              fontStyle: 'italic',
              color: 'var(--gold-light)',
            }}
          >
            de Lanniron
          </em>
        </h1>

        {/* Sous-titre */}
        <p
          className="font-serif font-light mt-4 mb-10 opacity-0 animate-fade-up"
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
            color: 'rgba(253,250,245,0.78)',
            animationDelay: '0.95s',
            animationFillMode: 'forwards',
          }}
        >
          Un refuge de prestige au cœur de la Bretagne
        </p>

        {/* CTAs */}
        <div
          className="flex gap-4 justify-center flex-wrap opacity-0 animate-fade-up"
          style={{ animationDelay: '1.15s', animationFillMode: 'forwards' }}
        >
          <button
            className="btn-outline"
            onClick={() => handleAnchorClick('#hebergements')}
          >
            Découvrir les hébergements
          </button>
          <button
            className="btn-primary"
            onClick={() => handleAnchorClick('#reservation')}
          >
            Réserver maintenant
          </button>
        </div>
      </div>

      {/* -------- Indicateur de scroll -------- */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}
        aria-hidden="true"
      >
        <span
          className="text-[0.55rem] tracking-[0.22em] uppercase"
          style={{ color: 'rgba(253,250,245,0.5)' }}
        >
          Découvrir
        </span>
        <div
          className="w-px h-11 animate-scroll-pulse"
          style={{ background: 'linear-gradient(180deg, rgba(196,161,106,0.7) 0%, transparent 100%)' }}
        />
      </div>
    </section>
  );
}
