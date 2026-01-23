"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

/* ===============================
   Types
================================ */

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  /* ===============================
     Handlers
  ================================ */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMsg(data.error || "Registration failed.");
        return;
      }

      setMsg("Account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 700);
    } catch (error) {
      setLoading(false);
      setMsg("Something went wrong. Please try again.");
    }
  };

  /* ===============================
     UI
  ================================ */

  return (
    <div className="py-16 flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-5 text-center">
          Create Account
        </h1>

        {msg && (
          <p className="text-center text-sm text-red-600 mb-3">
            {msg}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold p-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
