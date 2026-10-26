import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PhotoRoll } from "@/components/ui/PhotoRoll";
export default function AboutPage() {
  return (
    <>
      <section className="page-heading page-width">
        <p className="eyebrow">Meet the Blessings Movement</p>
        <h1>
          Faith in our hearts.
          <br />
          <em>Love in our hands.</em>
        </h1>
        <p>Spreading the love of Christ. One blessing at a time.</p>
      </section>
      <section className="page-width section-space about-layout">
        <Image
          src="/images/outreach/movement-family.jpg"
          alt="The Blessings Movement family gathered outdoors"
          width={1059}
          height={625}
          priority
        />
        <div>
          <p className="eyebrow">Our community</p>
          <h2 className="section-title">
            People coming together.
            <br />
            <em>Love reaching further.</em>
          </h2>
          <p>
            Blessings Global Outreach brings people together around faith and
            service. Our outreach photographs tell a story of medical care,
            welfare visits, worship and community.
          </p>
          <p>
            Led by convener Dcn Abiodun Aremu, the movement invites people to
            give their time, skills and resources in service to others.
          </p>
          <Link href="/get-involved" className="text-link mt-6">
            Find your place <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="work-section section-space">
        <div className="page-width intro-section">
          <p className="eyebrow">What brings us together</p>
          <div>
            <h2 className="section-title">
              Compassion in practice.
              <br />
              <em>Community in faith.</em>
            </h2>
            <p>
              Whether we are attending to someone at a medical outreach, sharing
              essential supplies, gathering in worship or simply listening, we
              want people to experience the love of Christ through the care they
              receive.
            </p>
            <Link href="/programs" className="text-link">
              Explore what we do <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <PhotoRoll />
    </>
  );
}
