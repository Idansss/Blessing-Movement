import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { CheckInForm } from "./CheckInForm";

export default async function EventRegistrationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { registrations: true },
  });
  if (!event) notFound();
  const checkedIn = event.registrations.filter((r) => r.checkedInAt).length;
  return (
    <div>
      <Link href={`/admin/events/${id}`} className="text-primary hover:underline text-sm">
        ← Event
      </Link>
      <h1 className="font-display text-2xl font-bold text-stone-900 mt-2 mb-2">
        {event.title}
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        {event.registrations.length} registered
        {event.capacity != null ? ` / ${event.capacity} capacity` : ""}
        — {checkedIn} checked in
      </p>
      <CheckInForm className="mb-6" />
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">QR</th>
              <th className="text-left p-3">Checked in</th>
            </tr>
          </thead>
          <tbody>
            {event.registrations.map((r) => (
              <tr key={r.id} className="border-t border-stone-100">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3 font-mono text-xs">{r.qrCode ?? "—"}</td>
                <td className="p-3">
                  {r.checkedInAt
                    ? new Date(r.checkedInAt).toLocaleString("en-NG")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
