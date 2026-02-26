import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const block = await prisma.contentBlock.findUnique({ where: { key } });
  return NextResponse.json(block ? JSON.parse(block.data) : null);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const body = await req.json();
  await prisma.contentBlock.upsert({
    where: { key },
    create: { key, data: JSON.stringify(body) },
    update: { data: JSON.stringify(body) },
  });
  return NextResponse.json({ ok: true });
}
