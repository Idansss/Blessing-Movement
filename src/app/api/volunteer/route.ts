import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendVolunteerConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interest } = body as {
      name: string;
      email: string;
      phone?: string;
      interest?: string;
    };
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required." }, { status: 400 });
    }
    const session = await getServerSession(authOptions);
    const existing = await prisma.volunteerApplication.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });
    if (existing && existing.status === "pending") {
      return NextResponse.json({ error: "You already have a pending application." }, { status: 400 });
    }
    await prisma.volunteerApplication.create({
      data: {
        name,
        email,
        phone: phone ?? null,
        interest: interest ?? null,
        userId: session?.user ? (session.user as { id: string }).id : null,
      },
    });
    await sendVolunteerConfirmation({ to: email, name });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
