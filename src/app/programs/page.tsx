import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const programmes = [
  {
    title: "Medical & welfare outreach",
    label: "Practical love",
    description:
      "Bringing care into the community through medical outreaches and essential supplies. Our volunteers give their time and skills to meet people where they are.",
    src: "/images/outreach/medical-team.jpg",
    alt: "A volunteer preparing medical supplies",
    details: [
      "Medical outreach",
      "Welfare and essential supplies",
      "Community visits",
    ],
  },
  {
    title: "Worship & prayer",
    label: "Shared faith",
    description:
      "Gathering to worship, hear the Word and pray together. The Blessings makes room for shared faith and encouragement in Christ.",
    src: "/images/outreach/ministry.jpg",
    alt: "A minister speaking at The Blessings outreach",
    details: ["Worship gatherings", "Prayer", "Ministry of the Word"],
  },
  {
    title: "The Blessings Movement",
    label: "Life together",
    description:
      "A community of people learning, sharing and serving together. There is a place to bring your skills, build friendships and join the next outreach.",
    src: "/images/outreach/fellowship.jpg",
    alt: "Members gathered for fellowship",
    details: ["Fellowship", "Volunteering", "Community gatherings"],
  },
];
export default function ProgramsPage() {
  return (
    <>
      <section className="page-heading page-width">
        <p className="eyebrow">What we do</p>
        <h1>
          Many hands.
          <br />
          <em>One heart to serve.</em>
        </h1>
        <p>
          Medical care, welfare, worship and community. Different ways to put
          love into action.
        </p>
      </section>
      <section className="page-width section-space space-y-24">
        {programmes.map((p, i) => (
          <article key={p.title} className="about-layout">
            <div
              className={
                "relative h-[430px] overflow-hidden rounded " +
                (i % 2 ? "md:order-2" : "")
              }
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">{p.label}</p>
              <h2 className="section-title mt-4">{p.title}</h2>
              <p>{p.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
                {p.details.map((d) => (
                  <li key={d} className="border-b border-[var(--border)] pb-3">
                    {d}
                  </li>
                ))}
              </ul>
              <Link href="/get-involved" className="text-link mt-7">
                Take part <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
