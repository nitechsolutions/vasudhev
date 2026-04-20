"use client";

import Link from "next/link";

export default function Sidebar({ user }: { user: any }) {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 hidden md:block">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <nav className="flex flex-col space-y-3 text-sm">
        <Link href="/dashboard">Overview</Link>
        <Link href="/dashboard/posts">Posts</Link>
        <Link href="/dashboard/categories">Categories</Link>

        {user.role === "admin" && (
          <>
            <Link href="/dashboard/languages">Languages</Link>
            <Link href="/dashboard/users">Users</Link>
          </>
        )}

        <Link href="/dashboard/profile">Profile</Link>
      </nav>
    </aside>
  );
}