import { createServerSupabaseClient } from "@/lib/supabase/server";
type Post = {
  id: string;
  status: string;
  published_at: string | null;
  created_at: string;

  categories: { name: string, slug: string }| null;

  post_translations: {
    title: string;
    slug: string;
    image: string | null;
    language: string;
  }[];
};

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

export async function getTopPosts() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      views,
      last_7_days_views,
      seo_score,
      categories ( name ),
      post_translations (
        title,
        slug,
        image,
        language
      )
    `,
    )
    .order("views", { ascending: false })
    .limit(10);

  if (error) throw error;

  return data?.map((post) => {
    const t = post.post_translations?.[0];

    const score = (post.views || 0) * 0.7 + (post.last_7_days_views || 0) * 0.3;

    return {
      id: post.id,
      title: t?.title,
      image: t?.image,
      language: t?.language,
      category: post.categories?.[0]?.name,
      views: post.views || 0,
      weeklyViews: post.last_7_days_views || 0,
      seoScore: post.seo_score || 0,
      score,
    };
  });
}

export async function getPosts(): Promise<Post[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`
      id,
      status,
      published_at,
      created_at,
      categories (name, slug),
      post_translations (
        title,
        slug,
        image,
        language
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const formatted = data.map((post) => ({
    ...post,
    categories: Array.isArray(post.categories)
      ? post.categories[0] || null
      : post.categories || null,
  }));

  return formatted;
}
