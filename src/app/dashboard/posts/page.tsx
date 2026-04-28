import Link from "next/link";
import { getPosts } from "@/lib/service/dashboard.service";
type Post = {
  id: string;
  status: string;
  published_at: string | null;
  created_at: string;

  categories: { name: string }| null;

  post_translations: {
    title: string;
    slug: string;
    image: string | null;
    language: string;
  }[];
};

export default async function PostsPage() {
  const posts = await getPosts();

//   console.log("POST:", posts);

  if (!posts) {
    return <p className="text-red-500">Error loading posts</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>

        <Link
          href="/dashboard/posts/create"
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          + Create Post
        </Link>
      </div>

      {/* EMPTY STATE */}
      {!posts?.length && (
        <div className="bg-white p-10 rounded shadow text-center text-gray-500">
          No posts found. Start by creating your first post.
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {posts?.map((post) => {
          const translation = post.post_translations?.[0];

          return (
            <div
              key={post.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b hover:bg-gray-50 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* IMAGE */}
                {translation?.image ? (
                  <img
                    src={translation.image}
                    alt={translation.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md" />
                )}

                {/* CONTENT */}
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {translation?.title || "No title"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {post.categories?.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{translation?.language}</span>

                    {post.published_at && (
                      <span>
                        • {new Date(post.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                {/* STATUS */}
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    post.status === "published"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {post.status}
                </span>

                {/* ACTIONS */}
                <Link
                  href={`/dashboard/posts/edit/${post.id}`}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
