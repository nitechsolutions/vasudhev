import {
  getCategoryPosts,
  getTrendingPosts,
} from "@/lib/service/category.service";
import CategoryGrid from "../../components/category/CategoryGrid";
import Pagination from "../../components/category/Pagination";
import { getDefaultLanguage } from "@/lib/service/language.service";
import CategorySection from "../../components/home/CategorySection";
import { ArrowBigRight } from "lucide-react";
const POSTS_PER_PAGE = 8;

export const revalidate = 60;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;

  const { page } = await searchParams;

  const language = await getDefaultLanguage();

  const lang = language.code;

  const currentPage = Number(page) || 1;

  const { posts, totalPages } = await getCategoryPosts({
    lang,
    category,
    page: currentPage,
    limit: POSTS_PER_PAGE,
  });

  //   console.log(category);

  const trending = await getTrendingPosts(lang);

  //   if (!posts.length) return <p>This category has not any post</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 ">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* MAIN */}
        <div className="lg:col-span-2">
          {/* <CategoryHeader category={category} /> */}
          <h1
            className={`text-3xl font-bold mb-8 capitalize border-b-2 pb-2 flex gap-2 items-center text-orange-600`}
          >
            {category} {<ArrowBigRight strokeWidth={3} />}
          </h1>
          <CategoryGrid posts={posts} lang={lang} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            lang={lang}
            category={category}
          />
        </div>

        {/* SIDEBAR */}
        <aside className="hidden lg:block">
          <CategorySection posts={trending} emoji="🔥" title="Trending" />
        </aside>
      </div>
    </div>
  );
}
