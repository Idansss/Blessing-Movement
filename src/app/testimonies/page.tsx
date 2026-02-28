"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Loader2,
  BookOpen,
  Heart,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";
import { testimonies } from "@/data/testimonies";

// ─── Metadata is exported separately; client components export it as a const ─
// NOTE: In Next.js 14 app router, "use client" pages cannot export metadata.
// We export it from a separate layout or a parallel route. For this page we
// skip the export (metadata is set in the root template) or use a wrapper.
// The title is set via document.title in useEffect as a best-effort approach
// since this is a client component.

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const TESTIMONY_TYPES = [
  "Healing",
  "Financial breakthrough",
  "Prayer answered",
  "Career blessing",
  "Other",
] as const;

type TestimonyType = (typeof TESTIMONY_TYPES)[number];

const WHY_SHARE = [
  {
    icon: Heart,
    title: "Inspires others",
    body: "Your story gives hope to someone walking the same road you once walked.",
  },
  {
    icon: Users,
    title: "Builds faith community",
    body: "Shared testimonies strengthen the faith of our entire movement.",
  },
  {
    icon: Star,
    title: "Glorifies God",
    body: "Every answered prayer deserves to be celebrated to the glory of God.",
  },
];

// ─── Testimony mini-card ─────────────────────────────────────────────────────

function TestimonyMiniCard({
  testimony,
}: {
  testimony: (typeof testimonies)[number];
}) {
  const truncated =
    testimony.quote.length > 120
      ? testimony.quote.slice(0, 120).trimEnd() + "…"
      : testimony.quote;

  return (
    <div className="bg-muted/60 rounded-xl border border-stone-200 p-4">
      <p className="text-sm text-[#F5F0E8CC] italic leading-relaxed">
        &ldquo;{truncated}&rdquo;
      </p>
      <div className="mt-3 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-accent">
            {testimony.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#F5F0E8]">{testimony.name}</p>
          <p className="text-xs text-[#F5F0E8B3]">{testimony.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function TestimoniesPage() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [testimonyType, setTestimonyType] = useState<TestimonyType>("Healing");
  const [testimony, setTestimony] = useState("");
  const [sharePublicly, setSharePublicly] = useState(true);

  // Submission state
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !testimony.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: testimony.trim(),
          isPublic: sharePublicly,
          requesterName: name.trim(),
          requesterEmail: email.trim(),
          // Mark as testimony via metadata in content prefix
          type: testimonyType,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  function handleReset() {
    setName("");
    setEmail("");
    setTestimonyType("Healing");
    setTestimony("");
    setSharePublicly(true);
    setStatus("idle");
    setErrorMsg("");
  }

  const featuredTestimonies = testimonies.slice(0, 3);

  return (
    <>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-[#1A1208] via-transparent to-[#050302]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6"
          >
            <Star className="h-7 w-7 text-primary" />
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Share Your Testimony
          </motion.h1>

          <motion.p
            className="mt-4 text-xl text-[#F5F0E8B3] max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Has God answered your prayer through Blessings Global? We want to
            celebrate with you!
          </motion.p>
        </div>
      </section>

      {/* ── Two-column content ────────────────────────────────────────────── */}
      <section className="py-12 bg-[#0D0A07]">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">

          {/* ── Left: Form ────────────────────────────────────────────────── */}
          <motion.div {...fadeUp}>
            {status === "success" ? (
              /* ── Success state ──────────────────────────────────────────── */
              <div className="flex flex-col items-center text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
                </motion.div>
                <h2 className="font-display text-3xl font-bold text-stone-900 mb-3">
                  Praise God!
                </h2>
                <p className="text-stone-600 max-w-sm mx-auto mb-2">
                  Thank you for sharing what God has done. Your testimony is a
                  powerful weapon of faith.
                </p>
                <p className="text-sm text-stone-400 mb-8">
                  We&apos;ll review your submission and celebrate with you!
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary px-6 py-2.5 text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Share another testimony
                </button>
              </div>
            ) : (
              /* ── Form ───────────────────────────────────────────────────── */
              <form onSubmit={handleSubmit} className="space-y-5 glass-dark p-6 rounded-2xl">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#F5F0E8] mb-1">
                    Your story
                  </h2>
                  <p className="text-sm text-[#F5F0E8B3]">
                    Fields marked * are required.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="testimony-name"
                    className="block text-sm font-medium text-[#F5F0E8] mb-1"
                  >
                    Name *
                  </label>
                  <input
                    id="testimony-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="testimony-email"
                    className="block text-sm font-medium text-[#F5F0E8] mb-1"
                  >
                    Email *
                  </label>
                  <input
                    id="testimony-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-colors"
                  />
                </div>

                {/* Testimony type */}
                <div>
                  <label
                    htmlFor="testimony-type"
                    className="block text-sm font-medium text-[#F5F0E8] mb-1"
                  >
                    Type of testimony *
                  </label>
                  <div className="relative">
                    <select
                      id="testimony-type"
                      value={testimonyType}
                      onChange={(e) =>
                        setTestimonyType(e.target.value as TestimonyType)
                      }
                      className="w-full appearance-none px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white transition-colors pr-10"
                    >
                      {TESTIMONY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* Testimony textarea */}
                <div>
                  <label
                    htmlFor="testimony-content"
                    className="block text-sm font-medium text-stone-700 mb-1"
                  >
                    Your testimony *
                  </label>
                  <textarea
                    id="testimony-content"
                    required
                    rows={8}
                    value={testimony}
                    onChange={(e) => setTestimony(e.target.value)}
                    placeholder="Tell us what God did…"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-y transition-colors leading-relaxed"
                  />
                  <p className="text-xs text-[#F5F0E8B3] mt-1">
                    Be as detailed as you like. The more specific, the more it
                    encourages others.
                  </p>
                </div>

                {/* Public checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    id="testimony-public"
                    type="checkbox"
                    checked={sharePublicly}
                    onChange={(e) => setSharePublicly(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-primary focus:ring-primary/30 cursor-pointer"
                  />
                  <label
                    htmlFor="testimony-public"
                    className="text-sm text-[#F5F0E8B3] cursor-pointer leading-snug"
                  >
                    <span className="font-medium text-[#F5F0E8]">
                      Can we share this publicly?
                    </span>{" "}
                    Your testimony may appear on our Prayer Wall or website to
                    encourage others. We&apos;ll only use your first name.
                  </label>
                </div>

                {/* Error message */}
                {status === "error" && errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-100"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4" />
                      Share my testimony
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-[#F5F0E8B3]">
                  All submissions are reviewed before publication.
                </p>
              </form>
            )}
          </motion.div>

          {/* ── Right: Info section ───────────────────────────────────────── */}
          <div className="space-y-8">

            {/* Scripture */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 text-white"
            >
              <BookOpen className="h-6 w-6 text-accent mb-3" />
              <blockquote className="font-display text-lg font-semibold leading-snug italic">
                &ldquo;They overcame by the blood of the Lamb and by the word
                of their testimony.&rdquo;
              </blockquote>
              <p className="mt-3 text-sm font-semibold text-accent">
                — Revelation 12:11
              </p>
            </motion.div>

            {/* Why share */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-display text-xl font-bold text-[#F5F0E8] mb-4">
                Why share your story?
              </h3>
              <ul className="space-y-4">
                {WHY_SHARE.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#F5F0E8]">
                        {title}
                      </p>
                      <p className="text-sm text-[#F5F0E8B3] mt-0.5">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Recent testimonies preview */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-display text-base font-bold text-[#F5F0E8] mb-3">
                From our community
              </h3>
            <div className="space-y-3">
                {featuredTestimonies.map((t) => (
                  <TestimonyMiniCard key={t.id} testimony={t} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
