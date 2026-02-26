import type { Metadata } from "next";
import Link from "next/link";
import { Users, BookOpen, Target, MapPin, Tag } from "lucide-react";
import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Pods",
  description: "Find your local Blessings community group",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PodData {
  name: string;
  city: string;
  type: string;
  members: number;
  description: string;
}

// ---------------------------------------------------------------------------
// Static fallback pods
// ---------------------------------------------------------------------------

const staticPods: PodData[] = [
  {
    name: "Lagos Career Pod",
    city: "Lagos",
    type: "career",
    members: 24,
    description:
      "Faith-driven professionals supporting each other's career growth in Lagos.",
  },
  {
    name: "Abuja Students Pod",
    city: "Abuja",
    type: "students",
    members: 18,
    description:
      "University students across Abuja growing in faith and academics together.",
  },
  {
    name: "Creatives Collective",
    city: "Online",
    type: "creatives",
    members: 31,
    description:
      "Designers, artists, and content creators using their gifts for God's glory.",
  },
  {
    name: "Medical Professionals Pod",
    city: "Lagos",
    type: "career",
    members: 12,
    description:
      "Healthcare workers committed to excellence and service through faith.",
  },
];

// ---------------------------------------------------------------------------
// How Pods Work feature data
// ---------------------------------------------------------------------------

const howItWorks = [
  {
    icon: BookOpen,
    title: "Shared Devotions",
    description:
      "Each pod follows a shared devotional rhythm — studying Scripture and encouraging one another in faith weekly.",
  },
  {
    icon: Users,
    title: "Weekly Check-ins",
    description:
      "Regular virtual or in-person meetings to pray together, share wins, and hold each other accountable.",
  },
  {
    icon: Target,
    title: "Purpose-Driven Goals",
    description:
      "Pods are built around shared callings — career, creativity, students — so every connection is intentional.",
  },
];

// ---------------------------------------------------------------------------
// Type badge color helper
// ---------------------------------------------------------------------------

const typeBadgeClass: Record<string, string> = {
  career: "bg-primary/10 text-primary",
  students: "bg-blue-100 text-blue-700",
  creatives: "bg-pink-100 text-pink-700",
  default: "bg-stone-100 text-stone-600",
};

function getTypeBadge(type: string): string {
  return typeBadgeClass[type] ?? typeBadgeClass.default;
}

function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PodsPage() {
  // Attempt to fetch pods from the database; fall back to static data if DB is
  // empty or if the model does not exist yet (schema not migrated).
  let pods: PodData[] = [];

  try {
    const dbPods = await (prisma as any).pod?.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (Array.isArray(dbPods) && dbPods.length > 0) {
      pods = dbPods.map((p: any) => ({
        name: p.name ?? "Unnamed Pod",
        city: p.city ?? "Online",
        type: p.type ?? "general",
        members: p.members ?? p._count?.members ?? 0,
        description: p.description ?? "",
      }));
    } else {
      pods = staticPods;
    }
  } catch {
    pods = staticPods;
  }

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="pt-28 pb-16 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Blessings Pods
          </h1>
          <p className="mt-5 text-xl text-white/85 max-w-2xl">
            Find your tribe. Local and online community groups built around faith,
            purpose, and meaningful connection.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#pods"
              className="inline-block px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Find a Pod
            </Link>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Start a Pod
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* How Pods Work                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-stone-900">
              How Pods Work
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Pods are small, intentional groups of 10–35 people. They meet weekly,
              pray together, and grow towards shared purposes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="text-center p-6 rounded-2xl bg-muted/40 border border-stone-100"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Pods Grid                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section id="pods" className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="font-display text-3xl font-bold text-stone-900">
              Active Pods
            </h2>
            <p className="mt-2 text-muted-foreground">
              {pods.length} pod{pods.length !== 1 ? "s" : ""} currently running.
              Join one near you or online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pods.map((pod) => (
              <div
                key={pod.name}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                {/* Pod header */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-stone-900 leading-snug">
                    {pod.name}
                  </h3>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
                    <MapPin className="h-3 w-3" />
                    {pod.city}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getTypeBadge(pod.type)}`}
                  >
                    <Tag className="h-3 w-3" />
                    {capitalise(pod.type)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 leading-relaxed">
                  {pod.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {pod.members} member{pod.members !== 1 ? "s" : ""}
                  </span>
                  <Link
                    href="/get-involved"
                    className="inline-block px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors"
                    title="Contact us to join this pod"
                  >
                    Join this Pod
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA — Start a Pod                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold">
            Start a Pod in your city
          </h2>
          <p className="mt-4 text-white/85 text-lg max-w-xl mx-auto">
            Don&apos;t see a pod near you? We&apos;d love to help you start one. All
            it takes is a group of people with a shared purpose and a heart to grow.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block px-8 py-4 rounded-xl bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
