"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type CategoryItem = {
  name: string;
  slug: string;
};

/* ✅ User Type (basic safe version) */
type UserType = {
  id: string;
  email?: string;
} | null;

/* ✅ Props Type */
type Props = {
  prefix: string;
  categories: CategoryItem[];
  currentLang: string;
  user: UserType;
  role: string | null;
};

export default function MobileMenu({
  prefix,
  categories,
  currentLang,
  user,
  role
}: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  //   console.log(user);

  return (
    <>
      {/* Hamburger Button */}
      <button onClick={toggle} className="md:hidden">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-white border-t shadow-md md:hidden z-50">
          <div className="flex flex-col p-4 gap-4 text-sm font-medium">
            {/* Home */}
            <Link href={prefix || "/"} onClick={toggle}>
              {currentLang === "en" ? "Home" : "होम"}
            </Link>

            {/* Categories */}
            {categories?.map((cat) => (
              <Link
                key={cat.slug}
                href={`${prefix}/${cat.slug}`}
                onClick={toggle}
                className="capitalize"
              >
                {cat.name}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t pt-3" />

            {/* Auth */}
            {!user && (
              <Link
                href="/login"
                onClick={toggle}
                className="bg-green-600 text-white px-3 py-2 rounded text-center"
              >
                Login
              </Link>
            )}

            {user && (
              <>
                {role === "reader" && (
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
        </div>
      )}
    </>
  );
}
