import type { Metadata } from "next";
import { Suspense } from "react";
import { DonatePageClient } from "./DonatePageClient";
import { DonorWall } from "./DonorWall";

export const metadata: Metadata = {
  title: "Give",
  description: "Support Blessings Global Outreach with a one-time or monthly gift.",
};

export default function DonatePage() {
  return (
    <>
      {/* Interactive donation form — client component */}
      <Suspense fallback={<div className="min-h-screen bg-muted/30" />}>
        <DonatePageClient />
      </Suspense>

      {/* Donor wall — server component fetching from DB */}
      <section className="py-16 bg-[#0D0A07]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-[#F5F0E8]">
            With Gratitude
          </h2>
          <p className="mt-2 text-[#F5F0E8B3]">
            Our donors and partners make this work possible. Thank you.
          </p>

          <Suspense
            fallback={
              <p className="mt-6 text-[#F5F0E8B3] text-sm animate-pulse">
                Loading donor wall…
              </p>
            }
          >
            <DonorWall />
          </Suspense>
        </div>
      </section>
    </>
  );
}
