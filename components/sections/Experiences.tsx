import Image from 'next/image';
import type { Experience } from '@/lib/types';

interface Props {
  experiences: Experience[];
}

// Server Component — rendu côté serveur, pas de JS client ici
export default function Experiences({ experiences }: Props) {
  return (
    <section
      id="experiences"
      className="py-section"
      style={{ background: 'var(--cream)' }}
      aria-labelledby="exp-title"
    >
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--container)' }}
      >
        {/* En-tête */}
        <header
          className="text-center mb-16"
          data-reveal="up"
        >
          <span className="label block mb-5">La vie au domaine</span>
          <h2
            id="exp-title"
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
          >
            Six façons de
            <br />
            <em
              className="italic"
              style={{ color: 'var(--bronze)' }}
            >
              vivre Lanniron
            </em>
          </h2>
          <p
            className="section-sub mt-5 mx-auto"
            style={{ maxWidth: 480 }}
          >
            Du jardin à la rivière, du lever de brume au coucher de soleil sur le Finistère — chaque instant ici est une expérience.
          </p>
        </header>

        {/* Grille */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-stagger
        >
          {experiences.map((exp, idx) => (
            <article
              key={exp.id}
              className="exp-card"
              style={{
                height: 'clamp(280px, 30vw, 420px)',
                // La première carte est plus grande en desktop
                gridRow: idx === 0 ? undefined : undefined,
              }}
              aria-label={`Expérience : ${exp.title}`}
            >
              <Image
                className="exp-card__img"
                src={exp.image.src}
                alt={exp.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />

              <div className="exp-card__overlay" aria-hidden="true" />

              <div className="absolute bottom-0 left-0 right-0 z-[2] p-7">
                <p
                  className="exp-card__cat mb-2"
                  style={{
                    fontSize: '0.55rem',
                    fontWeight: 500,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-light)',
                  }}
                >
                  {exp.category}
                </p>
                <h3
                  className="font-serif font-normal leading-[1.2] mb-0"
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    color: 'var(--warm-white)',
                  }}
                >
                  {exp.title}
                </h3>
                <p className="exp-card__desc text-[0.82rem] font-light leading-[1.6]"
                  style={{ color: 'rgba(253,250,245,0.82)' }}
                >
                  {exp.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
