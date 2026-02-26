"use client";

import { motion } from "framer-motion";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { missions } from "@/data/missions";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProgramsPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            className="font-display text-4xl md:text-5xl font-bold text-stone-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Programs
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Three missions. One vision: spreading the love of Christ through physical blessings,
            spiritual empowerment, and community.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {missions.map((mission, i) => (
            <ProgramCard
              key={mission.id}
              mission={mission}
              index={i}
              defaultExpanded={i === 0}
            />
          ))}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p
            className="text-stone-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Want to volunteer, partner, or host an event?
          </motion.p>
          <Link
            href="/get-involved"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Get Involved
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
