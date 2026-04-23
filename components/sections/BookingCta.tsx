'use client';

import { useState } from 'react';
import { useReveal } from '@/components/animations/useReveal';

const TRUST_ITEMS = [
  {
    label: 'Meilleur tarif garanti',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[14px] h-[14px]" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    label: 'Annulation flexible',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[14px] h-[14px]" aria-hidden="true">
        <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6M3 10l6-6"/>
      </svg>
    ),
  },
  {
    label: 'Paiement 100% sécurisé',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[14px] h-[14px]" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
  },
];

// Utilitaire : date formatée en YYYY-MM-DD
const fmt = (d: Date) => d.toISOString().slice(0, 10);
const tomorrow = () => {
  const d = new Date(); d.setDate(d.getDate() + 1); return fmt(d);
};
const nextWeek = () => {
  const d = new Date(); d.setDate(d.getDate() + 7); return fmt(d);
};

export default function BookingCta() {
  const [checkin,  setCheckin]  = useState(tomorrow);
  const [checkout, setCheckout] = useState(nextWeek);
  const [guests,   setGuests]   = useState(2);

  const titleRef = useReveal<HTMLHeadingElement>({ direction: 'up', delay: 0.05 });
  const subRef   = useReveal<HTMLParagraphElement>({ direction: 'up', delay: 0.15 });
  const formRef  = useReveal<HTMLFormElement>({ direction: 'up', delay: 0.25 });
  const trustRef = useReveal<HTMLDivElement>({ direction: 'up', delay: 0.35 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici : rediriger vers le moteur de réservation externe (Sunêlia, etc.)
    // window.location.href = `https://booking.lanniron.com?checkin=${checkin}&checkout=${checkout}&guests=${guests}`;
    alert(`Redirection vers le moteur de réservation.\nArrivée : ${checkin}\nDépart : ${checkout}\nVoyageurs : ${guests}`);
  };

  return (
    <section
      id="reservation"
      className="py-section relative overflow-hidden text-center"
      style={{ background: 'var(--cream)' }}
      aria-labelledby="cta-title"
    >
      {/* Grande lettre watermark décorative */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-serif font-light leading-none"
          style={{
            fontSize: '40vw',
            color: 'rgba(28,43,32,0.03)',
          }}
        >
          L
        </span>
      </div>

      <div
        className="relative mx-auto px-[var(--gutter)] max-w-[680px]"
        style={{ maxWidth: 680 }}
      >
        <span className="label block mb-6">Réservez votre séjour</span>

        <h2
          ref={titleRef}
          id="cta-title"
          className="font-serif font-light leading-[1.15] mb-6"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: 'var(--forest)' }}
        >
          Quand partez-vous
          <br />
          en{' '}
          <em className="italic" style={{ color: 'var(--bronze)' }}>
            Bretagne ?
          </em>
        </h2>

        <p
          ref={subRef}
          className="text-[0.92rem] font-light leading-[1.75] mb-12"
          style={{ color: 'var(--text-light)' }}
        >
          Choisissez vos dates et découvrez les disponibilités. Réservation directe, meilleur tarif garanti, annulation flexible jusqu'à 14 jours avant l'arrivée.
        </p>

        {/* Formulaire de recherche */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-stretch overflow-hidden rounded-sm"
          style={{
            border:     '1px solid var(--sand)',
            background: 'var(--warm-white)',
            boxShadow:  '0 8px 40px rgba(28,43,32,0.08)',
          }}
          aria-label="Formulaire de recherche de disponibilités"
        >
          {/* Arrivée */}
          <div
            className="flex-1 flex flex-col px-5 py-3.5 cursor-pointer transition-colors hover:bg-cream border-b md:border-b-0 md:border-r"
            style={{ borderColor: 'var(--sand)' }}
          >
            <label
              htmlFor="checkin"
              className="text-[0.58rem] font-medium tracking-[0.16em] uppercase cursor-pointer mb-1"
              style={{ color: 'var(--text-light)' }}
            >
              Arrivée
            </label>
            <input
              id="checkin"
              type="date"
              value={checkin}
              min={tomorrow()}
              onChange={(e) => setCheckin(e.target.value)}
              className="bg-transparent text-[0.85rem] outline-none cursor-pointer"
              style={{ color: 'var(--text)' }}
              required
              aria-label="Date d'arrivée"
            />
          </div>

          {/* Départ */}
          <div
            className="flex-1 flex flex-col px-5 py-3.5 cursor-pointer transition-colors hover:bg-cream border-b md:border-b-0 md:border-r"
            style={{ borderColor: 'var(--sand)' }}
          >
            <label
              htmlFor="checkout"
              className="text-[0.58rem] font-medium tracking-[0.16em] uppercase cursor-pointer mb-1"
              style={{ color: 'var(--text-light)' }}
            >
              Départ
            </label>
            <input
              id="checkout"
              type="date"
              value={checkout}
              min={checkin}
              onChange={(e) => setCheckout(e.target.value)}
              className="bg-transparent text-[0.85rem] outline-none cursor-pointer"
              style={{ color: 'var(--text)' }}
              required
              aria-label="Date de départ"
            />
          </div>

          {/* Voyageurs */}
          <div
            className="flex flex-col px-5 py-3.5 border-b md:border-b-0 md:border-r"
            style={{ borderColor: 'var(--sand)', minWidth: 110 }}
          >
            <label
              htmlFor="guests"
              className="text-[0.58rem] font-medium tracking-[0.16em] uppercase mb-1"
              style={{ color: 'var(--text-light)' }}
            >
              Voyageurs
            </label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="bg-transparent text-[0.85rem] outline-none cursor-pointer appearance-none"
              style={{ color: 'var(--text)' }}
              aria-label="Nombre de voyageurs"
            >
              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'voyageur' : 'voyageurs'}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="px-7 py-4 font-medium text-[0.68rem] tracking-[0.12em] uppercase transition-colors"
            style={{
              background: 'var(--forest)',
              color:      'var(--warm-white)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--forest-mid)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--forest)';
            }}
          >
            Voir les disponibilités
          </button>
        </form>

        {/* Signaux de confiance */}
        <div
          ref={trustRef}
          className="flex items-center justify-center flex-wrap gap-7 mt-8"
        >
          {TRUST_ITEMS.map(({ label, icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[0.68rem]"
              style={{ color: 'var(--text-light)' }}
            >
              <span style={{ color: 'var(--gold)' }}>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
