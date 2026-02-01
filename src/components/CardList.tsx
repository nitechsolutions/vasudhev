"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestPosts, setPage } from "@/store/postSlice";
import type { RootState, AppDispatch } from "@/store";
import Pagination from "./ui/Pagination";
import Card from "./Card";

export default function CardList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, totalPages, loading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchLatestPosts({ page, limit: 6 }));
  }, [page]);

  if (loading) {
    return <div className="p-10 text-center">लोड हो रहा है…</div>;
  }

  return (
    <div className="space-y-14">
      {posts.map((p) => (
        <Card key={p._id} post={p} />
      ))}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => dispatch(setPage(p))}
      />
    </div>
  );
}
