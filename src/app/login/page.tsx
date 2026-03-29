"use client";

import { useState } from "react";
import {  useRouter } from "next/navigation";
import { loginUser } from "@/lib/service/auth.client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { role } = await loginUser(email, password);

      if (role === "admin" || role === "author") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="bg-black text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  );
}