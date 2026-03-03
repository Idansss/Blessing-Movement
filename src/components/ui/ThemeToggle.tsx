"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 rounded-full bg-[var(--surface-muted)]", className)} aria-hidden />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ease-out",
        "bg-[var(--surface-muted)] hover:bg-[var(--border)]",
        "text-[var(--text-secondary)] hover:text-[var(--accent-gold)]",
        "dark:ring-[var(--accent-gold)]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--background)]",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300" />
      )}
    </button>
  );
}
