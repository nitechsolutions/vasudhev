"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Validation
  const validateFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 200kb

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG, WEBP allowed";
    }

    if (file.size > maxSize) {
      return "File size must be less than 200kb";
    }

    return null;
  };

  // ✅ Upload Image
  const handleUpload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setUploading(true);
      setError("");

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      onChange(data.publicUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete Image (UI + Storage)
  const handleDelete = async () => {
    if (!value) return;

    try {
      setUploading(true);

      // Extract path from URL
      const path = value.split("/blog-images/")[1];

      if (path) {
        const { error } = await supabase.storage
          .from("blog-images")
          .remove([path]);

        if (error) throw error;
      }

      // Remove from UI + DB
      onChange(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Featured Image</label>

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-40 object-cover rounded"
          />

          <button
            type="button"
            onClick={handleDelete}
            disabled={uploading}
            className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ) : (
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleUpload(e.target.files[0]);
            }
          }}
          disabled={uploading}
          className="block w-full text-sm file:bg-gray-500 file:p-2  mt-6 border rounded"
        />
      )}

      {uploading && <p className="text-sm text-gray-500">Processing...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}