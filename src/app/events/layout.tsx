import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming outreaches, Praise & Prophesy nights, Blessings Hangouts, and Bootcamps. Join Blessings Global Outreach in person or online.",
  openGraph: {
    title: "Events — Blessings Global Outreach",
    description: "Community outreaches, worship nights, hangouts, and bootcamps. Find an event near you.",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
