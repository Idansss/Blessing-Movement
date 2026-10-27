"use client";
import { ThemedSelect } from "@/components/ui/ThemedSelect";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2 } from "lucide-react";
export function MediaUploadForm() {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const file = data.get("file");
    if (!(file instanceof File) || file.size > 4 * 1024 * 1024) {
      setError("Choose a photograph under 4 MB.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error ?? "Upload failed. Please try again.");
      setStatus("success");
      form.current?.reset();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
      setStatus("error");
    }
  }
  return (
    <form ref={form} onSubmit={submit} className="upload-form">
      <h2 className="font-display text-2xl">Add a photograph</h2>
      <p className="text-sm mt-3 text-[var(--text-secondary)]">
        Published photographs appear in the public gallery. Add a clear caption
        and describe the image for people using screen readers.
      </p>
      <label>
        Photograph
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          required
        />
        <span className="block text-xs mt-2">
          JPG, PNG, WebP or AVIF, up to 4 MB.
        </span>
      </label>
      <label>
        Title
        <input
          name="title"
          required
          maxLength={160}
          placeholder="A moment from the outreach"
        />
      </label>
      <label>
        Image description
        <input
          name="description"
          required
          maxLength={500}
          placeholder="Describe what is happening in this photograph"
        />
      </label>
      <label>
        Category
        <ThemedSelect
          name="category"
          aria-label="Photo category"
          defaultValue="Community"
          options={["Community", "Medical care", "Welfare", "Worship"].map(
            (value) => ({ value, label: value }),
          )}
        />
      </label>
      <label className="flex items-center gap-3">
        <input
          className="!w-auto !mt-0"
          type="checkbox"
          name="publish"
          defaultChecked
        />
        Publish to the gallery
      </label>
      <button
        type="submit"
        className="button button-gold"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Upload size={18} />
        )}{" "}
        {status === "loading" ? "Uploading photograph..." : "Upload photograph"}
      </button>
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm">
          {error}
        </p>
      )}
      {status === "success" && (
        <p role="status" className="mt-4 text-sm">
          Photograph saved. Published photos are now available in the gallery.
        </p>
      )}
    </form>
  );
}
