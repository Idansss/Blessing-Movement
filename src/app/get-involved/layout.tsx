import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer, partner, or submit a prayer request with Blessings Global Outreach. Join the movement and make a difference.",
  openGraph: {
    title: "Get Involved — Blessings Global Outreach",
    description: "Volunteer, partner with us, or submit a prayer request. There's a place for you in the Blessings movement.",
  },
};

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
