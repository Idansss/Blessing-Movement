"use client";

import { useState } from "react";

type Partner = {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: string;
  notes: string | null;
  createdAt: Date;
};

export function PartnerList({ initial }: { initial: Partner[] }) {
  const [list, setList] = useState(initial);
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered =
    statusFilter === "all"
      ? list
      : list.filter((p) => p.status === statusFilter);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/partners/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["all", "pending", "approved", "declined"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              statusFilter === s
                ? "bg-primary text-white"
                : "bg-white border border-stone-200 text-stone-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Tier</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-stone-100">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.email}</td>
                <td className="p-3 capitalize">{p.tier}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      p.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : p.status === "declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(p.createdAt).toLocaleDateString("en-NG")}
                </td>
                <td className="p-3">
                  {p.status === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => updateStatus(p.id, "approved")}
                        className="text-green-600 hover:underline mr-2"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(p.id, "declined")}
                        className="text-red-600 hover:underline"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
