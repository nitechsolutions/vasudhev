import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  /* -------- AUTH -------- */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /* ❌ Not logged in */
  if (!user) {
    redirect("/login");
  }

  /* -------- ROLE FETCH -------- */
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  /* ❌ Reader not allowed */
  if (profile?.role === "reader") {
    redirect("/");
  }

  /* ✅ Admin / Writer allowed */
  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}