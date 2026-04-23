import Link from 'next/link';

const FOOTER_HEBERGEMENTS = [
  { label: 'Cottages',        href: '#hebergements' },
  { label: 'Lodges',          href: '#hebergements' },
  { label: 'Villas',          href: '#hebergements' },
  { label: 'Glamping',        href: '#hebergements' },
  { label: 'Offres spéciales', href: '#reservation'  },
];

const FOOTER_EXPERIENCES = [
  { label: 'Jardins & Patrimoine',    href: '#experiences' },
  { label: 'Eaux & Loisirs',          href: '#experiences' },
  { label: 'Bien-être & Sérénité',    href: '#experiences' },
  { label: 'Activités famille',       href: '#experiences' },
  { label: 'Gastronomie bretonne',    href: '#experiences' },
];

const SOCIAL_LINKS = [
  {
    platform: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[14px] h-[14px]" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    platform: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[14px] h-[14px]" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    platform: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[14px] h-[14px]" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="pt-20 pb-10"
      style={{ background: 'var(--forest)', color: 'var(--warm-white)' }}
      aria-label="Pied de page"
    >
      <div
        className="mx-auto px-[var(--gutter)] pb-14 border-b border-white/10 mb-10"
        style={{ maxWidth: 'var(--container)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-[1.2rem] font-light text-warm-white">
              L'Orangerie de Lanniron
            </p>
            <p className="text-[0.55rem] tracking-[0.2em] uppercase text-gold mt-1 mb-5">
              Domaine Sunêlia · 5 étoiles
            </p>
            <p className="text-[0.82rem] font-light leading-[1.7] max-w-[260px]" style={{ color: 'rgba(253,250,245,0.6)' }}>
              Un domaine d'exception à Quimper, Finistère. Jardins historiques, hébergements de prestige et art de vivre breton depuis le XVIIe siècle.
            </p>
            <div className="flex gap-3 mt-6" aria-label="Réseaux sociaux">
              {SOCIAL_LINKS.map(({ platform, href, icon }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivre sur ${platform}`}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-gold"
                  style={{
                    borderColor: 'rgba(253,250,245,0.2)',
                    color: 'rgba(253,250,245,0.6)',
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Hébergements */}
          <nav aria-label="Hébergements">
            <h4 className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Hébergements
            </h4>
            <ul className="flex flex-col gap-[10px] list-none">
              {FOOTER_HEBERGEMENTS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[0.82rem] font-light transition-colors duration-200 hover:text-warm-white"
                    style={{ color: 'rgba(253,250,245,0.6)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Expériences */}
          <nav aria-label="Expériences">
            <h4 className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Expériences
            </h4>
            <ul className="flex flex-col gap-[10px] list-none">
              {FOOTER_EXPERIENCES.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[0.82rem] font-light transition-colors duration-200 hover:text-warm-white"
                    style={{ color: 'rgba(253,250,245,0.6)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address style={{ fontStyle: 'normal' }} aria-label="Contact">
            <h4 className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              Contact & Accès
            </h4>
            <ul className="flex flex-col gap-[10px] list-none">
              <li>
                <a
                  href="tel:+33298900200"
                  className="text-[0.82rem] font-light transition-colors duration-200 hover:text-warm-white"
                  style={{ color: 'rgba(253,250,245,0.6)' }}
                >
                  02 98 90 02 00
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@lanniron.com"
                  className="text-[0.82rem] font-light transition-colors duration-200 hover:text-warm-white"
                  style={{ color: 'rgba(253,250,245,0.6)' }}
                >
                  contact@lanniron.com
                </a>
              </li>
              <li className="text-[0.82rem] font-light leading-[1.6]" style={{ color: 'rgba(253,250,245,0.6)' }}>
                Allée de Lanniron<br />29000 Quimper
              </li>
              <li className="mt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.7rem] font-medium tracking-[0.1em] uppercase text-gold hover:text-gold-light transition-colors"
                >
                  Voir sur la carte →
                </a>
              </li>
            </ul>
          </address>

        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mx-auto px-[var(--gutter)] flex flex-col md:flex-row items-center justify-between gap-4 text-[0.7rem]"
        style={{ maxWidth: 'var(--container)', color: 'rgba(253,250,245,0.35)' }}
      >
        <p>© {year} L'Orangerie de Lanniron · Sunêlia · Tous droits réservés</p>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-warm-white/60 transition-colors">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="hover:text-warm-white/60 transition-colors">
            Confidentialité
          </Link>
          <Link href="/cgv" className="hover:text-warm-white/60 transition-colors">
            CGV
          </Link>
        </div>
      </div>
    </footer>
  );
}
