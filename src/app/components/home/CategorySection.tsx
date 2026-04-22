// app/components/home/CategorySection.tsx

import Link from "next/link";
import { Gem } from "lucide-react";
import { PostCard } from "@/lib/types/blog.types";

interface CategorySectionProps {
  posts: PostCard[];
  title: string;
  emoji: string;
}

export default function CategorySection({
  posts,
  title,
  emoji,
}: CategorySectionProps) {
  if (!posts?.length) return null;

  // console.log("post",posts);
  

  return (
    <section>
      <div>
        <h2 className="text-xl font-bold mb-2 capitalize flex items-center justify-between gap-2 border-b-2 pb-2 border-orange-400 text-orange-600">
          {emoji} {title}
        <span className="">
          {<Gem size={20} />}
        </span>
        </h2>
      </div>

      {posts.map((post) => {
        return (
          <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="flex gap-3 mb-3">
            <img  src={post.image} className="w-24 h-16 object-cover rounded" />
            <p className="hover:text-red-600 transition font-semibold">
              {post.title}
            </p>
          </Link>
        );
      })}
    </section>
  );
}
