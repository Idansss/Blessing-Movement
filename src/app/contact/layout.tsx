import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Blessings Global Outreach. Send a message, submit a prayer request, or connect with us on social media.",
  openGraph: {
    title: "Contact Blessings Global Outreach",
    description: "We'd love to hear from you. Reach out anytime.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
