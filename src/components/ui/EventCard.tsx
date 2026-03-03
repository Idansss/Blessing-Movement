"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Event, EventType } from "@/data/events";
import { EventRegistrationModal } from "@/components/ui/EventRegistrationModal";

const typeLabels: Record<EventType, string> = {
  outreach: "Outreach",
  praise: "Praise Night",
  hangout: "Hangout",
  bootcamp: "Bootcamp",
};

const typeColors: Record<EventType, string> = {
  outreach: "bg-primary/90 text-white",
  praise: "bg-accent text-accent-foreground",
  hangout: "bg-primary/70 text-white",
  bootcamp: "bg-stone-700 text-white",
};

interface EventCardProps {
  event: Event;
  index?: number;
  className?: string;
}

export function EventCard({ event, index = 0, className }: EventCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // If the event has a real external register URL, use that; otherwise open modal
  const hasExternalUrl = event.registerUrl && event.registerUrl !== "#";

  return (
    <>
      <motion.article
        className={cn(
          "group rounded-2xl overflow-hidden section-card hover:shadow-[0_8px_32px_var(--shadow)] dark:hover:shadow-[0_0_26px_rgba(212,175,55,0.3)] transition-all duration-300",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span
            className={cn(
              "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold",
              typeColors[event.type]
            )}
          >
            {typeLabels[event.type]}
          </span>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-display text-lg font-semibold line-clamp-2">
              {event.title}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString("en-NG", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </span>
          </div>
          <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
            {event.description}
          </p>
          {hasExternalUrl ? (
            <Link
              href={event.registerUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[var(--accent-gold)] dark:text-accent font-semibold text-sm hover:underline"
            >
              Register / Learn more
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-3 inline-flex items-center gap-2 text-[var(--accent-gold)] dark:text-accent font-semibold text-sm hover:underline"
            >
              Register for this event →
            </button>
          )}
        </div>
      </motion.article>

      <EventRegistrationModal
        event={event}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
