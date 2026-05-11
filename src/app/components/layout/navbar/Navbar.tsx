import Link from "next/link";
import Image from "next/image";
import { getCategoriesByLang } from "@/lib/service/category.service";
import ActiveLink from "./ActiveLink";
import MobileMenu from "./MobileMenu";
import { getUserWithRole } from "@/lib/service/auth.server";

type CategoryItem = {
  name: string;
  slug: string;
};

export default async function Navbar({ lang }: { lang: string }) {
  const data = await getUserWithRole();

  console.log(data?.role);

  const currentLang = lang;

  const categories = await getCategoriesByLang(currentLang);

  const prefix = currentLang === "hi" ? "" : `/${currentLang}`;

  return (
    <header className="w-full sticky top-0 z-50 bg-white ">
      <div className="max-w-6xl shadow mx-auto h-14 px-4 flex items-center justify-between">
        {/* ✅ LOGO */}
        <Link href={prefix || "/"} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Vasudhev"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* ✅ DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-md font-medium">
          <ActiveLink href={prefix || "/"} exact>
            {currentLang === "en" ? "Home" : "होम"}
          </ActiveLink>

          {categories?.map((cat: CategoryItem) => (
            <ActiveLink key={cat.slug} href={`${prefix}/blog/${cat.slug}`}>
              {cat.name}
            </ActiveLink>
          ))}
        </nav>

        {/* ✅ RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {!data?.user && (
              <Link
                className="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                href="/login"
              >
                Login
              </Link>
            )}

            {data?.user && (
              <>
                {data.role === "reader" ? (
                  <> </>
                ) : (
                  <Link
                    className="text-sm px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                )}

                <form action="/auth/signout" method="post">
                  <button className="bg-red-500 text-sm text-white px-4 py-2 rounded">
                    Sign Out
                  </button>
                </form>
              </>
            )}
          </div>

          {/* ✅ MOBILE MENU */}
          <MobileMenu
            prefix={prefix}
            categories={categories}
            currentLang={currentLang}
            user={data?.user ?? null}
            role={data?.user.role ?? null}
          />
        </div>
      </div>
    </header>
  );
}
