import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { registrations: true },
  });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  if (body.title != null) data.title = body.title;
  if (body.slug != null) data.slug = body.slug;
  if (body.description != null) data.description = body.description;
  if (body.type != null) data.type = body.type;
  if (body.location != null) data.location = body.location;
  if (body.startAt != null) data.startAt = new Date(body.startAt);
  if (body.endAt != null) data.endAt = body.endAt ? new Date(body.endAt) : null;
  if (body.capacity != null) data.capacity = body.capacity ? Number(body.capacity) : null;
  if (body.imageUrl != null) data.imageUrl = body.imageUrl;
  if (body.published != null) data.published = Boolean(body.published);
  const event = await prisma.event.update({
    where: { id },
    data: data as Parameters<typeof prisma.event.update>[0]["data"],
  });
  return NextResponse.json(event);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
