"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stripHtml } from "@/lib/stripHtml";
import { fetchFeaturedPosts } from "@/store/postSlice";
import type { RootState, AppDispatch } from "@/store";

export default function Featured() {
  const dispatch = useDispatch<AppDispatch>();
  const {featured, loading} = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (!featured) {
      dispatch(fetchFeaturedPosts());
    }
  }, [dispatch, featured]);

  if (!featured) {
    return <div className="p-10 text-center">लोड हो रहा है…</div>;
  }

   if (loading ) {
    return <div className="p-10 text-center">लोड हो रहा है…</div>;
  }
  

  const description = stripHtml(featured.description);

  return (
    <div className="flex flex-col mt-6 lg:flex-row gap-6">
      <img
        src={featured.image}
        alt={featured.title}
        className="w- lg:w-1/2 h-80 object-cover rounded-lg"
      />

      <div className="flex flex-col items-start justify-center">
        <Link
          href={`/${featured.slug}`}
          className="text-2xl font-bold hover:text-orange-500 active:text-orange-600"
        >
          {featured.title}
        </Link>

        <p className="text-gray-600 mt-4">{description.substring(0, 250)}...</p>

        <Link
          href={`/category/${encodeURIComponent(featured.category)}`}
          className="mt-5 inline-block text-green-700 text-md border rounded-full border-green-300 hover:bg-green-100 px-4 active:text-white active:bg-orange-600"
        >
          {featured.category} →
        </Link>
      </div>
    </div>
  );
}
