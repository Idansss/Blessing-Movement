import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "Blessings Global Outreach <noreply@blessingsglobal.org>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hello@blessingsglobal.org";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blessingsglobal.org";

async function send(to: string, subject: string, html: string) {
  if (!resend) {
    console.log(`[email] RESEND_API_KEY not set — would send to ${to}: ${subject}`);
    return;
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (e) {
    console.error("[email] send error:", e);
  }
}

// ─── Donor receipt ────────────────────────────────────────────────────────────
export async function sendDonationReceipt({
  to,
  name,
  amount,
  reference,
  date,
  frequency,
}: {
  to: string;
  name?: string;
  amount: number; // in Naira
  reference: string;
  date: string;
  frequency: string;
}) {
  const greeting = name ? `Dear ${name}` : "Dear Friend";
  const amountStr = `₦${amount.toLocaleString("en-NG")}`;
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">
      <div style="background:#4A0E8F;padding:32px;text-align:center;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">Thank You for Your Gift</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px">Blessings Global Outreach</p>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #e7e5e4;border-top:none;border-radius:0 0 12px 12px">
        <p>${greeting},</p>
        <p>Your generous gift has been received. <strong>Thank you</strong> — it fuels our medical outreaches, Praise &amp; Prophesy events, and the Blessings Movement.</p>
        <div style="background:#f5f5f4;border-radius:8px;padding:16px;margin:20px 0">
          <table style="width:100%;font-size:14px;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#78716c">Reference</td><td style="padding:6px 0;text-align:right;font-family:monospace">${reference}</td></tr>
            <tr><td style="padding:6px 0;color:#78716c">Date</td><td style="padding:6px 0;text-align:right">${date}</td></tr>
            <tr><td style="padding:6px 0;color:#78716c">Amount</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#4A0E8F;font-size:18px">${amountStr}</td></tr>
            ${frequency === "monthly" ? `<tr><td style="padding:6px 0;color:#78716c">Frequency</td><td style="padding:6px 0;text-align:right">Monthly (Blessings Builder)</td></tr>` : ""}
          </table>
        </div>
        <p style="text-align:center">
          <a href="${SITE_URL}/portal/receipt/${reference}" style="background:#4A0E8F;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">View Receipt</a>
        </p>
        <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0" />
        <p style="font-size:13px;color:#78716c;text-align:center">This is an official receipt. Keep it for your records.</p>
        <p style="font-size:13px;color:#78716c;text-align:center">🙏 <em>"Give, and it will be given to you…" — Luke 6:38</em></p>
      </div>
    </div>`;
  await send(to, `Your donation receipt — ${amountStr}`, html);
}

// ─── Volunteer confirmation ───────────────────────────────────────────────────
export async function sendVolunteerConfirmation({ to, name }: { to: string; name: string }) {
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">
      <div style="background:#4A0E8F;padding:32px;text-align:center;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">Welcome, Volunteer!</h1>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #e7e5e4;border-top:none;border-radius:0 0 12px 12px">
        <p>Dear ${name},</p>
        <p>Thank you for signing up to serve with <strong>Blessings Global Outreach</strong>! We're excited to have you on the team.</p>
        <p>Our team will be in touch shortly with next steps. In the meantime, check out upcoming events:</p>
        <p style="text-align:center">
          <a href="${SITE_URL}/events" style="background:#D4AF37;color:#1a1a1a;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">View Events</a>
        </p>
        <p style="font-size:13px;color:#78716c">🙏 <em>"Whatever you do, work at it with all your heart…" — Colossians 3:23</em></p>
      </div>
    </div>`;
  await send(to, "You're a Blessings Volunteer!", html);
  await send(ADMIN_EMAIL, `New volunteer: ${name} (${to})`, `<p>New volunteer application from <strong>${name}</strong> (${to}). <a href="${SITE_URL}/admin/volunteers">Review in admin →</a></p>`);
}

// ─── Contact confirmation ─────────────────────────────────────────────────────
export async function sendContactConfirmation({ to, name, subject }: { to: string; name: string; subject?: string }) {
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">
      <div style="background:#4A0E8F;padding:32px;text-align:center;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">Message Received</h1>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #e7e5e4;border-top:none;border-radius:0 0 12px 12px">
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Blessings Global Outreach${subject ? ` regarding "<em>${subject}</em>"` : ""}. We've received your message and will get back to you within 1–2 business days.</p>
        <p>Need immediate prayer? Use the Pray With Us button on our site:</p>
        <p style="text-align:center">
          <a href="${SITE_URL}/get-involved#prayer" style="background:#4A0E8F;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Submit Prayer Request</a>
        </p>
      </div>
    </div>`;
  await send(to, "We received your message — Blessings Global", html);
  await send(ADMIN_EMAIL, `New contact: ${name}${subject ? ` — ${subject}` : ""}`, `<p>New contact from <strong>${name}</strong> (${to})${subject ? `, subject: <em>${subject}</em>` : ""}. <a href="${SITE_URL}/admin">View admin →</a></p>`);
}

// ─── Prayer acknowledgement ───────────────────────────────────────────────────
export async function sendPrayerAcknowledgement({ to, name }: { to: string; name?: string }) {
  const greeting = name ? `Dear ${name}` : "Dear Friend";
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">
      <div style="background:#4A0E8F;padding:32px;text-align:center;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">We're Praying for You 🙏</h1>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #e7e5e4;border-top:none;border-radius:0 0 12px 12px">
        <p>${greeting},</p>
        <p>Your prayer request has been received by the Blessings Global prayer team. We are standing with you in faith and will be interceding on your behalf.</p>
        <p style="background:#f5f5f4;border-left:4px solid #4A0E8F;padding:12px 16px;border-radius:0 8px 8px 0;font-style:italic">"The prayer of a righteous person is powerful and effective." — James 5:16</p>
        <p>If you'd like to share a testimony when God answers, please reply to this email or visit our site. We'd love to celebrate with you!</p>
      </div>
    </div>`;
  await send(to, "The Blessings prayer team is interceding for you", html);
}

// ─── Event interest confirmation ──────────────────────────────────────────────
export async function sendEventInterestConfirmation({
  to,
  name,
  eventTitle,
  eventDate,
  eventLocation,
}: {
  to: string;
  name: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}) {
  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">
      <div style="background:#4A0E8F;padding:32px;text-align:center;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">You're Registered!</h1>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #e7e5e4;border-top:none;border-radius:0 0 12px 12px">
        <p>Dear ${name},</p>
        <p>You've successfully registered for <strong>${eventTitle}</strong>.</p>
        <div style="background:#f5f5f4;border-radius:8px;padding:16px;margin:16px 0;font-size:14px">
          <p style="margin:4px 0">📅 <strong>${eventDate}</strong></p>
          <p style="margin:4px 0">📍 <strong>${eventLocation}</strong></p>
        </div>
        <p>We'll send you a reminder as the event gets closer. Can't wait to see you there!</p>
        <p style="text-align:center">
          <a href="${SITE_URL}/events" style="background:#D4AF37;color:#1a1a1a;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">View All Events</a>
        </p>
      </div>
    </div>`;
  await send(to, `You're registered: ${eventTitle}`, html);
}

// ─── Partner inquiry notification ─────────────────────────────────────────────
export async function sendPartnerNotification({ name, email, notes }: { name: string; email: string; notes?: string }) {
  await send(ADMIN_EMAIL, `New partner inquiry: ${name}`, `<p>New partner inquiry from <strong>${name}</strong> (${email})${notes ? `<br/>Notes: ${notes}` : ""}. <a href="${SITE_URL}/admin/partners">Review →</a></p>`);
}
