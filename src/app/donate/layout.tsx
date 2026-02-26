import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give",
  description: "Support Blessings Global Outreach with a one-time or monthly gift. Your generosity funds medical outreaches, Praise & Prophesy events, and the Blessings Movement.",
  openGraph: {
    title: "Give — Blessings Global Outreach",
    description: "₦5,000 feeds a family. ₦100,000 sponsors a full outreach. Every gift makes an eternal impact.",
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
