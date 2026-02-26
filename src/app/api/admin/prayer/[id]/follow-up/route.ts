import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const body = await req.json();
  const { note } = body as { note: string };
  if (!note?.trim()) {
    return NextResponse.json({ error: "Note required." }, { status: 400 });
  }
  const followUp = await prisma.prayerFollowUp.create({
    data: { prayerRequestId: id, userId, note: note.trim() },
  });
  return NextResponse.json(followUp);
}
