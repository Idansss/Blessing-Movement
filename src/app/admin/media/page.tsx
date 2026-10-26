import { prisma } from "@/lib/db";
import { MediaUploadForm } from "./MediaUploadForm";
import Link from "next/link";
export default async function AdminMediaPage() {
  const items = await prisma.mediaItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4 mb-8">
        <div>
          <p className="eyebrow">Team workspace</p>
          <h1 className="font-display text-3xl mt-2">Media library</h1>
        </div>
        <Link className="text-link" href="/media">
          View public gallery ↗
        </Link>
      </div>
      <MediaUploadForm />
      <h2 className="font-display text-2xl mt-10 mb-5">Uploaded media</h2>
      {items.length === 0 ? (
        <p className="text-sm">
          No additional media uploaded yet. The supplied outreach album is
          already on the public gallery.
        </p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[var(--border)]">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.topic ?? item.type}</td>
                  <td className="p-3">
                    {item.publishedAt ? "Published" : "Draft"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
