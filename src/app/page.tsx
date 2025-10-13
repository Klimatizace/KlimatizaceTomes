import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { CheckIcon } from '@/components/CheckIcon';
import { InquiryButton } from '@/components/InquiryButton';
import { COMPANY_INFO, CORE_SERVICES } from '@/data/company';
import { buildNavLinks } from '@/data/navigation';
import { PRICING_ITEMS, PRICING_NOTES } from '@/data/pricing';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { buildPageMetadata, SEO_DESCRIPTION } from '@/utils/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Klimatizace Tomeš – Montáž a servis klimatizací v okrese Hodonín',
  description: SEO_DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  const { phonePrimary, phoneSecondary, email, regionTagline } = COMPANY_INFO;

  return (
    <BaseTemplate leftNav={buildNavLinks()}>
      <section id="uvod" className="relative isolate scroll-mt-28 overflow-hidden md:scroll-mt-36">
        <Image
          src="/images/hero-locale.jpg"
          alt="Instalovaná klimatizace v moderním interiéru"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-32 pb-24 text-white sm:pt-40 sm:pb-32">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-1 text-[11px] font-semibold tracking-[0.35em] text-sky-200 uppercase">
            {regionTagline}
          </span>
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium tracking-[0.45em] text-slate-200 uppercase">
              Vítejte u nás
            </p>
            <h1 className="max-w-3xl text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
              Klimatizace Tomeš – Montáž, Servis, Prodej
            </h1>
            <div className="max-w-2xl space-y-4 text-lg text-slate-100">
              <p>
                Prodej, servis a montáž klimatizací. Objevte dokonalost v klimatizaci a tepelných čerpadlech
                s našimi řešeními na míru, která zajistí optimální komfort pro každou českou domácnost a firmu.
              </p>
              <p>
                Spolehlivě se postaráme o vaše pohodlí. Zajistíme profesionální montáž, pravidelný servis i
                opravy klimatizačních jednotek. S námi bude vaše klima vždy pod kontrolou.
              </p>
            </div>
          </div>
          <ul className="grid gap-3 text-base text-slate-50 sm:grid-cols-2">
            {[
              'Montáž klimatizací na míru',
              'Záruční i pozáruční servis',
              'Pravidelná údržba pro maximální výkon a dlouhou životnost',
            ].map(item => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40"
              >
                <span aria-hidden className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md border border-sky-500/40 bg-sky-500/20 text-sky-300">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <a
              href={`tel:${phonePrimary.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
            >
              Zavolejte nám
            </a>
            <InquiryButton className="inline-flex items-center gap-2 rounded-full border border-slate-200/30 px-5 py-3 text-sm font-semibold transition hover:border-sky-400 hover:text-sky-200">
              Napište nám
            </InquiryButton>
            <span className="text-xs tracking-[0.3em] text-slate-300 uppercase">
              Vaše pohodlí je naše priorita
            </span>
          </div>
        </div>
      </section>

      <section id="cenik" className="bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">Ceník</span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Nejčastěji poptávané sety</h2>
            <p className="max-w-3xl text-base text-slate-300">{PRICING_NOTES.summary}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRICING_ITEMS.slice(0, 3).map(item => (
              <article key={item.title} className="glass overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-950/30">
                {item.image && (
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="space-y-3 p-6 text-slate-200">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-2xl font-extrabold text-sky-300">{item.price}</p>
                  {item.description ? <p className="text-sm text-slate-300">{item.description}</p> : null}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/cenik"
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/60 bg-sky-500/10 px-5 py-3 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20"
            >
              Ukázat ceník
            </Link>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
            >
              Nezávazná nabídka
            </a>
          </div>
        </div>
      </section>

      <section id="sluzby" className="bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">
              Služby
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Kompletní péče o klimatizace ve vašich prostorách
            </h2>
            <p className="max-w-3xl text-base text-slate-300">
              Od prvního návrhu po dlouhodobou údržbu. Každý projekt přizpůsobujeme vašemu prostoru, nárokům na
              energetickou úspornost i komfort.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map(service => (
              <article key={service.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg shadow-slate-950/30">
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 text-slate-300">{service.description}</p>
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

            <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-950/30 md:col-span-2">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/service-installation.webp"
                  alt="Profesionální úprava klimatizace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-slate-950/20" />
              </div>
              <div className="space-y-4 p-8 text-slate-200">
                <h3 id="vinarske" className="text-2xl font-semibold text-white">
                  Úprava klimatizací pro vinné sklepy
                </h3>
                <p>
                  Některé klimatizační jednotky z naší nabídky dokážeme odborně upravit pro specifické potřeby vinařů a
                  skladování vína. Tyto úpravy zajistí spolehlivé chlazení na cílovou teplotu okolo 10 °C, která je
                  ideální pro uchovávání vína v optimálních podmínkách.
                </p>
                <p>
                  Díky specializovaným úpravám se běžná klimatizace stává efektivním a energeticky úsporným řešením pro
                  vinné sklepy, kde je vyžadována stálá, nízká a přesně řízená teplota.
                </p>
                <p>
                  Úprava zahrnuje nejen technické nastavení rozsahu regulace, ale v případě potřeby i instalaci
                  doplňkových komponent, například externích čidel nebo speciální regulace. Přináší tak dostupnou
                  alternativu k dražším specializovaným chladicím jednotkám.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg shadow-slate-950/30">
              <h3 className="text-2xl font-semibold text-white">
                Mobilní servis klimatizací pro zemědělské a stavební stroje
              </h3>
              <p className="mt-4 text-slate-300">
                Pracujete v náročných podmínkách? Zajistíme, aby vaše technika fungovala spolehlivě i v extrémních teplotách.
                Specializujeme se na plnění a servis klimatizací zemědělských i stavebních strojů.
              </p>
              <ul className="mt-6 space-y-2 text-slate-100">
                {[
                  'Diagnostika a opravy klimatizačních systémů',
                  'Plnění chladicím médiem dle specifikace stroje',
                  'Dezinfekce a čištění pro zdravé prostředí kabiny',
                  'Rychlé termíny, individuální přístup a férové ceny',
                  'Odborné zkušenosti, flexibilita a profesionální vybavení',
                ].map(text => (
                  <li key={text} className="flex items-start gap-2">
                    <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border border-sky-500/40 bg-sky-500/20 text-sky-300">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="fotovoltaika" className="bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative h-80 overflow-hidden rounded-3xl border border-slate-800">
              <Image
                src="/images/fotovoltaika.webp"
                alt="Balkonová fotovoltaická elektrárna 800W"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>
            <div className="space-y-5 text-slate-200">
              <h2 className="text-3xl font-semibold text-white">Balkonová fotovoltaika</h2>
              <p>
                Ke každé od nás dodané klimatizaci máte zvýhodněnou cenu na balkonovou fotovoltaickou elektrárnu 800 W v
                ceně 13 500 Kč včetně montáže.
              </p>
              <p>
                Kombinace moderní klimatizace a chytré fotovoltaiky přináší úspory i soběstačnost. Rádi s vámi projdeme
                možnosti na místě a připravíme řešení na klíč.
              </p>
              <a
                href={`tel:${phoneSecondary.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full border border-sky-500/60 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20"
              >
                {`Tel. ${phoneSecondary}`}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="bg-slate-900/70 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6 text-slate-200">
              <h2 className="text-3xl font-semibold text-white">Kontaktujte nás</h2>
              <p>
                Kontaktujte nás ještě dnes a domluvte si nezávaznou konzultaci. Vaše pohodlí je naše priorita.
              </p>
              <div className="space-y-4 text-base">
                <p>
                  <span className="block text-xs tracking-[0.35em] text-slate-400 uppercase">Telefon</span>
                  <a className="text-lg font-semibold text-white transition hover:text-sky-300" href={`tel:${phonePrimary.replace(/\s+/g, '')}`}>
                    {phonePrimary}
                  </a>
                  <a className="mt-1 block text-lg font-semibold text-white transition hover:text-sky-300" href={`tel:${phoneSecondary.replace(/\s+/g, '')}`}>
                    {phoneSecondary}
                  </a>
                </p>
                <p>
                  <span className="block text-xs tracking-[0.35em] text-slate-400 uppercase">E-mail</span>
                  <a className="text-lg font-semibold text-white transition hover:text-sky-300" href={`mailto:${email}`}>
                    {email}
                  </a>
                </p>
              </div>
              <p className="text-sm tracking-[0.35em] text-slate-400 uppercase">
                Jsme připraveni přijet v rámci celého okresu Hodonín
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/40">
                <h3 className="text-2xl font-semibold text-white">Připravíme nabídku na míru</h3>
                <p className="mt-4 text-slate-300">
                  Sdělte nám několik základních informací o vašem prostoru a navrhneme řešení, které splní vaše očekávání
                  i rozpočet.
                </p>
                <ul className="mt-6 space-y-3 text-slate-100">
                  <li>• Klimatizace do bytů, rodinných domů i provozoven</li>
                  <li>• Úpravy pro vinné sklepy a sklady</li>
                  <li>• Servis autoklimatizací a pracovních strojů</li>
                  <li>• Instalace fotovoltaiky včetně montáže</li>
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`tel:${phonePrimary.replace(/\s+/g, '')}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                  >
                    Zavolejte
                  </a>
                  <InquiryButton className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400 hover:text-sky-200">
                    Napište e-mail
                  </InquiryButton>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-sm text-slate-400">
                <p>© 2025 Všechna práva vyhrazena</p>
                <p>Obchodní podmínky | Pravidla ochrany soukromí | Cookies</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseTemplate>
  );
}
