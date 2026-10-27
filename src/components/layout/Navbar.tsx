"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MessageCircleHeart } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PrayerModal } from "./PrayerModal";
import { AnnouncementBanner } from "./AnnouncementBanner";

const links = [
  { href: "/about", label: "Our story" },
  { href: "/programs", label: "What we do" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "In pictures" },
  { href: "/get-involved", label: "Get involved" },
];
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [prayer, setPrayer] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);
  useEffect(() => {
    let previous = window.scrollY,
      anchor = previous,
      direction = 0,
      frame = 0;
    const update = () => {
      const y = Math.max(0, window.scrollY);
      const nextDirection = y > previous ? 1 : -1;
      if (direction !== nextDirection) {
        anchor = previous;
        direction = nextDirection;
      }
      if (
        y < 100 ||
        open ||
        (header.current?.contains(document.activeElement) &&
          document.activeElement?.matches(":focus-visible"))
      )
        setHidden(false);
      else if (Math.abs(y - anchor) > 14) setHidden(direction === 1);
      previous = y;
      frame = 0;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <>
      <motion.div
        ref={header}
        className="nav-dock"
        data-hidden={hidden && !open}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
        onFocusCapture={() => setHidden(false)}
      >
        <AnnouncementBanner />
        <header className="site-header">
          <div className="nav-shell">
            <Link
              href="/"
              aria-label="Blessings Movement home"
              className="brand"
            >
              <Image
                src="/logo/logo-clean.png"
                alt="Blessings Movement"
                width={639}
                height={234}
                priority
              />
            </Link>
            <nav aria-label="Main navigation" className="desktop-nav">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={
                    pathname.startsWith(link.href) ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="nav-actions">
              <ThemeToggle />
              <Link href="/donate" className="button button-gold nav-give">
                Give a blessing <ArrowUpRight size={17} />
              </Link>
              <button
                ref={toggle}
                type="button"
                className="menu-toggle"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                onClick={() => setOpen(!open)}
              >
                {open ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                className="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mobile-nav-inner">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ y: reduce ? 0 : 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: reduce ? 0 : index * 0.035,
                        duration: 0.25,
                      }}
                    >
                      <Link href={link.href}>
                        {link.label}
                        <ArrowUpRight size={17} />
                      </Link>
                    </motion.div>
                  ))}
                  <div className="mobile-utilities">
                    <Link href="/portal">Member portal</Link>
                    <Link href="/contact">Contact</Link>
                    <ThemeToggle />
                  </div>
                  <Link href="/donate" className="button button-gold">
                    Give a blessing <ArrowUpRight size={18} />
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      </motion.div>
      <button
        className="prayer-trigger"
        aria-label="Let's pray"
        onClick={() => setPrayer(true)}
      >
        <MessageCircleHeart size={21} strokeWidth={1.8} />
        <span>Let&apos;s pray</span>
      </button>
      <PrayerModal open={prayer} onClose={() => setPrayer(false)} />
    </>
  );
}
