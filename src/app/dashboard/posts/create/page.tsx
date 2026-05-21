"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuillEditor, {
  QuillEditorHandle,
} from "@/app/components/dashboard/RichTextEditor";
import SlugInput from "@/app/components/dashboard/SlugInput";
import ImageUpload from "@/app/components/dashboard/ImageUpload";
import { supabase } from "@/lib/supabase/server.client";

interface Category {
  id: string;
  name: string;
}

interface CreatePostForm {
  title: string;
  slug: string;
  category: string;
  image: File | null;
  video: File | null; // ✅ NEW
  tags: string;
  featured: boolean;
  trending: boolean;
}

/* ===============================
   Component
================================ */

export default function CreateBlogPage() {
  const router = useRouter();
  const editorRef = useRef<QuillEditorHandle | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [language, setLanguage] = useState("hi");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("id, name");

      if (data) setCategories(data);
    };

    fetchCategories();
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: 1 }, { header: 2 }],
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [3, 4, 5, 6, false] }],

        ["bold", "italic", "underline"],
        ["link", "image", "video", "table"],

        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    [],
  );


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug) {
      alert("Title and slug required");
      return;
    }

    try {
      setLoading(true);

      alert("Publishing post...");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);
      

      if (!user) {
        alert("Not authenticated");
        setLoading(false);
        return;
      }

      const content = editorRef.current?.getHTML() || "";

      if (!content) {
        alert("Content is empty");
        setLoading(false);
        return;
      }

      const { data: postData, error: postError } = await supabase
        .from("posts")
        .insert({
          category_id: categoryId,
          author_id: user.id,
          featured,
          trending,
          status: "published",
          published_at: new Date(),
        })
        .select()
        .single();

      if (postError) {
        alert("Post Insert Error: " + postError.message);
        setLoading(false);
        return;
      }

      const { error: translationError } = await supabase
        .from("post_translations")
        .insert({
          post_id: postData.id,
          language,
          title,
          meta_title: metaTitle,
          slug,
          excerpt,
          meta_description: metaDescription,
          content,
          image: image,
          // meta_keywords: metaKeywords,
        });

      if (translationError) {
        alert("Translation Error: " + translationError.message);
        setLoading(false);
        return;
      }

      alert("Post published successfully!");

      router.push("/dashboard/posts");
    } catch (err) {
      alert("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">नई पोस्ट लिखें</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <SlugInput title={title} value={slug} onChange={setSlug} />

        <input
          type="text"
          placeholder="Meta Title"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Short summary"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Meta Description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <QuillEditor
          ref={editorRef}
          initialValue=""
          modules={modules}
          placeholder="लेख लिखें..."
        />
        <ImageUpload value={image} onChange={setImage} />

        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />{" "}
            Featured
          </label>

          <label>
            <input
              type="checkbox"
              checked={trending}
              onChange={(e) => setTrending(e.target.checked)}
            />{" "}
            Trending
          </label>
        </div>

        <button className="bg-black text-white px-6 py-2">
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
