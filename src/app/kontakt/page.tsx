import type { Metadata } from 'next';

import { InquiryButton } from '@/components/InquiryButton';
import { OpenInquiryModalButton } from '@/components/OpenInquiryModalButton';
import { COMPANY_INFO } from '@/data/company';
import { buildNavLinks } from '@/data/navigation';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { buildPageMetadata } from '@/utils/seo';

export const dynamic = 'force-dynamic';

const SERVICE_AREA = [
  'Okres Hodonín',
  'Horňácko a okolní obce',
  'Mikulovsko a Břeclavsko po domluvě',
  'Firemní projekty v rámci Jihomoravského kraje',
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Kontaktujte nás | Klimatizace Tomeš Hodonín',
  description:
    'Telefon, e-mail a servisní linka pro montáž a servis klimatizací v okrese Hodonín. Domluvte si nezávaznou návštěvu technika.',
  path: '/kontakt',
  keywords: ['kontakt klimatizace hodonín', 'klimatizace telefon hodonín'],
});

export default function ContactPage() {
  const { phonePrimary, phoneSecondary, email, regionTagline } = COMPANY_INFO;

  return (
    <BaseTemplate leftNav={buildNavLinks()}>
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-start">
          <div className="space-y-6 text-white">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">Kontakt</span>
            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">Spojte se s Klimatizace Tomeš</h1>
            <p className="text-lg text-slate-200">
              Ozvěte se nám telefonicky nebo e-mailem a domluvte si nezávaznou konzultaci. Dorazíme k vám, zhodnotíme prostor
              a navrhneme řešení na míru.
            </p>
            <p className="text-sm tracking-[0.3em] text-slate-400 uppercase">{regionTagline}</p>
            <dl className="space-y-4 text-slate-200">
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">Hlavní telefon</dt>
                <dd className="text-2xl font-semibold">{phonePrimary}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">Servisní linka</dt>
                <dd className="text-2xl font-semibold">{phoneSecondary}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">E-mail</dt>
                <dd className="text-xl font-semibold">{email}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-4 text-sm text-slate-200">
              <a
                href={`tel:${phonePrimary.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                Zavolejte nám
              </a>
              <InquiryButton className="inline-flex items-center gap-2 rounded-full border border-slate-200/30 px-4 py-3 text-xs font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200 sm:px-5 sm:text-sm">
                Napište e-mail
              </InquiryButton>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-slate-200 shadow-xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Servisní oblast</h2>
            <ul className="mt-4 list-inside list-disc space-y-3 text-sm text-slate-200">
              {SERVICE_AREA.map(area => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <h3 className="mt-8 text-xl font-semibold text-white">Chcete rychlou nabídku?</h3>
            <p className="mt-3 text-sm text-slate-300">
              Zašlete nám pár informací o prostoru – typ budovy, velikost místností a preferovaný termín instalace. Připravíme
              kalkulaci a navrhneme další postup.
            </p>
            <OpenInquiryModalButton className="w-full rounded-full bg-sky-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
              Odeslat poptávku
            </OpenInquiryModalButton>
            <p className="text-xs text-slate-400">
              Odesláním souhlasíte se zpracováním osobních údajů pro účely nezávazné nabídky.
            </p>
          </div>
        </div>
      </section>
    </BaseTemplate>
  );
}
