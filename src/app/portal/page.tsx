import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PortalHomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/portal/login");
  }
  redirect("/portal/dashboard");
}
