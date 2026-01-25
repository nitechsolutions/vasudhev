"use client";

import { useEffect, useState } from "react";
import { ZODIACS } from "@/lib/zodiac";
import { useRouter } from "next/navigation";

type ZodiacKey = typeof ZODIACS[number]["key"];

interface HoroscopeResponse {
  content_hi?: string;
}

const AdminHoroscopeEditor: React.FC = () => {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [zodiac, setZodiac] = useState<ZodiacKey>("aries");
  const [date, setDate] = useState<string>(today);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  /* ---------------- Load existing horoscope ---------------- */
  useEffect(() => {
    async function loadHoroscope(z: string, d: string) {
      setLoading(true);
      setMsg("");

      const res = await fetch(
        `/api/horoscope?zodiac=${z}&date=${d}`,
        { credentials: "include" }
      );

      if (res.ok) {
        const data: HoroscopeResponse = await res.json();
        setContent(data?.content_hi || "");
      } else {
        setContent("");
      }

      setLoading(false);
    }

    loadHoroscope(zodiac, date);
  }, [zodiac, date]);

  /* ---------------- Save ---------------- */
  async function handleSave() {
    if (!content.trim()) {
      alert("राशिफल सामग्री खाली नहीं हो सकती");
      return;
    }

    setLoading(true);
    setMsg("");

    const res = await fetch("/api/horoscope", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        zodiac,
        date,
        content_hi: content,
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMsg(json.error || "Save failed");
      return;
    }

    setMsg("✅ राशिफल सफलतापूर्वक सेव हो गया");
  }

  const zodiacInfo = ZODIACS.find((z) => z.key === zodiac)!;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        🪐 Daily Horoscope Editor
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="font-semibold block mb-1">राशि चुनें</label>
          <select
            value={zodiac}
            onChange={(e) => setZodiac(e.target.value as ZodiacKey)}
            className="w-full border p-2 rounded"
          >
            {ZODIACS.map((z) => (
              <option key={z.key} value={z.key}>
                {z.hi} ({z.en})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-1">तारीख</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 border p-3 rounded bg-gray-50">
        <img
          src={zodiacInfo.image.src}
          alt={zodiacInfo.en}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{zodiacInfo.hi}</h2>
          <p className="text-gray-500 text-sm">
            {zodiacInfo.en} | {date}
          </p>
        </div>
      </div>

      <textarea
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-3 rounded resize-none mb-4"
        placeholder="यहाँ आज का राशिफल लिखें..."
      />

      <div className="flex gap-4 items-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save Horoscope"}
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>

        {msg && <span className="text-green-600">{msg}</span>}
      </div>
    </div>
  );
};

export default AdminHoroscopeEditor;
