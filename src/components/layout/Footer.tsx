"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Linkedin, Loader2 } from "lucide-react";

const links = {
  main: [
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/events", label: "Events" },
    { href: "/media", label: "Media" },
    { href: "/donate", label: "Give" },
    { href: "/portal", label: "Donor portal" },
    { href: "/contact", label: "Contact" },
  ],
  getInvolved: [
    { href: "/get-involved#volunteer", label: "Volunteer" },
    { href: "/get-involved#partner", label: "Partner" },
    { href: "/get-involved#prayer", label: "Prayer Requests" },
    { href: "/pray", label: "Prayer Wall" },
    { href: "/pods", label: "Blessings Pods" },
    { href: "/learn", label: "Learn" },
    { href: "/testimonies", label: "Share Testimony" },
  ],
};

const socials = [
  { href: "https://instagram.com/blessingsmovement", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com/blessingsmovement", icon: Facebook, label: "Facebook" },
  { href: "https://x.com/blessingsmove", icon: Twitter, label: "X" },
  { href: "https://linkedin.com/company/blessings-movement", icon: Linkedin, label: "LinkedIn" },
];

function NewsletterForm() {
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
        body: JSON.stringify({ email: email.trim(), source: "footer" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-white/90 text-sm py-2">You&apos;re subscribed! 🎉</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60 text-sm outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-light transition-colors disabled:opacity-60 flex items-center gap-1"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl font-bold">
              Blessings Global Outreach
            </Link>
            <p className="mt-3 text-white/80 text-sm max-w-xs">
              Spreading the Love of Christ. Blessing Nations.
            </p>
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {links.main.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-white text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Get Involved</h4>
            <ul className="space-y-2">
              {links.getInvolved.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-white text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-white/80 text-sm mb-3">
              Subscribe for events, testimonies, and impact stories.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/70">
          © {new Date().getFullYear()} Blessings Global Outreach. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
