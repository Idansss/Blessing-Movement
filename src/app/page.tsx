import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Heart,
  Music2,
  Users,
  MapPin,
} from "lucide-react";
import { events, eventDateLabel } from "@/data/events";
import { Newsletter } from "@/components/ui/Newsletter";
import { PhotoRoll } from "@/components/ui/PhotoRoll";
const work = [
  {
    number: "01",
    icon: Heart,
    title: "Care that reaches people.",
    label: "Medical & welfare outreach",
    description:
      "Practical love, from medical care to food and essential supplies. Showing up where a helping hand matters.",
    image: "/images/outreach/care-in-action.jpg",
    alt: "A medical volunteer assisting an outreach participant using a wheelchair",
  },
  {
    number: "02",
    icon: Music2,
    title: "Faith that brings us together.",
    label: "Worship & prayer",
    description:
      "Hearts lifted in worship. Lives encouraged through the Word and prayer. Space to encounter the love of Christ.",
    image: "/images/outreach/worship.jpg",
    alt: "A singer leading worship at the Ibadan outreach",
  },
  {
    number: "03",
    icon: Users,
    title: "A family to grow with.",
    label: "The Blessings Movement",
    description:
      "Shared faith, honest conversations and willing hands. A community where we grow together and serve others.",
    image: "/images/outreach/fellowship.jpg",
    alt: "Blessings Movement members gathered for fellowship",
  },
];
export default function HomePage() {
  return (
    <>
      <section className="home-hero page-width">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="little-cross">✦</span> Blessings Global Outreach
          </p>
          <h1>
            Love in action.
            <br />
            Hope in every
            <br />
            <em>blessing.</em>
          </h1>
          <p className="hero-intro">
            Spreading the love of Christ through practical care, worship and a
            community that shows up for one another.
          </p>
          <div className="hero-buttons">
            <Link className="button button-gold" href="/get-involved">
              Be part of the story <ArrowUpRight size={19} />
            </Link>
            <Link className="text-link" href="/about">
              Meet the movement <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="fine-line" />
            Rooted in faith. Reaching out in love.
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <Image
              src="/images/outreach/medical-care.jpg"
              alt="Medical volunteers caring for people at The Blessings outreach"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 52vw"
            />
            <div className="photo-caption">
              <span>A glimpse of love in action</span>
              <strong>The Blessings outreach</strong>
            </div>
          </div>
          <div className="hero-inset">
            <Image
              src="/images/outreach/welfare-visit.jpg"
              alt="Volunteers delivering welfare supplies"
              fill
              sizes="220px"
            />
          </div>
          <div className="image-seal">
            BLESSED TO
            <br />
            <Heart size={22} strokeWidth={1.5} />
            <br />
            BE A BLESSING
          </div>
          <span className="photo-index">
            REAL PEOPLE. REAL MOMENTS. REAL LOVE.
          </span>
        </div>
      </section>
      <section className="next-gathering">
        <div className="page-width gathering-inner">
          <span className="eyebrow">The next opportunity to serve</span>
          <div>
            <span className="date-chip">
              30 <small>OCT</small>
            </span>
            <h2>
              The Blessings
              <br className="mobile-break" /> Prison Outreach
            </h2>
          </div>
          <Link className="text-link" href={"/events/" + events[0].slug}>
            Find out more <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
      <section className="section-space page-width intro-section">
        <p className="eyebrow">One faith. Many ways to give.</p>
        <div>
          <h2 className="section-title">
            A blessing is more than a word.
            <br />
            <em>It is something we do.</em>
          </h2>
          <p>
            We believe the love of Christ is seen in the way we care for people.
            In a medical consultation. In a meal shared. In a prayer offered. In
            a community that makes room for you.
          </p>
          <Link href="/about" className="text-link">
            This is our story <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="work-section section-space">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="section-title">
                Faith with
                <br />
                <em>its sleeves rolled up.</em>
              </h2>
            </div>
            <Link className="text-link" href="/programs">
              Explore our programmes <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="work-list">
            {work.map((item) => (
              <article key={item.number} className="work-row">
                <div className="work-image">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 36vw"
                  />
                </div>
                <div className="work-copy">
                  <div className="work-meta">
                    <span>{item.number} /</span>
                    <span>
                      <item.icon size={16} />
                      {item.label}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link
                    href="/programs"
                    className="circle-link"
                    aria-label={"Explore " + item.label}
                  >
                    <ArrowUpRight size={23} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PhotoRoll />
      <section className="section-space events-section page-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Make room in your calendar</p>
            <h2 className="section-title">
              Come as you are.
              <br />
              <em>Leave as a blessing.</em>
            </h2>
          </div>
          <Link className="text-link" href="/events">
            All gatherings <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="event-agenda">
          {events.map((event, i) => (
            <Link
              className="agenda-row"
              href={"/events/" + event.slug}
              key={event.id}
            >
              <span className="agenda-date">
                {i === 0 ? "30" : i === 1 ? "NOV" : "DEC"}
                <small>{i === 0 ? "OCT 2026" : "2026"}</small>
              </span>
              <div>
                <p className="eyebrow">{eventDateLabel(event)}</p>
                <h3>{event.title}</h3>
                <p className="agenda-location">
                  <MapPin size={14} />
                  {event.location}
                </p>
              </div>
              <span className="agenda-arrow">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="newsletter-section">
        <div className="page-width newsletter-layout">
          <div>
            <p className="eyebrow">Stay close to the story</p>
            <h2 className="section-title">
              Good news.
              <br />
              <em>In your inbox.</em>
            </h2>
          </div>
          <div>
            <p>
              Be the first to hear about upcoming outreaches, community
              gatherings and ways to make a difference.
            </p>
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  );
}
