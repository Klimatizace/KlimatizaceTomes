"use client";

import React from "react";

export function OpenInquiryModalButton({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          const event = new CustomEvent("openInquiryModal");
          window.dispatchEvent(event);
        }
      }}
      className={className}
    >
      {children}
    </button>
  );
}
