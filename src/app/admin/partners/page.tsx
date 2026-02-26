import { prisma } from "@/lib/db";
import { PartnerList } from "./PartnerList";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Partners
      </h1>
      <PartnerList initial={partners} />
    </div>
  );
}
