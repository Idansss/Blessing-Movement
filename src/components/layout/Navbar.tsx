"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, HeartHandshake } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PrayerModal } from "./PrayerModal";
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
  const [prayer, setPrayer] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
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
      <header className="site-header">
        <div className="nav-shell">
          <Link href="/" aria-label="Blessings Movement home" className="brand">
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
              Give a blessing <ArrowUpRight size={16} />
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
        {open && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mobile-nav"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
                <ArrowUpRight size={17} />
              </Link>
            ))}
            <div className="flex items-center gap-3 py-3">
              <ThemeToggle />
              <span className="text-xs">Colour theme</span>
            </div>
            <Link href="/portal">Member portal</Link>
            <Link href="/contact">Contact the team</Link>
            <Link href="/donate" className="button button-gold">
              Give a blessing
            </Link>
          </nav>
        )}
      </header>
      <button
        className="prayer-trigger"
        aria-label="Let's pray"
        onClick={() => setPrayer(true)}
      >
        <HeartHandshake size={20} />
        <span>Let&apos;s pray</span>
      </button>
      <PrayerModal open={prayer} onClose={() => setPrayer(false)} />
    </>
  );
}
