"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-xl border border-stone-300 dark:border-[var(--border)] bg-white/90 dark:bg-transparent px-4 py-2.5 text-sm font-medium text-stone-800 dark:text-[var(--text-primary)] hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
    >
      Sign out
    </button>
  );
}
