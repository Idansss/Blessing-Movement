import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [
    donationsCount,
    donationsTotal,
    volunteersCount,
    partnersCount,
    eventsCount,
    prayerCount,
  ] = await Promise.all([
    prisma.donation.count({ where: { status: "completed" } }),
    prisma.donation.aggregate({
      where: { status: "completed" },
      _sum: { amount: true },
    }),
    prisma.volunteerApplication.count(),
    prisma.partner.count(),
    prisma.event.count(),
    prisma.prayerRequest.count(),
  ]);

  const totalNaira = (donationsTotal._sum.amount ?? 0) / 100;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Card
          title="Donations"
          value={`₦${totalNaira.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`}
          sub={`${donationsCount} completed`}
          href="/admin/impact"
        />
        <Card
          title="Volunteers"
          value={String(volunteersCount)}
          sub="Applications"
          href="/admin/volunteers"
        />
        <Card
          title="Partners"
          value={String(partnersCount)}
          sub="Partnerships"
          href="/admin/partners"
        />
        <Card
          title="Events"
          value={String(eventsCount)}
          sub="Total events"
          href="/admin/events"
        />
        <Card
          title="Prayer requests"
          value={String(prayerCount)}
          sub="Total"
          href="/admin/prayer"
        />
      </div>
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <h2 className="font-semibold text-stone-900 mb-2">Quick links</h2>
        <ul className="space-y-1 text-sm">
          <li>
            <Link href="/admin/events" className="text-primary hover:underline">
              Create event
            </Link>
          </li>
          <li>
            <Link href="/admin/content" className="text-primary hover:underline">
              Edit homepage content
            </Link>
          </li>
          <li>
            <Link href="/admin/prayer" className="text-primary hover:underline">
              Prayer queue
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  sub,
  href,
}: {
  title: string;
  value: string;
  sub: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow"
    >
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold text-stone-900 mt-1">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </Link>
  );
}
