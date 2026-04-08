import { BlogPost } from "../types/blog.types";
import {
  getBlogBySlugQuery,
  getRelatedPostsQuery,
  getTrendingQuery,
} from "./blog.query";

export async function getBlogData(
  slug: string,
  lang: string,
): Promise<BlogPost | null> {
  const { data, error } = await getBlogBySlugQuery(slug, lang);

  if (error || !data) return null;

  const post = data.post_translations[0];
  const category = Array.isArray(data.categories)
    ? data.categories[0]
    : data.categories;

  return {
    id: data.id,
    title: post.title,
    content: post.content,
    image: post.image,
    excerpt: post.excerpt,
    slug: post.slug,
    category: category?.slug || "", 
    category_name: category?.name || "",
    published_at: data.published_at,
    author: Array.isArray(data.profiles)
      ? data.profiles[0] || null
      : data.profiles || null,
    meta_title: post.meta_title,
    meta_description: post.meta_description,
  };
}

export async function getRelatedPosts(
  category: string,
  lang: string,
  slug: string,
) {
  const { data } = await getRelatedPostsQuery(category, lang, slug);

  return (
    data?.map((p: any) => ({
      title: p.post_translations[0]?.title,
      slug: p.post_translations[0]?.slug,
      image: p.post_translations[0]?.image,
      category: p.categories.slug,
    })) || []
  );
}

export async function getTrendingPosts(lang: string) {
  const { data } = await getTrendingQuery(lang);

  return (
    data?.map((p: any) => ({
      title: p.post_translations[0]?.title,
      slug: p.post_translations[0]?.slug,
      image: p.post_translations[0]?.image,
      category: p.categories.slug,
    })) || []
  );
}
