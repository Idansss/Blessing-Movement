type Donation = { id: string; amount: number; donorName: string | null; donorEmail: string; completedAt: Date | null };
type Event = { id: string; title: string; startAt: Date };

export function ImpactView({
  donations,
  events,
  prayerCount,
  volunteersCount,
}: {
  donations: Donation[];
  events: Event[];
  prayerCount: number;
  volunteersCount: number;
}) {
  const totalNaira = donations.reduce((s, d) => s + d.amount, 0) / 100;
  const totalDonors = new Set(donations.map((d) => d.donorEmail)).size;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Impact dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-muted-foreground">Funds raised</p>
          <p className="text-2xl font-bold text-primary">
            ₦{totalNaira.toLocaleString("en-NG", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-muted-foreground">Donors</p>
          <p className="text-2xl font-bold text-stone-900">{totalDonors}</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-muted-foreground">Prayers followed up</p>
          <p className="text-2xl font-bold text-stone-900">{prayerCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-muted-foreground">Volunteers approved</p>
          <p className="text-2xl font-bold text-stone-900">{volunteersCount}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <h2 className="p-4 font-semibold text-stone-900 border-b border-stone-100">
          Recent donations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Donor</th>
                <th className="text-right p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {donations.slice(0, 15).map((d) => (
                <tr key={d.id} className="border-t border-stone-100">
                  <td className="p-3">
                    {d.completedAt
                      ? new Date(d.completedAt).toLocaleDateString("en-NG")
                      : ""}
                  </td>
                  <td className="p-3">{d.donorName || d.donorEmail}</td>
                  <td className="p-3 text-right">
                    ₦{(d.amount / 100).toLocaleString("en-NG")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-xl border border-stone-200 p-4">
        <h2 className="font-semibold text-stone-900 mb-2">Events (published)</h2>
        <ul className="space-y-1 text-sm">
          {events.map((e) => (
            <li key={e.id}>
              {e.title} — {new Date(e.startAt).toLocaleDateString("en-NG")}
            </li>
          ))}
          {events.length === 0 && (
            <li className="text-muted-foreground">No events yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
