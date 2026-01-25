// app/hi/post/[slug]/PostClient.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  fetchPostBySlug,
  fetchRelatedPosts,
} from "@/store/postSlice";
import Link from "next/link";
import SinglePost from "@/components/SinglePost";
import RelatedPost from "@/components/RelatedPost";

export default function PostClient({ slug }: { slug: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { single, related, loading } = useSelector(
    (state: RootState) => state.posts
  );

  console.log("client slug:", slug); // ✅ NOW IT WORKS

  useEffect(() => {
    if (slug) {
      dispatch(fetchPostBySlug(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (single?.category) {
      dispatch(fetchRelatedPosts(single.category));
    }
  }, [single, dispatch]);

  if (loading || !single) {
    return (
      <div className="p-10 text-center text-lg">
        लोड हो रहा है...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-8">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-5">
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:underline hover:text-blue-500">होम</Link> /{" "}
          <Link href={`/category/${single.category}`} className="hover:underline hover:text-blue-500">
            {single.category}
          </Link>{" "}
          / {single.title.slice(0, 40)}...
        </div>

        <SinglePost post={single} />
      </div>

      {/* RIGHT */}
      <aside className="sticky top-2">
        <h2 className="text-2xl font-bold mb-4">
          संबंधित खबरें
        </h2>
        <RelatedPost
          posts={related}
          currentSlug={single.slug}
        />
      </aside>
    </div>
  );
}
