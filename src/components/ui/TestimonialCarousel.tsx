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
      <div className="overflow-hidden rounded-2xl bg-muted/50 border border-stone-200 p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="relative h-24 w-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg">
              <Image
                src={items[index].image}
                alt={items[index].name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <Quote className="h-8 w-8 text-primary/30 mx-auto md:mx-0 mb-2" />
              <p className="font-display text-lg text-stone-700 italic">
                &ldquo;{items[index].quote}&rdquo;
              </p>
              <p className="mt-3 font-semibold text-primary">{items[index].name}</p>
              <p className="text-sm text-muted-foreground">{items[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          type="button"
          onClick={prev}
          className="p-2 rounded-full border border-stone-200 hover:bg-white hover:border-primary/30 transition-colors"
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
                i === index ? "w-6 bg-primary" : "w-2 bg-stone-300"
              )}
              aria-label={`Go to testimony ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="p-2 rounded-full border border-stone-200 hover:bg-white hover:border-primary/30 transition-colors"
          aria-label="Next testimony"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
