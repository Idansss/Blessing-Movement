"use client";
import { useState, useRef, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { eventDateLabel, type Event } from "@/data/events";
export function EventRegistrationModal({
  event,
  open,
  onClose,
}: {
  event: Event;
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    if (open && !dialog.current?.open) {
      setStatus("idle");
      dialog.current?.showModal();
    } else if (!open && dialog.current?.open) dialog.current?.close();
  }, [open]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/events/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          eventId: event.id,
          eventTitle: event.title,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Please try again.");
      setStatus("success");
      setForm({ name: "", email: "", phone: "" });
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Please try again.");
    }
  }
  return (
    <dialog
      ref={dialog}
      className="dialog"
      aria-labelledby={"registration-" + event.id}
      onClose={onClose}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close registration"
      >
        <X size={20} />
      </button>
      <h2 id={"registration-" + event.id}>Be part of it.</h2>
      <p>
        <strong>{event.title}</strong>
        <br />
        {eventDateLabel(event)} · {event.time}
        <br />
        {event.location}
      </p>
      {status === "success" ? (
        <p role="status" className="mt-6">
          Thank you. Your interest has been recorded. The team will share the
          next details with you.
        </p>
      ) : (
        <form onSubmit={submit}>
          <label htmlFor={"name-" + event.id}>
            Your name
            <input
              id={"name-" + event.id}
              required
              autoComplete="name"
              maxLength={120}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label htmlFor={"email-" + event.id}>
            Email address
            <input
              id={"email-" + event.id}
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label htmlFor={"phone-" + event.id}>
            Phone (optional)
            <input
              id={"phone-" + event.id}
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
          {status === "error" && <p role="alert">{error}</p>}
          <button
            disabled={status === "loading"}
            type="submit"
            className="button button-gold w-full mt-4"
          >
            {status === "loading" ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Register interest"
            )}
          </button>
        </form>
      )}
    </dialog>
  );
}
