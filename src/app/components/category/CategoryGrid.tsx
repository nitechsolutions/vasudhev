import Link from "next/link";

export default function CategoryGrid({
  posts,
  lang,
}: {
  posts: any[];
  lang: string;
}) {
  if (!posts.length) return <p>This category has not any post</p>;
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.category}/${post.slug}`}
          className="group"
        >
          {post.image && (
            <img
              src={post.image}
              className="w-full  object-cover rounded mb-3 group-hover:opacity-90 transition"
            />
          )}

          <h2 className="font-semibold text-md group-hover:text-red-600 group-active:text-red-600 transition">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
