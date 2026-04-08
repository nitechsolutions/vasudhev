// app/components/home/FeaturedSection.tsx

import Link from "next/link";
import { buildPostUrl } from "@/lib/utils/url";
import { PostCard } from "@/lib/types/post";

interface FeaturedSectionProps {
  posts: PostCard[];
  lang: string;
  defaultLang: string;
}

export default function FeaturedSection({
  posts,
  lang,
  defaultLang,
}: FeaturedSectionProps) {
  if (!posts?.length) return null;

  const post = posts[0];

  console.log("featured",posts);
  

  const url = buildPostUrl(lang, post.category, post.slug, defaultLang);

  return (
    <section>
      <Link href={url}>
        <img src={post.image} className="w-full h-52 object-cover rounded" />
        <h2 className="text-xl font-bold mt-3 hover:text-red-600">{post.title}</h2>
        <p className="text-gray-600 mt-2">{post.excerpt}</p>
      </Link>
    </section>
  );
}