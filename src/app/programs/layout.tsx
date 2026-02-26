import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore Blessings Global Outreach programs: Physical Blessings (medical outreaches), Spiritual Blessings (Praise & Prophesy), and Edify Believers (Blessings Movement).",
  openGraph: {
    title: "Programs — Blessings Global Outreach",
    description: "Three engines of impact: physical blessings, spiritual empowerment, and community.",
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
