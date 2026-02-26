"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-muted transition-colors text-sm font-medium"
    >
      <Printer className="h-4 w-4" />
      Print receipt
    </button>
  );
}
