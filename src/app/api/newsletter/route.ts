import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body as { email: string; source?: string };

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email: email.trim().toLowerCase() },
      create: {
        email: email.trim().toLowerCase(),
        source: source ?? "unknown",
      },
      update: {},
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[api/newsletter]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
