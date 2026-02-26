"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScriptureQuoteProps {
  verse: string;
  reference: string;
  className?: string;
}

export function ScriptureQuote({ verse, reference, className }: ScriptureQuoteProps) {
  return (
    <motion.blockquote
      className={cn(
        "relative pl-6 pr-4 py-4 border-l-4 border-accent bg-muted/50 rounded-r-lg",
        className
      )}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-display text-lg md:text-xl text-stone-700 italic leading-relaxed">
        &ldquo;{verse}&rdquo;
      </p>
      <cite className="mt-2 block text-sm font-medium text-primary not-italic">
        — {reference}
      </cite>
    </motion.blockquote>
  );
}
