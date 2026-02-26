"use client";

import { useState } from "react";
import { CalendarCheck, Link2, Check } from "lucide-react";
import { EventRegistrationModal } from "@/components/ui/EventRegistrationModal";
import type { Event } from "@/data/events";

// ─── RegisterButton ──────────────────────────────────────────────────────────

interface RegisterButtonProps {
  event: Event;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
}

export function RegisterButton({
  event,
  variant = "primary",
  fullWidth = false,
}: RegisterButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 px-6 py-3 text-sm";

  const variantClasses =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-light"
      : "border-2 border-primary text-primary hover:bg-primary hover:text-white";

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={`${baseClasses} ${variantClasses} ${widthClass}`}
      >
        <CalendarCheck className="h-4 w-4" />
        Register for this event
      </button>

      <EventRegistrationModal
        event={event}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

// ─── CopyLinkButton ──────────────────────────────────────────────────────────

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (typeof window === "undefined") return;
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Fallback: select and copy
        const el = document.createElement("textarea");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 w-full justify-center rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" />
          <span className="text-emerald-600">Link copied!</span>
        </>
      ) : (
        <>
          <Link2 className="h-4 w-4" />
          Copy event link
        </>
      )}
    </button>
  );
}
