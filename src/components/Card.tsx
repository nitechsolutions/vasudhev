"use client";

import type { Post } from "@/types/post";
import { stripHtml } from "@/lib/stripHtml";
import Link from "next/link";

export default function Card({ post }: { post: Post }) {
  const description = stripHtml(post.description);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img src={post.image} alt={post.title} className="md:w-1/3 lg:w-1/2 w-full h-40 object-cover m-auto rounded-lg" />

      <div className="flex flex-col">
        <Link
          href={`/${post.slug}`}
          className="text-xl font-semibold hover:underline"
        >
          {post.title}
        </Link>

        <p className="text-sm text-gray-600">
          {description.substring(0, 200)}...
        </p>

        <div className="mt-2 flex justify-between">
          <Link
            href={`/category/${post.category}`}
            className="border rounded-full px-4 text-sm"
          >
            {post.category} →
          </Link>

          <Link href={`/${post.slug}`} className="text-orange-600 text-sm">
            और पढ़ें →
          </Link>
        </div>
      </div>
    </div>
  );
}
