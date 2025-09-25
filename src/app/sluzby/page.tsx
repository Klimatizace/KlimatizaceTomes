import type { Metadata } from 'next';
import Link from 'next/link';

import { CheckIcon } from '@/components/CheckIcon';
import { BRANDS, COMPANY_INFO, CORE_SERVICES } from '@/data/company';
import { buildNavLinks } from '@/data/navigation';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { buildPageMetadata } from '@/utils/seo';

export const dynamic = 'force-dynamic';

const PROCESS_STEPS = [
  {
    title: 'Audit prostředí',
    description:
      'Zjistíme tepelnou zátěž, dispozice interiéru a požadovaný komfort. Na základě měření doporučíme optimální výkon.',
  },
  {
    title: 'Návrh řešení',
    description:
      'Vypracujeme varianty instalace včetně umístění jednotek, vedení potrubí i statického posouzení pro fasádu či střechu.',
  },
  {
    title: 'Instalace a oživení',
    description:
      'Montujeme v čistotě a s maximálním důrazem na detail. Po instalaci provádíme tlakové zkoušky, vakuování a zátěžový test.',
  },
  {
    title: 'Dlouhodobá péče',
    description:
      'Zajistíme pravidelný servis, dezinfekci a monitoring výkonu. Díky tomu klimatizace funguje efektivně a úsporně.',
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Služby montáže a servisu klimatizací | Klimatizace Tomeš',
  description:
    'Montáž klimatizací na míru, úpravy pro vinné sklepy, servis autoklimatizací i mobilní servis zemědělských a stavebních strojů. Klimatizace Tomeš pokrývá celý okres Hodonín.',
  path: '/sluzby',
  keywords: ['servis klimatizace hodonín', 'údržba klimatizace', 'mobilní servis klimatizace'],
});

export default function ServicesPage() {
  const { phonePrimary, email } = COMPANY_INFO;

  return (
    <BaseTemplate leftNav={buildNavLinks()}>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-24">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.2), transparent 60%)' }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">Kompletní služby</span>
            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">
              Klimatizace na klíč – od návrhu po pravidelný servis
            </h1>
            <p className="text-lg text-slate-200">
              Připravíme řešení na míru pro byt, rodinný dům i firemní prostory. Postaráme se o technický návrh, montáž,
              revize, záruční i pozáruční servis. Součástí dodávky může být také fotovoltaika nebo úpravy pro speciální provozy.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-200">
              <a
                href={`tel:${phonePrimary.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                Zavolejte konzultaci
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/30 px-5 py-3 font-semibold transition hover:border-sky-400 hover:text-sky-200"
              >
                Napište nám detaily projektu
              </a>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => {
              const stepNumber = index + 1;

              return (
                <div
                  key={step.title}
                  className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/40"
                >
                  <div className="flex items-baseline gap-2 text-sm font-semibold tracking-[0.3em] text-sky-300 uppercase">
                    <span>Krok</span>
                    <span className="text-white">{stepNumber}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-3xl space-y-4">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Montáže, servis i údržba na jednom místě</h2>
            <p className="text-base text-slate-300">
              Nasloucháme požadavkům, zohledňujeme energetickou náročnost i estetiku interiéru. Každý projekt koordinuje
              zkušený technik a po instalaci zůstáváme k dispozici pro pravidelný servis.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map(service => (
              <article
                key={service.title}
                className="flex h-full flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg shadow-slate-950/30"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-4 text-slate-300">{service.description}</p>
                </div>
                <ul className="mt-6 space-y-2 text-slate-100">
                  {service.bullets.map(bullet => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border border-sky-500/40 bg-sky-500/20 text-sky-300">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/60 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl font-semibold text-white">Servisujeme jednotky všech hlavních značek</h2>
            <p className="text-slate-300">
              Máme zkušenosti s klimatizacemi výrobců, které dominují českému trhu. Díky tomu rychle seženeme originální
              náhradní díly a zajistíme profesionální záruční i pozáruční servis.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3 md:grid-cols-4">
            {BRANDS.map(brand => (
              <span
                key={brand}
                className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-xs font-semibold tracking-[0.3em] text-slate-200 uppercase"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-5 text-slate-200">
            <h2 className="text-3xl font-semibold text-white">Proč zákazníci volí Klimatizace Tomeš</h2>
            <ul className="list-inside list-disc space-y-3 text-base text-slate-200">
              <li>Respektujeme architekturu domu i přání majitelů – kabeláž i potrubí vedeme čistě a diskrétně.</li>
              <li>Využíváme certifikované nástroje pro tlakové zkoušky, vakuování i detekci úniků chladiva.</li>
              <li>Termíny přizpůsobujeme vašemu provozu, aby instalace nebo servis neomezoval chod domácnosti ani firmy.</li>
            </ul>
            <p className="text-sm text-slate-400">
              Potřebujete kalkulaci? Zanechte nám kontakt na stránce
              {' '}
              <Link className="text-sky-300 underline-offset-4 transition hover:text-sky-200 hover:underline" href="/kontakt">
                Kontakt
              </Link>
              {' '}
              a technik se vám ozve.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40">
            <h3 className="text-2xl font-semibold text-white">Rychlý servisní zásah</h3>
            <p className="mt-4 text-slate-300">
              Zákazníkům držíme servisní pohotovost. Obvyklá reakční doba je do 48 hodin, v sezóně prioritizujeme stávající klienty.
            </p>
            <dl className="mt-6 space-y-3 text-slate-200">
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">Hotline</dt>
                <dd className="text-lg font-semibold">{phonePrimary}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.3em] text-slate-400 uppercase">E-mail</dt>
                <dd className="text-lg font-semibold">{email}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </BaseTemplate>
  );
}
