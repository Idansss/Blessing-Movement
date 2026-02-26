import { prisma } from "@/lib/db";

export default async function AdminCommsPage() {
  const [templates, segments, journeys] = await Promise.all([
    prisma.emailTemplate.findMany({ take: 20 }),
    prisma.segment.findMany({ take: 20 }),
    prisma.journey.findMany({ take: 20 }),
  ]);
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Communication
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Email templates, segments, and journeys. Wire to Resend/Twilio/WhatsApp when ready.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <h2 className="font-semibold text-stone-900 mb-2">Templates</h2>
          <p className="text-2xl font-bold text-primary">{templates.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <h2 className="font-semibold text-stone-900 mb-2">Segments</h2>
          <p className="text-2xl font-bold text-primary">{segments.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <h2 className="font-semibold text-stone-900 mb-2">Journeys</h2>
          <p className="text-2xl font-bold text-primary">{journeys.length}</p>
        </div>
      </div>
    </div>
  );
}
