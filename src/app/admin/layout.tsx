import { requireAdmin } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  if (!session) redirect("/portal/login?error=AdminOnly");

  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/impact", label: "Impact" },
    { href: "/admin/volunteers", label: "Volunteers" },
    { href: "/admin/partners", label: "Partners" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/prayer", label: "Prayer" },
    { href: "/admin/content", label: "Content" },
    { href: "/admin/media", label: "Media" },
    { href: "/admin/learn", label: "Learning" },
    { href: "/admin/comms", label: "Comms" },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-primary text-white flex flex-col">
        <div className="p-4 font-display font-bold">Admin</div>
        <nav className="flex-1 px-2 space-y-1">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 px-3 rounded-lg text-white/90 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/20">
          <Link href="/" className="text-sm text-white/80 hover:text-white">
            ← Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 bg-muted/30 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
