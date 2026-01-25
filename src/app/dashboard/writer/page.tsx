"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ===============================
   Types
================================ */

interface WriterPost {
  _id: string;
  title: string;
  category: string;
}

/* ===============================
   Component
================================ */

export default function WriterPanel() {
  const [posts, setPosts] = useState<WriterPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/posts?mine=true");

        if (!res.ok) {
          console.error("Failed to fetch posts");
          return;
        }

        const data: { posts: WriterPost[] } = await res.json();

        // ✅ Type-safe assignment
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch (error) {
        console.error("Error loading posts", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading posts...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Writer Dashboard
      </h1>

      <Link
        href="/dashboard/writer/create"
        className="inline-block mb-6 px-4 py-2 bg-green-600 text-white rounded"
      >
        + Create New Post
      </Link>

      <div className="space-y-3">
        {posts.length === 0 && (
          <p className="text-gray-500">
            No posts created yet.
          </p>
        )}

        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500">
                {post.category}
              </p>
            </div>

            <Link
              href={`/dashboard/writer/edit/${post._id}`}
              className="px-3 py-1 bg-yellow-400 rounded text-sm"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
