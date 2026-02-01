"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchTrendingPosts } from "@/store/postSlice";
import Link from "next/link";

export default function SideList() {
  const dispatch = useDispatch<AppDispatch>();

  const trending = useSelector(
    (state: RootState) => state.posts.trending
  );

  useEffect(() => {
    if (!trending.length) {
      dispatch(fetchTrendingPosts());
    }
  }, [dispatch, trending.length]);

  if (!trending.length) {
    return <div className="p-10 text-center">लोड हो रहा है…</div>;
  }

  return (
    <div className="mt-4 bg-gray-100 rounded-lg py-2 px-4 sticky top-10">
      <span className="text-black text-sm">What's hot</span>
      <h3 className="text-2xl font-bold mb-6">Trending 🔥</h3>

      <div className="space-y-6">
        {trending.map((item) => (
          <div key={item._id} className="flex flex-col gap-2">
            <span className="px-3 py-1 text-white font-semibold text-xs rounded-full w-fit bg-orange-600">
              {item.category}
            </span>

            <Link href={`${item.slug}`} className="font-medium active:text-orange-600 hover:text-orange-500">{item.title}</Link>

            {/* <span className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleDateString("hi-IN")}
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

