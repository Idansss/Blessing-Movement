import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function AnnouncementBanner() {
  return (
    <div className="announcement">
      <Link href="/events/blessings-prison-outreach-october-2026">
        <span>Up next</span> Prison Outreach · 30 October 2026{" "}
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}
