"use client";

import Link from "next/link";

type Event = {
  id: string;
  title: string;
  slug: string;
  type: string;
  startAt: Date;
  published: boolean;
  capacity: number | null;
  _count: { registrations: number };
};

export function EventList({ initial }: { initial: Event[] }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Type</th>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Registrations</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {initial.map((e) => (
            <tr key={e.id} className="border-t border-stone-100">
              <td className="p-3 font-medium">{e.title}</td>
              <td className="p-3">{e.type}</td>
              <td className="p-3">{new Date(e.startAt).toLocaleDateString("en-NG")}</td>
              <td className="p-3">
                {e._count.registrations}
                {e.capacity != null ? ` / ${e.capacity}` : ""}
              </td>
              <td className="p-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs ${
                    e.published ? "bg-green-100 text-green-800" : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {e.published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="p-3">
                <Link
                  href={`/admin/events/${e.id}`}
                  className="text-primary hover:underline mr-2"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/events/${e.id}/registrations`}
                  className="text-primary hover:underline"
                >
                  Registrations
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {initial.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No events yet. Create one to get started.
        </div>
      )}
    </div>
  );
}
