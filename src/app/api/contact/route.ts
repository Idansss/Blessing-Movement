import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, isPrayer } = body as {
      name: string;
      email: string;
      subject?: string;
      message: string;
      isPrayer?: boolean;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || null,
        message: message.trim(),
        isPrayer: isPrayer ?? false,
      },
    });

    if (isPrayer) {
      await prisma.prayerRequest.create({
        data: {
          content: message.trim(),
          requesterName: name.trim(),
          requesterEmail: email.trim().toLowerCase(),
          isPublic: false,
        },
      });
    }

    await sendContactConfirmation({ to: email.trim(), name: name.trim(), subject });
    return NextResponse.json({ success: true, id: contact.id });
  } catch (e) {
    console.error("[api/contact]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
