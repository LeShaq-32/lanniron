'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Accommodation } from '@/lib/types';

// ---- Icônes SVG inline (évite une dépendance lucide-react) ----
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[13px] h-[13px]" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);

const IconBed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[13px] h-[13px]" aria-hidden="true">
    <path d="M2 4v16M2 8h20v12H2M2 12h20"/>
  </svg>
);

const IconBath = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[13px] h-[13px]" aria-hidden="true">
    <path d="M4 12h16a1 1 0 010 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a1 1 0 010-2zM6 12V5a2 2 0 012-2h4v2"/>
  </svg>
);

const IconHeart = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'var(--gold)' : 'none'} stroke={filled ? 'var(--gold)' : 'currentColor'} strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

interface Props {
  accommodation: Accommodation;
}

export default function AccommodationCard({ accommodation: acc }: Props) {
  const [isFav, setIsFav] = useState(false);

  const mainImage = acc.images[0];

  // Scroll to reservation section
  const handleReserve = () => {
    const el = document.getElementById('reservation');
    if (!el) return;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72',
    );
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' });
  };

  return (
    <article
      className="acc-card h-full"
      aria-label={`Hébergement : ${acc.name}`}
    >
      {/* ---- Image ---- */}
      <div className="acc-card__img-wrap">
        {mainImage && (
          <Image
            className="acc-card__img"
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        )}

        {acc.badge && (
          <span className="acc-card__badge">{acc.badge}</span>
        )}

        {acc.isNew && !acc.badge && (
          <span
            className="acc-card__badge"
            style={{ background: 'var(--ocean)' }}
          >
            Nouveau
          </span>
        )}

        {/* Bouton favori */}
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(253,250,245,0.88)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsFav(!isFav)}
          aria-label={isFav ? `Retirer ${acc.name} des favoris` : `Ajouter ${acc.name} aux favoris`}
          aria-pressed={isFav}
        >
          <IconHeart filled={isFav} />
        </button>
      </div>

      {/* ---- Corps ---- */}
      <div className="p-6 flex flex-col flex-1">
        <p
          className="text-[0.58rem] font-medium tracking-[0.18em] uppercase mb-2"
          style={{ color: 'var(--gold)' }}
        >
          {acc.type}
        </p>

        <h3
          className="font-serif font-normal leading-[1.2] mb-4"
          style={{ fontSize: '1.3rem', color: 'var(--forest)' }}
        >
          {acc.name}
        </h3>

        {/* Métadonnées */}
        <div className="flex gap-4 mb-4">
          <span
            className="flex items-center gap-1.5 text-[0.72rem]"
            style={{ color: 'var(--text-light)' }}
          >
            <IconUsers />
            {acc.capacity} pers.
          </span>
          <span
            className="flex items-center gap-1.5 text-[0.72rem]"
            style={{ color: 'var(--text-light)' }}
          >
            <IconBed />
            {acc.bedrooms} ch.
          </span>
          <span
            className="flex items-center gap-1.5 text-[0.72rem]"
            style={{ color: 'var(--text-light)' }}
          >
            <IconBath />
            {acc.bathrooms} sdb.
          </span>
          {acc.surface && (
            <span
              className="text-[0.72rem]"
              style={{ color: 'var(--text-light)' }}
            >
              {acc.surface} m²
            </span>
          )}
        </div>

        {/* Description courte */}
        <p
          className="text-[0.82rem] font-light leading-[1.65] mb-4"
          style={{ color: 'var(--text-mid)' }}
        >
          {acc.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {acc.features.slice(0, 4).map((feature) => (
            <span key={feature} className="feature-tag">
              {feature}
            </span>
          ))}
          {acc.features.length > 4 && (
            <span
              className="feature-tag"
              style={{ color: 'var(--bronze)', borderColor: 'var(--bronze)' }}
            >
              +{acc.features.length - 4}
            </span>
          )}
        </div>

        {/* Séjour minimum */}
        {acc.minNights && acc.minNights > 1 && (
          <p
            className="text-[0.62rem] mb-4"
            style={{ color: 'var(--text-light)' }}
          >
            Séjour minimum : {acc.minNights} nuits
          </p>
        )}

        {/* Footer carte : prix + CTA */}
        <div
          className="flex items-end justify-between mt-auto pt-4 border-t"
          style={{ borderColor: 'var(--sand)' }}
        >
          <div>
            <p className="text-[0.6rem]" style={{ color: 'var(--text-light)' }}>
              À partir de
            </p>
            <p
              className="font-serif font-light leading-none"
              style={{ fontSize: '1.5rem', color: 'var(--forest)' }}
            >
              {acc.priceFrom} €
            </p>
            <p className="text-[0.62rem]" style={{ color: 'var(--text-light)' }}>
              / nuit
            </p>
          </div>

          <button
            className="btn-forest"
            onClick={handleReserve}
            aria-label={`Voir et réserver ${acc.name}`}
          >
            Voir l'hébergement
          </button>
        </div>
      </div>
    </article>
  );
}
