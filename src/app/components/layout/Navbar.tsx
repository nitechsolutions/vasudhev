import Link from "next/link";
import Image from "next/image";
import { getCategoriesByLang } from "@/lib/service/category.service";
import { resolveLang } from "@/lib/utils/get-lang";
import ActiveLink from "./ActiveLink";

export default async function Navbar({ lang }: { lang?: string }) {
  const currentLang = await resolveLang(lang);

  const categories = await getCategoriesByLang(currentLang);

  const prefix = currentLang === "hi" ? "" : `/${currentLang}`;

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between">

        {/* ✅ LOGO */}
        <Link href={prefix || "/"} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Vasudhev"
            width={110}
            height={40}
            priority
          />
        </Link>

        {/* ✅ NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6 text-md font-medium">

          {/* Home */}
          <ActiveLink
            href={prefix || "/"}
            exact
          >
            {currentLang === "en" ? "Home" : "होम"}
          </ActiveLink>

          {/* Categories */}
          {categories?.map((cat: any) => (
            <ActiveLink
              key={cat.slug}
              href={`${prefix}/${cat.slug}`}
            >
              {cat.name}
            </ActiveLink>
          ))}
        </nav>

        {/* ✅ RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* Language
          <Link
            href={currentLang === "hi" ? "/en" : "/"}
            className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
          >
            {currentLang === "hi" ? "EN" : "हिंदी"}
          </Link> */}

          {/* Login */}
          <Link
            href="/login"
            className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}