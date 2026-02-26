import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { qrCode } = body as { qrCode: string };
  if (!qrCode) {
    return NextResponse.json({ error: "qrCode required." }, { status: 400 });
  }
  const reg = await prisma.eventRegistration.findUnique({
    where: { qrCode },
    include: { event: true },
  });
  if (!reg) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }
  if (reg.checkedInAt) {
    return NextResponse.json({
      ok: true,
      alreadyCheckedIn: true,
      registration: reg,
    });
  }
  await prisma.eventRegistration.update({
    where: { id: reg.id },
    data: { checkedInAt: new Date() },
  });
  const updated = await prisma.eventRegistration.findUnique({
    where: { id: reg.id },
    include: { event: true },
  });
  return NextResponse.json({ ok: true, registration: updated });
}
