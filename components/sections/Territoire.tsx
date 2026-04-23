import Image from 'next/image';

const FACTS = [
  { n: '20',   label: 'Hectares de parc' },
  { n: '5★',   label: 'Classification Sunêlia' },
  { n: '350+', label: "Ans d'histoire" },
  { n: '3 km', label: 'Du centre de Quimper' },
];

const PILLS = [
  {
    label: 'Ouvert toute l\'année',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[13px] h-[13px]" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  },
  {
    label: 'Animaux acceptés',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[13px] h-[13px]" aria-hidden="true">
        <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.344-2.5"/>
        <path d="M8 14v.5A3.5 3.5 0 0011.5 18h1a3.5 3.5 0 003.5-3.5V14a2 2 0 00-2-2h-4a2 2 0 00-2 2z"/>
        <path d="M9 18v1a2 2 0 002 2h2a2 2 0 002-2v-1"/>
      </svg>
    ),
  },
  {
    label: 'Accès PMR',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[13px] h-[13px]" aria-hidden="true">
        <circle cx="11" cy="4" r="2"/><path d="M6 20v-6c0-1.1.9-2 2-2h6a2 2 0 012 2v6M6 20h12M9 12v3M15 12v3"/>
      </svg>
    ),
  },
  {
    label: 'Bretagne authentique',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[13px] h-[13px]" aria-hidden="true">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

export default function Territoire() {
  return (
    <section
      id="domaine"
      className="py-section relative overflow-hidden"
      style={{ background: 'var(--forest)' }}
      aria-labelledby="territoire-title"
    >
      {/* Lumière ambiante subtile */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(196,161,106,0.06) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div
        className="relative mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--container)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* -------- Texte -------- */}
          <div
            style={{ color: 'var(--warm-white)' }}
            data-reveal="left"
          >
            <span
              className="block text-[0.6rem] font-medium tracking-[0.22em] uppercase mb-6"
              style={{ color: 'var(--gold)' }}
            >
              Bretagne · Finistère · Quimper
            </span>

            <h2
              id="territoire-title"
              className="font-serif font-light leading-[1.2] mb-7"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--warm-white)' }}
            >
              Un domaine ancré
              <br />
              <em className="italic" style={{ color: 'var(--gold-light)' }}>
                dans son territoire
              </em>
            </h2>

            <p
              className="text-[0.92rem] font-light leading-[1.85] mb-10"
              style={{ color: 'rgba(253,250,245,0.72)' }}
            >
              À 3 km du centre de Quimper, capitale historique de la Cornouaille, le domaine de Lanniron est l'une des plus belles propriétés du Finistère. Depuis le XVIIe siècle, il conjugue grandeur patrimoniale et art de vivre breton. Ici, tout invite au ralentissement — les jardins soignés, la lumière bretonne, le murmure de l'Odet.
            </p>

            {/* Chiffres */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mb-8"
              style={{ borderTop: '1px solid rgba(196,161,106,0.2)' }}
            >
              {FACTS.map(({ n, label }) => (
                <div key={n}>
                  <p
                    className="font-serif font-light leading-none mb-1"
                    style={{ fontSize: '2.2rem', color: 'var(--gold-light)' }}
                  >
                    {n}
                  </p>
                  <p
                    className="text-[0.62rem] tracking-[0.14em] uppercase leading-[1.4]"
                    style={{ color: 'rgba(253,250,245,0.55)' }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Pills de réassurance */}
            <div className="flex flex-wrap gap-2.5">
              {PILLS.map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[0.68rem]"
                  style={{
                    border: '1px solid rgba(196,161,106,0.25)',
                    color: 'rgba(253,250,245,0.75)',
                  }}
                >
                  {icon}
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* -------- Visuels empilés -------- */}
          <div
            className="relative hidden lg:block"
            style={{ height: 520 }}
            data-reveal="right"
          >
            <Image
              src="https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80"
              alt="Château de Lanniron et ses jardins au coucher du soleil"
              width={600}
              height={380}
              className="absolute right-0 top-0 rounded-sm object-cover"
              style={{ width: '82%', height: 380 }}
              loading="lazy"
            />
            <Image
              src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=600&q=80"
              alt="Côte bretonne du Finistère"
              width={340}
              height={240}
              className="absolute left-0 bottom-0 rounded-sm object-cover"
              style={{
                width: '52%',
                height: 240,
                outline: '4px solid var(--forest)',
                outlineOffset: '0px',
              }}
              loading="lazy"
            />
          </div>

          {/* Mobile : image unique */}
          <div className="lg:hidden">
            <Image
              src="https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80"
              alt="Château de Lanniron et ses jardins"
              width={900}
              height={400}
              className="rounded-sm object-cover w-full"
              style={{ height: 260 }}
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
