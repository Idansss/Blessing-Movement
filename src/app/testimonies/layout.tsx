import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Testimony",
  description: "Has God answered your prayer through Blessings Global? Share your testimony and inspire others. Testimonies build faith and glorify God.",
  openGraph: {
    title: "Share Your Testimony — Blessings Global Outreach",
    description: "\"They overcame by the blood of the Lamb and by the word of their testimony.\" — Revelation 12:11",
  },
};

export default function TestimoniesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
