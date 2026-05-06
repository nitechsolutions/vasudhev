import { siteConfig } from "@/lib/seo/seo";
import { getPosts } from "@/lib/service/dashboard.service";

export default async function sitemap() {
  const posts = await getPosts();

  const urls = posts
    .filter((post) => post.categories && post.post_translations)
    .flatMap((post) => {
      return post.post_translations.map((translation) => {
        const categorySlug = post.categories?.slug
        const slug = translation.slug;

        return {
          url: `${siteConfig.url}/${categorySlug}/${slug}`,
          lastModified: new Date(post.updated_at),

          // Optional but recommended
          changeFrequency: "weekly",
          priority: 0.7,
        };
      });
    });

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...urls,
  ];
}