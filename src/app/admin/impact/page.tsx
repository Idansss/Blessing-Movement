import { prisma } from "@/lib/db";
import { ImpactView } from "./ImpactView";

export default async function AdminImpactPage() {
  const [donations, events, prayerCount, volunteersCount] = await Promise.all([
    prisma.donation.findMany({
      where: { status: "completed" },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.event.findMany({
      where: { published: true },
      orderBy: { startAt: "desc" },
      take: 10,
    }),
    prisma.prayerRequest.count({ where: { status: "followed_up" } }),
    prisma.volunteerApplication.count({ where: { status: "approved" } }),
  ]);

  return (
    <ImpactView
      donations={donations}
      events={events}
      prayerCount={prayerCount}
      volunteersCount={volunteersCount}
    />
  );
}
