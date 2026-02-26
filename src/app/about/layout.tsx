import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Blessings Global Outreach — our vision, mission, values, timeline, and leadership team. Spreading the Love of Christ since 2024.",
  openGraph: {
    title: "About Blessings Global Outreach",
    description: "Our story, vision, and the team behind the movement.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
