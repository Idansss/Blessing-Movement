"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const presets = [
  { amount: 5000, label: "₦5,000", impact: "Feeds a family at outreach" },
  { amount: 15000, label: "₦15,000", impact: "Medical supplies for a day" },
  { amount: 50000, label: "₦50,000", impact: "Welfare packs for 10 families" },
  { amount: 100000, label: "₦100,000", impact: "Sponsor a full outreach" },
];

interface DonationAmountSelectorProps {
  onAmountChange?: (amount: number) => void;
  frequency?: "once" | "monthly";
  className?: string;
}

export function DonationAmountSelector({
  onAmountChange,
  frequency = "once",
  className,
}: DonationAmountSelectorProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const handleSelect = (amount: number) => {
    setSelected(amount);
    setCustomAmount("");
    onAmountChange?.(amount);
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    const num = parseInt(value.replace(/\D/g, ""), 10);
    if (!isNaN(num)) {
      setSelected(null);
      onAmountChange?.(num);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {presets.map((p) => (
          <button
            key={p.amount}
            type="button"
            onClick={() => handleSelect(p.amount)}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all bg-transparent",
              selected === p.amount
                ? "border-accent bg-accent/15 text-accent-foreground shadow-[0_0_18px_rgba(212,175,55,0.45)]"
                : "border-[#F5F0E8]/40 hover:border-accent/70 text-[#F5F0E8CC]"
            )}
          >
            <span className="font-display text-xl font-bold">{p.label}</span>
            <p className="mt-1 text-xs text-[#F5F0E8B3]">{p.impact}</p>
          </button>
        ))}
      </div>
      <div>
        <label htmlFor="custom-amount" className="block text-sm font-medium text-[#F5F0E8] mb-1">
          Or enter custom amount (₦)
        </label>
        <input
          id="custom-amount"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 25000"
          value={customAmount}
          onChange={(e) => handleCustomChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
        />
      </div>
      {frequency === "monthly" && (
        <p className="text-sm text-muted-foreground">
          This amount will be charged monthly. You can cancel anytime.
        </p>
      )}
    </div>
  );
}
