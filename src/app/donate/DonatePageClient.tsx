"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { DonationAmountSelector } from "@/components/ui/DonationAmountSelector";
import { Heart, Shield, CheckCircle } from "lucide-react";

const impactStatements = [
  "₦5,000 feeds a family at our outreach",
  "₦15,000 covers medical supplies for a day",
  "₦50,000 provides welfare packs for 10 families",
  "₦100,000 helps sponsor a full outreach",
];

export function DonatePageClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState(session?.user?.email ?? "");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (session?.user?.email) setDonorEmail(session.user.email);
  }, [session?.user?.email]);

  useEffect(() => {
    const verified = searchParams.get("verified");
    const ref = searchParams.get("reference");
    const mock = searchParams.get("mock");
    if (verified === "1" || ref || mock === "1") setPaymentSuccess(true);
  }, [searchParams]);

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <motion.div
          className="max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-stone-900">
            Thank you for your gift
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your payment was successful. View your receipt and giving history in your donor portal.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/portal/dashboard"
              className="rounded-xl bg-primary px-5 py-2.5 text-white font-semibold hover:bg-primary-light transition-colors"
            >
              Go to portal
            </Link>
            <Link
              href="/donate"
              className="rounded-xl border border-stone-200 px-5 py-2.5 font-medium text-stone-700 hover:bg-muted transition-colors"
            >
              Give again
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
            Give
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your generosity fuels medical outreaches, Praise & Prophesy events, and the Blessings Movement.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="rounded-2xl bg-primary/5 border border-primary/20 p-6 md:p-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-2xl font-semibold text-stone-900 mb-4">
              Your gift makes an impact
            </h2>
            <ul className="space-y-2">
              {impactStatements.map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-stone-700">
                  <Heart className="h-4 w-4 text-primary flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setFrequency("once")}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                  frequency === "once"
                    ? "bg-primary text-white"
                    : "bg-muted text-stone-600 hover:bg-stone-200"
                }`}
              >
                One-time
              </button>
              <button
                type="button"
                onClick={() => setFrequency("monthly")}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                  frequency === "monthly"
                    ? "bg-primary text-white"
                    : "bg-muted text-stone-600 hover:bg-stone-200"
                }`}
              >
                Monthly (Blessings Builders)
              </button>
            </div>

            <DonationAmountSelector
              frequency={frequency}
              onAmountChange={(v) => setAmount(v)}
            />

            <div className="mt-8 space-y-4">
              <div>
                <label htmlFor="donor-name" className="block text-sm font-medium text-stone-700 mb-1">
                  Name (optional, for receipt)
                </label>
                <input
                  id="donor-name"
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="donor-email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email *
                </label>
                <input
                  id="donor-email"
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            )}

            <div className="mt-6 p-4 rounded-xl bg-muted/50 flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-stone-600">
                Secure payment via Paystack. Your details are protected. View receipts in your{" "}
                <Link href="/portal" className="text-primary font-medium hover:underline">
                  donor portal
                </Link>
                .
              </p>
            </div>

            <button
              type="button"
              disabled={loading || !amount || !donorEmail}
              onClick={async () => {
                setError(null);
                setLoading(true);
                try {
                  const res = await fetch("/api/donate/initialize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      amount,
                      frequency,
                      donorName: donorName || undefined,
                      donorEmail,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error || "Payment could not be started.");
                  if (data.authorization_url) {
                    window.location.href = data.authorization_url;
                    return;
                  }
                  throw new Error("No payment URL received.");
                } catch (e) {
                  setError(e instanceof Error ? e.message : "Something went wrong.");
                } finally {
                  setLoading(false);
                }
              }}
              className="mt-8 w-full py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Redirecting to payment…" : "Continue to payment"}
            </button>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Powered by Paystack. You can also{" "}
              <Link href="/portal" className="text-primary hover:underline">
                sign in
              </Link>{" "}
              to see your giving history.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
