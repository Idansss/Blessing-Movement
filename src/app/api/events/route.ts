import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { startAt: "asc" },
    take: 50,
  });
  return NextResponse.json(events);
}
