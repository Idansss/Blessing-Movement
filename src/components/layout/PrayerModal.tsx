"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PrayerModalProps {
  open: boolean;
  onClose: () => void;
}

export function PrayerModal({ open, onClose }: PrayerModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", request: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.request.trim()) return;
    const res = await fetch("/api/prayer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: form.request.trim(),
        isPublic: false,
        requesterName: form.name || undefined,
        requesterEmail: form.email || undefined,
      }),
    });
    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", request: "" });
        onClose();
      }, 2000);
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Something went wrong.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold text-primary">
                Submit a Prayer Request
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted text-stone-500"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {submitted ? (
              <p className="text-center py-8 text-stone-600">
                Thank you. Your prayer request has been received. Our team will pray with you.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="prayer-name" className="block text-sm font-medium text-stone-700 mb-1">
                    Name (optional)
                  </label>
                  <input
                    id="prayer-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="prayer-email" className="block text-sm font-medium text-stone-700 mb-1">
                    Email (optional)
                  </label>
                  <input
                    id="prayer-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="prayer-request" className="block text-sm font-medium text-stone-700 mb-1">
                    Prayer request *
                  </label>
                  <textarea
                    id="prayer-request"
                    required
                    rows={4}
                    value={form.request}
                    onChange={(e) => setForm((f) => ({ ...f, request: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                    placeholder="How can we pray for you?"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-lg border border-stone-200 font-medium text-stone-700 hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
