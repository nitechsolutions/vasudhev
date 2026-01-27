"use client";

import Image from "next/image";
import Link from "next/link";

const categoryItems: string[] = [
  "भारत",
  "ऑटोमोबाईल",
  "टेक्नोलॉजी",
  "लाइफस्टाइल",
  "बिजनेस",
  "हेल्थ",
  "क्रिकेट",
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
          src="/vasudhaiv_tree.png"
          alt="vasudhev.com"
          width={300}
          height={150}
          priority
          className="h-full w-auto mx-auto object-contain"
        />
      </div>

      {/* ================= DESKTOP NAV ================= */}
      <nav className="w-full bg-white border-b-2 border-orange-500 shadow-sm sticky top-0 z-50">
        <div className="wrapper bg-gray-100 h-8 flex items-center justify-center gap-8">
          {/* Home */}
          <Link
            href="/"
            className="hidden md:block text-gray-700 font-semibold text-sm hover:text-orange-500"
          >
            होम
          </Link>

          {/* Categories */}
          {categoryItems.map((item) => (
            <Link
              key={item}
              href={`/category/${encodeURIComponent(item)}`}
              className="hidden md:block text-gray-700 font-semibold text-sm hover:text-orange-500"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* ================= MOBILE NAV ================= */}
      <nav className="md:hidden overflow-x-auto flex gap-4 py-2 px-3 border-b border-gray-400 bg-white">
        {categoryItems.map((item) => (
          <Link
            key={item}
            href={`/category/${encodeURIComponent(item)}`}
            className="whitespace-nowrap text-gray-700 font-medium hover:text-orange-500"
          >
            {item}
          </Link>
        ))}
      </nav>
    </>
  );
}
