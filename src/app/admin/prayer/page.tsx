import { prisma } from "@/lib/db";
import { PrayerList } from "./PrayerList";

export default async function AdminPrayerPage() {
  const requests = await prisma.prayerRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Prayer requests
      </h1>
      <PrayerList initial={requests} />
    </div>
  );
}
