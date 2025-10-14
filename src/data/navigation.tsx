import Link from 'next/link';

export const NAV_ITEMS = [
  { href: '/#uvod', label: 'Úvod' },
  { href: '/#sluzby', label: 'Služby' },
  { href: '/cenik#znacky', label: 'Značky' },
  { href: '/cenik', label: 'Ceník' },
  { href: '/#fotovoltaika', label: 'Fotovoltaika' },
  { href: '/#kontakt', label: 'Kontakt' },
];

export const buildNavLinks = () =>
  NAV_ITEMS.map((item) => {
    const isActive = false; // scrollspy can highlight in client, keep inactive by default

    return (
      <li key={item.href} className="flex">
        <Link
          href={item.href}
          className={`rounded-full px-3.5 py-2 text-xs font-semibold tracking-[0.14em] transition-colors hover:bg-sky-400/20 hover:text-sky-200 sm:text-sm ${
            isActive ? 'bg-sky-500/20 text-sky-100' : ''
          }`}
        >
          {item.label}
        </Link>
      </li>
    );
  });
