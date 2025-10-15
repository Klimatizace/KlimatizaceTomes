'use client';

/* eslint-disable perfectionist/sort-imports */
/* eslint-disable tailwindcss/classnames-order */
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import type { FormEvent, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { COMPANY_INFO } from '@/data/company';
import { AppConfig } from '@/utils/AppConfig';
import { getStructuredData } from '@/utils/seo';

const INQUIRY_TRANSITION_MS = 280;
const CONFIRMATION_TRANSITION_MS = 240;
const CONFIRMATION_AUTO_HIDE_MS = 5000;

export const BaseTemplate = (props: {
  leftNav: ReactNode;
  rightNav?: ReactNode;
  children: ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');
  const { phonePrimary } = COMPANY_INFO;
  const [isInquiryOpen, setInquiryOpen] = useState(false);
  const [isInquiryMounted, setInquiryMounted] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState('');
  const [isInquirySubmitting, setInquirySubmitting] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobileActionsVisible, setMobileActionsVisible] = useState(true);
  const inquiryCloseTimerRef = useRef<number | null>(null);
  const inquiryOpenAnimationRef = useRef<number | null>(null);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationVariant, setConfirmationVariant] = useState<'success' | 'error' | 'pending'>('success');
  const confirmationAutoHideRef = useRef<number | null>(null);
  const confirmationCloseTimerRef = useRef<number | null>(null);
  const confirmationOpenAnimationRef = useRef<number | null>(null);
  const confirmationCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmationCardRef = useRef<HTMLDivElement | null>(null);
  const lastInquiryDraftRef = useRef('');
  const structuredData = useMemo(() => JSON.stringify(getStructuredData()), []);

  const cancelInquiryOpenAnimation = useCallback(() => {
    if (inquiryOpenAnimationRef.current) {
      window.cancelAnimationFrame(inquiryOpenAnimationRef.current);
      inquiryOpenAnimationRef.current = null;
    }
  }, []);

  const cancelConfirmationOpenAnimation = useCallback(() => {
    if (confirmationOpenAnimationRef.current) {
      window.cancelAnimationFrame(confirmationOpenAnimationRef.current);
      confirmationOpenAnimationRef.current = null;
    }
  }, []);

  const clearInquiryCloseTimer = useCallback(() => {
    if (inquiryCloseTimerRef.current) {
      window.clearTimeout(inquiryCloseTimerRef.current);
      inquiryCloseTimerRef.current = null;
    }
  }, []);

  const clearConfirmationTimers = useCallback(() => {
    cancelConfirmationOpenAnimation();
    if (confirmationAutoHideRef.current) {
      window.clearTimeout(confirmationAutoHideRef.current);
      confirmationAutoHideRef.current = null;
    }
    if (confirmationCloseTimerRef.current) {
      window.clearTimeout(confirmationCloseTimerRef.current);
      confirmationCloseTimerRef.current = null;
    }
  }, [cancelConfirmationOpenAnimation]);

  const hideConfirmation = useCallback(() => {
    const shouldAnimate = isConfirmationVisible;
    clearConfirmationTimers();
    setConfirmationOpen(false);
    if (!shouldAnimate) {
      setConfirmationVisible(false);
      return;
    }
    confirmationCloseTimerRef.current = window.setTimeout(() => {
      setConfirmationVisible(false);
      confirmationCloseTimerRef.current = null;
    }, CONFIRMATION_TRANSITION_MS);
  }, [clearConfirmationTimers, isConfirmationVisible]);

  const showConfirmation = useCallback(
    (variant: 'success' | 'error' | 'pending') => {
      clearConfirmationTimers();
      setConfirmationVariant(variant);
      setConfirmationVisible(true);
      confirmationOpenAnimationRef.current = window.requestAnimationFrame(() => {
        setConfirmationOpen(true);
        confirmationOpenAnimationRef.current = null;
      });
      if (variant === 'success') {
        confirmationAutoHideRef.current = window.setTimeout(() => {
          hideConfirmation();
        }, CONFIRMATION_AUTO_HIDE_MS);
      }
    },
    [clearConfirmationTimers, hideConfirmation],
  );

  const runInquiryClose = useCallback(
    (afterClose?: () => void) => {
      clearInquiryCloseTimer();
      cancelInquiryOpenAnimation();
      setInquiryOpen(false);
      inquiryCloseTimerRef.current = window.setTimeout(() => {
        setInquiryMounted(false);
        setPrefillMessage('');
        inquiryCloseTimerRef.current = null;
        afterClose?.();
      }, INQUIRY_TRANSITION_MS);
    },
    [cancelInquiryOpenAnimation, clearInquiryCloseTimer],
  );

  const openInquiry = useCallback(
    (product?: string, prefillOverride?: string) => {
      clearInquiryCloseTimer();
      hideConfirmation();
      const message = prefillOverride ?? (product ? `Dobrý den, mám zájem o ${product}. Prosím o více informací.` : '');
      setPrefillMessage(message);
      setInquiryMounted(true);
      cancelInquiryOpenAnimation();
      inquiryOpenAnimationRef.current = window.requestAnimationFrame(() => {
        setInquiryOpen(true);
        inquiryOpenAnimationRef.current = null;
      });
    },
    [cancelInquiryOpenAnimation, clearInquiryCloseTimer, hideConfirmation],
  );

  const closeInquiry = useCallback(() => {
    runInquiryClose();
  }, [runInquiryClose]);

  const handleInquiryRetry = useCallback(() => {
    const draft = lastInquiryDraftRef.current;
    hideConfirmation();
    openInquiry(undefined, draft);
  }, [hideConfirmation, openInquiry]);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(previous => !previous);
  }, []);

  useEffect(() => {
    const handler: EventListener = (event) => {
      const customDetail = (event as CustomEvent<string | undefined>).detail;
      openInquiry(customDetail ?? undefined);
    };

    window.addEventListener('open-inquiry', handler);
    return () => window.removeEventListener('open-inquiry', handler);
  }, [openInquiry]);

  useEffect(() => {
    return () => {
      clearInquiryCloseTimer();
      cancelInquiryOpenAnimation();
      clearConfirmationTimers();
    };
  }, [cancelInquiryOpenAnimation, clearConfirmationTimers, clearInquiryCloseTimer]);

  useEffect(() => {
    if (!isConfirmationVisible) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        hideConfirmation();
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!confirmationCardRef.current?.contains(event.target as Node)) {
        hideConfirmation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, [hideConfirmation, isConfirmationVisible]);

  useEffect(() => {
    if (isConfirmationVisible && confirmationVariant === 'error') {
      confirmationCloseButtonRef.current?.focus();
    }
  }, [confirmationVariant, isConfirmationVisible]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMobileNav();
        setMobileActionsVisible(true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [closeMobileNav]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateVisibility = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const currentScrollY = window.scrollY;

      if (isDesktop) {
        setMobileActionsVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= 0) {
        setMobileActionsVisible(true);
      } else if (Math.abs(delta) > 12) {
        if (delta > 0 && currentScrollY > 80) {
          setMobileActionsVisible(false);
        } else if (delta < 0) {
          setMobileActionsVisible(true);
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    const handleResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setMobileActionsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobileNavOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileNav();
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('#mobile-navigation a')) {
        closeMobileNav();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [closeMobileNav, isMobileNavOpen]);

  const handleInquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isInquirySubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get('message')) {
      formData.set('message', prefillMessage);
    }

    setInquirySubmitting(true);
    setConfirmationVariant('pending');
    showConfirmation('pending');

    try {
      // Submit directly to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setConfirmationVariant('success');
        // Clear the form
        form.reset();
        setPrefillMessage('');
        // Close modal after a short delay
        setTimeout(() => {
          closeInquiry();
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setConfirmationVariant('error');
    } finally {
      setInquirySubmitting(false);
    }
  };

  const renderMobileMenuIcon = () => {
    if (isMobileNavOpen) {
      return (
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
        </svg>
      );
    }

    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  };

  const renderActions = () => {
    if (props.rightNav) {
      return <>{props.rightNav}</>;
    }

    return (
      <>
        <a
          href={`tel:${phonePrimary.replace(/\s+/g, '')}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-500/60 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20 lg:w-auto"
        >
          Zavolejte nám
        </a>
        <button
          type="button"
          onClick={() => openInquiry()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 lg:w-auto"
        >
          Nezávazná poptávka
        </button>
      </>
    );
  };

  const isConfirmationError = confirmationVariant === 'error';
  const isConfirmationPending = confirmationVariant === 'pending';
  const confirmationTitle = (() => {
    if (isConfirmationError) {
      return 'Odeslání se nepodařilo';
    }

    if (isConfirmationPending) {
      return 'Odesíláme zprávu';
    }

    return 'Děkujeme za zprávu';
  })();
  const confirmationDescription = (() => {
    if (isConfirmationError) {
      return 'Zkontrolujte připojení a zkuste odeslat formulář znovu.';
    }

    if (isConfirmationPending) {
      return 'Chvilku prosíme, odesíláme váš e-mail na náš server.';
    }

    return 'Potvrdili jsme přijetí vašeho e-mailu. Ozveme se s reakcí co nejdříve.';
  })();

  const renderInquirySubmitLabel = () => {
    if (!isInquirySubmitting) {
      return 'Odeslat e-mailem';
    }

    return (
      <span className="inline-flex items-center justify-center gap-2 text-slate-900/90">
        <svg
          aria-hidden="true"
          className="h-4 w-4 animate-spin text-slate-900/80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v2m0 12v2m8-8h-2M6 12H4m12.364-6.364l-1.414 1.414M8.05 15.95l-1.414 1.414m0-10.728l1.414 1.414m7.9 7.9l1.414 1.414"
          />
        </svg>
        Odesíláme...
      </span>
    );
  };

  const renderConfirmationIcon = () => {
    if (isConfirmationError) {
      return (
        <svg
          aria-hidden="true"
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }

    if (isConfirmationPending) {
      return (
        <svg
          aria-hidden="true"
          className="h-7 w-7 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle className="opacity-20" cx="12" cy="12" r="9" fill="none" />
          <path className="opacity-70" strokeLinecap="round" d="M21 12a9 9 0 00-9-9" />
        </svg>
      );
    }

    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  const renderConfirmationFooter = () => {
    if (isConfirmationError) {
      return (
        <div className="flex w-full flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleInquiryRetry}
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
          >
            Zkusit znovu
          </button>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Nebo formulář zavřete
          </span>
        </div>
      );
    }

    if (isConfirmationPending) {
      return (
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Probíhá odesílání
        </div>
      );
    }

    return (
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        Okno se zavře automaticky
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <Script id="structured-data" type="application/ld+json">
        {structuredData}
      </Script>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto w-full max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex items-center justify-between gap-4 md:w-full md:gap-6">
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

              <button
                type="button"
                onClick={toggleMobileNav}
                aria-expanded={isMobileNavOpen}
                aria-controls="mobile-navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-slate-100 transition hover:border-sky-400 hover:text-sky-100 lg:hidden"
              >
                <span className="sr-only">{isMobileNavOpen ? 'Zavřít menu' : 'Otevřít menu'}</span>
                {renderMobileMenuIcon()}
              </button>

              <nav aria-label={t('aria_main_nav')} className="hidden flex-1 justify-center pl-2 lg:flex">
                <ul className="flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-wide text-slate-200">
                  {props.leftNav}
                </ul>
              </nav>

              <div className="hidden shrink-0 items-center gap-3 whitespace-nowrap lg:flex lg:justify-end">{renderActions()}</div>
            </div>
          </div>

          {isMobileNavOpen && (
            <nav
              id="mobile-navigation"
              aria-label={t('aria_main_nav')}
              className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-lg shadow-slate-950/30 lg:hidden"
            >
              <ul className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">
                {props.leftNav}
              </ul>
            </nav>
          )}

          <div className="relative -mx-6 lg:hidden">
            <div
              className={`absolute left-0 right-0 transition-all duration-200 ${
                isMobileNavOpen || isMobileActionsVisible
                  ? 'translate-y-0 opacity-100 pointer-events-auto'
                  : '-translate-y-full opacity-0 pointer-events-none'
              }`}
              aria-hidden={!(isMobileNavOpen || isMobileActionsVisible)}
            >
              <div className="rounded-none border-y border-slate-800 bg-slate-950/95 px-6 py-4 shadow-lg shadow-slate-950/50 sm:rounded-3xl">
                <div className="flex flex-col gap-2 sm:px-2">{renderActions()}</div>
              </div>
            </div>
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

      {isInquiryMounted && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Zavřít poptávku"
          onMouseDown={(event) => {
            // označíme, že mousedown byl mimo modal
            if (event.target === event.currentTarget) {
              (event.currentTarget as any)._shouldClose = true;
            } else {
              (event.currentTarget as any)._shouldClose = false;
            }
          }}
          onMouseUp={(event) => {
            // zavřít jen pokud mousedown i mouseup byl mimo modal
            if (
              event.target === event.currentTarget
              && (event.currentTarget as any)._shouldClose
            ) {
              closeInquiry();
            }
            (event.currentTarget as any)._shouldClose = false;
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              closeInquiry();
            }
          }}
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur transition-opacity duration-300 ${
            isInquiryOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div
            className={`relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-950 p-8 text-slate-200 shadow-2xl shadow-slate-950/60 transition-all duration-300 ease-out ${
              isInquiryOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isInquiryOpen}
          >
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
            <form
              className="mt-6 space-y-4"
              onSubmit={handleInquirySubmit}
              action="/"
              name="inquiry"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              aria-busy={isInquirySubmitting}
            >
              {/* Netlify form fields */}
              <input type="hidden" name="form-name" value="inquiry" />
              <p className="hidden" aria-hidden="true">
                <label>
                  Don't fill this out if you're human:
                  {' '}
                  <input name="bot-field" type="text" autoComplete="off" tabIndex={-1} />
                </label>
              </p>
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
                disabled={isInquirySubmitting}
                className={`w-full rounded-full px-5 py-3 font-semibold text-slate-950 shadow-lg transition ${
                  isInquirySubmitting
                    ? 'cursor-progress bg-sky-500/80 shadow-sky-500/20'
                    : 'bg-sky-500 shadow-sky-500/30 hover:bg-sky-400'
                }`}
              >
                {renderInquirySubmitLabel()}
              </button>
              <p className="text-xs text-slate-500">
                Odesláním souhlasíte se zpracováním kontaktních údajů pro účely nabídky.
              </p>
            </form>
          </div>
        </div>
      )}
      {isConfirmationVisible && (
        <div
          className={`pointer-events-none fixed inset-x-0 bottom-6 z-[65] flex justify-center px-4 transition-all duration-300 ${
            isConfirmationOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          aria-live={isConfirmationError ? 'assertive' : 'polite'}
        >
          <div
            ref={confirmationCardRef}
            role={isConfirmationError ? 'alert' : 'status'}
            className={`pointer-events-auto relative flex w-full max-w-md flex-col items-center gap-5 overflow-hidden rounded-3xl border ${
              isConfirmationError
                ? 'border-rose-500/40 shadow-rose-500/40'
                : isConfirmationPending
                  ? 'border-sky-400/30 shadow-sky-400/20'
                  : 'border-sky-500/40 shadow-sky-500/40'
            } bg-slate-950/95 p-8 text-slate-100 shadow-2xl`}
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                isConfirmationError
                  ? 'from-rose-500 via-orange-400 to-transparent'
                  : isConfirmationPending
                    ? 'from-sky-400 via-cyan-300 to-transparent'
                    : 'from-sky-500 via-cyan-400 to-transparent'
              }`}
            />
            <button
              type="button"
              onClick={hideConfirmation}
              ref={confirmationCloseButtonRef}
              className="absolute top-4 right-4 rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:border-sky-400 hover:text-sky-200"
            >
              Zavřít
            </button>
            <div className="flex flex-col items-center gap-5 text-center">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full shadow-inner ${
                  isConfirmationError
                    ? 'bg-rose-500/15 text-rose-300 shadow-rose-500/30'
                    : isConfirmationPending
                      ? 'bg-sky-500/10 text-sky-200 shadow-sky-500/20'
                      : 'bg-sky-500/15 text-sky-300 shadow-sky-500/30'
                }`}
              >
                {renderConfirmationIcon()}
              </span>
              <div className="space-y-2">
                <h3 id="inquiry-confirmation-title" className="text-xl font-semibold text-white">
                  {confirmationTitle}
                </h3>
                <p className="text-sm text-slate-300">
                  {confirmationDescription}
                </p>
              </div>
              {renderConfirmationFooter()}
            </div>
          </div>
        </div>
      )}
      {/* Hidden static form so Netlify can detect the form at build time */}
      <form name="inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="inquiry" />
        <p className="hidden">
          <label>
            Don't fill this out if you're human:
            {' '}
            <input name="bot-field" type="text" />
          </label>
        </p>
        <input type="text" name="name" />
        <input type="text" name="contact" />
        <textarea name="message" />
      </form>
    </div>
  );
};
