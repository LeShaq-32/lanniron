'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Hébergements', href: '#hebergements' },
  { label: 'Expériences',  href: '#experiences'  },
  { label: 'Le Domaine',   href: '#domaine'       },
  { label: 'Contact',      href: '#contact'       },
];

export default function Nav() {
  const navRef    = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden,   setIsHidden]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const lastY = useRef(0);

  // ----------------------------------------------------------------
  // Scroll behavior
  // ----------------------------------------------------------------
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      setIsScrolled(y > 80);
      // Masquer en scroll vers le bas, révéler en scroll vers le haut
      if (y > lastY.current && y > 400) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ----------------------------------------------------------------
  // Fermer le menu mobile sur resize
  // ----------------------------------------------------------------
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Bloquer le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ----------------------------------------------------------------
  // Smooth scroll sur les ancres
  // ----------------------------------------------------------------
  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72',
    );
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' });
  };

  const navClasses = [
    'nav',
    isScrolled ? 'is-scrolled' : '',
    isHidden   ? 'is-hidden'   : '',
  ].join(' ');

  return (
    <>
      <nav ref={navRef} className={navClasses} aria-label="Navigation principale">
        {/* Logo */}
        <Link
          href="/"
          className="flex-1"
          aria-label="Retour à l'accueil — L'Orangerie de Lanniron"
        >
          <span className="nav__logo-text">
            L'Orangerie de Lanniron
          </span>
          <span className="nav__logo-sub">Domaine Sunêlia · Quimper</span>
        </Link>

        {/* Liens desktop */}
        <ul
          className="hidden md:flex items-center gap-8 list-none"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                className="nav__link"
                onClick={() => handleAnchorClick(href)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions desktop */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <button
            className="btn-reserve hidden md:inline-flex"
            onClick={() => handleAnchorClick('#reservation')}
          >
            Réserver
          </button>

          {/* Hamburger mobile */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className="block w-[22px] h-[1.5px] transition-all duration-300"
              style={{
                background: isScrolled ? 'var(--forest)' : 'var(--warm-white)',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : '',
              }}
            />
            <span
              className="block w-[22px] h-[1.5px] transition-all duration-300"
              style={{
                background: isScrolled ? 'var(--forest)' : 'var(--warm-white)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-[22px] h-[1.5px] transition-all duration-300"
              style={{
                background: isScrolled ? 'var(--forest)' : 'var(--warm-white)',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : '',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ----------------------------------------------------------------
          Menu mobile — overlay
          ---------------------------------------------------------------- */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigation"
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 transition-opacity duration-400"
        style={{
          background:  'var(--forest)',
          opacity:     menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <button
            key={href}
            className="font-serif font-light text-[2rem] text-cream tracking-[0.05em] transition-colors hover:text-gold"
            onClick={() => handleAnchorClick(href)}
            tabIndex={menuOpen ? 0 : -1}
          >
            {label}
          </button>
        ))}
        <button
          className="btn-primary mt-4"
          onClick={() => handleAnchorClick('#reservation')}
          tabIndex={menuOpen ? 0 : -1}
        >
          Réserver maintenant
        </button>
      </div>
    </>
  );
}
