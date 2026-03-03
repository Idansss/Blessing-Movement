import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { SignOutButton } from "./SignOutButton";

export default async function PortalDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/portal/login");
  }

  const userId = (session.user as { id: string }).id;
  const donations = await prisma.donation.findMany({
    where: {
      OR: [{ userId }, { donorEmail: session.user.email }],
      status: "completed",
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const totalNaira = donations.reduce((s, d) => s + d.amount / 100, 0);

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-gradient-to-b dark:from-[#1A1208] dark:via-transparent dark:to-[#050302]">
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 rounded-2xl bg-white/95 dark:bg-[#120D07]/90 border border-stone-200 dark:border-[var(--border)] p-5 shadow-sm">
          <div>
            <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-[var(--text-primary)]">
              Donor Portal
            </h1>
            <p className="text-sm mt-1 text-stone-600 dark:text-[var(--text-secondary)]">
              {session.user.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="rounded-xl bg-primary px-4 py-2.5 text-white font-semibold text-sm hover:bg-primary-light transition-colors"
            >
              Give again
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-stone-200 p-6 mb-8">
          <h2 className="font-display text-lg font-semibold text-stone-900 mb-1">
            Giving summary
          </h2>
          <p className="text-3xl font-bold text-primary">
            ₦{totalNaira.toLocaleString("en-NG", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Total given ({donations.length} donation{donations.length !== 1 ? "s" : ""})
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
          <h2 className="font-display text-lg font-semibold text-stone-900 p-4 border-b border-stone-100">
            Giving history
          </h2>
          {donations.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No completed donations yet.</p>
              <Link href="/donate" className="mt-2 inline-block text-primary font-medium hover:underline">
                Make your first gift →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {donations.map((d) => (
                <li key={d.id} className="flex items-center justify-between p-4 hover:bg-muted/30">
                  <div>
                    <p className="font-medium text-stone-900">
                      ₦{(d.amount / 100).toLocaleString("en-NG")}
                      {d.frequency === "monthly" && (
                        <span className="text-muted-foreground font-normal text-sm"> / month</span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {d.completedAt
                        ? new Date(d.completedAt).toLocaleDateString("en-NG", {
                            dateStyle: "medium",
                          })
                        : new Date(d.createdAt).toLocaleDateString("en-NG", { dateStyle: "medium" })}
                    </p>
                  </div>
                  <Link
                    href={`/portal/receipt/${d.reference}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Receipt
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-stone-700 hover:text-stone-900 dark:text-[var(--text-secondary)] dark:hover:text-[var(--text-primary)] font-medium">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

