import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  const { reference } = await params;
  const session = await getServerSession(authOptions);

  const donation = await prisma.donation.findUnique({
    where: { reference, status: "completed" },
  });
  if (!donation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const email = session?.user?.email;
  const userId = (session?.user as { id?: string })?.id;
  const canView =
    email === donation.donorEmail || userId === donation.userId;
  if (!canView) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json({
    reference: donation.reference,
    amount: donation.amount,
    currency: donation.currency,
    donorName: donation.donorName,
    donorEmail: donation.donorEmail,
    frequency: donation.frequency,
    completedAt: donation.completedAt,
    createdAt: donation.createdAt,
  });
}
