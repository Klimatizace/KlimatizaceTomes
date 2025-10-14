/* eslint-disable style/quote-props */
import type { Metadata } from 'next';

import { BRANDS, COMPANY_INFO } from '@/data/company';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl } from '@/utils/Helpers';

const siteUrl = getBaseUrl();

const baseTitle = `${AppConfig.name} | Montáž, servis klimatizací a fotovoltaiky v okrese Hodonín`;
const baseDescription = `Klimatizace Tomeš zajišťuje montáž, servis a úpravy klimatizací pro domácnosti, firmy i vinné sklepy v okrese Hodonín. Instalujeme ověřené značky ${BRANDS.join(', ')} a nabízíme také balkonovou fotovoltaiku.`;

const keywordSeeds = [
  'klimatizace hodonín',
  'montáž klimatizace hodonín',
  'servis klimatizace hodonín',
  'klimatizace vinný sklep',
  'balkonová fotovoltaika hodonín',
  'instalace klimatizace jihomoravský kraj',
  'servis klimatizace jihomoravský kraj',
  'klimatizace pro firmy',
];

const brandKeywords = BRANDS.flatMap(brand => [
  `klimatizace ${brand}`,
  `montáž klimatizace ${brand}`,
  `servis klimatizace ${brand}`,
]);

const defaultKeywords = Array.from(new Set([...keywordSeeds, ...brandKeywords]));

const ogImage = `${siteUrl}/images/hero-locale.jpg`;

const openGraphDefaults = {
  type: 'website' as const,
  locale: 'cs_CZ',
  siteName: AppConfig.name,
  images: [
    {
      url: ogImage,
      width: 1920,
      height: 1080,
      alt: `${AppConfig.name} – Montáž klimatizací a fotovoltaiky v okrese Hodonín`,
    },
  ],
};

const twitterDefaults = {
  card: 'summary_large_image' as const,
  creator: AppConfig.name,
  images: [ogImage],
};

export const DEFAULT_SEO: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: baseTitle,
    template: `%s | ${AppConfig.name}`,
  },
  description: baseDescription,
  keywords: defaultKeywords,
  applicationName: AppConfig.name,
  publisher: AppConfig.name,
  category: 'HomeServices',
  openGraph: {
    ...openGraphDefaults,
    title: baseTitle,
    description: baseDescription,
    url: siteUrl,
  },
  twitter: {
    ...twitterDefaults,
    title: baseTitle,
    description: baseDescription,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const buildPageMetadata = ({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata => {
  const url = new URL(path, siteUrl).toString();
  const mergedKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...openGraphDefaults,
      title,
      description,
      url,
    },
    twitter: {
      ...twitterDefaults,
      title,
      description,
    },
  };
};

export const getStructuredData = () => {
  const serviceArea = 'Okres Hodonín, Jihomoravský kraj, Česká republika';

  const hvacBusiness = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: AppConfig.name,
    url: siteUrl,
    image: ogImage,
    telephone: COMPANY_INFO.phonePrimary,
    email: COMPANY_INFO.email,
    areaServed: serviceArea,
    description: baseDescription,
    brand: BRANDS.map(brand => ({
      '@type': 'Brand',
      name: brand,
    })),
    sameAs: [],
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Montáž a servis klimatizací',
    provider: {
      '@type': 'HVACBusiness',
      name: AppConfig.name,
      telephone: COMPANY_INFO.phonePrimary,
      areaServed: serviceArea,
    },
    areaServed: serviceArea,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Značky klimatizací',
      itemListElement: BRANDS.map(brand => ({
        '@type': 'Offer',
        name: `Montáž a servis klimatizací ${brand}`,
        itemOffered: {
          '@type': 'Product',
          name: `Klimatizace ${brand}`,
          brand,
          category: 'HVAC',
        },
      })),
    },
  };

  return [hvacBusiness, service];
};

export const SEO_SITE_URL = siteUrl;
export const SEO_DESCRIPTION = baseDescription;
