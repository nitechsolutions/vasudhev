import type { Post } from "@/types/post";
import { stripHtml } from "@/lib/stripHtml";
import Link from "next/link";

export default function Featured({ post }: { post: Post }) {
  const description = stripHtml(post.description);

  return (
    <div className="flex flex-col mt-6 lg:flex-row gap-6">
      <img src={post.image} className="w-full lg:w-1/2 h-80 object-cover rounded-lg" />

      <div className="flex flex-col justify-center">
        <Link href={`/${post._id}`} className="text-2xl font-bold hover:underline">
          {post.title}
        </Link>

        <p className="text-gray-600 mt-4">
          {description.substring(0, 250)}...
        </p>

        <Link
          href={`/category/${encodeURIComponent(post.category)}`}
          className="mt-4 inline-block border rounded-full px-4"
        >
          {post.category} →
        </Link>
      </div>
    </div>
  );
}
