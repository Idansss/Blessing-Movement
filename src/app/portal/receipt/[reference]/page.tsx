import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PrintButton } from "./PrintButton";

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const session = await getServerSession(authOptions);

  const donation = await prisma.donation.findUnique({
    where: { reference, status: "completed" },
  });
  if (!donation) notFound();

  const email = session?.user?.email;
  const userId = (session?.user as { id?: string })?.id;
  const canView = email === donation.donorEmail || userId === donation.userId;
  if (!canView) notFound();

  const amountNaira = (donation.amount / 100).toLocaleString("en-NG");
  const date = donation.completedAt
    ? new Date(donation.completedAt).toLocaleDateString("en-NG", { dateStyle: "long" })
    : new Date(donation.createdAt).toLocaleDateString("en-NG", { dateStyle: "long" });

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="bg-primary text-white p-6 text-center">
            <h1 className="font-display text-xl font-bold">Thank you for your gift</h1>
            <p className="text-white/90 text-sm mt-1">Blessings Global Outreach</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reference</span>
              <span className="font-mono">{donation.reference}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold text-stone-900">₦{amountNaira}</span>
            </div>
            {donation.frequency === "monthly" && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frequency</span>
                <span>Monthly</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Donor</span>
              <span>{donation.donorName || donation.donorEmail}</span>
            </div>
          </div>
          <div className="p-6 pt-0 text-center text-sm text-muted-foreground border-t border-stone-100">
            This is your receipt for tax and record-keeping purposes.
          </div>
        </div>
        <div className="mt-6 flex gap-3 justify-center">
          <PrintButton />
          <Link
            href="/portal/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 text-primary font-medium hover:bg-muted transition-colors text-sm"
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
