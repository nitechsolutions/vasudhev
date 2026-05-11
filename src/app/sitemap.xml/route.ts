import { siteConfig } from "@/lib/seo/seo";
import { getPosts } from "@/lib/service/dashboard.service";

export async function GET() {
  const posts = await getPosts();

  const urls = posts
    .filter((post) => post.categories && post.post_translations?.length)
    .flatMap((post) =>
      post.post_translations.map((t) => {
        return `
        <url>
          <loc>${siteConfig.url}/blog//${post.categories?.slug}/${t.slug}</loc>
          <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`;
      })
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${siteConfig.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${urls}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}