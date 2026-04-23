'use client';

import Image from 'next/image';
import { useParallax } from '@/components/animations/useParallax';
import { useReveal } from '@/components/animations/useReveal';
import type { Accommodation } from '@/lib/types';

interface Props {
  accommodation: Accommodation;
}

export default function Featured({ accommodation: acc }: Props) {
  const wrapRef    = useReveal<HTMLElement>({ direction: 'scale', duration: 1 });
  const imgParallax = useParallax<HTMLDivElement>({ speed: 0.12 });

  const mainImage = acc.images[0];

  const handleReserve = () => {
    const el = document.getElementById('reservation');
    if (!el) return;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72',
    );
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' });
  };

  return (
    <section
      className="pb-section"
      style={{ background: 'var(--warm-white)' }}
      aria-labelledby="featured-title"
    >
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--container)' }}
      >
        {/* En-tête section */}
        <header
          className="text-center mb-10"
          data-reveal="up"
        >
          <span className="label block mb-5">Coup de cœur</span>
          <h2
            id="featured-title"
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
          >
            L'expérience
            <br />
            <em className="italic" style={{ color: 'var(--bronze)' }}>
              signature
            </em>
          </h2>
        </header>

        {/* Card panoramique */}
        <article
          ref={wrapRef}
          className="relative overflow-hidden rounded-sm"
          style={{ height: 'clamp(440px, 50vw, 580px)' }}
        >
          {/* Image parallaxe */}
          <div
            ref={imgParallax}
            className="absolute will-change-transform"
            style={{ inset: '-15%', width: '130%', height: '130%' }}
            aria-hidden="true"
          >
            {mainImage && (
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                sizes="100vw"
                className="object-cover"
                loading="lazy"
                quality={88}
              />
            )}
          </div>

          {/* Dégradé latéral — gauche plus dense */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: `linear-gradient(
                90deg,
                rgba(28,43,32,0.88) 0%,
                rgba(28,43,32,0.52) 45%,
                transparent 100%
              )`,
            }}
            aria-hidden="true"
          />

          {/* Contenu */}
          <div
            className="relative z-[2] h-full flex items-center"
            style={{ padding: 'clamp(32px, 5vw, 80px)' }}
          >
            <div
              className="max-w-[520px]"
              style={{ color: 'var(--warm-white)' }}
            >
              {/* Eyebrow */}
              <p
                className="flex items-center gap-3 text-[0.6rem] font-medium tracking-[0.22em] uppercase mb-5"
                style={{ color: 'var(--gold-light)' }}
              >
                <span
                  className="inline-block w-8 h-px"
                  style={{ background: 'var(--gold)' }}
                  aria-hidden="true"
                />
                Hébergement signature
              </p>

              {/* Titre */}
              <h3
                className="font-serif font-light leading-[1.1] mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                {acc.name.includes(' ') ? (
                  <>
                    {acc.name.split(' ').slice(0, -1).join(' ')}
                    <br />
                    <em
                      className="italic"
                      style={{ color: 'var(--gold-light)' }}
                    >
                      {acc.name.split(' ').slice(-1)}
                    </em>
                  </>
                ) : (
                  <em className="italic" style={{ color: 'var(--gold-light)' }}>
                    {acc.name}
                  </em>
                )}
              </h3>

              {/* Description */}
              <p
                className="text-[0.9rem] font-light leading-[1.8] mb-8"
                style={{ color: 'rgba(253,250,245,0.8)' }}
              >
                {acc.longDesc ?? acc.description}
              </p>

              {/* Specs */}
              <div className="flex gap-6 mb-8">
                <div>
                  <p
                    className="font-serif font-light leading-none mb-1"
                    style={{ fontSize: '2rem', color: 'var(--gold-light)' }}
                  >
                    {acc.capacity}
                  </p>
                  <p
                    className="text-[0.6rem] tracking-[0.15em] uppercase"
                    style={{ color: 'rgba(253,250,245,0.6)' }}
                  >
                    Personnes
                  </p>
                </div>
                <div>
                  <p
                    className="font-serif font-light leading-none mb-1"
                    style={{ fontSize: '2rem', color: 'var(--gold-light)' }}
                  >
                    {acc.bedrooms}
                  </p>
                  <p
                    className="text-[0.6rem] tracking-[0.15em] uppercase"
                    style={{ color: 'rgba(253,250,245,0.6)' }}
                  >
                    Chambres
                  </p>
                </div>
                <div>
                  <p
                    className="font-serif font-light leading-none mb-1"
                    style={{ fontSize: '2rem', color: 'var(--gold-light)' }}
                  >
                    {acc.bathrooms}
                  </p>
                  <p
                    className="text-[0.6rem] tracking-[0.15em] uppercase"
                    style={{ color: 'rgba(253,250,245,0.6)' }}
                  >
                    Salles de bain
                  </p>
                </div>
                {acc.surface && (
                  <div>
                    <p
                      className="font-serif font-light leading-none mb-1"
                      style={{ fontSize: '2rem', color: 'var(--gold-light)' }}
                    >
                      {acc.surface}
                    </p>
                    <p
                      className="text-[0.6rem] tracking-[0.15em] uppercase"
                      style={{ color: 'rgba(253,250,245,0.6)' }}
                    >
                      m²
                    </p>
                  </div>
                )}
              </div>

              {/* Prix + CTA */}
              <p
                className="font-serif text-[0.9rem] mb-6"
                style={{ color: 'rgba(253,250,245,0.65)' }}
              >
                À partir de{' '}
                <strong
                  className="font-normal"
                  style={{ fontSize: '1.6rem', color: 'var(--warm-white)' }}
                >
                  {acc.priceFrom} €
                </strong>{' '}
                / nuit
              </p>

              <button
                onClick={handleReserve}
                className="btn-primary group"
                aria-label={`Réserver ${acc.name}`}
              >
                Réserver {acc.name}
                <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
