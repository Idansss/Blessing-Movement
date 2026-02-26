"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string; // ISO date string
  eventTitle: string;
  eventSlug: string;
}

export function CountdownTimer({ targetDate, eventTitle, eventSlug }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function calculate() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      };
    }
    setTimeLeft(calculate());
    const id = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) return null;
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <a
      href={`/events/${eventSlug}`}
      className="inline-flex flex-col sm:flex-row items-center gap-3 mt-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm px-6 py-4 hover:bg-white/15 transition-colors"
    >
      <div className="flex items-center gap-2 text-white/80 text-sm">
        <Clock className="h-4 w-4" />
        <span>Next event · {eventTitle}</span>
      </div>
      <div className="flex gap-3">
        {units.map(({ label, value }) => (
          <div key={label} className="text-center min-w-[44px]">
            <div className="font-display text-2xl font-bold text-white leading-none">
              {String(value).padStart(2, "0")}
            </div>
            <div className="text-xs text-white/60 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </a>
  );
}
