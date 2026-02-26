import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { status, tier, notes } = body as { status?: string; tier?: string; notes?: string };
  const updated = await prisma.partner.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(tier && { tier }),
      ...(notes !== undefined && { notes }),
    },
  });
  return NextResponse.json(updated);
}
