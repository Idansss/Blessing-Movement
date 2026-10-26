"use client";
import { useState } from "react";
import { EventCard } from "@/components/ui/EventCard";
import { events, type EventType } from "@/data/events";
const filters: { value: EventType | "all"; label: string }[] = [
  { value: "all", label: "All gatherings" },
  { value: "outreach", label: "Outreach" },
  { value: "hangout", label: "Community" },
];
export default function EventsPage() {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const filtered =
    filter === "all" ? events : events.filter((e) => e.type === filter);
  return (
    <>
      <section className="page-heading page-width">
        <p className="eyebrow">Gather. Serve. Be a blessing.</p>
        <h1>
          Good things happen
          <br />
          <em>when we show up.</em>
        </h1>
        <p>
          Find the next opportunity to serve, connect and share the love of
          Christ. Register your interest for updates from the team.
        </p>
      </section>
      <section className="page-width pb-24">
        <div className="filter-bar" aria-label="Filter events">
          {filters.map((f) => (
            <button
              key={f.value}
              aria-pressed={f.value === filter}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
        <p className="mt-7 text-xs text-[var(--text-muted)]">
          Photographs show past outreaches and gatherings. Unconfirmed dates,
          times and venues will be announced by the team.
        </p>
      </section>
    </>
  );
}
