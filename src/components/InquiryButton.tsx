'use client';

import type { ReactNode } from 'react';

type InquiryButtonProps = {
  children: ReactNode;
  className?: string;
  productName?: string;
  onOpen?: () => void;
};

export const InquiryButton = ({ children, className, productName, onOpen }: InquiryButtonProps) => {
  const handleClick = () => {
    onOpen?.();
    window.dispatchEvent(
      new CustomEvent('open-inquiry', {
        detail: productName,
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || 'inline-flex items-center gap-2 rounded-full border border-sky-500/60 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20'}
    >
      {children}
    </button>
  );
};
