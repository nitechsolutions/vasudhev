"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Card from "@/components/Card";
import type { Post } from "@/types/post";
import { fetchCategoryPosts, setPage } from "@/store/postSlice";
import type { RootState, AppDispatch } from "@/store";
import Pagination from "@/components/ui/Pagination";

interface Props {
  category: string;
}

export default function CategoryClient({ category }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, page, totalPages } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchCategoryPosts({ category, page, limit: 6  }));
  }, [category, page, dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline hover:text-blue-500">
          होम
        </Link>{" "}
        /{" "}
        <Link
          href={`/category/${encodeURIComponent(category)}`}
          className="underline text-blue-500"
        >
          {category}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        {category} समाचार
      </h1>

      {loading && <p>लोड हो रहा है...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-gray-500">
          इस श्रेणी में कोई पोस्ट उपलब्ध नहीं है।
        </p>
      )}

      <div className="space-y-10">
        {posts.map((post: Post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
      <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => dispatch(setPage(p))}
            />
    </div>
  );
}
