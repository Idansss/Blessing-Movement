import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Mic2,
  ArrowLeft,
  Link2,
} from "lucide-react";
import { events } from "@/data/events";
import { RegisterButton, CopyLinkButton } from "./RegisterButton";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const typeBadgeClasses: Record<string, string> = {
  outreach: "bg-emerald-100 text-emerald-800",
  praise: "bg-purple-100 text-purple-800",
  hangout: "bg-sky-100 text-sky-800",
  bootcamp: "bg-amber-100 text-amber-800",
};

const typeLabels: Record<string, string> = {
  outreach: "Community Outreach",
  praise: "Praise & Prophesy",
  hangout: "Blessings Hangout",
  bootcamp: "Bootcamp",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();

  const description = event.fullDescription ?? event.description;
  const badgeClass =
    typeBadgeClasses[event.type] ?? "bg-stone-100 text-stone-800";
  const typeLabel = typeLabels[event.type] ?? event.type;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-64 md:h-96 w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Dark gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Back navigation */}
        <div className="absolute top-6 left-4 md:left-8 z-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur-sm px-4 py-2 text-white/90 hover:text-white text-sm font-medium transition-colors hover:bg-black/50"
          >
            <ArrowLeft className="h-4 w-4" />
            All events
          </Link>
        </div>

        {/* Title area at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${badgeClass}`}
          >
            {typeLabel}
          </span>
          <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
            {event.title}
          </h1>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="py-12 bg-muted/30 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-8">

          {/* ── Left / main column ─────────────────────────────────────── */}
          <div className="md:col-span-2 space-y-8">

            {/* About section */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">
                About this event
              </h2>
              <p className="text-stone-600 leading-relaxed text-base whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Featured Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
                <h3 className="font-display text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <Mic2 className="h-5 w-5 text-primary" />
                  Featured Speakers
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.speakers.map((speaker) => (
                    <span
                      key={speaker}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium border border-primary/20"
                    >
                      {speaker}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
                <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-stone-100 text-stone-600 px-3 py-1 text-xs font-medium border border-stone-200 hover:bg-stone-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Register CTA */}
            <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 md:p-8 text-white">
              <h3 className="font-display text-xl font-bold mb-2">
                Ready to join us?
              </h3>
              <p className="text-white/80 text-sm mb-5">
                Secure your spot today. We&apos;ll send you all the details you need.
              </p>
              <RegisterButton event={event} variant="outline" />
            </div>
          </div>

          {/* ── Right / sidebar column ─────────────────────────────────── */}
          <div className="space-y-4">

            {/* Event details card */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Event details
              </h3>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-0.5">
                    Date
                  </p>
                  <p className="text-sm font-medium text-stone-800">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-0.5">
                    Time
                  </p>
                  <p className="text-sm font-medium text-stone-800">
                    {event.time}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-0.5">
                    Location
                  </p>
                  <p className="text-sm font-medium text-stone-800">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Type */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Tag className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-0.5">
                    Type
                  </p>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClass}`}
                  >
                    {typeLabel}
                  </span>
                </div>
              </div>

              {/* Capacity */}
              {event.capacity && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-0.5">
                      Capacity
                    </p>
                    <p className="text-sm font-medium text-stone-800">
                      {event.capacity.toLocaleString()} spots
                    </p>
                  </div>
                </div>
              )}

              {/* Register button */}
              <div className="pt-1">
                <RegisterButton event={event} variant="primary" fullWidth />
              </div>
            </div>

            {/* Share card */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
              <h3 className="font-display text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                Share this event
              </h3>
              <p className="text-sm text-stone-500 mb-4">
                Invite a friend — blessings multiply when shared.
              </p>
              <CopyLinkButton />
            </div>

            {/* Back to all events */}
            <Link
              href="/events"
              className="flex items-center justify-center gap-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse all events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
