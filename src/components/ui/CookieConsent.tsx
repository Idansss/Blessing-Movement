"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, delay: 1.5 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-stone-900 text-white"
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/80">
              We use cookies to improve your experience and analyse site traffic.{" "}
              <Link href="/contact" className="underline text-white hover:text-accent">
                Learn more
              </Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => setVisible(false)}
                className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-light transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
