"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  children,
  exact = false,
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`pb-1 transition-colors ${
        isActive
          ? "text-red-600 border-b-2 border-red-600"
          : "hover:text-red-600"
      }`}
    >
      {children}
    </Link>
  );
}