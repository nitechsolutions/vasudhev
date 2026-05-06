import { siteConfig } from "@/lib/seo/seo";
import { getPosts } from "@/lib/service/dashboard.service";

export default async function sitemap() {
  const posts = await getPosts();
  

  const urls = posts.flatMap((post) => {
    if (!post.post_translations) return [];

    return post.post_translations.map((translation) => {
      const slug = translation.slug;

      // Default language → no prefix
      const path = `/${post.categories?.slug}/${slug}`;

      return {
        url: `${siteConfig.url}${path}`,
        lastModified: new Date(post.created_at),
      };
    });
  });

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    ...urls,
  ];
}