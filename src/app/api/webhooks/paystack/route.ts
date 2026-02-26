import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendDonationReceipt } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (secret) {
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
    if (hash !== signature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
  }

  let event: { event: string; data: { reference: string; status?: string } };
  try {
    event = JSON.parse(body) as typeof event;
  } catch {
    return NextResponse.json({ message: "Bad body" }, { status: 400 });
  }

  if (event.event === "charge.success") {
    const ref = event.data?.reference;
    if (!ref) return NextResponse.json({ message: "No reference" }, { status: 400 });

    const completedAt = new Date();
    await prisma.donation.updateMany({
      where: { reference: ref },
      data: { status: "completed", completedAt, metadata: body.slice(0, 2000) },
    });

    // Send receipt email
    const donation = await prisma.donation.findUnique({ where: { reference: ref } });
    if (donation) {
      const amountNaira = donation.amount / 100;
      const date = completedAt.toLocaleDateString("en-NG", { dateStyle: "long" });
      await sendDonationReceipt({
        to: donation.donorEmail,
        name: donation.donorName ?? undefined,
        amount: amountNaira,
        reference: ref,
        date,
        frequency: donation.frequency,
      });
    }
  }

  return NextResponse.json({ received: true });
}
