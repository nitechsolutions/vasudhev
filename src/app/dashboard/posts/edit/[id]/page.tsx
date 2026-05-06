"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";


import QuillEditor, {
  QuillEditorHandle,
} from "@/app/components/dashboard/RichTextEditor";

import SlugInput from "@/app/components/dashboard/SlugInput";
import ImageUpload from "@/app/components/dashboard/ImageUpload";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const editorRef = useRef<QuillEditorHandle>(null);

  console.log(id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [language] = useState("hi");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          post_translations (
            title,
            slug,
            image,
            content,
            language
          )
        `,
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }
      //   console.log("data", data);

      // ✅ Find correct language
      const t = data.post_translations[0];

      if (!t) {
        console.warn("No translation found");
        setLoading(false);
        return;
      }

      setTitle(t.title);
      setSlug(t.slug);
      setContent(t.content);
      setImage(t.image || null);

      setLoading(false);
    };

    fetchPost();
  }, [id, language]);

  /* =========================
     UPDATE
  ========================= */
  const handleUpdate = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Not authenticated");
        setLoading(false);
        return;
      }

      const html = editorRef.current?.getHTML() || "";
      console.log("postid", id);

      // 2. update translation
      const { data, error: transError } = await supabase
        .from("post_translations")
        .upsert(
        {
          post_id: id,
          language,
          title,
          slug,
          content: html,
          image,
        },
        {
          onConflict: "post_id,language",
        }
      )
      .select();

      console.log("UPDATED ROW:", data);

      if (transError) throw transError;

      alert("Updated successfully");
      router.push("/dashboard/posts");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Edit Post</h1>

      {/* TITLE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Title"
      />

      {/* SLUG */}
      <SlugInput title={title} value={slug} onChange={setSlug} />

      {/* IMAGE */}
      <ImageUpload value={image} onChange={setImage} />

      {/* CONTENT */}
      <QuillEditor ref={editorRef} initialValue={content} />

      {/* SAVE */}
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Updating..." : "Update"}
      </button>
    </div>
  );
}
