import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminLearnPage() {
  const courses = await prisma.course.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { enrollments: true } } },
  });
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Learning / Bootcamp
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Manage courses, modules, and certificates. Full CRUD can be added here.
      </p>
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3">Course</th>
              <th className="text-left p-3">Enrollments</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t border-stone-100">
                <td className="p-3 font-medium">{c.title}</td>
                <td className="p-3">{c._count.enrollments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {courses.length === 0 && (
        <p className="text-muted-foreground text-sm mt-4">No courses yet.</p>
      )}
    </div>
  );
}
