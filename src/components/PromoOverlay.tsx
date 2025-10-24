'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'kt:promo-overlay-dismissed-at';
const PROMO_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const isExpired = (timestamp: number) => Number.isFinite(timestamp) && Date.now() - timestamp > PROMO_TTL_MS;

const reportError = (message: string, error: unknown) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(message, error);
  }
};

export const PromoOverlay = () => {
  const [isVisible, setVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (error) {
      reportError('Unable to persist promo overlay dismissal', error);
    }
    previouslyFocusedElementRef.current?.focus?.();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let shouldDisplay = false;
    let frameId: number | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        shouldDisplay = true;
      } else {
        const timestamp = Number.parseInt(stored, 10);
        if (!Number.isFinite(timestamp) || isExpired(timestamp)) {
          shouldDisplay = true;
        }
      }
    } catch (error) {
      reportError('Unable to read promo overlay state', error);
      shouldDisplay = true;
    }

    if (shouldDisplay) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      frameId = window.requestAnimationFrame(() => {
        setVisible(true);
      });
    }

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.cancelAnimationFrame(frame);
    };
  }, [close, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-slate-950/80 px-4 py-10 backdrop-blur"
      role="presentation"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-overlay-title"
        className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-950/95 shadow-2xl shadow-slate-950/60"
      >
        <div className="relative h-[420px] w-full bg-slate-900 sm:h-[480px]">
          <Image
            src="/images/gree-cosmo-pro-ad.webp"
            alt="Posezónní sleva na klimatizaci Gree Cosmo Pro"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/40" />
        </div>
        <div className="space-y-6 px-6 pt-6 pb-8 text-center text-slate-100 sm:px-10 sm:pb-10">
          <div className="space-y-3">
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.3em] text-sky-200 uppercase">
              Novinka v nabídce
            </span>
            <h2 id="promo-overlay-title" className="text-3xl font-semibold text-white sm:text-4xl">
              Gree Cosmo Pro 2,5 kW
            </h2>
            <p className="text-sm text-slate-300 sm:text-base">
              Podívejte se na náš nový set s invertorovou jednotkou Cosmo Pro. Efektivně chladí i topí, běží tiše a zvládne to i v mrazech.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/cenik#gree-cosmo-pro-25"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              onClick={close}
            >
              Zjistit víc
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 5l6 5-6 5" />
              </svg>
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-sky-100"
            >
              Zavřít
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
