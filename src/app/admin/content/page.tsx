"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONTENT_KEYS = [
  { key: "home_hero", label: "Homepage hero (title, subheadline, CTAs)" },
  { key: "home_stats", label: "Homepage stats (lives touched, countries, etc.)" },
  { key: "home_testimonials", label: "Homepage testimonials" },
  { key: "about_vision", label: "About vision & story" },
  { key: "footer", label: "Footer links & newsletter" },
];

export default function AdminContentPage() {
  const [editing, setEditing] = useState<string | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!editing) return;
    fetch(`/api/admin/content/${editing}`)
      .then((r) => r.json())
      .then((d) => setValue(typeof d === "object" ? JSON.stringify(d, null, 2) : ""))
      .catch(() => setValue(""));
  }, [editing]);

  async function save() {
    if (!editing) return;
    let data: unknown;
    try {
      data = JSON.parse(value);
    } catch {
      alert("Invalid JSON");
      return;
    }
    await fetch(`/api/admin/content/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setEditing(null);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">
        Content (CMS)
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Edit content blocks used across the site. Data is stored as JSON.
      </p>
      <ul className="space-y-2">
        {CONTENT_KEYS.map(({ key, label }) => (
          <li key={key} className="bg-white rounded-xl border border-stone-200 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-stone-900">{label}</span>
              <button
                type="button"
                onClick={() => setEditing(editing === key ? null : key)}
                className="text-sm text-primary hover:underline"
              >
                {editing === key ? "Cancel" : "Edit"}
              </button>
            </div>
            {editing === key && (
              <div className="mt-4">
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full h-40 p-3 rounded-lg border border-stone-200 font-mono text-sm"
                  placeholder='{"title": "..."}'
                />
                <button
                  type="button"
                  onClick={save}
                  className="mt-2 rounded-lg bg-primary px-4 py-2 text-white text-sm font-medium hover:bg-primary-light"
                >
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/admin" className="text-primary hover:underline">← Dashboard</Link>
      </p>
    </div>
  );
}
