"use client";

import { useState } from "react";

export function CheckInForm({ className }: { className?: string }) {
  const [qrCode, setQrCode] = useState("");
  const [result, setResult] = useState<{ ok: boolean; registration?: { name: string }; alreadyCheckedIn?: boolean } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!qrCode.trim()) return;
    const res = await fetch("/api/admin/check-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrCode: qrCode.trim() }),
    });
    const data = await res.json();
    setResult(data);
    if (data.ok) setQrCode("");
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <input
          type="text"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          placeholder="Paste QR code (e.g. QR-abc123...)"
          className="flex-1 px-4 py-2 rounded-lg border border-stone-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-white font-medium"
        >
          Check in
        </button>
      </div>
      {result && (
        <p className="mt-2 text-sm">
          {result.ok && result.alreadyCheckedIn && "Already checked in."}
          {result.ok && result.registration && (
            <span className="text-green-700">Checked in: {result.registration.name}</span>
          )}
          {!result.ok && result.registration == null && (
            <span className="text-red-600">Registration not found.</span>
          )}
        </p>
      )}
    </form>
  );
}
