"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  type: string;
  location: string | null;
  startAt: Date;
  endAt: Date | null;
  capacity: number | null;
  imageUrl: string | null;
  published: boolean;
};

export function EventEditForm({ event }: { event: Event }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: event.title,
    slug: event.slug,
    description: event.description ?? "",
    type: event.type,
    location: event.location ?? "",
    startAt: new Date(event.startAt).toISOString().slice(0, 16),
    endAt: event.endAt ? new Date(event.endAt).toISOString().slice(0, 16) : "",
    capacity: event.capacity ?? "",
    imageUrl: event.imageUrl ?? "",
    published: event.published,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          capacity: form.capacity ? Number(form.capacity) : null,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
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
        <label className="block text-sm font-medium text-stone-700 mb-1">Slug</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
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
        <label className="block text-sm font-medium text-stone-700 mb-1">Start *</label>
        <input
          type="datetime-local"
          required
          value={form.startAt}
          onChange={(e) => setForm((f) => ({ ...f, startAt: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-stone-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">End</label>
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
        <label className="block text-sm font-medium text-stone-700 mb-1">Capacity</label>
        <input
          type="number"
          min="1"
          value={form.capacity}
          onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
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
          <span className="text-sm">Published</span>
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-primary px-4 py-2 text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
