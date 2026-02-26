import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media",
  description: "Sermons, podcasts, streams from Blessings Global Outreach",
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
