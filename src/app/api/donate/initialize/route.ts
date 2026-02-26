import { NextRequest, NextResponse } from "next/server";
import { Paystack } from "@paystack/paystack-sdk";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY ?? "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, frequency, donorName, donorEmail } = body as {
      amount: number; // in Naira
      frequency?: "once" | "monthly";
      donorName?: string;
      donorEmail: string;
    };

    if (!donorEmail || !amount || amount < 1) {
      return NextResponse.json(
        { error: "Valid email and amount (min ₦1) required." },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    // Amount in kobo (NGN): 1 Naira = 100 kobo
    const amountKobo = Math.round(Number(amount)) * 100;
    const freq = frequency === "monthly" ? "monthly" : "once";

    const ref = `bless-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const donation = await prisma.donation.create({
      data: {
        amount: amountKobo,
        currency: "NGN",
        reference: ref,
        status: "pending",
        frequency: freq,
        donorName: donorName ?? null,
        donorEmail,
        userId,
      },
    });

    if (!process.env.PAYSTACK_SECRET_KEY) {
      // Dev: no Paystack key — return mock URL
      return NextResponse.json({
        authorization_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/portal/donate/success?reference=${ref}&mock=1`,
        reference: ref,
        access_code: "mock",
      });
    }

    const response = await paystack.transaction.initialize({
      email: donorEmail,
      amount: amountKobo,
      reference: ref,
      metadata: {
        donation_id: donation.id,
        frequency: freq,
        donor_name: donorName ?? "",
      },
      callback_url: `${process.env.NEXTAUTH_URL ?? ""}/donate?verified=1`,
    });

    if (!response.status || !response.data?.authorization_url) {
      await prisma.donation.update({
        where: { id: donation.id },
        data: { status: "failed", metadata: JSON.stringify(response) },
      });
      return NextResponse.json(
        { error: "Payment initialization failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      authorization_url: response.data.authorization_url,
      reference: response.data.reference,
      access_code: response.data.access_code,
    });
  } catch (e) {
    console.error("Donate initialize error:", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
