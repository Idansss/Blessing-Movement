"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    type: "hangout",
    location: "",
    startAt: "",
    endAt: "",
    capacity: "",
    imageUrl: "",
    published: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          slug: form.slug || form.title.replace(/\s+/g, "-").toLowerCase(),
          capacity: form.capacity ? Number(form.capacity) : null,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const event = await res.json();
      router.push(`/admin/events/${event.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Create event
      </h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            placeholder="auto from title"
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          >
            <option value="outreach">Outreach</option>
            <option value="praise">Praise & Prophesy</option>
            <option value="hangout">Hangout</option>
            <option value="bootcamp">Bootcamp</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Start date/time *</label>
          <input
            type="datetime-local"
            required
            value={form.startAt}
            onChange={(e) => setForm((f) => ({ ...f, startAt: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">End date/time</label>
          <input
            type="datetime-local"
            value={form.endAt}
            onChange={(e) => setForm((f) => ({ ...f, endAt: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Capacity (optional)</label>
          <input
            type="number"
            min="1"
            value={form.capacity}
            onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-stone-200"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            <span className="text-sm">Published (visible on site)</span>
          </label>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-4 py-2 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Creating…" : "Create"}
          </button>
          <Link
            href="/admin/events"
            className="rounded-xl border border-stone-200 px-4 py-2 text-stone-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
