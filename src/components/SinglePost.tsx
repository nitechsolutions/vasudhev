import Link from "next/link";
import type { Post } from "@/types/post";

export default function SinglePost({ post }: { post: Post }) {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-4">
        {post.title}
      </h1>

      <div className="text-sm text-gray-500 mb-6 flex gap-4">
        <span>
          📅 {new Date(post.createdAt).toLocaleDateString("hi-IN")}
        </span>
        <span>👁 {post.views} Views</span>
      </div>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded mb-6"
          alt={post.title}
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />

      {post.tags.length > 0 && (
        <div className="mt-10">
          <h3 className="font-semibold mb-2">🔖 टैग्स</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
