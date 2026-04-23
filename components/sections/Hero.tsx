'use client';

export default function Hero() {
  const handleAnchorClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72');
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' });
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ height: '100svh', minHeight: 600 }} aria-label="Bienvenue au domaine de Lanniron">
      <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85" alt="Domaine de Lanniron" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ background: 'rgba(28,43,32,0.58)', zIndex: 1 }} />
      <div className="relative text-center px-6 max-w-4xl mx-auto" style={{ color: 'var(--warm-white)', zIndex: 2 }}>
        <div className="hero-badge">Quimper · Finistère · Bretagne</div>
        <p className="font-serif italic tracking-[0.06em] mb-3" style={{ fontSize: 'clamp(0.9rem,1.5vw,1.1rem)', fontWeight: 300, color: 'var(--gold-light)' }}>Domaine d'exception</p>
        <h1 className="font-serif font-light leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(3.5rem,8vw,7.5rem)' }}>
          L'Orangerie<br />
          <em className="italic" style={{ color: 'var(--gold-light)' }}>de Lanniron</em>
        </h1>
        <p className="font-serif font-light mt-4 mb-10" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.8rem)', color: 'rgba(253,250,245,0.78)' }}>Un refuge de prestige au cœur de la Bretagne</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="btn-outline" onClick={() => handleAnchorClick('#hebergements')}>Découvrir les hébergements</button>
          <button className="btn-primary" onClick={() => handleAnchorClick('#reservation')}>Réserver maintenant</button>
        </div>
      </div>
    </section>
  );
}
