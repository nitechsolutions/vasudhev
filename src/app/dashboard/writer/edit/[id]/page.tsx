"use client";

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter, useParams } from "next/navigation";
import QuillEditor from "@/components/QuillEditor";

/* ===============================
   Types
================================ */

interface EditPostForm {
  title: string;
  slug: string;
  category: string;
  description: string;
  tags: string;
  featured: boolean;
  trending: boolean;
  image: File | null;
  oldImage: string;
}

interface PostResponse {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
}

/* ===============================
   Component
================================ */

export default function EditBlogPage() {
  const router = useRouter();

  // ✅ CORRECT WAY IN CLIENT COMPONENT
  const params = useParams<{ id: string }>();
  const id = params.id;

  const editorRef = useRef<{ getHTML: () => string } | null>(null);

  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState<EditPostForm>({
    title: "",
    slug: "",
    category: "",
    description: "",
    tags: "",
    featured: false,
    trending: false,
    image: null,
    oldImage: "",
  });

  /* ===============================
     Load Post
  ================================ */

  useEffect(() => {
    if (!id) return;

    async function loadPost() {
      const res = await fetch(`/api/posts/admin/${id}`);
      if (!res.ok) return;

      const post: PostResponse = await res.json();

      setForm({
        title: post.title,
        slug: post.slug,
        category: post.category,
        description: post.description,
        tags: post.tags.join(", "),
        featured: post.featured,
        trending: post.trending,
        image: null,
        oldImage: post.image,
      });

      setImagePreview(post.image);
      setLoading(false);
    }

    loadPost();
  }, [id]);

  /* ===============================
     Quill
  ================================ */

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  /* ===============================
     Handlers
  ================================ */

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, type, value, checked, files } =
      e.target as HTMLInputElement;

    if (type === "file" && files?.[0]) {
      const file = files[0];
      setForm((p) => ({ ...p, image: file }));
      setImagePreview(URL.createObjectURL(file));
      return;
    }

    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();

    const description = editorRef.current?.getHTML() || "";

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("slug", form.slug);
    fd.append("category", form.category);
    fd.append("description", description);
    fd.append("featured", String(form.featured));
    fd.append("trending", String(form.trending));
    fd.append(
      "tags",
      JSON.stringify(
        form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      )
    );

    if (form.image) fd.append("image", form.image);

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: fd,
    });

    if (!res.ok) {
      alert("❌ Update failed");
      return;
    }

    router.push("/dashboard/writer");
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">पोस्ट संपादित करें </h1>

      <form onSubmit={handleUpdate} className="space-y-5">
        <input
          className="input"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          className="input"
          name="slug"
          value={form.slug}
          onChange={handleChange}
        />

        <input
          className="input"
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <input type="file" onChange={handleChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            className="rounded h-60 object-cover"
          />
        )}

        <QuillEditor
          ref={editorRef}
          initialValue={form.description}
          modules={modules}
        />

        <button className="bg-indigo-600 text-white px-6 py-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
}
