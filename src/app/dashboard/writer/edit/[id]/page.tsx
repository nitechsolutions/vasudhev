"use client";

import { useEffect, useRef, useState, useMemo } from "react";
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
  image: File | null;
  oldImage: string;
  tags: string;
  featured: boolean;
  trending: boolean;
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

  // ✅ Correct client-side param access
  const params = useParams<{ id: string }>();
  const postId = params.id;
  console.log(postId);
  

  const editorHiRef = useRef<any>(null);

  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState<EditPostForm>({
    title: "",
    slug: "",
    category: "",
    description: "",
    image: null,
    oldImage: "",
    tags: "",
    featured: false,
    trending: false,
  });

  /* ===============================
     Load Post
  ================================ */

  useEffect(() => {
    if (!postId) return;

    async function loadPost() {
      const res = await fetch(`/api/posts/admin/${postId}`);
      if (!res.ok) return;

      const post: PostResponse = await res.json();

      setForm({
        title: post.title,
        slug: post.slug,
        category: post.category,
        description: post.description,
        oldImage: post.image,
        tags: post.tags?.join(", ") || "",
        featured: post.featured,
        trending: post.trending,
        image: null,
      });

      setImagePreview(post.image);
      setLoading(false);

      // set editor content
      setTimeout(() => {
        editorHiRef.current?.setHTML?.(post.description);
      }, 300);
    }

    loadPost();
  }, [postId]);

  /* ===============================
     Quill Modules
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value, files } = e.target;

    if (type === "file" && files?.[0]) {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\u0900-\u097F\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function autoSlug() {
    if (!form.title) return;
    setForm((prev) => ({
      ...prev,
      slug: generateSlug(prev.title),
    }));
  }

  /* ===============================
     Update Post
  ================================ */

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const description = editorHiRef.current?.getHTML?.() || "";

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

    if (form.image instanceof File) {
      fd.append("image", form.image);
    }

    const res = await fetch(`/api/posts/admin/${postId}`, {
      method: "PUT",
      body: fd,
    });

    const json = await res.json();

    if (!res.ok) {
      alert("❌ Error: " + json.error);
      return;
    }

    alert("✅ Post Updated Successfully!");
    router.push("/dashboard/writer");
  }

  if (loading) return <p className="p-6">Loading...</p>;

  const previewHTML = editorHiRef.current?.getHTML?.() || "";

  /* ===============================
     UI
  ================================ */

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">पोस्ट संपादित करें</h1>

      <form className="space-y-5" onSubmit={handleUpdate}>
        {/* TITLE + SLUG */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input"
            name="title"
            placeholder="शीर्षक (Hindi)"
            value={form.title}
            onChange={handleChange}
          />

          <div className="flex gap-2">
            <input
              className="input flex-1"
              name="slug"
              placeholder="Slug (Hindi)"
              value={form.slug}
              onChange={handleChange}
            />
            <button type="button" onClick={autoSlug} className="btn-gray">
              Auto
            </button>
          </div>
        </div>

        {/* CATEGORY */}
        <input
          className="input"
          name="category"
          placeholder="श्रेणी"
          value={form.category}
          onChange={handleChange}
        />

        {/* IMAGE */}
        <input type="file" accept="image/*" onChange={handleChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            className="w-full rounded mt-3 h-60 object-cover shadow"
          />
        )}

        {/* TAGS */}
        <input
          className="input"
          name="tags"
          placeholder="टैग (कॉमा से अलग करें)"
          value={form.tags}
          onChange={handleChange}
        />

        {/* EDITOR */}
        <div>
          <label className="font-semibold">विवरण (Hindi)</label>
          <div className="border rounded p-2 bg-white">
            <QuillEditor
              ref={editorHiRef}
              initialValue={form.description}
              modules={modules}
              placeholder="लेख सामग्री लिखें..."
            />
          </div>
        </div>

        {/* CHECKBOXES */}
        <div className="flex gap-6">
          <label className="flex gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured
          </label>

          <label className="flex gap-2">
            <input
              type="checkbox"
              name="trending"
              checked={form.trending}
              onChange={handleChange}
            />
            Trending
          </label>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="btn-gray px-4 py-2"
          >
            👁 Preview
          </button>

          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded">
            Update Post
          </button>
        </div>
      </form>

      {/* ------------------ PREVIEW MODAL ------------------ */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6">
          <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-3">{form.title}</h2>
            <p className="text-gray-600 mb-2">{form.category}</p>

            {imagePreview && (
              <img
                src={imagePreview}
                className="w-full rounded mb-4 h-60 object-cover"
              />
            )}

            <div
              dangerouslySetInnerHTML={{ __html: previewHTML }}
              className="prose"
            />

            <button
              onClick={() => setShowPreview(false)}
              className="mt-4 px-5 py-2 bg-red-500 text-white rounded"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      <style>{`
        .input { padding:10px; border:1px solid #ddd; border-radius:6px; width:100%; }
        .btn-gray { padding: 8px 14px; background: #eee; border-radius:6px; }
      `}</style>
    </div>
  );
}
