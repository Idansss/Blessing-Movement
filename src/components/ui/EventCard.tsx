"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { eventDateLabel, type Event } from "@/data/events";
import { EventRegistrationModal } from "./EventRegistrationModal";
export function EventCard({
  event,
  className = "",
}: {
  event: Event;
  index?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className={"section-card overflow-hidden " + className}>
        <Link href={"/events/" + event.slug} className="block">
          <div className="relative h-64">
            <Image
              src={event.image}
              alt="A moment from a past Blessings outreach"
              fill
              className="object-cover"
              sizes="(max-width: 700px) 100vw, 33vw"
            />
          </div>
        </Link>
        <div className="p-6">
          <p className="eyebrow">{eventDateLabel(event)}</p>
          <h2 className="font-display text-2xl mt-3 leading-tight">
            <Link href={"/events/" + event.slug}>{event.title}</Link>
          </h2>
          <p className="text-xs mt-4 leading-relaxed text-[var(--text-secondary)] flex items-start gap-2">
            <MapPin size={14} className="shrink-0 mt-0.5" />
            {event.location}
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
            {event.description}
          </p>
          <button className="text-link mt-4" onClick={() => setOpen(true)}>
            Register interest <ArrowUpRight size={17} />
          </button>
        </div>
      </article>
      <EventRegistrationModal
        event={event}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
