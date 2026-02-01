"use client";

import type { Post } from "@/types/post";
import { stripHtml } from "@/lib/stripHtml";
import Link from "next/link";

export default function Card({ post }: { post: Post }) {
  const description = stripHtml(post.description);

  return (
    <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
      {/* IMAGE */}
      <Link
        href={`/${post.slug}`}
        className="block w-full sm:w-56 md:w-64 lg:w-72 flex-shrink-0"
      >
        <img
          src={post.image || "/placeholder.jpg"}
          alt={post.title}
          className="
            w-full 
            h-44 sm:h-40 md:h-44 lg:h-48
            object-cover 
            rounded-lg
          "
          loading="lazy"
        />
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1">
        {/* TITLE */}
        <Link
          href={`/${post.slug}`}
          className="
            text-lg sm:text-xl lg:text-2xl
            font-semibold
            leading-snug
            hover:text-orange-500
            active:text-orange-600
          "
        >
          {post.title}
        </Link>

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm sm:text-base text-gray-600 line-clamp-3">
          {description.substring(0, 220)}…
        </p>

        {/* FOOTER */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`/category/${post.category}`}
            className="
              text-xs sm:text-sm
              text-green-700
              border border-greem-300
              rounded-full
              px-3 py-1
              hover:bg-green-100
              active:bg-orange-600
              active:text-white
            "
          >
            {post.category} →
          </Link>

          <Link
            href={`/${post.slug}`}
            className="
              text-orange-600
              text-sm sm:text-base
              font-medium
              hover:underline
            "
          >
            और पढ़ें →
          </Link>
        </div>
      </div>
    </article>
  );
}
