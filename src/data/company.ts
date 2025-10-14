export const COMPANY_INFO = {
  phonePrimary: '+420 603 873 754',
  phoneSecondary: '+420 704 899 584',
  email: 'tomes-klimatizace@seznam.cz',
  regionTagline: 'Jsme tu pro vás – od Horňácka až po poslední kout okresu Hodonín.',
};

export const BRANDS = [
  'Hisense',
  'Sinclair',
  'Acond',
  'Gree',
  'Inventor & Beijer Ref',
  'Vivax',
  'Samsung',
];

const BRAND_LINK_ENTRIES: Array<[(typeof BRANDS)[number], string]> = [
  ['Hisense', 'https://cz.hisense.com'],
  ['Sinclair', 'https://www.sinclair-solutions.com/cs/uvod/'],
  ['Acond', 'https://www.acond.cz'],
  ['Gree', 'https://www.greeczech.cz/cz/uvod/'],
  ['Inventor & Beijer Ref', 'https://www.inventorairconditioner.com'],
  ['Vivax', 'https://vivax.com'],
  ['Samsung', 'https://www.samsung.com/cz/'],
];

export const BRAND_LINKS = Object.fromEntries(BRAND_LINK_ENTRIES) as Record<(typeof BRANDS)[number], string>;

export const BRAND_NOTES = {
  intro:
    'Dodáváme a instalujeme klimatizační jednotky prověřených značek. Podle typu objektu doporučíme optimální sestavu a zajistíme originální příslušenství.',
  guarantee:
    'Originální komponenty a autorizované postupy jsou zárukou dlouhé životnosti i spolehlivého provozu.',
};

export const CORE_SERVICES = [
  {
    title: 'Montáž klimatizací na míru',
    description:
      'Každou instalaci pečlivě plánujeme tak, aby systém spolehlivě fungoval dlouhá léta a přinesl maximální komfort ve všech ročních obdobích.',
    bullets: [
      'Záruční i pozáruční servis',
      'Pravidelná údržba pro maximální výkon a dlouhou životnost',
      'Profesionální návrh pro byt, dům i firemní prostory',
    ],
  },
  {
    title: 'Servis autoklimatizací',
    description:
      'Plnění, dezinfekce a opravy systémů chlazení v osobních i užitkových vozidlech. Svěřte údržbu specialistům se zkušenostmi.',
    bullets: [
      'Diagnostika a opravy klimatizací vozidel',
      'Plnění chladivem dle specifikace výrobce',
      'Rychlé termíny a individuální přístup',
    ],
  },
  {
    title: 'Mobilní servis pro stroje',
    description:
      'Udržujeme komfort i v náročných provozech. Servisujeme klimatizace zemědělských a stavebních strojů přímo u vás.',
    bullets: [
      'Diagnostika a opravy klimatizačních systémů',
      'Plnění chladicím médiem',
      'Dezinfekce a čištění pro zdravé prostředí kabiny',
    ],
  },
];

export const WINE_CELLAR_CONTENT = {
  heading: 'Úprava klimatizací pro vinné sklepy',
  intro:
    'Vybrané klimatizační jednotky odborně upravujeme tak, aby spolehlivě plnily potřeby vinařů i archivace vína. Udržujeme stálou teplotu kolem 10 °C a ideální vlhkost.',
  paragraphs: [
    'Technické úpravy zahrnují rozšíření regulačního rozsahu, případně instalaci externích čidel či speciální regulace. Díky tomu je možné přesně řídit klima skladovacích prostor.',
    'Úpravené jednotky představují cenově dostupnou alternativu ke specializovaným chladicím systémům pro vinařství, přitom však poskytují profesionální výkon a spolehlivost.',
  ],
};

export const PHOTOVOLTAIC_CONTENT = {
  heading: 'Balkonová fotovoltaika',
  paragraphs: [
    'Ke každé od nás dodané klimatizaci nabízíme zvýhodněný set balkonové fotovoltaické elektrárny včetně montáže.',
    'Spojení klimatizace a fotovoltaiky přináší úspory i nezávislost. Pomůžeme s technickým posouzením, montáží a nastavením, aby se investice rychle vrátila.',
  ],
  features: [
    'Konzultace a návrh řešení na míru',
    'Dodávka kompletního setu se zárukou',
    'Profesionální montáž a uvedení do provozu',
  ],
};
