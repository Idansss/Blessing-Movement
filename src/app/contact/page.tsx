"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Facebook, Twitter, Linkedin, Loader2 } from "lucide-react";
import Link from "next/link";

const socials = [
  { href: "https://instagram.com/blessingsmovement", icon: Instagram, label: "@blessingsmovement" },
  { href: "https://facebook.com/blessingsmovement", icon: Facebook, label: "Blessings Movement" },
  { href: "https://x.com/blessingsmove", icon: Twitter, label: "@blessingsmove" },
  { href: "https://linkedin.com/company/blessings-movement", icon: Linkedin, label: "Blessings Movement" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("c-name") as HTMLInputElement).value,
      email: (form.elements.namedItem("c-email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("c-subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("c-message") as HTMLTextAreaElement).value,
      isPrayer: (form.elements.namedItem("prayer") as HTMLInputElement).checked,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
            Contact
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get in touch. We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-semibold text-stone-900 mb-4">
              Send a message
            </h2>
            {submitted ? (
              <div className="py-10 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-stone-900">Message sent!</h3>
                <p className="mt-2 text-stone-600">Thank you! We&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-primary font-medium hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-medium text-stone-700 mb-1">
                    Name *
                  </label>
                  <input
                    id="c-name"
                    name="c-name"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-sm font-medium text-stone-700 mb-1">
                    Email *
                  </label>
                  <input
                    id="c-email"
                    name="c-email"
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="c-subject" className="block text-sm font-medium text-stone-700 mb-1">
                    Subject *
                  </label>
                  <input
                    id="c-subject"
                    name="c-subject"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="c-message" className="block text-sm font-medium text-stone-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="c-message"
                    name="c-message"
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
                    <input name="prayer" type="checkbox" className="rounded border-stone-300 accent-primary" />
                    I&apos;m also submitting a prayer request
                  </label>
                </div>
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display text-2xl font-semibold text-stone-900 mb-4">
              Connect with us
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-stone-600">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:hello@blessingsglobal.org" className="hover:text-primary">
                  hello@blessingsglobal.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-stone-600">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Lagos, Nigeria · Serving globally</span>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm font-medium text-stone-700 mb-3">Social media</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 hover:border-primary/50 hover:bg-primary/5 transition-colors text-stone-700"
                  >
                    <s.icon className="h-4 w-4" />
                    <span className="text-sm">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 p-4 rounded-xl bg-muted/50">
              <p className="text-sm text-stone-600">
                Need prayer right now? Use the <strong>&quot;Pray With Us&quot;</strong> button on any page to submit a prayer request.
              </p>
              <Link href="/get-involved#prayer" className="mt-2 inline-block text-primary font-medium text-sm hover:underline">
                Go to prayer requests →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
