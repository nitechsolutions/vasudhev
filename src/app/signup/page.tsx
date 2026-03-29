"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/lib/service/auth.client";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    contact_no: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signupUser(form, profileImage);

      router.push("/login");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto mt-20 space-y-4 border p-6 rounded shadow"
    >
      <h1 className="text-2xl font-bold text-center">Create Account</h1>

      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="contact_no"
        placeholder="Contact Number"
        className="border p-2 w-full"
        onChange={handleChange}
        required
      />

      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full"
        onChange={(e) => e.target.files && setProfileImage(e.target.files[0])}
      />

      <button className="bg-black text-white px-4 py-2 w-full">
        Create Account
      </button>
    </form>
  );
}
