import type { Metadata } from 'next';
import Image from 'next/image';

import Link from 'next/link';

import { COMPANY_INFO, WINE_CELLAR_CONTENT } from '@/data/company';
import { buildNavLinks } from '@/data/navigation';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { buildPageMetadata } from '@/utils/seo';

export const dynamic = 'force-dynamic';

const ADVANTAGES = [
  'Stálá teplota okolo 10 °C a stabilní vlhkost pro archivaci vína.',
  'Možnost rozšířené regulace, externích čidel a monitoringu přes aplikaci.',
  'Úsporný provoz díky správně nastaveným pracovním režimům a izolaci.',
  'Servisní pohotovost a pravidelné kontroly těsnosti chladivého okruhu.',
];

const IMPLEMENTATION_STEPS = [
  {
    title: 'Technická konzultace ve sklepě',
    detail:
      'Změříme prostor, zhodnotíme izolace a stávající rozvody. Určíme tepelné zisky a definujeme cílové klima pro jednotlivé části sklepa.',
  },
  {
    title: 'Úprava jednotky a regulace',
    detail:
      'Rozšíříme regulační rozsah, doplníme potřebná čidla a nastavíme řízení tak, aby systém precizně pracoval v nízkých teplotách.',
  },
  {
    title: 'Montáž, testování a zaškolení',
    detail:
      'Zajistíme instalaci, tlakové zkoušky i finální nastavení. Naučíme vás, jak systém správně obsluhovat a kontrolovat.',
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'Úpravy klimatizací pro vinné sklepy | Klimatizace Tomeš',
  description:
    'Speciální úpravy klimatizací pro vinné sklepy – stabilní teplota, řízená vlhkost a profesionální servis v celém okrese Hodonín.',
  path: '/vinarske',
  keywords: ['klimatizace vinný sklep', 'chlazení vinného sklepa', 'úprava klimatizace víno'],
});

export default function WineCellarPage() {
  const { phonePrimary, email } = COMPANY_INFO;

  return (
    <BaseTemplate leftNav={buildNavLinks()}>
      <section className="relative isolate overflow-hidden py-24">
        <Image
          src="/images/vinny_sklep.webp"
          alt="Vinný sklep – ilustrační fotografie"
          fill
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 text-white">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">Vinařství</span>
            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">{WINE_CELLAR_CONTENT.heading}</h1>
            <p className="text-lg text-slate-200">{WINE_CELLAR_CONTENT.intro}</p>
            {WINE_CELLAR_CONTENT.paragraphs.map(paragraph => (
              <p key={paragraph} className="text-lg text-slate-200">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {ADVANTAGES.map(item => (
              <div
                key={item}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 text-sm text-slate-200 shadow-lg shadow-slate-950/40"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Jak probíhá přestavba klimatizace pro vinný sklep</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {IMPLEMENTATION_STEPS.map((step, index) => {
              const order = index + 1;

              return (
                <div key={step.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg shadow-slate-950/30">
                  <div className="flex items-baseline gap-2 text-xs font-semibold tracking-[0.3em] text-sky-300 uppercase">
                    <span>Krok</span>
                    <span className="text-white">{order}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4 text-slate-200">
            <h2 className="text-3xl font-semibold text-white">Stavíme na zkušenostech moravských vinařů</h2>
            <p>
              Úpravám klimatizací pro sklepy se věnujeme dlouhodobě. Spolupracujeme s pěstiteli i menšími vinaři, kteří
              potřebují stabilní klima pro ležení a archivaci vín.
            </p>
            <p>
              Podle typu sklepa doporučíme vhodnou izolaci, rozložení proudění vzduchu i způsob odvodu kondenzátu.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-slate-200 shadow-xl shadow-slate-950/40">
            <h3 className="text-2xl font-semibold text-white">Spojte se s námi</h3>
            <p className="mt-4 text-sm text-slate-300">
              Rádi navštívíme váš sklep, provedeme měření a připravíme přesnou nabídku přizpůsobenou vašim potřebám.
            </p>
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
            <Link
              href="/kontakt"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
            >
              Domluvit návštěvu sklepa
            </Link>
          </div>
        </div>
      </section>
    </BaseTemplate>
  );
}
