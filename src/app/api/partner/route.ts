import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendPartnerNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, tier, notes } = body as {
      name: string;
      email: string;
      tier?: string;
      notes?: string;
    };
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required." }, { status: 400 });
    }
    await prisma.partner.create({
      data: { name, email, tier: tier ?? "bronze", notes: notes ?? null },
    });
    await sendPartnerNotification({ name, email, notes });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
