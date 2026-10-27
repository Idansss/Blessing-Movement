"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScriptureQuoteProps {
  verse: string;
  reference: string;
  className?: string;
}

export function ScriptureQuote({
  verse,
  reference,
  className,
}: ScriptureQuoteProps) {
  return (
    <motion.blockquote
      className={cn(
        "relative pl-6 pr-5 py-5 border-l-4 border-accent bg-[var(--surface-muted)] rounded-2xl shadow-[0_0_24px_rgba(0,0,0,0.7)]",
        className,
      )}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-display text-lg md:text-xl italic leading-relaxed text-[var(--text-secondary)]">
        &ldquo;{verse}&rdquo;
      </p>
      <cite className="mt-3 block text-sm font-semibold text-accent not-italic tracking-wide uppercase">
        , {reference}
      </cite>
    </motion.blockquote>
  );
}
