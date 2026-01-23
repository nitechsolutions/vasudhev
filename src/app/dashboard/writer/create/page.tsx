"use client";

import { useRef, useState, useMemo, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import QuillEditor, { QuillEditorHandle } from "@/components/QuillEditor";


/* ===============================
   Types
================================ */

interface CreatePostForm {
  title: string;
  slug: string;
  category: string;
  image: File | null;
  tags: string;
  featured: boolean;
  trending: boolean;
}

/* ===============================
   Component
================================ */

export default function CreateBlogPage() {
  const router = useRouter();
  const editorHiRef = useRef<QuillEditorHandle | null>(null);

  const [form, setForm] = useState<CreatePostForm>({
    title: "",
    slug: "",
    category: "",
    image: null,
    tags: "",
    featured: false,
    trending: false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  /* ===============================
     Quill Toolbar
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
    const { name, type, value } = e.target;

    if (type === "file") {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0] || null;

      setForm((prev) => ({ ...prev, image: file }));
      if (file) setImagePreview(URL.createObjectURL(file));
      return;
    }

    if (type === "checkbox") {
      const input = e.target as HTMLInputElement;
      setForm((prev) => ({ ...prev, [name]: input.checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* ===============================
     Slug
  ================================ */

  function generateSlug(text: string): string {
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
     Submit
  ================================ */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const description =
      editorHiRef.current?.getHTML() || "";

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("slug", form.slug);
    fd.append("category", form.category);
    fd.append("description", description);
    fd.append("featured", String(form.featured));
    fd.append("trending", String(form.trending));

    if (form.image) fd.append("image", form.image);

    fd.append(
      "tags",
      JSON.stringify(
        form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
    );

    const res = await fetch("/api/posts", {
      method: "POST",
      body: fd,
    });

    const json = await res.json();

    if (!res.ok) {
      alert("❌ Error: " + json.error);
      return;
    }

    alert("✅ पोस्ट सफलतापूर्वक प्रकाशित हो गया!");
    router.push("/dashboard/writer");
  }

  const previewHTML =
    editorHiRef.current?.getHTML() || "";

  /* ===============================
     Render
  ================================ */

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        नई पोस्ट लिखें
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title + Slug */}
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
            <button
              type="button"
              onClick={autoSlug}
              className="btn-gray"
            >
              Auto
            </button>
          </div>
        </div>

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="input"
        >
          <option value="">श्रेणी चुनें</option>
          {[
            "भारत",
            "ऑटोमोबाईल",
            "टेक्नोलॉजी",
            "लाइफस्टाइल",
            "हेल्थ",
            "बिजनेस",
            "क्रिकेट",
            "दुनिया",
            "एजुकेशन",
            "खेल",
            "मनोरंजन",
          ].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="input"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            className="w-full rounded h-60 object-cover"
          />
        )}

        {/* Tags */}
        <input
          className="input"
          name="tags"
          placeholder="टैग (कॉमा से)"
          value={form.tags}
          onChange={handleChange}
        />

        {/* Editor */}
        <QuillEditor
          ref={editorHiRef}
          initialValue=""
          modules={modules}
          placeholder="लेख सामग्री लिखें..."
        />

        {/* Flags */}
        <div className="flex gap-6">
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />{" "}
            Featured
          </label>

          <label>
            <input
              type="checkbox"
              name="trending"
              checked={form.trending}
              onChange={handleChange}
            />{" "}
            Trending
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-5 py-2 bg-gray-200 rounded"
          >
            Preview
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded"
          >
            Publish
          </button>
        </div>
      </form>

      {showPreview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 max-w-3xl rounded">
            <h2 className="text-xl font-bold mb-4">
              {form.title}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: previewHTML }}
            />
            <button
              onClick={() => setShowPreview(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .input { padding:10px; border:1px solid #ddd; border-radius:6px; width:100%; }
        .btn-gray { padding:8px 14px; background:#eee; border-radius:6px; }
      `}</style>
    </div>
  );
}
