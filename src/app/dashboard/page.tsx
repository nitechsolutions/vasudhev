"use client";

import { useEffect, useState } from "react";

/* ===============================
   Types
================================ */

type UserRole = "reader" | "writer" | "admin";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/* ===============================
   Component
================================ */

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data: AuthUser = await res.json();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  /* ===============================
     UI STATES
  ================================ */

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Unauthorized</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome, {user.name} 👋
      </h1>

      <p className="mt-2 text-gray-600">
        Role: {user.role.toUpperCase()}
      </p>
    </div>
  );
}
