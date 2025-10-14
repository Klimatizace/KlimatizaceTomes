import type { Metadata } from 'next';
import { InquiryButton } from '@/components/InquiryButton';
import { PricingGrid } from '@/components/PricingGrid';
import { BRAND_LINKS, BRANDS, COMPANY_INFO } from '@/data/company';
import { buildNavLinks } from '@/data/navigation';
import { PRICING_ITEMS, PRICING_NOTES } from '@/data/pricing';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { buildPageMetadata } from '@/utils/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Ceník montáže klimatizací a fotovoltaiky | Klimatizace Tomeš',
  description:
    'Aktuální ceny montáže klimatizací značek Hisense, Sinclair, Acond, Gree, Vivax, Samsung i balkonové fotovoltaiky. Kompletní dodávka jednotky, materiálu i odborná instalace v okrese Hodonín.',
  path: '/cenik',
  keywords: ['ceník montáže klimatizace', 'montáž klimatizace cena', 'klimatizace hodonín ceník'],
});

export default function PricingPage() {
  const { phonePrimary, phoneSecondary, email } = COMPANY_INFO;

  return (
    <BaseTemplate leftNav={buildNavLinks()}>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-24">
        <div
          className="absolute inset-0 opacity-35"
          style={{ backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(56,189,248,0.25), transparent 55%)' }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 text-white">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">Ceník</span>
            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">Ceny montáže klimatizací a fotovoltaiky</h1>
            <p className="text-lg text-slate-200">
              Všechny níže uvedené ceny zahrnují dodávku jednotky, montáž a základní montážní materiál. Uvedené částky
              vycházejí z nejčastějších realizací – pro přesnou kalkulaci nás kontaktujte.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-200">
            <a
              href={`tel:${phonePrimary.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
            >
              Zavolejte pro nabídku
            </a>
            <InquiryButton className="inline-flex items-center gap-2 rounded-full border border-slate-200/30 px-5 py-3 font-semibold transition hover:border-sky-400 hover:text-sky-200">
              Napište nám detaily instalace
            </InquiryButton>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <PricingGrid items={PRICING_ITEMS} />
          <p className="mt-12 max-w-3xl text-sm text-slate-400">
            {PRICING_NOTES.summary}
          </p>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 text-slate-200">
            <h2 className="text-3xl font-semibold text-white">Jak připravíme nabídku přesně pro vás</h2>
            <ul className="list-inside list-disc space-y-3 text-base">
              <li>Probereme dispozice prostoru, požadovaný výkon a preferované značky.</li>
              <li>Doporučíme vhodné umístění vnitřní i venkovní jednotky a délku vedení.</li>
              <li>Připravíme kalkulaci včetně případných úprav pro vinné sklepy nebo fotovoltaiku.</li>
            </ul>
            <p className="text-sm text-slate-400">{PRICING_NOTES.contact}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-slate-200 shadow-xl shadow-slate-950/40">
            <h3 className="text-2xl font-semibold text-white">Kontakt</h3>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">Telefon</dt>
                <dd className="text-lg font-semibold">{phonePrimary}</dd>
                <dd className="text-lg font-semibold">{phoneSecondary}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">E-mail</dt>
                <dd className="text-lg font-semibold">{email}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${phonePrimary.replace(/\s+/g, '')}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                Zavolejte
              </a>
              <InquiryButton className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200">
                Napište nám e-mail
              </InquiryButton>
            </div>
          </div>
        </div>
      </section>

      <section id="znacky" className="scroll-mt-28 border-t border-slate-800 bg-slate-950/70 py-20 lg:scroll-mt-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">Značky</span>
            <h2 className="mt-3 text-3xl font-semibold text-white">Dodáváme ověřené technologie</h2>
            <p className="mt-4 text-sm text-slate-300">
              Spolupracujeme s renomovanými výrobci klimatizačních jednotek a příslušenství. Díky tomu můžeme doporučit
              sestavu, která přesně odpovídá vašim požadavkům na komfort, tichý chod i spotřebu energie.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BRANDS.map(brand => (
              <li
                key={brand}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/30 transition duration-200 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-sky-900/40"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500/60 via-sky-400/40 to-transparent" />
                <div className="flex h-full flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/80 px-3 py-1 text-[10px] font-semibold tracking-[0.3em] text-slate-300 uppercase">
                      Partner
                    </span>
                    <p className="text-2xl font-semibold tracking-tight text-white">{brand}</p>
                  </div>
                  <p className="text-sm text-slate-400">
                    Individuální dodávka, montáž i servis včetně originálního příslušenství a prodloužených záruk.
                  </p>
                  <a
                    href={BRAND_LINKS[brand] ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-sky-300 uppercase transition hover:text-sky-200"
                  >
                    Ověřená kvalita
                    <svg
                      aria-hidden="true"
                      className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8h9m0 0L9 4.5m3.5 3.5L9 11.5" />
                    </svg>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </BaseTemplate>
  );
}
