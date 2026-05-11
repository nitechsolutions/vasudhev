import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/service/dashboard.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const posts = await getPosts();

  console.log(posts);

  return [
    {
      url: "https://vasudhev.com",
      lastModified: new Date(),
    },
  ];
}