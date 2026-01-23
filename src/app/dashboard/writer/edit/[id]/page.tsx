"use client";

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/QuillEditor";

/* ===============================
   Types
================================ */

interface EditPostForm {
  title_hi: string;
  slug_hi: string;
  category_hi: string;
  description_hi: string;
  tags: string;
  featured: boolean;
  trending: boolean;
  image: File | null;
  oldImage: string;
}

interface PostResponse {
  _id: string;
  title_hi: string;
  slug_hi: string;
  category_hi: string;
  description_hi: string;
  image: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
}

/* ===============================
   Component
================================ */

export default function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const editorRef = useRef<{
    getHTML: () => string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState<EditPostForm>({
    title_hi: "",
    slug_hi: "",
    category_hi: "",
    description_hi: "",
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
    async function loadPost() {
      const res = await fetch(`/api/posts/${params.id}`);
      const post: PostResponse = await res.json();

      setForm({
        title_hi: post.title_hi,
        slug_hi: post.slug_hi,
        category_hi: post.category_hi,
        description_hi: post.description_hi,
        tags: post.tags?.join(", ") || "",
        featured: post.featured,
        trending: post.trending,
        image: null,
        oldImage: post.image,
      });

      setImagePreview(post.image);
      setLoading(false);
    }

    loadPost();
  }, [params.id]);

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

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, type, checked, value, files } = e.target as HTMLInputElement;

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
    if (!form.title_hi) return;
    setForm((prev) => ({
      ...prev,
      slug_hi: generateSlug(prev.title_hi),
    }));
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();

    const description_hi = editorRef.current?.getHTML() || "";

    const fd = new FormData();
    fd.append("title_hi", form.title_hi);
    fd.append("slug_hi", form.slug_hi);
    fd.append("category_hi", form.category_hi);
    fd.append("description_hi", description_hi);
    fd.append("featured", String(form.featured));
    fd.append("trending", String(form.trending));
    fd.append(
      "tags",
      JSON.stringify(
        form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      )
    );

    if (form.image) fd.append("image", form.image);

    const res = await fetch(`/api/posts/${params.id}`, {
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

  const previewHTML = editorRef.current?.getHTML() || "";

  /* ===============================
     UI
  ================================ */

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        पोस्ट संपादित करें
      </h1>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Title + Slug */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input"
            name="title_hi"
            value={form.title_hi}
            onChange={handleChange}
            placeholder="शीर्षक"
          />

          <div className="flex gap-2">
            <input
              className="input flex-1"
              name="slug_hi"
              value={form.slug_hi}
              onChange={handleChange}
              placeholder="Slug"
            />
            <button type="button" onClick={autoSlug} className="btn-gray">
              Auto
            </button>
          </div>
        </div>

        {/* Category */}
        <input
          className="input"
          name="category_hi"
          value={form.category_hi}
          onChange={handleChange}
          placeholder="Category"
        />

        {/* Image */}
        <input type="file" accept="image/*" onChange={handleChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            className="w-full h-60 object-cover rounded"
          />
        )}

        {/* Tags */}
        <input
          className="input"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags"
        />

        {/* Editor */}
        <QuillEditor
          ref={editorRef}
          initialValue={form.description_hi}
          modules={modules}
          placeholder="लेख सामग्री लिखें..."
        />

        {/* Checkboxes */}
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

        <button className="px-6 py-2 bg-indigo-600 text-white rounded">
          Update Post
        </button>
      </form>
    </div>
  );
}
