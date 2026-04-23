'use client';

import Image from 'next/image';
import { useReveal } from '@/components/animations/useReveal';
import { useParallax } from '@/components/animations/useParallax';

export default function Manifeste() {
  const labelRef    = useReveal<HTMLParagraphElement>({ direction: 'up', delay: 0 });
  const titleRef    = useReveal<HTMLHeadingElement>({ direction: 'up', delay: 0.1 });
  const body1Ref    = useReveal<HTMLParagraphElement>({ direction: 'up', delay: 0.2 });
  const body2Ref    = useReveal<HTMLParagraphElement>({ direction: 'up', delay: 0.3 });
  const quoteRef    = useReveal<HTMLQuoteElement>({ direction: 'up', delay: 0.4 });
  const ctaRef      = useReveal<HTMLAnchorElement>({ direction: 'up', delay: 0.5 });
  const imgWrapRef  = useReveal<HTMLDivElement>({ direction: 'scale' });
  const imgParallax = useParallax<HTMLImageElement>({ speed: 0.12 });

  return (
    <section
      className="py-section overflow-hidden"
      style={{ background: 'var(--warm-white)' }}
      aria-labelledby="manifeste-title"
    >
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--container)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* -------- Texte -------- */}
          <div className="lg:pr-10">
            <p ref={labelRef} className="label mb-7">Le Domaine</p>

            <h2
              ref={titleRef}
              id="manifeste-title"
              className="font-serif font-light mb-8"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                lineHeight: 1.15,
                color: 'var(--forest)',
              }}
            >
              Là où le temps
              <br />
              <em
                className="italic"
                style={{ color: 'var(--bronze)' }}
              >
                reprend son souffle
              </em>
            </h2>

            <p
              ref={body1Ref}
              className="text-[0.975rem] font-light leading-[1.85] pb-5 border-b"
              style={{ color: 'var(--text-mid)', borderColor: 'var(--sand)' }}
            >
              À quelques minutes de Quimper, derrière de vieilles grilles qui ont vu passer des siècles, s'étend un domaine d'une rare beauté. Des jardins à la française, des allées ombragées, un château du XVIIe siècle qui veille sur ses terres comme il l'a toujours fait.
            </p>

            <p
              ref={body2Ref}
              className="text-[0.975rem] font-light leading-[1.85] pt-5"
              style={{ color: 'var(--text-mid)' }}
            >
              L'Orangerie de Lanniron n'est pas un camping. C'est une invitation à habiter autrement la Bretagne — à en sentir le parfum d'embruns et de terre mouillée, à en vivre la lumière changeante, à s'y perdre volontairement.
            </p>

            <blockquote
              ref={quoteRef}
              className="mt-12 pl-7"
              style={{ borderLeft: '2px solid var(--gold)' }}
            >
              <p
                className="font-serif italic font-light leading-[1.6]"
                style={{ fontSize: '1.15rem', color: 'var(--forest)' }}
              >
                « Un domaine où chaque matin ressemble à une première fois. »
              </p>
              <cite
                className="block mt-2 not-italic"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-light)',
                }}
              >
                — Un hôte du Cottage Magnolia
              </cite>
            </blockquote>

            <a
              ref={ctaRef}
              href="#hebergements"
              className="btn-ghost mt-9 inline-flex"
            >
              Voir les hébergements
            </a>
          </div>

          {/* -------- Image avec parallaxe -------- */}
          <div
            ref={imgWrapRef}
            className="relative rounded-sm overflow-hidden"
            style={{ height: 'clamp(320px, 45vw, 560px)' }}
          >
            {/* Accent décoratif */}
            <div
              className="absolute top-[-24px] right-[-24px] w-[100px] h-[100px] z-[1] pointer-events-none"
              style={{ border: '1px solid rgba(196,161,106,0.3)' }}
              aria-hidden="true"
            />

            <Image
              ref={imgParallax}
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=82"
              alt="Allée forestière du domaine de Lanniron — lumière filtrante dans les sous-bois"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover will-change-transform"
              style={{ height: '115%', top: '-7.5%' }}
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
