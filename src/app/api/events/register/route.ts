import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, email, name, phone } = body as {
      eventId: string;
      email: string;
      name: string;
      phone?: string;
    };
    if (!eventId || !email || !name) {
      return NextResponse.json(
        { error: "Event, email, and name required." },
        { status: 400 }
      );
    }
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { registrations: true } } },
    });
    if (!event || !event.published) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }
    if (
      event.capacity != null &&
      event._count.registrations >= event.capacity
    ) {
      return NextResponse.json(
        { error: "Event is at capacity." },
        { status: 400 }
      );
    }
    const qrCode = `QR-${crypto.randomBytes(8).toString("hex")}`;
    const reg = await prisma.eventRegistration.upsert({
      where: {
        eventId_email: { eventId, email },
      },
      create: {
        eventId,
        email,
        name,
        phone: phone ?? null,
        qrCode,
      },
      update: { name, phone: phone ?? null },
    });
    return NextResponse.json({
      success: true,
      registrationId: reg.id,
      qrCode: reg.qrCode,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
