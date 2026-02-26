"use client";

import { useState } from "react";

type Prayer = {
  id: string;
  content: string;
  isPublic: boolean;
  status: string;
  requesterName: string | null;
  requesterEmail: string | null;
  outcome: string | null;
  createdAt: Date;
};

export function PrayerList({ initial }: { initial: Prayer[] }) {
  const [list, setList] = useState(initial);
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered =
    statusFilter === "all"
      ? list
      : list.filter((p) => p.status === statusFilter);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/prayer/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setList((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["all", "new", "praying", "followed_up", "testimony"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              statusFilter === s ? "bg-primary text-white" : "bg-white border border-stone-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-stone-200 p-4"
          >
            <p className="text-stone-700 whitespace-pre-wrap">{p.content}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{new Date(p.createdAt).toLocaleString("en-NG")}</span>
              {p.requesterEmail && <span>• {p.requesterEmail}</span>}
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs ${
                  p.status === "testimony"
                    ? "bg-green-100 text-green-800"
                    : p.status === "followed_up"
                      ? "bg-blue-100 text-blue-800"
                      : p.status === "praying"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-stone-100 text-stone-700"
                }`}
              >
                {p.status}
              </span>
            </div>
            {p.status === "new" && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => updateStatus(p.id, "praying")}
                  className="text-primary hover:underline text-sm mr-2"
                >
                  Mark praying
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(p.id, "followed_up")}
                  className="text-primary hover:underline text-sm"
                >
                  Mark followed up
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
