// app/hi/post/[slug]/page.tsx
import type { Metadata } from "next";
import PostClient from "./PostClient";
import { headers } from "next/headers";

/* -----------------------------
   Fetch post for SEO only
-------------------------------- */
async function getPost(slug: string) {
  
  const headersList = await headers();   // ✅ await REQUIRED
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/posts/public/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

/* -----------------------------
   ✅ DYNAMIC METADATA (SEO)
-------------------------------- */
export async function generateMetadata({
  params,
}: {
   params: Promise<{ slug: string }>;
}): Promise<Metadata> {

  const {slug} = await params

  console.log(slug);
  
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "लेख नहीं मिला | Vasudhev Hindi News",
      description: "यह लेख उपलब्ध नहीं है।",
    };
  }

  const cleanDescription = post.description
    ?.replace(/<[^>]*>/g, "")
    .slice(0, 160);

  return {
    title: `${post.title} | Vasudhev Hindi News`,
    description: cleanDescription,

    alternates: {
      canonical: `https://vasudhev.com/${post.slug}`,
    },

    openGraph: {
      title: post.title,
      description: cleanDescription,
      url: `https://vasudhev.com/${post.slug}`,
      type: "article",
      locale: "hi_IN",
      siteName: "Vasudhev Hindi News",
      images: [
        {
          url: post.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: cleanDescription,
      images: [post.image || "/og-image.jpg"],
    },

    keywords: [
      post.title,
      post.category,
      "Vasudhev Hindi News",
      "हिंदी न्यूज़",
      "आज की खबरें",
    ],
  };
}

/* -----------------------------
   Page Component
-------------------------------- */
export default async function ArticlePage({
  params,
}: {
   params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostClient slug={slug} />;
}
