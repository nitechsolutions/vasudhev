"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AdminPost {
  _id: string;
  title: string;
  category: string;
}

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  async function loadPosts() {
    const res = await fetch("/api/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts || []);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(post: AdminPost) {
    const ok = confirm(`Delete this post?\n\n"${post.title}"`);
    if (!ok) return;

    const res = await fetch(`/api/posts/${post._id}`, { method: "DELETE" });

    if (!res.ok) {
      alert("Error deleting post");
      return;
    }

    setPosts((prev) => prev.filter((p) => p._id !== post._id));
    setToast(`Post "${post.title}" deleted successfully!`);

    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="relative">
      {toast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}

      <h1 className="text-2xl font-bold">All Posts</h1>

      <div className="mt-6 space-y-3">
        {posts.map((p) => (
          <div
            key={p._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-xs text-gray-500">{p.category}</p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/dashboard/admin/edit/${p._id}`}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(p)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPosts;
