"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      disabled={!mounted}
      className={"theme-toggle " + className}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={
        !mounted
          ? "Change colour theme"
          : dark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
    >
      {mounted && (
        <motion.span
          key={String(dark)}
          initial={reduce ? false : { rotate: -35, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {dark ? (
            <SunMedium size={19} strokeWidth={1.8} />
          ) : (
            <MoonStar size={19} strokeWidth={1.8} />
          )}
        </motion.span>
      )}
    </button>
  );
}
