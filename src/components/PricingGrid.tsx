'use client';

import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';

import type { PricingDetailId, PricingItem } from '@/data/pricing';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { InquiryButton } from '@/components/InquiryButton';
import { PRICING_DETAILS } from '@/data/pricing';

const CLOSE_KEYS = new Set(['Escape']);

const buildItemIndex = (items: PricingItem[]) =>
  items.reduce<Record<PricingDetailId, PricingItem>>((accumulator, current) => {
    accumulator[current.id] = current;
    return accumulator;
  }, {} as Record<PricingDetailId, PricingItem>);

const INTERACTIVE_SELECTOR = 'button, a, input, textarea, select';

const isInteractiveElement = (target: EventTarget | null) =>
  target instanceof HTMLElement && Boolean(target.closest(INTERACTIVE_SELECTOR));

export const PricingGrid = ({ items }: { items: PricingItem[] }) => {
  const [activeId, setActiveId] = useState<PricingDetailId | null>(null);
  const itemsById = useMemo(() => buildItemIndex(items), [items]);

  const activeDetail = activeId ? PRICING_DETAILS[activeId] : null;
  const activeItem = activeId ? itemsById[activeId] : null;

  const closeModal = useCallback(() => {
    setActiveId(null);
  }, []);

  const openModal = useCallback((id: PricingDetailId) => {
    setActiveId(id);
  }, []);

  useEffect(() => {
    if (!activeId) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (CLOSE_KEYS.has(event.key)) {
        event.preventDefault();
        closeModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeId, closeModal]);

  const buttonBaseClassName = [
    'inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold text-sky-100 transition duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
  ].join(' ');

  const detailButtonClassName = [
    buttonBaseClassName,
    'border-sky-500/70 bg-sky-500/15 hover:border-sky-400 hover:bg-sky-500/25 shadow-inner shadow-sky-500/20',
  ].join(' ');

  const inquiryButtonClassName = [
    buttonBaseClassName,
    // Match visual weight with the detail button for consistency across cards
    'border-sky-500/70 bg-sky-500/10 hover:border-sky-400 hover:bg-sky-500/20 shadow-inner shadow-sky-500/20',
  ].join(' ');

  const modalInquiryButtonClassName = [
    'inline-flex items-center justify-center gap-3 rounded-full border border-sky-500/60 bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400',
  ].join(' ');
  const handleCardClick = useCallback(
    (id: PricingDetailId) => (event: ReactMouseEvent<HTMLDivElement>) => {
      if (isInteractiveElement(event.target)) {
        return;
      }

      openModal(id);
    },
    [openModal],
  );

  const handleCardKeyDown = useCallback(
    (id: PricingDetailId) => (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      if (isInteractiveElement(event.target)) {
        return;
      }

      event.preventDefault();
      openModal(id);
    },
    [openModal],
  );

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        {items.map(item => (
          <div
            key={item.id}
            onClick={handleCardClick(item.id)}
            onKeyDown={handleCardKeyDown(item.id)}
            role="button"
            tabIndex={0}
            className="group w-full cursor-pointer overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-slate-950/30 transition duration-200 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-sky-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {item.image && (
              <div className="relative h-60 w-full overflow-hidden bg-slate-950 md:h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
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
            <div className="flex h-full flex-col gap-6 p-8 text-left">
              {/* Fixed-height content block to align buttons across cards */}
              <div className="flex min-h-[10.5rem] flex-col justify-start gap-6 md:min-h-[11.5rem]">
                <div className="space-y-3 text-slate-200">
                  <h2 className="line-clamp-2 text-2xl font-semibold text-white">{item.title}</h2>
                  {item.description && <p className="line-clamp-2 text-sm text-slate-300">{item.description}</p>}
                </div>
                <div className="flex items-end gap-3 text-white">
                  {/* eslint-disable-next-line tailwindcss/classnames-order */}
                  <span className="font-bold text-3xl">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">{item.originalPrice}</span>
                  )}
                </div>
              </div>
              <div className="mt-6 space-y-3 border-t border-slate-800/70 pt-4">
                <button
                  type="button"
                  onClick={() => openModal(item.id)}
                  className={detailButtonClassName}
                >
                  Zobrazit detail a popis
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 5l6 5-6 5" />
                  </svg>
                </button>
                <InquiryButton
                  productName={item.title}
                  className={inquiryButtonClassName}
                >
                  Máte zájem? Napište nám
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 5l6 5-6 5" />
                  </svg>
                </InquiryButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeItem && activeDetail && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 px-4 py-10 backdrop-blur"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            className="relative z-[71] flex max-h-[90vh] w-full max-w-5xl flex-col gap-8 overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950/95 p-6 text-slate-100 shadow-2xl shadow-slate-950/60 sm:gap-10 sm:p-8 md:rounded-[2.5rem] md:p-12"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-sky-400 hover:text-sky-100"
            >
              <span className="sr-only">Zavřít okno</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8m0-8l-8 8" />
              </svg>
            </button>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
              {activeItem.image && (
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 sm:rounded-3xl">
                    <Image
                      src={activeItem.image}
                      alt={activeItem.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </div>

                  {activeDetail.features.length > 0 && (
                    <ul className="hidden gap-3 border-t border-slate-800/70 pt-4 text-sm text-slate-200 lg:grid lg:text-base">
                      {activeDetail.features.map(feature => (
                        <li key={`left-${feature}`} className="flex items-start gap-2">
                          <span aria-hidden className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-sky-500/50 bg-sky-500/10 text-sky-200">
                            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3L12.5 5" />
                            </svg>
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-5 sm:gap-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.3em] text-sky-200 uppercase">
                    {activeDetail.headline}
                  </span>
                  <h3 className="text-4xl font-semibold text-white lg:text-[2.75rem]">{activeItem.title}</h3>
                  <div className="flex flex-wrap items-baseline gap-4 text-white">
                    <span className="text-3xl font-bold lg:text-[2.2rem]">{activeItem.price}</span>
                    {activeItem.originalPrice && (
                      <span className="text-base text-slate-400 line-through lg:text-lg">{activeItem.originalPrice}</span>
                    )}
                  </div>
                </div>
                <p className="text-base text-slate-200 lg:text-lg">{activeDetail.description}</p>

                {activeDetail.features.length > 0 && (
                  <ul className="grid gap-3 text-sm text-slate-200 md:grid-cols-2 lg:hidden lg:text-base">
                    {activeDetail.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-sky-500/50 bg-sky-500/10 text-sky-200">
                          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5l3 3L12.5 5" />
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeDetail.specs && (
                  <dl className="grid gap-4 text-xs tracking-[0.25em] text-slate-400 uppercase md:grid-cols-2">
                    {activeDetail.specs.map(spec => (
                      <div key={`${spec.label}-${spec.value}`}>
                        <dt>{spec.label}</dt>
                        <dd className="text-base tracking-normal text-slate-200 normal-case">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-2 flex flex-wrap gap-3 pb-1">
                  <InquiryButton productName={activeItem.title} onOpen={closeModal} className={modalInquiryButtonClassName}>
                    Mám zájem
                  </InquiryButton>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-700 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-sky-400 hover:text-sky-100"
                  >
                    Zavřít detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
