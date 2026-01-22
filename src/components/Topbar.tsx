"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { setUser, logout as logoutAction } from "@/store/authSlice";
import type { User } from "@/types/user";

export default function Topbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const [dateTime, setDateTime] = useState<string>("");

  // ---------------- LOAD USER (ONCE) ----------------
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          dispatch(setUser(null));
          return;
        }

        const data: User = await res.json();
        dispatch(setUser(data));
      } catch {
        dispatch(setUser(null));
      }
    }

    loadUser();
  }, [dispatch]);

  // ---------------- LOGOUT ----------------
  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    dispatch(logoutAction());
  }

  // ---------------- TIME ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(
        `${now.toLocaleDateString("hi-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })} | ${now.toLocaleTimeString("hi-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Prevent UI flicker
  if (loading) return null;

  return (
    <div className="w-full bg-green-700 text-sm text-white py-1 px-5">
      <div className="flex justify-between items-center">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <span className="font-medium">🌐 हिन्दी न्यूज़</span>
          <span className="hidden sm:block">{dateTime}</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {!user && (
            <Link
              href="/login"
              className="px-3 py-1 bg-orange-600 text-white rounded"
            >
              Login
            </Link>
          )}

          {user && (
            <>
              {(user.role === "writer" || user.role === "admin") && (
                <>
                  <Link
                    href="/"
                    className="px-3 py-1 bg-indigo-600 text-white rounded"
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard"
                    className="px-3 py-1 bg-indigo-600 text-white rounded"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
