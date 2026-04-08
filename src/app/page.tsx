// app/(default)/page.tsx

import { getHomeData } from "@/lib/service/homeData.service";
import FeaturedSection from "./components/home/FeaturedSection";
import CategorySection from "./components/home/CategorySection";
import { getDefaultLanguage } from "@/lib/service/language.service";


export default async function Home() {

  const lang = await getDefaultLanguage();
  console.log("homelang", lang.code);

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