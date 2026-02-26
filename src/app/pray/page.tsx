import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Star,
  BookOpen,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { prisma } from "@/lib/db";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Prayer Wall",
  description:
    "Join thousands in prayer. Submit your request and let our community stand in faith with you.",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

type PrayerStatus = "new" | "praying" | "followed_up" | "testimony";

const statusConfig: Record<
  PrayerStatus,
  { label: string; classes: string }
> = {
  new: {
    label: "New",
    classes: "bg-purple-100 text-purple-800",
  },
  praying: {
    label: "Praying",
    classes: "bg-amber-100 text-amber-800",
  },
  followed_up: {
    label: "Followed up",
    classes: "bg-sky-100 text-sky-800",
  },
  testimony: {
    label: "Testimony",
    classes: "bg-emerald-100 text-emerald-800",
  },
};

function getStatusConfig(status: string) {
  return (
    statusConfig[status as PrayerStatus] ?? {
      label: status,
      classes: "bg-stone-100 text-stone-700",
    }
  );
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: diffDays > 365 ? "numeric" : undefined,
  });
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

function getFirstName(name: string | null | undefined): string | null {
  if (!name) return null;
  return name.trim().split(" ")[0];
}

// ─── Prayer card ─────────────────────────────────────────────────────────────

interface PrayerCardProps {
  prayer: {
    id: string;
    content: string;
    status: string;
    requesterName: string | null;
    createdAt: Date;
  };
}

function PrayerCard({ prayer }: PrayerCardProps) {
  const statusCfg = getStatusConfig(prayer.status);
  const isTestimony = prayer.status === "testimony";
  const firstName = getFirstName(prayer.requesterName);
  const displayContent = truncate(prayer.content, 200);

  return (
    <div
      className={`bg-white rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${
        isTestimony ? "border-accent/40" : "border-stone-200"
      }`}
    >
      {/* Testimony badge */}
      {isTestimony && (
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="h-4 w-4 text-accent fill-accent" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            Answered Prayer
          </span>
        </div>
      )}

      {/* Prayer content */}
      <p className="text-stone-700 leading-relaxed text-sm">
        &ldquo;{displayContent}&rdquo;
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Status badge */}
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusCfg.classes}`}
          >
            {statusCfg.label}
          </span>
          {/* Name */}
          {firstName && (
            <span className="text-xs text-stone-400 font-medium">
              — {firstName}
            </span>
          )}
        </div>
        {/* Date */}
        <span className="text-xs text-stone-400">
          {formatRelativeDate(prayer.createdAt)}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PrayerWallPage() {
  const prayers = await prisma.prayerRequest.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      content: true,
      status: true,
      requesterName: true,
      createdAt: true,
    },
  });

  return (
    <>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-gradient-hero text-white text-center relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 grain" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Heart className="h-7 w-7 text-accent fill-accent/30" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Prayer Wall
          </h1>

          <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
            Real prayers from our community. We are believing together.
          </p>

          {/* Scripture */}
          <div className="inline-flex items-start gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-sm text-white/90 max-w-lg mx-auto">
            <BookOpen className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="italic text-left">
              &ldquo;The prayer of a righteous person is powerful and
              effective.&rdquo;{" "}
              <span className="not-italic font-semibold text-accent">
                — James 5:16
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Submit CTA ────────────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold text-stone-900">
              Have a prayer request?
            </p>
            <p className="text-sm text-stone-500 mt-0.5">
              Submit anonymously or with your name — we pray for every request.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/get-involved#prayer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-light transition-colors"
            >
              Submit a Request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Prayer wall grid ──────────────────────────────────────────────── */}
      <section className="py-12 bg-muted/30 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">

          {/* Count heading */}
          {prayers.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-stone-900">
                Community prayers
              </h2>
              <span className="text-sm text-stone-400 font-medium">
                {prayers.length} public request{prayers.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Empty state */}
          {prayers.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5">
                <Inbox className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                Be the first to pray
              </h3>
              <p className="text-stone-500 max-w-sm mx-auto mb-6">
                No public prayer requests yet. Submit yours and let the
                community stand with you in faith.
              </p>
              <Link
                href="/get-involved#prayer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Submit a Prayer Request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Cards grid */}
          {prayers.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {prayers.map((prayer) => (
                <PrayerCard key={prayer.id} prayer={prayer} />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          {prayers.length > 0 && (
            <div className="mt-12 text-center">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 max-w-md mx-auto">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  Add your prayer request
                </h3>
                <p className="text-sm text-stone-500 mb-5">
                  Let our community agree with you in faith. We pray for every
                  request submitted.
                </p>
                <Link
                  href="/get-involved#prayer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors w-full justify-center"
                >
                  Submit a Request
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
