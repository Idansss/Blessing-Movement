import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendPrayerAcknowledgement } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, isPublic, requesterName, requesterEmail } = body as {
      content: string;
      isPublic?: boolean;
      requesterName?: string;
      requesterEmail?: string;
    };
    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "Prayer request content required." }, { status: 400 });
    }
    const prayer = await prisma.prayerRequest.create({
      data: {
        content: content.trim(),
        isPublic: Boolean(isPublic),
        requesterName: requesterName ?? null,
        requesterEmail: requesterEmail ?? null,
      },
    });
    if (requesterEmail) {
      await sendPrayerAcknowledgement({ to: requesterEmail, name: requesterName });
    }
    return NextResponse.json({ success: true, id: prayer.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
