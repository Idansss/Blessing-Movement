"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { EventCard } from "@/components/ui/EventCard";
import { EventRegistrationModal } from "@/components/ui/EventRegistrationModal";
import { events, type EventType } from "@/data/events";

const filters: { value: EventType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "outreach", label: "Outreach" },
  { value: "praise", label: "Praise Night" },
  { value: "hangout", label: "Hangout" },
  { value: "bootcamp", label: "Bootcamp" },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const [featuredModalOpen, setFeaturedModalOpen] = useState(false);
  const filtered =
    filter === "all" ? events : events.filter((e) => e.type === filter);
  const featured = events.find((e) => e.featured) ?? events[0];

  const hasFeaturedExternalUrl = featured?.registerUrl && featured.registerUrl !== "#";

  return (
    <>
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-stone-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Events
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join us in person or online. Outreaches, Praise & Prophesy, Hangouts, and Bootcamps.
          </motion.p>
        </div>
      </section>

      {featured && (
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-sm font-medium text-primary mb-2">Featured</p>
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <span className="text-sm font-medium text-accent">Featured event</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">
                    {featured.title}
                  </h2>
                  <p className="mt-2 text-white/90 max-w-2xl">
                    {featured.description}
                  </p>
                  {hasFeaturedExternalUrl ? (
                    <a
                      href={featured.registerUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-foreground hover:bg-accent-light transition-colors"
                    >
                      Register now
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setFeaturedModalOpen(true)}
                      className="mt-4 inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-foreground hover:bg-accent-light transition-colors"
                    >
                      Register now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f.value
                    ? "bg-primary text-white"
                    : "bg-muted text-stone-600 hover:bg-stone-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No events in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      {featured && (
        <EventRegistrationModal
          event={featured}
          open={featuredModalOpen}
          onClose={() => setFeaturedModalOpen(false)}
        />
      )}
    </>
  );
}
