"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

/* ===============================
   Types
================================ */

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /* ===============================
     Handlers
  ================================ */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ⭐ important for cookies
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMsg(data.error || "Login failed");
        return;
      }

      // 🔔 notify Topbar / listeners
      window.dispatchEvent(new Event("auth-change"));

      router.push("/");
    } catch (error) {
      setLoading(false);
      setMsg("Something went wrong. Try again.");
    }
  };

  /* ===============================
     UI
  ================================ */

  return (
    <div className="py-10 flex justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>

        {msg && (
          <p className="text-center text-sm text-red-600 mb-3">
            {msg}
          </p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-orange-600 text-white p-3 rounded-lg disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-orange-600 font-semibold"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
