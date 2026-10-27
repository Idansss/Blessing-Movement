import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveUpRight, Globe2 } from "lucide-react";
import { Newsletter } from "@/components/ui/Newsletter";
import { Reveal } from "@/components/ui/Reveal";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <Reveal className="footer-top">
          <div>
            <span className="eyebrow">A little kindness goes a long way</span>
            <h2>
              Good starts
              <br />
              with <em>all of us.</em>
            </h2>
          </div>
          <div className="footer-invitation">
            <p>
              Bring your time, your skills, your willing heart. There is a place
              for you in the movement.
            </p>
            <Link href="/get-involved" className="footer-join">
              Find your place{" "}
              <span>
                <MoveUpRight size={27} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </Reveal>
        <div className="footer-columns">
          <div>
            <Image
              src="/logo/logo-clean.png"
              alt="Blessings Movement"
              width={180}
              height={66}
              className="footer-logo"
            />
            <p>
              Faith in our hearts.
              <br />
              Love in our hands.
            </p>
            <span className="footer-location">
              <Globe2 size={15} />
              Rooted in faith. Reaching further.
            </span>
          </div>
          <nav aria-label="Explore">
            <h3>Explore</h3>
            <Link href="/about">Our story</Link>
            <Link href="/programs">What we do</Link>
            <Link href="/events">Upcoming events</Link>
            <Link href="/media">In pictures</Link>
          </nav>
          <nav aria-label="Get involved">
            <h3>Take part</h3>
            <Link href="/get-involved#volunteer">Volunteer</Link>
            <Link href="/get-involved#partner">Partner with us</Link>
            <Link href="/pray">Prayer wall</Link>
            <Link href="/portal">Member portal</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div>
            <h3>Stay in the loop</h3>
            <p>
              Fresh stories. Upcoming gatherings.
              <br />
              More ways to make a difference.
            </p>
            <Newsletter source="footer" />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Blessings Global Outreach</span>
          <span>Faith. Compassion. Community.</span>
          <Link href="/admin/media">
            Team access <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
