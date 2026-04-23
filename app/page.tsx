import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Manifeste from '@/components/sections/Manifeste';
import Experiences from '@/components/sections/Experiences';
import Accommodations from '@/components/sections/Accommodations';
import Featured from '@/components/sections/Featured';
import Territoire from '@/components/sections/Territoire';
import BookingCta from '@/components/sections/BookingCta';
import { getAccommodations, getExperiences, getFeaturedAccommodation } from '@/lib/api';

/*
  Page principale — Server Component (Next.js 14)
  Les données sont fetchées côté serveur et passées aux composants clients.
  Pour brancher un CMS (Sanity, Contentful, Strapi...) :
    → remplacer les fonctions dans lib/api.ts par des appels fetch()
*/

export default async function HomePage() {
  // Ces appels seront automatiquement mis en cache par Next.js
  const [accommodations, experiences, featured] = await Promise.all([
    getAccommodations(),
    getExperiences(),
    getFeaturedAccommodation(),
  ]);

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Manifeste />
        <Experiences experiences={experiences} />
        <Accommodations accommodations={accommodations} />
        {featured && <Featured accommodation={featured} />}
        <Territoire />
        <BookingCta />
      </main>
      <Footer />
    </>
  );
}
