"use client";

import React, { useEffect, useState } from "react";


type Props = {
  title: string;
  value: string;
  onChange: (slug: string) => void;
};

 function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")         // spaces → dash
    .replace(/-+/g, "-");         // collapse dashes
}

export default function SlugInput({ title, value, onChange }: Props) {
  const [isAuto, setIsAuto] = useState(false);

  // Auto update when title changes
  useEffect(() => {
    if (isAuto) {
      onChange(generateSlug(title));
    }
  }, [title, isAuto, onChange]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Slug</label>

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(generateSlug(e.target.value))}
          disabled={isAuto}
          className={`w-full border px-3 py-2 rounded ${
            isAuto ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          placeholder="your-post-slug"
        />

        <button
          type="button"
          onClick={() => onChange(generateSlug(title))}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Auto
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isAuto}
          onChange={() => setIsAuto(!isAuto)}
        />
        <span>Auto generate from title</span>
      </div>
    </div>
  );
}