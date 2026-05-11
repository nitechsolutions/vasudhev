import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/seo";
import { getSitemapPosts } from "@/lib/service/seo.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const posts = await getSitemapPosts();

  const postUrls: MetadataRoute.Sitemap = posts
    .filter(
      (post) =>
        post.categories?.slug &&
        post.post_translations?.length
    )
    .flatMap((post) =>
      post.post_translations.map((translation) => ({
        url: `${siteConfig.url}/blog/${post.categories.slug}/${translation.slug}`,

        lastModified: new Date(post.updated_at),

        changeFrequency: "weekly" as const,

        priority: 0.7,
      }))
    );

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },

    ...postUrls,
  ];
}