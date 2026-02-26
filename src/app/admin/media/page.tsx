import { prisma } from "@/lib/db";

export default async function AdminMediaPage() {
  const items = await prisma.mediaItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Media hub
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Sermons, streams, podcasts, reels. Add new items via API or extend this page with a form.
      </p>
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Speaker / Topic</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id} className="border-t border-stone-100">
                <td className="p-3">{m.type}</td>
                <td className="p-3 font-medium">{m.title}</td>
                <td className="p-3">{m.speaker ?? m.topic ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && (
        <p className="text-muted-foreground text-sm mt-4">No media yet.</p>
      )}
    </div>
  );
}
