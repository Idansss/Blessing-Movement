import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEventInterestConfirmation } from "@/lib/email";
import { events } from "@/data/events";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, eventTitle, name, email, phone } = body as {
      eventId: string;
      eventTitle: string;
      name: string;
      email: string;
      phone?: string;
    };

    if (!eventId || !eventTitle || !name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Event, name, and email are required." }, { status: 400 });
    }

    const interest = await prisma.eventInterest.upsert({
      where: { eventId_email: { eventId, email: email.trim().toLowerCase() } },
      create: { eventId, eventTitle, name: name.trim(), email: email.trim().toLowerCase(), phone: phone?.trim() || null },
      update: { name: name.trim(), phone: phone?.trim() || null },
    });

    // Look up event details for email
    const event = events.find((e) => e.id === eventId);
    const eventDate = event
      ? new Date(event.date).toLocaleDateString("en-NG", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) + " · " + event.time
      : eventTitle;
    const eventLocation = event?.location ?? "TBA";

    await sendEventInterestConfirmation({ to: email.trim(), name: name.trim(), eventTitle, eventDate, eventLocation });
    return NextResponse.json({ success: true, id: interest.id });
  } catch (e) {
    console.error("[api/events/interest]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
