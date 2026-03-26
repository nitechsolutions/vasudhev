"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    contact_no: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    /* -------- 1. SIGNUP -------- */
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      alert("Signup failed");
      setLoading(false);
      return;
    }

    let imageUrl = "";

    /* -------- 2. IMAGE UPLOAD -------- */
    if (profileImage) {
      const fileExt = profileImage.name.split(".").pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(fileName, profileImage, {
          upsert: true,
        });

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrl.publicUrl;
    }

    /* -------- 3. INSERT PROFILE -------- */
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: form.full_name,
        contact_no: form.contact_no,
        profile_url: imageUrl,
        email: form.email,
        role: "reader", // ✅ default role
      });

    if (profileError) {
      alert(profileError.message);
      setLoading(false);
      return;
    }

    /* -------- 4. FETCH ROLE (OPTIONAL BUT CLEAN FLOW) -------- */
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    /* -------- 5. REDIRECT -------- */
    if (profile?.role === "admin" || profile?.role === "writer") {
      router.push("/dashboard");
    } else {
      router.push("/");
    }

    router.refresh();
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto mt-20 space-y-4 border p-6 rounded shadow"
    >
      <h1 className="text-2xl font-bold text-center">
        Create Account
      </h1>

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
        onChange={(e) =>
          e.target.files && setProfileImage(e.target.files[0])
        }
      />

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}