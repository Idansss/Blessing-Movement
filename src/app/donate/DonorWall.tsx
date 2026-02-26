import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// DonorWall — server component
// Fetches the 20 most recent completed donations and renders a donor badge wall.
// ---------------------------------------------------------------------------

interface DonorBadge {
  key: string;
  displayName: string;
}

function getFirstName(fullName: string | null | undefined): string {
  if (!fullName || fullName.trim() === "") return "";
  return fullName.trim().split(/\s+/)[0];
}

export async function DonorWall() {
  let donations: Array<{
    id: string;
    donorName: string | null;
    amount: number;
    completedAt: Date | null;
  }> = [];

  try {
    donations = await prisma.donation.findMany({
      where: { status: "completed" },
      orderBy: { completedAt: "desc" },
      take: 20,
      select: {
        id: true,
        donorName: true,
        amount: true,
        completedAt: true,
      },
    });
  } catch {
    // DB unavailable or schema not migrated — render empty state gracefully
    donations = [];
  }

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalNaira = (totalAmount / 100).toLocaleString("en-NG");
  const donorCount = donations.length;

  // Build display badges
  const badges: DonorBadge[] = donations.map((d, i) => {
    const firstName = getFirstName(d.donorName);
    const displayName = firstName !== "" ? firstName : i % 3 === 0 ? "A Friend of God" : "Anonymous";
    return { key: d.id, displayName };
  });

  return (
    <div className="mt-8">
      {/* Section heading */}
      <h3 className="font-display text-xl font-semibold text-stone-900 mb-1">
        Our Donors
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Every gift makes a difference. Thank you.
      </p>

      {donorCount === 0 ? (
        /* Empty state */
        <div className="rounded-2xl bg-white border border-stone-200 p-8 text-center">
          <p className="text-stone-500 text-sm">
            Be the first to give today. Your generosity changes lives.
          </p>
        </div>
      ) : (
        <>
          {/* Total summary */}
          <div className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            &#8358;{totalNaira} raised by {donorCount} donor{donorCount !== 1 ? "s" : ""}
          </div>

          {/* Donor badges */}
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge.key}
                className="inline-block px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {badge.displayName}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
