"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function AnnouncementBanner() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-[60] h-10 bg-accent text-accent-foreground py-2 px-4 text-center text-sm font-medium flex items-center justify-center"
    >
      <Link href="/events" className="hover:underline">
        🙌 Next Outreach: March 2026 — Register Now
      </Link>
    </motion.div>
  );
}
