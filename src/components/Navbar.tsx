"use client";

import Image from "next/image";
import Link from "next/link";

const categoryItems: string[] = [
  "वाइरल",
  "भारत",
  "ऑटोमोबाईल",
  "टेक्नोलॉजी",
  "लाइफस्टाइल",
  "बिजनेस",
  "हेल्थ",
  "दुनिया",
  "एजुकेशन",
  "खेल",
  "मनोरंजन",
];

export default function Navbar() {
  return (
    <>
      {/* ================= TOP BANNER ================= */}
      <div className="relative w-full bg-cover bg-center">
        <Image
          src="/vasudhev_tree2.png"
          alt="vasudhev.com"
          width={300}
          height={150}
          priority
          className="mx-auto object-contain"
        />
      </div>

      {/* ================= DESKTOP & TABLET NAV ================= */}
      <nav className="hidden md:block w-full  bg-white border-b-2 border-orange-500 shadow-sm sticky top-0 z-50">
        <div className="bg-gray-100 justify-center h-10 flex items-center gap-6 px-4 overflow-x-auto whitespace-nowrap">
          {/* Home */}
          <Link
            href="/"
            className="text-gray-700 font-semibold  hover:text-orange-500 shrink-0 active:text-orange-600"
          >
            होम
          </Link>

          {/* Categories */}
          {categoryItems.map((item) => (
            <Link
              key={item}
              href={`/category/${encodeURIComponent(item)}`}
              className="text-gray-700 font-semibold hover:text-orange-500 shrink-0 active:text-orange-600"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* ================= MOBILE NAV ================= */}
      <nav className="md:hidden flex gap-4 py-2 px-3 bg-gray-100 border-b-2 border-orange-500 shadow-sm overflow-x-auto whitespace-nowrap">
        <Link
          href="/"
          className="text-gray-700 font-semibold text-sm hover:text-orange-500 shrink-0 active:text-orange-600"
        >
          होम
        </Link>

        {categoryItems.map((item) => (
          <Link
            key={item}
            href={`/category/${encodeURIComponent(item)}`}
            className="text-gray-700 font-semibold text-sm hover:text-orange-500 shrink-0 active:text-orange-600"
          >
            {item}
          </Link>
        ))}
      </nav>
    </>
  );
}
