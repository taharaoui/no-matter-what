import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/server";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: { template: "%s — Admin", default: "Admin" },
  robots: { index: false, follow: false },
};

/* middleware.ts already redirects unauthenticated visitors before this
   ever renders — this second check is the belt to that suspenders, in
   case a request ever reaches here without going through middleware. The
   login route has its own layout-free page, so this never wraps it. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      <AdminNav />
      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
    </div>
  );
}
