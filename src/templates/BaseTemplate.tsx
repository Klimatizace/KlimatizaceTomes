'use client';

/* eslint-disable perfectionist/sort-imports */
/* eslint-disable tailwindcss/classnames-order */
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { FormEvent, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { COMPANY_INFO } from '@/data/company';
import { AppConfig } from '@/utils/AppConfig';

export const BaseTemplate = (props: {
  leftNav: ReactNode;
  rightNav?: ReactNode;
  children: ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');
  const { phonePrimary, email } = COMPANY_INFO;
  const [isInquiryOpen, setInquiryOpen] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState('');

  const openInquiry = useCallback((product?: string) => {
    setPrefillMessage(
      product ? `Dobrý den, mám zájem o ${product}. Prosím o více informací.` : '',
    );
    setInquiryOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setInquiryOpen(false);
    setPrefillMessage('');
  }, []);

  useEffect(() => {
    const handler: EventListener = (event) => {
      const customDetail = (event as CustomEvent<string | undefined>).detail;
      openInquiry(customDetail ?? undefined);
    };

    window.addEventListener('open-inquiry', handler);
    return () => window.removeEventListener('open-inquiry', handler);
  }, [openInquiry]);

  const handleInquirySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name')?.toString() ?? '';
    const contact = formData.get('contact')?.toString() ?? '';
    const message = prefillMessage || formData.get('message')?.toString() || '';
    const mailto = `mailto:${email}?subject=${encodeURIComponent('Nezávazná poptávka')}&body=${encodeURIComponent(
      `Jméno: ${name}\nKontakt: ${contact}\n\nZpráva:\n${message}`,
    )}`;
    window.location.href = mailto;
    form.reset();
    closeInquiry();
  };

  const renderedActions = props.rightNav ?? (
    <>
      <a
        href={`tel:${phonePrimary.replace(/\s+/g, '')}`}
        className="inline-flex items-center gap-2 rounded-full border border-sky-500/60 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20"
      >
        Zavolejte nám
      </a>
      <button
        type="button"
        onClick={() => openInquiry()}
        className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
      >
        Nezávazná poptávka
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-4 text-left transition-transform hover:scale-[1.02]">
            <span className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-lg shadow-sky-900/20 md:h-16 md:w-16">
              <Image
                src="/images/logo-mark.svg"
                alt={AppConfig.name}
                fill
                sizes="(max-width: 768px) 56px, 64px"
                className="object-contain"
                priority
              />
            </span>
            <span className="flex flex-col">
              <span className="text-xl font-semibold tracking-tight text-white md:text-2xl">{AppConfig.name}</span>
              <span className="text-sm text-slate-300 md:text-base">{t('tagline')}</span>
            </span>
          </Link>

          <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <nav aria-label={t('aria_main_nav')} className="order-last w-full overflow-x-auto md:order-none md:flex-1 md:overflow-visible">
              <ul className="flex items-center justify-start gap-3 text-sm font-medium text-slate-200 uppercase tracking-wide whitespace-nowrap md:justify-center">
                {props.leftNav}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-3 whitespace-nowrap md:justify-end">{renderedActions}</div>
          </div>
        </div>
      </header>

      <main>{props.children}</main>

      <footer className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>{`© ${new Date().getFullYear()} ${AppConfig.name}. ${t('rights')}`}</span>
          <span>{t('made_with')}</span>
        </div>
      </footer>

      {isInquiryOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-950 p-8 text-slate-200 shadow-2xl shadow-slate-950/60">
            <button
              type="button"
              onClick={closeInquiry}
              className="absolute top-4 right-4 rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:border-sky-400 hover:text-sky-200"
            >
              Zavřít
            </button>
            <h2 className="text-2xl font-semibold text-white">Nezávazná poptávka</h2>
            <p className="mt-3 text-sm text-slate-300">
              Napište nám základní informace o prostoru a požadované službě. Ozveme se s přesnou nabídkou.
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleInquirySubmit}>
              <div>
                <label className="mb-2 block text-xs text-slate-400 uppercase tracking-[0.35em]" htmlFor="modal-name">
                  Jméno a příjmení
                </label>
                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-sky-400 focus:outline-none"
                  placeholder="Jan Novák"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-slate-400 uppercase tracking-[0.35em]" htmlFor="modal-contact">
                  Telefon nebo e-mail
                </label>
                <input
                  id="modal-contact"
                  name="contact"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-sky-400 focus:outline-none"
                  placeholder="Váš kontakt"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-slate-400 uppercase tracking-[0.35em]" htmlFor="modal-message">
                  Zpráva
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={4}
                  value={prefillMessage}
                  onChange={event => setPrefillMessage(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 focus:border-sky-400 focus:outline-none"
                  placeholder="Popište prostory a požadovanou službu"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-sky-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                Odeslat e-mailem
              </button>
              <p className="text-xs text-slate-500">
                Odesláním souhlasíte se zpracováním kontaktních údajů pro účely nabídky.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
