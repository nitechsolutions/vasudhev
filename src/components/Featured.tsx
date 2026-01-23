"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stripHtml } from "@/lib/stripHtml";
import { fetchFeaturedPosts } from "@/store/postSlice";
import type { RootState, AppDispatch } from "@/store";

export default function Featured() {
  const dispatch = useDispatch<AppDispatch>();
  const featuredPost = useSelector((state: RootState) => state.posts.featured);

  useEffect(() => {
    if (!featuredPost) {
      dispatch(fetchFeaturedPosts());
    }
  }, [dispatch, featuredPost]);

  if (!featuredPost) return null;

  const description = stripHtml(featuredPost.description);

  return (
    <div className="flex flex-col mt-6 lg:flex-row gap-6">
      <img
        src={featuredPost.image}
        alt={featuredPost.title}
        className="w-full lg:w-1/2 h-80 object-cover rounded-lg"
      />

      <div className="flex flex-col justify-center">
        <Link
          href={`/${featuredPost._id}`}
          className="text-2xl font-bold hover:underline"
        >
          {featuredPost.title}
        </Link>

        <p className="text-gray-600 mt-4">{description.substring(0, 250)}...</p>

        <Link
          href={`/category/${encodeURIComponent(featuredPost.category)}`}
          className="mt-5 inline-block text-White-600 text-lg border rounded-full w-auto px-4 "
        >
          {featuredPost.category} →
        </Link>
      </div>
    </div>
  );
}
