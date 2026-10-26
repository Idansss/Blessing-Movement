"use client";
import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
export function Newsletter({ source = "home" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }
  return (
    <div>
      {status === "success" ? (
        <p role="status">Thank you. You&apos;re on the list.</p>
      ) : (
        <form className="newsletter-form" onSubmit={submit}>
          <label className="sr-only" htmlFor={"newsletter-" + source}>
            Email address
          </label>
          <input
            id={"newsletter-" + source}
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            disabled={status === "loading"}
            type="submit"
            aria-label="Subscribe to updates"
          >
            {status === "loading" ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <ArrowUpRight size={22} />
            )}
          </button>
        </form>
      )}
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm">
          We couldn&apos;t subscribe you. Please try again.
        </p>
      )}
    </div>
  );
}
