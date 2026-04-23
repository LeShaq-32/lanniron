import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { LenisProvider } from '@/components/animations/LenisProvider';
import './globals.css';

// ----------------------------------------------------------------
// Fonts — Chargement optimisé avec next/font
// ----------------------------------------------------------------
const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

// ----------------------------------------------------------------
// Metadata SEO
// ----------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: "L'Orangerie de Lanniron — Domaine d'exception à Quimper",
    template: "%s | L'Orangerie de Lanniron",
  },
  description:
    "Séjournez dans un domaine d'exception au cœur du Finistère. Hébergements de prestige, jardins historiques et art de vivre breton à Quimper, Bretagne.",
  keywords: [
    "camping 5 étoiles Quimper",
    "hébergement prestige Bretagne",
    "glamping Finistère",
    "domaine Lanniron",
    "Sunêlia Bretagne",
    "lodge Finistère",
    "villa Quimper",
    "séjour luxe Bretagne",
  ],
  authors: [{ name: "L'Orangerie de Lanniron" }],
  creator: "L'Orangerie de Lanniron",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.lanniron.com',
    siteName: "L'Orangerie de Lanniron",
    title: "L'Orangerie de Lanniron — Domaine d'exception à Quimper",
    description:
      "Un domaine d'exception au cœur du Finistère. Hébergements de prestige, jardins historiques et art de vivre breton.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "L'Orangerie de Lanniron — Domaine d'exception à Quimper",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "L'Orangerie de Lanniron",
    description: "Domaine d'exception à Quimper, Finistère, Bretagne.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

// ----------------------------------------------------------------
// Root Layout
// ----------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1C2B20" />
        <link rel="canonical" href="https://www.lanniron.com" />
      </head>
      <body>
        {/*
          LenisProvider initialise le scroll fluide (Lenis) et
          synchronise GSAP ScrollTrigger avec le scroll Lenis.
          Tout le contenu est enfant de ce Provider.
        */}
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
