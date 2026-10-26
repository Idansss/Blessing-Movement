import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Newsletter } from "@/components/ui/Newsletter";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-top">
          <div>
            <span className="eyebrow">There is a place for you here</span>
            <h2>
              Be blessed.
              <br />
              <em>Be a blessing.</em>
            </h2>
          </div>
          <Link href="/get-involved" className="button button-gold">
            Join the movement <ArrowUpRight size={18} />
          </Link>
        </div>
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
              Spreading the love of Christ.
              <br />
              One blessing at a time.
            </p>
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
            <h3>A little good in your inbox</h3>
            <p>Outreach stories, gatherings and ways to serve.</p>
            <Newsletter source="footer" />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Blessings Global Outreach</span>
          <span>Faith. Compassion. Community.</span>
          <Link href="/admin/media">
            Team access <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
