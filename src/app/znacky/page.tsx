import Link from 'next/link';

import { BRAND_NOTES, BRANDS, COMPANY_INFO } from '@/data/company';
import { buildNavLinks } from '@/data/navigation';
import { BaseTemplate } from '@/templates/BaseTemplate';

export const dynamic = 'force-dynamic';

const BRAND_SECTIONS = [
  {
    title: 'Rezidenční řešení',
    description:
      'Pro byty a rodinné domy doporučujeme tiché splitové jednotky s vysokou účinností a možností temperování v zimě.',
  },
  {
    title: 'Komerční prostory',
    description:
      'Do kanceláří a prodejen navrhujeme multisplit a VRF systémy, které zvládnou zónovou regulaci i delší rozvody.',
  },
  {
    title: 'Speciální aplikace',
    description:
      'Pro sklady, serverovny nebo vinné sklepy vybíráme jednotky s možností rozšířeného řízení teplot a vlhkosti.',
  },
];

export default function BrandsPage() {
  const { phonePrimary, email } = COMPANY_INFO;

  return (
    <BaseTemplate leftNav={buildNavLinks()}>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-24">
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(14,165,233,0.25), transparent 55%)' }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 text-white">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-semibold tracking-[0.4em] text-sky-300 uppercase">Prověřené značky</span>
            <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">Technika, na kterou se můžete spolehnout</h1>
            <p className="text-lg text-slate-200">{BRAND_NOTES.intro}</p>
            <p className="text-lg text-slate-200">{BRAND_NOTES.guarantee}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRAND_SECTIONS.map(item => (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-lg shadow-slate-950/40">
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-6 text-center text-slate-200">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Značky, se kterými pracujeme</h2>
          <p>
            Díky dlouhodobé spolupráci s distributory máme přístup k originálním dílům a technickému zázemí. Každou značku
            vybíráme s ohledem na spolehlivost, dostupnost servisu a poměr cena/výkon.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {BRANDS.map(brand => (
              <div
                key={brand}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm font-semibold tracking-[0.3em] text-slate-200 uppercase shadow-lg shadow-slate-950/30"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-5 text-slate-200">
            <h2 className="text-3xl font-semibold text-white">Potřebujete poradit s výběrem?</h2>
            <p>
              Máte konkrétní typ jednotky, nebo si nejste jistí, která technologie je pro váš objekt nejlepší? Zanechte nám
              kontakt a připravíme porovnání variant včetně provozních nákladů.
            </p>
            <ul className="list-inside list-disc space-y-3 text-sm text-slate-200">
              <li>Doporučíme vhodný výkon i typ instalace.</li>
              <li>Poradíme s využitím dotací a financování.</li>
              <li>Připravíme harmonogram montáže tak, aby nenarušil běžný provoz.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-slate-200 shadow-xl shadow-slate-950/40">
            <h3 className="text-2xl font-semibold text-white">Spojte se s námi</h3>
            <p className="mt-4 text-sm text-slate-300">
              Preferujeme osobní přístup – krátký telefonát nebo e-mail zajistí, že doporučení bude přesně odpovídat vašim
              potřebám.
            </p>
            <dl className="mt-6 space-y-4 text-left">
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
              Domluvit konzultaci
            </Link>
          </div>
        </div>
      </section>
    </BaseTemplate>
  );
}
