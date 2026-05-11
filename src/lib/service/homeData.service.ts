// lib/service/homeData.service.ts

import { cache } from "react";

import { getDefaultLanguage } from "./language.service";
import { supabase } from "../supabase/client";

export const getHomeData = cache(async () => {
  const defaultLang = await getDefaultLanguage();

  // console.log(defaultLang);

  /*
    ALL REQUESTS IN PARALLEL
  */

  const [categoriesRes, featuredRes, trendingRes, latestPostsRes] =
    await Promise.all([
      supabase
        .from("categories")
        .select("id, slug, name, emoji")
        .eq("language_code", "hi"),

      supabase
        .from("posts")
        .select(
          `
        id,
        featured,
        created_at,
        categories!posts_category_id_fkey(
  slug
),
        post_translations(title, slug, image, excerpt, language)
      `,
        )
        .eq("featured", true)
        .eq("post_translations.language", "hi")
        .order("created_at", { ascending: false })
        .limit(1),

      supabase
        .from("posts")
        .select(
          `
        id,
        trending,
        created_at,
       categories!posts_category_id_fkey(
  slug
),
        post_translations(title, slug, image, excerpt, language)
      `,
        )
        .eq("trending", true)
        .eq("post_translations.language", "hi")
        .order("created_at", { ascending: false })
        .limit(4),

      /*
      FETCH ALL POSTS ONCE
    */
      supabase
        .from("posts")
        .select(
          `
        id,
        created_at,
        category_id,
     categories!posts_category_id_fkey(
  slug
),
        post_translations(title, slug, image, excerpt, language)
      `,
        )
        .eq("post_translations.language", "hi")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

  const categories = categoriesRes.data || [];

  const latestPosts = latestPostsRes.data || [];

  const format = (rows: any[] | null = []) =>
  (rows || []).map((post) => {
    const category = Array.isArray(post.categories)
      ? post.categories?.[0]
      : post.categories;

    return {
      title: post.post_translations?.[0]?.title,
      slug: post.post_translations?.[0]?.slug,
      image: post.post_translations?.[0]?.image,
      excerpt: post.post_translations?.[0]?.excerpt,
      category: category?.slug,
    };
  });

  /*
    GROUP POSTS IN MEMORY
    NO MORE DB QUERIES INSIDE LOOPS
  */

  const categoryData = categories.map((cat) => {
  const posts = latestPosts
    .filter((post) => {
      const category = Array.isArray(post.categories)
        ? post.categories?.[0]
        : post.categories;

      return category?.slug === cat.slug;
    })
    .slice(0, 4);

  return {
    slug: cat.slug,
    name: cat.name,
    emoji: cat.emoji,
    posts: format(posts),
  };
});

  return {
    featured: format(featuredRes.data),
    trending: format(trendingRes.data),
    categoryData,
    lang: "hi",
    defaultLang,
  };
});
