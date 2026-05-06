// app/(default)/page.tsx

import { getHomeData } from "@/lib/service/homeData.service";
import FeaturedSection from "./components/home/FeaturedSection";
import CategorySection from "./components/home/CategorySection";
import { getDefaultLanguage } from "@/lib/service/language.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://vasudhev.com"),
  title: {
    default: "Vasudhev - Money Investment Guideline, Earn Money, Tech, Auto & Finance Blogs in Hindi",
    template: "%s | Vasudhev",
  },
  description:
    "Vasudhev.com पर पढ़ें Tech, Auto और Finance से जुड़े आसान और उपयोगी ब्लॉग। Electric Cars, Bikes, SIP Investment, Loans और बहुत कुछ हिंदी में।",

   keywords: [
    "vasudhev",
    "hindi blog",
    "tech blog hindi",
    "auto blog india",
    "finance blog hindi",
    "investment blog hindi",
    "Saving money blog hindi",
    "electric car vs petrol car",
    "best bikes under 1 lakh",
    "best bikes under 2 lakh",
    "best laptops",
    "best smartphones",
    "online earn money"
  ],

  authors: [{ name: "Vasudhev Team" }],
  creator: "Vasudhev",
  publisher: "Vasudhev",

  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: "https://vasudhev.com",
    siteName: "Vasudhev",
    title: "Vasudhev - Money Investment Guideline, Earn Money, Tech, Auto & Finance Blogs in Hindi",
    description:
      "Tech, Auto और Finance से जुड़े ब्लॉग हिंदी में। आसान भाषा में समझें investment, gadgets और vehicles.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vasudhev Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vasudhev Blog",
    description:
      "Tech, Auto और Finance ब्लॉग हिंदी में पढ़ें।",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://vasudhev.com",
  },
};


export default async function Home() {

  const lang = await getDefaultLanguage();
  // console.log("homelang", lang.code);

  const { featured, trending, categoryData } =
    await getHomeData(lang.code);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6  grid lg:grid-cols-3 gap-8">
      <FeaturedSection posts={featured} lang={lang.code} defaultLang={lang.code} />

      <CategorySection
        title="Trending"
        emoji="🔥"
        posts={trending}
      />

      {categoryData.map((cat) => (
        <CategorySection
          key={cat.slug}
          emoji={cat.emoji}
          title={cat.name}
          posts={cat.posts}
        />
      ))}
    </main>
  );
}