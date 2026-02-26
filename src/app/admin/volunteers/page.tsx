import { prisma } from "@/lib/db";
import { VolunteerList } from "./VolunteerList";

export default async function AdminVolunteersPage() {
  const volunteers = await prisma.volunteerApplication.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Volunteer applications
      </h1>
      <VolunteerList initial={volunteers} />
    </div>
  );
}
