// app/components/home/CategorySection.tsx

import Link from "next/link";
import { buildPostUrl } from "@/lib/utils/url";
import { PostItem } from "@/lib/types/post";

interface CategorySectionProps {
  posts: PostItem[];
  lang: string;
  defaultLang: string;
  title: string;
  emoji: string;
}

export default function CategorySection({
  posts,
  lang,
  defaultLang,
  title,
  emoji,
}: CategorySectionProps) {
  if (!posts?.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold mb-2 capitalize flex items-center gap-2 border-b-2 pb-2 border-orange-400 text-orange-600">
        {emoji} {title}
      </h2>

      {posts.map((post) => {
        const url = buildPostUrl(lang, post.category, post.slug, defaultLang);

        return (
          <Link key={post.slug} href={url} className="flex gap-3 mb-3">
            <img src={post.image} className="w-24 h-18 object-cover rounded" />
            <p className="hover:text-red-600 transition font-semibold">{post.title}</p>
          </Link>
        );
      })}
    </section>
  );
}