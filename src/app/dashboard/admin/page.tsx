"use client";

import Link from "next/link";
import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <p className="mt-3 text-gray-600">
        You have full control over posts and users.
      </p>

      <div className="mt-4 flex flex-wrap gap-4">
        <Link
          href="/dashboard/admin/posts"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Manage Posts
        </Link>

        <Link
          href="/dashboard/admin/horoscope"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Manage Horoscope
        </Link>

        <Link
          href="/dashboard/admin/users"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
