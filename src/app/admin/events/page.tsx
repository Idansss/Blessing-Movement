import Link from "next/link";
import { prisma } from "@/lib/db";
import { EventList } from "./EventList";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-stone-900">Events</h1>
        <Link
          href="/admin/events/new"
          className="rounded-xl bg-primary px-4 py-2 text-white font-semibold text-sm hover:bg-primary-light"
        >
          Create event
        </Link>
      </div>
      <EventList initial={events} />
    </div>
  );
}
