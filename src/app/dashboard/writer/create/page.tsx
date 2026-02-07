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
  const [showPreview, setShowPreview] = useState(false);

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
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm((prev) => ({ ...prev, image: file }));
      if (file) setImagePreview(URL.createObjectURL(file));
      return;
    }

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
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
    setForm((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const description = editorHiRef.current?.getHTML() || "";

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
        form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      )
    );

    const res = await fetch("/api/posts", { method: "POST", body: fd });
    const json = await res.json();

    if (!res.ok) {
      alert("❌ Error: " + json.error);
      return;
    }

    alert("✅ पोस्ट प्रकाशित हो गया!");
    router.push("/dashboard/writer");
  }

  const previewHTML = editorHiRef.current?.getHTML() || "";

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        नई पोस्ट लिखें
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title + Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            name="title"
            placeholder="शीर्षक"
            value={form.title}
            onChange={handleChange}
          />

          <div className="flex gap-2">
            <input
              className="input flex-1"
              name="slug"
              placeholder="Slug"
              value={form.slug}
              onChange={handleChange}
            />
            <button type="button" onClick={autoSlug} className="btn-gray">
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
            "बजट 2026", "भारत", "वाइरल", "ऑटोमोबाईल", "टेक्नोलॉजी", "लाइफस्टाइल", "हेल्थ", "बिजनेस", "क्रिकेट", "दुनिया", "एजुकेशन", "खेल", "मनोरंजन",
          ].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Image */}
        <input type="file" accept="image/*" onChange={handleChange} className="input" />

        {imagePreview && (
          <img
            src={imagePreview}
            className="w-full h-48 sm:h-60 object-cover rounded"
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
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="trending" checked={form.trending} onChange={handleChange} />
            Trending
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="w-full sm:w-auto px-5 py-2 bg-gray-200 rounded"
          >
            Preview
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded"
          >
            Publish
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 p-4 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4">{form.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
            <button
              onClick={() => setShowPreview(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          width: 100%;
        }
        .btn-gray {
          padding: 8px 14px;
          background: #eee;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
