export type PricingDetailId = 'aria-ar5-basic'
  | 'balkonova-fv-800'
  | 'daikin-sensira-33'
  | 'samsung-ar35'
  | 'vivax-m-design'
  | 'aria-ar5-premium'
  | 'invertor-neo'
  | 'gree-cosmo-pro-25'
  | 'gree-pular';

export type PricingItem = {
  id: PricingDetailId;
  title: string;
  price: string;
  originalPrice?: string;
  description?: string;
  badge?: string;
  image?: string;
};

export type PricingSpec = {
  label: string;
  value: string;
};

export type PricingDetail = {
  headline: string;
  description: string;
  features: string[];
  specs?: PricingSpec[];
};

export const PRICING_DETAILS: Record<PricingDetailId, PricingDetail> = {
  'aria-ar5-basic': {
    headline: 'Úsporná jednotka pro byty 25–40 m²',
    description:
      'Inventor ARIA AR5 o výkonu 2,7 kW je moderní invertorová klimatizace určená k efektivnímu chlazení i vytápění menších a středně velkých prostor. Nabízí vysokou energetickou účinnost (A++ při chlazení), tichý provoz a standardem je i Wi-Fi ovládání přes mobilní aplikaci.',
    features: [
      'Pokročilá filtrace vzduchu s kombinací HEPA filtru a ionizátoru',
      'Ekologické chladivo R32 se sníženou ekvivalentní CO₂ zátěží',
      'Automatické čištění výparníku pro stabilní výkon a hygienu',
      'Režim odvlhčování a noční program pro nerušený spánek',
    ],
    specs: [
      { label: 'Chladicí výkon', value: '2,7 kW (rozsah 1,03–3,22 kW)' },
      { label: 'Topný výkon', value: '2,9 kW (rozsah 0,82–3,37 kW)' },
      { label: 'Energetická třída', value: 'A++ / A+' },
      { label: 'Hlučnost vnitřní jednotky', value: '22 dB(A) v tichém režimu' },
    ],
  },
  'balkonova-fv-800': {
    headline: 'Kompletní balkonová fotovoltaika pro klimatizaci',
    description:
      'Set dvou panelů o instalovaném výkonu 800 W doplněný o bezpečný měnič, montážní konstrukci a kompletní elektroinstalaci. Ideální řešení pro domácnosti, které chtějí snížit provozní náklady klimatizací nebo zásobovat další spotřebiče čistou energií.',
    features: [
      'Vlastní výroba elektřiny pokryje špičky spotřeby klimatizace',
      'Možnost připojení do stávajícího rozvodu bez složité revize',
      'Monitoring výroby prostřednictvím mobilní aplikace',
      'Instalace na klíč včetně nastavení a zkušebního provozu',
    ],
    specs: [
      { label: 'Výkon soustavy', value: '800 Wp (2 × 400 W panel)' },
      { label: 'Záruka na panely', value: '25 let lineární výkon' },
      { label: 'Střídač', value: 'Plug & play mikroinvertor s Wi-Fi' },
    ],
  },
  'daikin-sensira-33': {
    headline: 'Prémiová japonská klimatizace s tichým chodem',
    description:
      'Daikin Sensira 3,3 kW je univerzální split jednotka s invertorovou technologií a vysokou spolehlivostí. Díky chladivu R32, přesné regulaci a tichému provozu je vhodná do ložnic, obývacích pokojů i kanceláří.',
    features: [
      'Energetická účinnost až A++ při chlazení',
      'Funkce „Intelligent Eye“ směruje proudění mimo osoby v místnosti',
      'Komfortní režim proudění zabraňuje průvanu a studeným proudům',
      'Omyvatelný titan-apatitový filtr pohlcuje pachy i prach',
    ],
    specs: [
      { label: 'Chladicí výkon', value: '3,3 kW (SEER 6,8)' },
      { label: 'Topný výkon', value: '3,5 kW (SCOP 4,3)' },
      { label: 'Hlučnost vnitřní jednotky', value: '20–42 dB(A)' },
      { label: 'Rozsah provozu', value: '-15 °C až +46 °C' },
    ],
  },
  'samsung-ar35': {
    headline: 'Designová jednotka s chytrou regulací',
    description:
      'Samsung AR35 je nástěnná klimatizace s funkcí rychlého chlazení Fast Cooling a precizního odmrazování během zimního provozu. Díky režimu Good Sleep automaticky upraví teplotu i vlhkost pro nerušený noční chod.',
    features: [
      'Ovládání přes Samsung SmartThings a vestavěné Wi-Fi',
      'Tri-Care filtrace zachytí jemný prach a alergeny',
      'Auto Clean vysuší výměník a brání tvorbě bakterií',
      'Digitální invertor s 10letou zárukou na kompresor',
    ],
    specs: [
      { label: 'Chladicí výkon', value: '3,5 kW' },
      { label: 'Topný výkon', value: '3,6 kW' },
      { label: 'Energetická třída', value: 'A++ / A+' },
      { label: 'Průtok vzduchu', value: 'max. 12,0 m³/min' },
    ],
  },
  'vivax-m-design': {
    headline: 'Elegance s čelním panelem v matném provedení',
    description:
      'Vivax M Design kombinuje atraktivní vzhled s výborným poměrem ceny a výkonu. Jednotka používá ekologické chladivo R32, nabízí široký rozsah provozu a funkce pro komfortní vytápění i chlazení po celý rok.',
    features: [
      '3D proudění vzduchu rovnoměrně temperuje celou místnost',
      'Funkce I-Feel přizpůsobí výkon teplotě u dálkového ovladače',
      'Ionizátor a uhlíkový filtr pro čistý a svěží vzduch',
      'Tichý noční režim a temperování na +8 °C během zimy',
    ],
    specs: [
      { label: 'Chladicí výkon', value: '3,2 kW' },
      { label: 'Topný výkon', value: '3,4 kW' },
      { label: 'Energetická třída', value: 'A++ / A+' },
      { label: 'Hlučnost vnitřní jednotky', value: '21 dB(A) v tichém režimu' },
    ],
  },
  'aria-ar5-premium': {
    headline: 'Verze s prodlouženou pětiletou zárukou',
    description:
      'Rozšířená varianta Inventor ARIA AR5 přidává pětiletou záruku na celé zařízení a robustnější venkovní jednotku pro spolehlivý provoz i v náročnějším prostředí. Zachovává všechny výhody základního modelu a doplňuje je o profesionální servisní balíček.',
    features: [
      'Pětiletá záruka na celé zařízení včetně montáže',
      'Tepelné čerpadlo zvládne topit až do -20 °C venkovní teploty',
      'Wi-Fi ovládání, samočištění a detekce úniku chladiva',
      'Volitelné nastavení pro temperování vinných sklepů',
    ],
    specs: [
      { label: 'Chladicí výkon', value: '3,4 kW' },
      { label: 'Topný výkon', value: '3,6 kW' },
      { label: 'Energetická třída', value: 'A++ / A+' },
      { label: 'Záruka', value: '5 let při pravidelném servisu' },
    ],
  },
  'invertor-neo': {
    headline: 'Výkonná klimatizace pro speciální aplikace',
    description:
      'Invertor NEO je robustní split systém připravený zvládnout i zátěžové provozy. Posílený kompresor, přesná regulace výkonu a rozšířená ochrana komponent dovolí bezpečný provoz ve sklepích, serverovnách nebo technologických místnostech.',
    features: [
      'Rozšířený rozsah pracovních teplot od -20 °C do +50 °C',
      'Možnost napojení na externí řízení či BMS systém',
      'Antikorozní úprava výměníků Golden Fin prodlužuje životnost',
      'Funkce sterilizace horkou párou pro hygienický provoz',
    ],
    specs: [
      { label: 'Chladicí výkon', value: '3,5 kW' },
      { label: 'Topný výkon', value: '3,8 kW' },
      { label: 'Napájení', value: '230 V / 50 Hz' },
      { label: 'Komunikační rozhraní', value: 'RS485 (Modbus)' },
    ],
  },
  'gree-cosmo-pro-25': {
    headline: 'Moderní řešení pro komfort v menších až středních prostorech',
    description:
      'Cosmo Pro je moderní invertorová split klimatizace navržená pro efektivní chlazení i vytápění menších až středně velkých prostorů. Využívá ekologické chladivo R32, nabízí tichý provoz a komfortní ovládání (včetně Wi-Fi/remote). Díky invertorové technologii se přizpůsobuje aktuální potřebě výkonu a šetří energii.',
    features: [
      'Wi-Fi ovládání i chytré režimy pro pohodlnou regulaci',
      'Tichý chod od 21 dB pro nerušený odpočinek',
      'Invertorová technologie s úsporným chladivem R32',
      'Spolehlivé vytápění i v mrazech do −25 °C',
    ],
    specs: [
      { label: 'Chladicí výkon', value: '2 700 W (≈ 2,7 kW)' },
      { label: 'Topný výkon', value: '3 000 W (≈ 3,0 kW)' },
      { label: 'Příkon – chlazení / topení', value: '680 W / 680 W' },
      { label: 'Doporučená plocha', value: 'cca 27 m²' },
      { label: 'Chladivo', value: 'R32' },
      { label: 'Provozní rozsah venkovní teploty', value: 'Topný režim: do −25 °C' },
      { label: 'Energetická účinnost / EER / COP', value: 'EER ~ 3,97 ; COP ~ 4,41' },
      { label: 'Rozměry vnitřní jednotky', value: '867 × 276 × 206 mm' },
      {
        label: 'Hlučnost vnitřní / venkovní jednotky',
        value: 'Vnitřní: min ~21 dB, max ~39 dB; venkovní ~51 dB',
      },
    ],
  },
  'gree-pular': {
    headline: 'Osvědčená volba s funkcí I-Feel',
    description:
      'GREE Pular patří mezi nejprodávanější domácí klimatizace díky spolehlivosti, nízké spotřebě a jednoduchému ovládání. V balení je Wi-Fi modul pro vzdálené řízení i praktická funkce I-Feel se senzorem v ovladači.',
    features: [
      'Čtyřstupňová filtrace včetně katechinového filtru',
      'Režim Gear umožní omezit příkon na 50/75/100 %',
      'Funkce Breeze Away brání přímému proudění na osoby',
      'Temperování na +8 °C chrání objekt před promrznutím',
    ],
    specs: [
      { label: 'Chladicí výkon', value: '3,5 kW (SEER 6,1)' },
      { label: 'Topný výkon', value: '3,8 kW (SCOP 4,0)' },
      { label: 'Hlučnost vnitřní jednotky', value: '22–37 dB(A)' },
      { label: 'Záruka', value: '3 roky s možností prodloužení' },
    ],
  },
};

export const PRICING_ITEMS: PricingItem[] = [
  {
    id: 'aria-ar5-basic',
    title: 'BEIJER REF Invertor ARIA AR5',
    price: '15 650 Kč',
    badge: 'Akce',
    description: 'Spolehlivá split jednotka s invertorem a tichým chodem, vhodná pro byty a menší provozy.',
    image: '/images/pricing/aria-ar5.jpg',
  },
  {
    id: 'balkonova-fv-800',
    title: 'Balkonová fotovoltaika 800 W včetně montáže (záruka 3 roky)',
    price: '16 390 Kč',
    description: 'Kompletní set se zárukou 3 roky – ideální pro provoz klimatizace i snížení účtů za elektřinu.',
    image: '/images/pricing/balkonova-fotovoltaika.jpg',
  },
  {
    id: 'daikin-sensira-33',
    title: 'Daikin Sensira 3,3 kW včetně montáže (záruka 3 roky)',
    price: '26 490 Kč',
    originalPrice: '27 000 Kč',
    description: 'Prémiová japonská klimatizace s vysokou účinností a tříletou zárukou.',
    image: '/images/pricing/daikin-sensira.jpg',
  },
  {
    id: 'samsung-ar35',
    title: 'Samsung AR35 včetně montáže (záruka 3 roky)',
    price: '25 390 Kč',
    description: 'Stylová nástěnná jednotka s Wi-Fi ovládáním a zárukou 3 roky.',
    image: '/images/pricing/samsung-ar35.jpg',
  },
  {
    id: 'vivax-m-design',
    title: 'VIVAX M Design včetně montáže (záruka 3 roky)',
    price: '23 490 Kč',
    originalPrice: '24 000 Kč',
    description: 'Designový model s tichým provozem a praktickými režimy pro komfort v průběhu roku.',
    image: '/images/pricing/vivax-m-design.jpg',
  },
  {
    id: 'aria-ar5-premium',
    title: 'BEIJER REF Invertor ARIA AR5 včetně montáže (záruka 5 let)',
    price: '25 490 Kč',
    originalPrice: '26 000 Kč',
    description: 'Rozšířená záruka a odolná konstrukce pro náročnější provozy.',
    image: '/images/pricing/aria-ar5-main.jpg',
  },
  {
    id: 'invertor-neo',
    title: 'Invertor NEO včetně montáže (záruka 5 let)',
    price: '27 990 Kč',
    description:
      'Výkonná sestava s prodlouženou zárukou a flexibilním řízením pro sklepy, technické místnosti nebo serverovny.',
    image: '/images/pricing/invertor-neo.webp',
  },
  {
    id: 'gree-cosmo-pro-25',
    title: 'Gree Cosmo Pro 2,5 kW včetně montáže (záruka 3 roky)',
    price: '17 690 Kč',
    badge: 'Novinka',
    description:
      'Moderní invertorová jednotka s tichým provozem, Wi-Fi ovládáním a úsporným chodem pro byty i kompaktní kanceláře.',
    image: '/images/pricing/gree-cosmo-pro.jpg',
  },
  {
    id: 'gree-pular',
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
