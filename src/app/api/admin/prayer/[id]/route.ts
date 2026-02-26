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
  const { status, assignedToId, outcome } = body as {
    status?: string;
    assignedToId?: string | null;
    outcome?: string | null;
  };
  const updated = await prisma.prayerRequest.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(assignedToId !== undefined && { assignedToId }),
      ...(outcome !== undefined && { outcome }),
    },
  });
  return NextResponse.json(updated);
}
