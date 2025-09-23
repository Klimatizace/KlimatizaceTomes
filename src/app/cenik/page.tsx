import Image from 'next/image';
import Link from 'next/link';

import { InquiryButton } from '@/components/InquiryButton';
import { COMPANY_INFO } from '@/data/company';
import { buildNavLinks } from '@/data/navigation';
import { PRICING_ITEMS, PRICING_NOTES } from '@/data/pricing';
import { BaseTemplate } from '@/templates/BaseTemplate';

export const dynamic = 'force-dynamic';

export default function PricingPage() {
  const { phonePrimary, email } = COMPANY_INFO;

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
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/30 px-5 py-3 font-semibold transition hover:border-sky-400 hover:text-sky-200"
            >
              Napište nám detaile instalace
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {PRICING_ITEMS.map(item => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-slate-950/30"
              >
                {item.image && (
                  <div className="relative h-60 w-full overflow-hidden bg-slate-950 md:h-80">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      priority={false}
                    />
                    {item.badge && (
                      /* eslint-disable-next-line tailwindcss/classnames-order */
                      <span className="absolute left-4 top-4 rounded-full border border-sky-500/40 bg-sky-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-100">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
                <div className="space-y-6 p-8">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
                    {item.description
                      ? (
                          <p className="text-sm text-slate-300">{item.description}</p>
                        )
                      : null}
                  </div>
                  <div className="flex items-end gap-3 text-white">
                    {/* eslint-disable-next-line tailwindcss/classnames-order */}
                    <span className="font-bold text-3xl">{item.price}</span>
                    {item.originalPrice
                      ? (
                          <span className="text-sm text-slate-400 line-through">{item.originalPrice}</span>
                        )
                      : null}
                  </div>
                  <InquiryButton
                    productName={item.title}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-500/60 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20"
                  >
                    Máte zájem? Napište nám
                  </InquiryButton>
                </div>
              </article>
            ))}
          </div>
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
              <Link
                href="/kontakt"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200"
              >
                Formulář
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BaseTemplate>
  );
}
