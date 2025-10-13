import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { InquiryButton } from '@/components/InquiryButton';
import { COMPANY_INFO, PHOTOVOLTAIC_CONTENT } from '@/data/company';
import { buildNavLinks } from '@/data/navigation';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { buildPageMetadata } from '@/utils/seo';

export const dynamic = 'force-dynamic';

const BENEFITS = [
  {
    title: 'Energetické úspory',
    description:
      'Vyrobená elektřina pokrývá běžný provoz klimatizace i dalších spotřebičů. Výrazně snižuje náklady v letní špičce.',
  },
  {
    title: 'Jednoduchá instalace',
    description:
      'Balkonová fotovoltaika nevyžaduje stavební úpravy. Montáž zvládneme během jednoho dne bez zásahu do fasády.',
  },
  {
    title: 'Monitoring výkonu',
    description:
      'Součástí řešení je aplikace pro sledování výroby a spotřeby. Vidíte přehled úspor i návratnosti investice.',
  },
];

const BUNDLE_STEPS = [
  'Technická konzultace na místě a posouzení orientace balkonu.',
  'Příprava nabídky včetně kalkulace úspor a dotací.',
  'Montáž panelů, zapojení střídače a uvedení do provozu.',
  'Zaškolení uživatele a napojení na monitoring výroby.',
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Balkonová fotovoltaika 800 W | Klimatizace Tomeš',
  description:
    'Zvýhodněný set balkonové fotovoltaiky 800 W se zapojením na klimatizaci. Kompletní dodávka panelů, střídače a montáže v okrese Hodonín.',
  path: '/fotovoltaika',
  keywords: ['balkonová fotovoltaika', 'fotovoltaika hodonín', 'klimatizace fotovoltaika'],
});

export default function PhotovoltaicsPage() {
  const { phonePrimary, phoneSecondary, email } = COMPANY_INFO;

  return (
    <BaseTemplate leftNav={buildNavLinks()}>
      <section className="relative isolate overflow-hidden py-24">
        <Image
          src="/images/fotovoltaika.webp"
          alt="Balkonová fotovoltaika 800 W"
          fill
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 text-white">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">Fotovoltaika</span>
            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">{PHOTOVOLTAIC_CONTENT.heading}</h1>
            {PHOTOVOLTAIC_CONTENT.paragraphs.map(paragraph => (
              <p key={paragraph} className="text-lg text-slate-200">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BENEFITS.map(benefit => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 text-sm text-slate-200 shadow-lg shadow-slate-950/40"
              >
                <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                <p className="mt-3">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-5 text-slate-200">
            <h2 className="text-3xl font-semibold text-white">Co balíček obsahuje</h2>
            <ul className="list-inside list-disc space-y-3 text-base text-slate-200">
              {PHOTOVOLTAIC_CONTENT.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <p className="text-sm text-slate-400">
              Zvýhodněná cena platí při společné dodávce klimatizace. Fotovoltaiku lze instalovat také dodatečně – rádi vám
              připravíme individuální kalkulaci.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-slate-200 shadow-lg shadow-slate-950/30">
            <h3 className="text-2xl font-semibold text-white">Průběh spolupráce</h3>
            <ol className="mt-6 space-y-3 text-sm">
              {BUNDLE_STEPS.map((step, index) => {
                const order = index + 1;
                const orderLabel = `${order}.`;

                return (
                  <li key={step} className="flex gap-2">
                    <span className="font-semibold text-sky-300">{orderLabel}</span>
                    <span>{step}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/60 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-4 text-slate-200">
            <h2 className="text-3xl font-semibold text-white">Připraveni na energetickou soběstačnost?</h2>
            <p>
              Kombinace klimatizace a fotovoltaiky znamená komfort v létě i úspory v průběhu celého roku. Pomůžeme vám
              vybrat ideální nastavení výroby a spotřeby.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-slate-200 shadow-xl shadow-slate-950/40 lg:w-1/2">
            <h3 className="text-2xl font-semibold text-white">Nezávazná konzultace</h3>
            <p className="mt-4 text-sm text-slate-300">
              Vyplňte kontaktní formulář nebo nám zavolejte. Domluvíme termín schůzky a připravíme nabídku přesně pro vaše stavební podmínky.
            </p>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">Hlavní kontakt</dt>
                <dd className="text-lg font-semibold">{phonePrimary}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">Servisní linka</dt>
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
                Zavolejte konzultaci
              </a>
              <InquiryButton className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200/30 px-5 py-3 text-sm font-semibold transition hover:border-sky-400 hover:text-sky-200">
                Napište nám
              </InquiryButton>
            </div>
          </div>
        </div>
      </section>
    </BaseTemplate>
  );
}
