export type PricingItem = {
  title: string;
  price: string;
  originalPrice?: string;
  description?: string;
  badge?: string;
  image?: string;
};

export const PRICING_ITEMS: PricingItem[] = [
  {
    title: 'BEIJER REF Invertor ARIA AR5',
    price: '15 650 Kč',
    badge: 'Akce',
    description: 'Spolehlivá split jednotka s invertorem a tichým chodem, vhodná pro byty a menší provozy.',
    image: '/images/pricing/aria-ar5.jpg',
  },
  {
    title: 'Balkonová fotovoltaika 800 W včetně montáže (záruka 3 roky)',
    price: '16 390 Kč',
    description: 'Kompletní set se zárukou 3 roky – ideální pro provoz klimatizace i snížení účtů za elektřinu.',
    image: '/images/pricing/balkonova-fotovoltaika.jpg',
  },
  {
    title: 'Daikin Sensira 3,3 kW včetně montáže (záruka 3 roky)',
    price: '26 490 Kč',
    originalPrice: '27 000 Kč',
    description: 'Prémiová japonská klimatizace s vysokou účinností a tříletou zárukou.',
    image: '/images/pricing/daikin-sensira.jpg',
  },
  {
    title: 'Samsung AR35 včetně montáže (záruka 3 roky)',
    price: '25 390 Kč',
    description: 'Stylová nástěnná jednotka s Wi-Fi ovládáním a zárukou 3 roky.',
    image: '/images/pricing/samsung-ar35.jpg',
  },
  {
    title: 'VIVAX M Design včetně montáže (záruka 3 roky)',
    price: '23 490 Kč',
    originalPrice: '24 000 Kč',
    description: 'Designový model s tichým provozem a praktickými režimy pro komfort v průběhu roku.',
    image: '/images/pricing/vivax-m-design.jpg',
  },
  {
    title: 'BEIJER REF Invertor ARIA AR5 včetně montáže (záruka 5 let)',
    price: '25 490 Kč',
    originalPrice: '26 000 Kč',
    description: 'Rozšířená záruka a odolná konstrukce pro náročnější provozy.',
    image: '/images/pricing/aria-ar5-main.jpg',
  },
  {
    title: 'Invertor NEO včetně montáže (záruka 5 let)',
    price: '27 990 Kč',
    description: 'Silnější set s možností upraveného řízení pro speciální prostory.',
    image: '/images/pricing/invertor-neo.webp',
  },
  {
    title: 'GREE Pular včetně montáže (záruka 3 roky)',
    price: '25 490 Kč',
    originalPrice: '26 000 Kč',
    description: 'Oblíbený model s vysokou energetickou účinností a spolehlivým servisem.',
    image: '/images/pricing/gree-pular.jpg',
  },
];

export const PRICING_NOTES = {
  summary:
    'Ceny zahrnují dodávku jednotky, montáž a základní materiál. Konečná cena se může lišit podle délky potrubí, přístupnosti montáže nebo doplňkových úprav.',
  contact:
    'Pro přesnou kalkulaci nám zavolejte nebo napište. Připravíme nabídku na míru vašemu prostoru a požadavkům.',
};
