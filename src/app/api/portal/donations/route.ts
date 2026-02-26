import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const donations = await prisma.donation.findMany({
    where: {
      OR: [
        { userId: (session.user as { id: string }).id },
        { donorEmail: session.user.email },
      ],
      status: "completed",
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(
    donations.map((d) => ({
      id: d.id,
      amount: d.amount,
      currency: d.currency,
      reference: d.reference,
      frequency: d.frequency,
      createdAt: d.createdAt,
      completedAt: d.completedAt,
    }))
  );
}
