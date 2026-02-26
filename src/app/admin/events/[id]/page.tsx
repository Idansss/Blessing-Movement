import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { EventEditForm } from "../EventEditForm";

export default async function AdminEventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/events" className="text-primary hover:underline text-sm">
          ← Events
        </Link>
      </div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Edit: {event.title}
      </h1>
      <EventEditForm event={event} />
      <p className="mt-4">
        <Link href={`/admin/events/${id}/registrations`} className="text-primary hover:underline">
          View registrations & check-in →
        </Link>
      </p>
    </div>
  );
}
