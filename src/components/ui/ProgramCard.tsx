"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Users, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScriptureQuote } from "./ScriptureQuote";
import type { Mission } from "@/data/missions";

const iconMap = {
  Heart,
  Music,
  Users,
};

interface ProgramCardProps {
  mission: Mission;
  index?: number;
  defaultExpanded?: boolean;
  className?: string;
}

export function ProgramCard({
  mission,
  index = 0,
  defaultExpanded = false,
  className,
}: ProgramCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const Icon = iconMap[mission.icon as keyof typeof iconMap] ?? Heart;

  return (
    <motion.div
      className={cn(
        "rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-stone-900">
              {mission.title}
            </h3>
            <p className="text-sm text-muted-foreground">{mission.subtitle}</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t border-stone-100 pt-6">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src={mission.image}
                  alt={mission.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <p className="text-stone-600">{mission.description}</p>
              <ScriptureQuote verse={mission.scripture} reference={mission.reference} />
              <ul className="space-y-2">
                {mission.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-stone-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href="/programs"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Learn more about our programs →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
