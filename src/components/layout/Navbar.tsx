"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrayerModal } from "@/components/layout/PrayerModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/donate", label: "Donate" },
  { href: "/portal", label: "Portal" },
  { href: "/contact", label: "Contact" },
];

// Update this with the real WhatsApp number
const WHATSAPP_NUMBER = "2348000000000";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prayerOpen, setPrayerOpen] = useState(false);

  const isHome = pathname === "/";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const useLightNav = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-10 z-50 transition-all duration-300",
          useLightNav
            ? "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
            : "bg-white shadow-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="shrink-0 flex items-center gap-2" aria-label="Blessings Movement – Home">
            <Image
              src="/logo/logo.png"
              alt=""
              width={260}
              height={80}
              className={cn(
                "h-14 md:h-16 w-auto object-contain object-left transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
                useLightNav && "invert brightness-110 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              )}
              priority
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === link.href
                    ? useLightNav
                      ? "text-white font-semibold underline underline-offset-4 decoration-accent"
                      : "text-primary font-semibold"
                    : useLightNav
                      ? "text-white/90 hover:text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]"
                      : "text-stone-700 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/donate"
              className="hidden lg:inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-light transition-colors"
            >
              Give Now
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={cn("lg:hidden p-2 rounded-lg", useLightNav ? "text-white" : "text-stone-700")}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-stone-200 shadow-lg overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "py-2 px-3 rounded-lg font-medium",
                      pathname === link.href ? "bg-primary/10 text-primary" : "text-stone-700"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/donate"
                  onClick={() => setOpen(false)}
                  className="mt-2 py-3 px-4 rounded-lg bg-accent text-accent-foreground font-semibold text-center"
                >
                  Give Now
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Blessings%20Global%20Outreach!`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#25D366] text-white px-4 py-3 shadow-lg hover:bg-[#20BD5B] transition-colors flex items-center gap-2 font-medium text-sm"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat with us
        </a>
        {/* Pray with us */}
        <button
          type="button"
          onClick={() => setPrayerOpen(true)}
          className="rounded-full bg-primary text-white px-4 py-3 shadow-lg hover:bg-primary-light transition-colors flex items-center gap-2 font-medium text-sm"
          aria-label="Pray with us"
        >
          🙏 Pray With Us
        </button>
      </div>

      <PrayerModal open={prayerOpen} onClose={() => setPrayerOpen(false)} />
    </>
  );
}
