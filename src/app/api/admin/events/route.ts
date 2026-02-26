import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const events = await prisma.event.findMany({
    orderBy: { startAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { title, slug, description, type, location, startAt, endAt, capacity, imageUrl, published } = body;
  if (!title || !slug || !startAt) {
    return NextResponse.json({ error: "Title, slug, and startAt required." }, { status: 400 });
  }
  const event = await prisma.event.create({
    data: {
      title,
      slug: String(slug).replace(/\s+/g, "-").toLowerCase(),
      description: description ?? null,
      type: type ?? "hangout",
      location: location ?? null,
      startAt: new Date(startAt),
      endAt: endAt ? new Date(endAt) : null,
      capacity: capacity ? Number(capacity) : null,
      imageUrl: imageUrl ?? null,
      published: Boolean(published),
    },
  });
  return NextResponse.json(event);
}
