import Link from "next/link";
import Image from "next/image";
import { getCategoriesByLang } from "@/lib/service/category.service";

type CategoryItem = {
  name: string;
  slug: string;
};

export default async function Footer({ lang }: { lang: string }) {
  const currentLang = lang;
  /* ✅ Fetch categories (language based) */
  const categories = await getCategoriesByLang(currentLang);

  const prefix = currentLang === "hi" ? "" : `/${currentLang}`;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-gray-800 fixed bottom-0 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-10">
        {/* ✅ ABOUT */}
        <div>
          <Link href={prefix || "/"}>
            <Image
              src="/logo.png"
              alt="Vasudhev"
              width={140}
              height={50}
              className="mb-3"
            />
          </Link>

          <p className="text-sm leading-6">
            Vasudhev is a blog platform covering tech, finance, auto and health
            insights to help users make better decisions.
          </p>
        </div>

        {/* ✅ CATEGORIES (SEO BOOST) */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            {currentLang === "hi" ? "श्रेणियाँ" : "Categories"}
          </h3>

          <ul className="space-y-2 text-sm">
            {categories?.map((cat: CategoryItem) => (
              <li key={cat.slug}>
                <Link
                  href={`${prefix}/${cat.slug}`}
                  className="hover:text-red-600 transition"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ IMPORTANT PAGES (AdSense MUST) */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            {currentLang === "hi" ? "महत्वपूर्ण लिंक" : "Important Links"}
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`${prefix}/about`} className="hover:text-red-600">
                {currentLang === "hi" ? "हमारे बारे में" : "About Us"}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/contact`} className="hover:text-red-600">
                {currentLang === "hi" ? "संपर्क करें" : "Contact Us"}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/privacy-policy`}
                className="hover:text-red-600"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/terms`} className="hover:text-red-600">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ MONETIZATION (VERY IMPORTANT) */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            {currentLang === "hi" ? "अवसर" : "Opportunities"}
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`${prefix}/advertise`} className="hover:text-red-600">
                {currentLang === "hi" ? "विज्ञापन करें" : "Advertise With Us"}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/guest-post`} className="hover:text-red-600">
                {currentLang === "hi" ? "गेस्ट पोस्ट" : "Guest Post"}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/affiliate-disclosure`}
                className="hover:text-red-600"
              >
                {currentLang === "hi"
                  ? "एफिलिएट खुलासा"
                  : "Affiliate Disclosure"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ BOTTOM */}
      <div className="border-t border-gray-400 text-center text-sm py-2">
        © {year} Vasudhev.{" "}
        {currentLang === "hi" ? "सर्वाधिकार सुरक्षित" : "All Rights Reserved"}
      </div>
    </footer>
  );
}
