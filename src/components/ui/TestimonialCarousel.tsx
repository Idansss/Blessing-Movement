"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimony } from "@/data/testimonies";

interface TestimonialCarouselProps {
  items: Testimony[];
  className?: string;
}

export function TestimonialCarousel({ items, className }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-2xl section-card border border-[var(--border)] dark:border-[#2A1C0C] p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="relative h-24 w-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-[var(--surface)] dark:border-white shadow-lg">
              <Image
                src={items[index].image}
                alt={items[index].name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <Quote className="h-8 w-8 text-[var(--accent-gold)]/80 dark:text-accent/70 mx-auto md:mx-0 mb-3" />
              <p className="font-display text-lg md:text-xl text-[var(--text-primary)] italic leading-relaxed">
                &ldquo;{items[index].quote}&rdquo;
              </p>
              <p className="mt-4 font-semibold text-[var(--accent-gold)] dark:text-accent text-sm md:text-base">
                {items[index].name}
              </p>
              <p className="text-xs md:text-sm text-[var(--text-secondary)]">{items[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          type="button"
          onClick={prev}
          className="p-2 rounded-full border border-[var(--border)] dark:border-[#3B2A14] bg-[var(--surface-muted)] dark:bg-[#1C1508] text-[var(--text-primary)] dark:text-[#F5F0E8] hover:border-[var(--accent-gold)]/60 dark:hover:border-accent/60 transition-colors"
          aria-label="Previous testimony"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-[var(--accent-gold)] dark:bg-accent" : "w-2 bg-[var(--border)] dark:bg-[#4B3A20]"
              )}
              aria-label={`Go to testimony ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="p-2 rounded-full border border-[var(--border)] dark:border-[#3B2A14] bg-[var(--surface-muted)] dark:bg-[#1C1508] text-[var(--text-primary)] dark:text-[#F5F0E8] hover:border-[var(--accent-gold)]/60 dark:hover:border-accent/60 transition-colors"
          aria-label="Next testimony"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
