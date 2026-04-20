import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createServerSupabaseClient();

  const [posts, categories, users] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
  ]);

  return {
    postCount: posts.count ?? 0,
    categoryCount: categories.count ?? 0,
    userCount: users.count ?? 0,
  };
}