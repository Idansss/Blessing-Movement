import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import { events, eventDateLabel } from "@/data/events";
import { RegisterButton, CopyLinkButton } from "./RegisterButton";
export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const event = events.find((e) => e.slug === params.slug);
  return event ? { title: event.title, description: event.description } : {};
}
export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = events.find((e) => e.slug === params.slug);
  if (!event) notFound();
  return (
    <>
      <section className="page-heading page-width">
        <Link href="/events" className="text-link">
          <ArrowLeft size={16} /> All gatherings
        </Link>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
      </section>
      <section className="page-width section-space">
        <div className="grid md:grid-cols-[1.8fr_1fr] gap-10">
          <div>
            <div className="relative h-[420px] overflow-hidden rounded">
              <Image
                src={event.image}
                alt="A photograph from a past Blessings outreach"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 60vw"
              />
            </div>
            <p className="text-xs mt-3 text-[var(--text-muted)]">
              From our outreach archive.
            </p>
            <h2 className="font-display text-3xl mt-10">
              About this gathering
            </h2>
            <p className="mt-5 leading-loose text-[var(--text-secondary)]">
              {event.fullDescription ?? event.description}
            </p>
          </div>
          <aside className="section-card p-7 h-fit">
            <h2 className="font-display text-2xl">The details</h2>
            <div className="space-y-6 my-8 text-sm">
              <p className="flex items-start gap-3">
                <Calendar className="shrink-0" size={18} />
                {eventDateLabel(event)}
              </p>
              <p className="flex items-start gap-3">
                <Clock className="shrink-0" size={18} />
                {event.time}
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="shrink-0" size={18} />
                {event.location}
              </p>
            </div>
            <RegisterButton event={event} fullWidth />
            <p className="text-xs mt-4 mb-6 leading-relaxed text-[var(--text-secondary)]">
              Register your interest and the team will share arrangements as
              they are confirmed.
            </p>
            <CopyLinkButton />
          </aside>
        </div>
      </section>
    </>
  );
}
