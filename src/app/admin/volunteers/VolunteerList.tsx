"use client";

import { useState } from "react";

type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  status: string;
  assignedTo: string | null;
  notes: string | null;
  createdAt: Date;
};

export function VolunteerList({ initial }: { initial: Volunteer[] }) {
  const [list, setList] = useState(initial);
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered =
    statusFilter === "all"
      ? list
      : list.filter((v) => v.status === statusFilter);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/volunteers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
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
              <th className="text-left p-3">Interest</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-t border-stone-100">
                <td className="p-3">{v.name}</td>
                <td className="p-3">{v.email}</td>
                <td className="p-3">{v.interest ?? "—"}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      v.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : v.status === "declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(v.createdAt).toLocaleDateString("en-NG")}
                </td>
                <td className="p-3">
                  {v.status === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => updateStatus(v.id, "approved")}
                        className="text-green-600 hover:underline mr-2"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(v.id, "declined")}
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
