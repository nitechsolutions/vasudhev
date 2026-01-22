"use client";

import { useEffect, useState } from "react";
import { ZODIACS, ZodiacKey, Zodiac } from "@/lib/zodiac";

interface HoroscopeResponse {
  zodiac: ZodiacKey;
  date: string;
  content_hi: string;
}

export default function HoroscopeCard() {
  const [zodiac, setZodiac] = useState<ZodiacKey>("aries");
  const [data, setData] = useState<HoroscopeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const today: string = new Date().toISOString().split("T")[0];
  const zodiacInfo: Zodiac | undefined = ZODIACS.find(
    (z) => z.key === zodiac
  );

  useEffect(() => {
    async function loadHoroscope(z: ZodiacKey) {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/horoscope?zodiac=${z}&date=${today}`
        );
        const json: HoroscopeResponse | null = await res.json();
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadHoroscope(zodiac);
  }, [zodiac, today]);

  return (
    <article className="max-w-md bg-white shadow border rounded-lg p-4 mt-6">
      {/* Header */}
      <h3 className="font-semibold text-gray-800 mb-3">
        आज का राशिफल |{" "}
        {new Date().toLocaleDateString("hi-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h3>

      {/* Zodiac Selector */}
      <div className="flex items-center gap-3 mb-3 border-b pb-3">
        {zodiacInfo && (
          <img
            src={zodiacInfo.image.src}
            alt={zodiacInfo.en}
            className="h-16 w-16 rounded-full object-cover"
          />
        )}

        <select
          value={zodiac}
          onChange={(e) => setZodiac(e.target.value as ZodiacKey)}
          className="w-full rounded py-2 border"
        >
          {ZODIACS.map((z) => (
            <option key={z.key} value={z.key}>
              {z.hi} | ({z.en})
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="text-sm text-gray-700 leading-relaxed">
        {loading && <p>लोड हो रहा है...</p>}
        {!loading && !data && <p>आज का राशिफल उपलब्ध नहीं है।</p>}
        {!loading && data && <p>{data.content_hi}</p>}
      </div>
    </article>
  );
}
