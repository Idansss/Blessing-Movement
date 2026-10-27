"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HandHelping,
  Handshake,
  MessagesSquare,
  Loader2,
  CircleCheck,
} from "lucide-react";
import Link from "next/link";
import { ThemedSelect } from "@/components/ui/ThemedSelect";

const partnerTiers = [
  {
    name: "Bronze Partner",
    amount: "₦50,000/month",
    description: "Recognition on website, impact reports, and our gratitude.",
  },
  {
    name: "Silver Partner",
    amount: "₦150,000/month",
    description:
      "All Bronze benefits + logo on event materials and social shoutouts.",
  },
  {
    name: "Gold Partner",
    amount: "₦300,000/month",
    description:
      "All Silver benefits + featured in newsletters and partner wall.",
  },
  {
    name: "Kingdom Partner",
    amount: "Custom",
    description:
      "Strategic partnership: funding, in-kind, or services. Full recognition and impact reporting.",
  },
];

function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="text-center py-10">
      <CircleCheck className="h-14 w-14 text-primary mx-auto mb-4" />
      <p className="text-stone-700 font-medium">{message}</p>
    </div>
  );
}

export default function GetInvolvedPage() {
  const [volunteerStatus, setVolunteerStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [volunteerError, setVolunteerError] = useState("");
  const [partnerStatus, setPartnerStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [partnerError, setPartnerError] = useState("");
  const [prayerStatus, setPrayerStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [prayerError, setPrayerError] = useState("");

  return (
    <>
      <section className="compact-page-intro pt-28 pb-16 bg-gradient-to-b from-[var(--background-secondary)] to-[var(--background)] dark:from-[var(--background-secondary)] dark:via-transparent dark:to-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get Involved
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-[var(--text-secondary)] dark:text-[var(--text-secondary)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Volunteer, partner with us, or submit a prayer request.
          </motion.p>
        </div>
      </section>

      {/* Volunteer */}
      <section
        id="volunteer"
        className="compact-section py-16 bg-[var(--background)] dark:bg-[var(--background)] scroll-mt-24"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] dark:bg-primary/25 dark:text-accent">
              <HandHelping className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                Volunteer
              </h2>
              <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] text-sm">
                Serve at outreaches, events, or behind the scenes.
              </p>
            </div>
          </div>
          {volunteerStatus === "success" ? (
            <SuccessMessage message="Thank you! We'll be in touch soon." />
          ) : (
            <motion.form
              onSubmit={async (e) => {
                e.preventDefault();
                setVolunteerError("");
                setVolunteerStatus("loading");
                const form = e.currentTarget;
                const name = (
                  form.elements.namedItem("v-name") as HTMLInputElement
                )?.value;
                const email = (
                  form.elements.namedItem("v-email") as HTMLInputElement
                )?.value;
                const phone = (
                  form.elements.namedItem("v-phone") as HTMLInputElement
                )?.value;
                const interest = (
                  form.elements.namedItem("v-interest") as HTMLSelectElement
                )?.value;
                try {
                  const res = await fetch("/api/volunteer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name,
                      email,
                      phone: phone || undefined,
                      interest: interest || undefined,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok)
                    throw new Error(data.error || "Something went wrong.");
                  setVolunteerStatus("success");
                } catch (err) {
                  setVolunteerError(
                    err instanceof Error
                      ? err.message
                      : "Something went wrong.",
                  );
                  setVolunteerStatus("error");
                }
              }}
              className="space-y-4 section-card p-6 rounded-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <label
                  htmlFor="v-name"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                >
                  Full name *
                </label>
                <input
                  id="v-name"
                  name="v-name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] dark:border-stone-200 bg-[var(--surface)] dark:bg-transparent text-[var(--text-primary)] focus:border-[var(--accent-gold)] dark:focus:border-primary focus:ring-2 focus:ring-[var(--accent-gold)]/20 dark:focus:ring-primary/20 outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="v-email"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                >
                  Email *
                </label>
                <input
                  id="v-email"
                  name="v-email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] dark:border-stone-200 bg-[var(--surface)] dark:bg-transparent text-[var(--text-primary)] focus:border-[var(--accent-gold)] dark:focus:border-primary focus:ring-2 focus:ring-[var(--accent-gold)]/20 dark:focus:ring-primary/20 outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="v-phone"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                >
                  Phone (optional)
                </label>
                <input
                  id="v-phone"
                  name="v-phone"
                  type="tel"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] dark:border-stone-200 bg-[var(--surface)] dark:bg-transparent text-[var(--text-primary)] focus:border-[var(--accent-gold)] dark:focus:border-primary focus:ring-2 focus:ring-[var(--accent-gold)]/20 dark:focus:ring-primary/20 outline-none"
                  placeholder="+234..."
                />
              </div>
              <div>
                <label
                  htmlFor="v-interest"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                >
                  I&apos;m interested in (optional)
                </label>
                <div className="relative">
                  <ThemedSelect
                    id="v-interest"
                    name="v-interest"
                    placeholder="Choose how you would like to help"
                    options={[
                      {
                        value: "outreach",
                        label: "Outreach / Medical & Welfare",
                      },
                      { value: "praise", label: "Praise & Prophesy events" },
                      { value: "hangout", label: "Hangouts & community" },
                      {
                        value: "bootcamp",
                        label: "Career Bootcamp / mentoring",
                      },
                      { value: "admin", label: "Admin / logistics" },
                    ]}
                  />
                </div>
              </div>
              {volunteerError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                  {volunteerError}
                </p>
              )}
              <button
                type="submit"
                disabled={volunteerStatus === "loading"}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {volunteerStatus === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Partnership */}
      <section
        id="partner"
        className="compact-section py-16 bg-[var(--background-secondary)] dark:bg-[var(--background)] scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] dark:bg-primary/25 dark:text-accent">
              <Handshake className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                Partnership & Sponsorship
              </h2>
              <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] text-sm">
                Businesses and professionals: join the Blessings Partners
                Circle.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {partnerTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className="p-6 section-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                  {tier.name}
                </h3>
                <p className="mt-1 text-[var(--accent-gold)] dark:text-accent font-medium">
                  {tier.amount}
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                  {tier.description}
                </p>
              </motion.div>
            ))}
          </div>
          {partnerStatus === "success" ? (
            <SuccessMessage message="Thank you! We'll reach out to discuss partnership." />
          ) : (
            <motion.form
              onSubmit={async (e) => {
                e.preventDefault();
                setPartnerError("");
                setPartnerStatus("loading");
                const form = e.currentTarget;
                const name = (
                  form.elements.namedItem("p-name") as HTMLInputElement
                )?.value;
                const email = (
                  form.elements.namedItem("p-email") as HTMLInputElement
                )?.value;
                const message = (
                  form.elements.namedItem("p-message") as HTMLTextAreaElement
                )?.value;
                try {
                  const res = await fetch("/api/partner", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name,
                      email,
                      notes: message || undefined,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok)
                    throw new Error(data.error || "Something went wrong.");
                  setPartnerStatus("success");
                } catch (err) {
                  setPartnerError(
                    err instanceof Error
                      ? err.message
                      : "Something went wrong.",
                  );
                  setPartnerStatus("error");
                }
              }}
              className="max-w-2xl space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="p-name"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                  >
                    Name / Organization *
                  </label>
                  <input
                    id="p-name"
                    name="p-name"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] dark:border-stone-200 bg-[var(--surface)] dark:bg-transparent text-[var(--text-primary)] focus:border-[var(--accent-gold)] dark:focus:border-primary focus:ring-2 focus:ring-[var(--accent-gold)]/20 dark:focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="p-email"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                  >
                    Email *
                  </label>
                  <input
                    id="p-email"
                    name="p-email"
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] dark:border-stone-200 bg-[var(--surface)] dark:bg-transparent text-[var(--text-primary)] focus:border-[var(--accent-gold)] dark:focus:border-primary focus:ring-2 focus:ring-[var(--accent-gold)]/20 dark:focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="p-message"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                >
                  Tell us about your interest
                </label>
                <textarea
                  id="p-message"
                  name="p-message"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] dark:border-stone-200 bg-[var(--surface)] dark:bg-transparent text-[var(--text-primary)] focus:border-[var(--accent-gold)] dark:focus:border-primary focus:ring-2 focus:ring-[var(--accent-gold)]/20 dark:focus:ring-primary/20 outline-none resize-none"
                  placeholder="Partnership type, in-kind support, or how you'd like to contribute..."
                />
              </div>
              {partnerError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                  {partnerError}
                </p>
              )}
              <button
                type="submit"
                disabled={partnerStatus === "loading"}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                {partnerStatus === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Prayer */}
      <section
        id="prayer"
        className="compact-section py-16 bg-[var(--background)] dark:bg-[var(--background)] scroll-mt-24"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] dark:bg-primary/25 dark:text-accent">
              <MessagesSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                Prayer Requests
              </h2>
              <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] text-sm">
                We pray with you. Submit a request or use the &quot;Pray With
                Us&quot; button on any page.
              </p>
            </div>
          </div>
          {prayerStatus === "success" ? (
            <SuccessMessage message="Thank you. Your prayer request has been received. We'll be interceding for you." />
          ) : (
            <motion.form
              onSubmit={async (e) => {
                e.preventDefault();
                setPrayerError("");
                setPrayerStatus("loading");
                const form = e.currentTarget;
                const request = (
                  form.elements.namedItem("pr-request") as HTMLTextAreaElement
                )?.value;
                const email = (
                  form.elements.namedItem("pr-email") as HTMLInputElement
                )?.value;
                try {
                  const res = await fetch("/api/prayer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      content: request.trim(),
                      isPublic: false,
                      requesterEmail: email || undefined,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok)
                    throw new Error(data.error || "Something went wrong.");
                  setPrayerStatus("success");
                } catch (err) {
                  setPrayerError(
                    err instanceof Error
                      ? err.message
                      : "Something went wrong.",
                  );
                  setPrayerStatus("error");
                }
              }}
              className="space-y-4 glass-dark p-6 rounded-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <label
                  htmlFor="pr-request"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                >
                  Prayer request *
                </label>
                <textarea
                  id="pr-request"
                  name="pr-request"
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  placeholder="How can we pray for you?"
                />
              </div>
              <div>
                <label
                  htmlFor="pr-email"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-1"
                >
                  Email (optional, for follow-up)
                </label>
                <input
                  id="pr-email"
                  name="pr-email"
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              {prayerError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                  {prayerError}
                </p>
              )}
              <button
                type="submit"
                disabled={prayerStatus === "loading"}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {prayerStatus === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit prayer request"
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <section className="py-12 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[var(--text-secondary)] mb-4">
            Want to give financially? Every gift fuels our missions.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground hover:bg-accent-light transition-colors"
          >
            Give Now
          </Link>
        </div>
      </section>
    </>
  );
}
