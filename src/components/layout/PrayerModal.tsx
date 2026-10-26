"use client";
import { useState, useRef, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
export function PrayerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState({ name: "", email: "", request: "" });
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current?.close();
  }, [open]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: form.request.trim(),
          isPublic: false,
          requesterName: form.name || undefined,
          requesterEmail: form.email || undefined,
        }),
      });
      if (!response.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", request: "" });
    } catch {
      setStatus("error");
    }
  }
  return (
    <dialog
      ref={dialog}
      className="dialog"
      aria-labelledby="prayer-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close prayer request"
      >
        <X size={20} />
      </button>
      <h2 id="prayer-title">Let&apos;s pray together.</h2>
      {status === "success" ? (
        <p role="status">
          Thank you. Your private prayer request has been received. Our team
          will pray with you.
        </p>
      ) : (
        <>
          <p>
            Share what is on your heart. Your request will be sent privately to
            the prayer team.
          </p>
          <form onSubmit={submit}>
            <label htmlFor="prayer-name">
              Name (optional)
              <input
                id="prayer-name"
                value={form.name}
                autoComplete="name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label htmlFor="prayer-email">
              Email (optional)
              <input
                type="email"
                id="prayer-email"
                value={form.email}
                autoComplete="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label htmlFor="prayer-request">
              How can we pray for you?
              <textarea
                id="prayer-request"
                required
                maxLength={5000}
                rows={4}
                value={form.request}
                onChange={(e) => setForm({ ...form, request: e.target.value })}
              />
            </label>
            {status === "error" && (
              <p role="alert">
                We couldn&apos;t send your request. Please try again.
              </p>
            )}
            <button
              type="submit"
              className="button button-gold w-full mt-4"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Send prayer request"
              )}
            </button>
          </form>
        </>
      )}
    </dialog>
  );
}
