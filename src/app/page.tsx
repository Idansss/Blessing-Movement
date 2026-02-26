"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Music, Users, ArrowRight, Loader2 } from "lucide-react";
import { StatCounter } from "@/components/ui/StatCounter";
import { EventCard } from "@/components/ui/EventCard";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { events } from "@/data/events";
import { testimonies } from "@/data/testimonies";
import { missions } from "@/data/missions";

const missionIcons = { Heart, Music, Users };

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "home" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-20" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold"
          {...fadeUp}
        >
          Become a Blessing
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-white/90"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join our newsletter for impact stories, event invites, and ways to give.
        </motion.p>
        <motion.div
          className="mt-8 max-w-md mx-auto"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {status === "success" ? (
            <p className="text-lg font-semibold text-accent">You&apos;re in! Welcome to the movement 🎉</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/30 placeholder:text-white/70 text-white outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-sm text-white/80">Something went wrong. Please try again.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const upcomingEvents = events.slice(0, 3);
  // Find the soonest upcoming event for the countdown
  const nextEvent = [...events]
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grain-overlay opacity-30" />
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920"
          alt="Worship and community"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Spreading the Love of Christ.
            <br />
            One Blessing at a Time.
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Physical outreaches. Spiritual empowerment. Global community.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground hover:bg-accent-light transition-colors"
            >
              Join the Movement
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Give Now
            </Link>
          </motion.div>
          {nextEvent && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CountdownTimer
                targetDate={nextEvent.date}
                eventTitle={nextEvent.title}
                eventSlug={nextEvent.slug}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={2500} label="Lives Touched" />
            <StatCounter value={12} label="Countries Reached" />
            <StatCounter value={180} suffix="+" label="Volunteers" />
            <StatCounter value={45} label="Outreaches Completed" />
          </div>
        </div>
      </section>

      {/* Mission cards */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-center text-stone-900"
            {...fadeUp}
          >
            Our Missions
          </motion.h2>
          <motion.p
            className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Three engines of impact: physical blessings, spiritual blessings, and community.
          </motion.p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {missions.map((m, i) => {
              const Icon = missionIcons[m.icon as keyof typeof missionIcons] ?? Heart;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    href="/programs"
                    className="block rounded-2xl bg-white border border-stone-200 p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-stone-900">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {m.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Do - alternating */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-center text-stone-900"
            {...fadeUp}
          >
            What We Do
          </motion.h2>
          <div className="mt-16 space-y-24">
            {missions.map((m, i) => (
              <motion.div
                key={m.id}
                className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex-1 relative h-72 md:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-semibold text-stone-900">
                    {m.subtitle}
                  </h3>
                  <p className="mt-3 text-stone-600">{m.description}</p>
                  <Link
                    href="/programs"
                    className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                  >
                    Explore program
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonies */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-center text-stone-900"
            {...fadeUp}
          >
            Stories of Impact
          </motion.h2>
          <motion.p
            className="mt-2 text-center text-muted-foreground"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Real lives touched by the love of Christ.
          </motion.p>
          <motion.div
            className="mt-12"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <TestimonialCarousel items={testimonies} />
          </motion.div>
          <div className="mt-8 text-center">
            <Link
              href="/contact#testimonies"
              className="text-primary font-semibold hover:underline"
            >
              Share your testimony →
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.h2
                className="font-display text-3xl md:text-4xl font-bold text-stone-900"
                {...fadeUp}
              >
                Upcoming Events
              </motion.h2>
              <motion.p
                className="mt-2 text-muted-foreground"
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join us in person or online.
              </motion.p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              View all events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Become a Blessing */}
      <NewsletterSection />
    </>
  );
}
