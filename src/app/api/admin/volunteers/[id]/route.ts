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
  const { status, assignedTo, notes } = body as {
    status?: string;
    assignedTo?: string;
    notes?: string;
  };
  const updated = await prisma.volunteerApplication.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(assignedTo !== undefined && { assignedTo }),
      ...(notes !== undefined && { notes }),
    },
  });
  return NextResponse.json(updated);
}
