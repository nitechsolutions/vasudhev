import { notFound } from "next/navigation";
import BlogHeader from "@/app/components/blog/BlogHeader";
import BlogAuthor from "@/app/components/blog/BlogAuthor";
import BlogShare from "@/app/components/blog/BlogShare";
import BlogContent from "@/app/components/blog/BlogContent";
import RelatedPosts from "@/app/components/blog/RelatedPosts";
import { getBlogData, getRelatedPosts } from "@/lib/service/blog.service";
import { getTrendingPosts } from "@/lib/service/category.service";
import { getDefaultLanguage } from "@/lib/service/language.service";
import { Gem } from "lucide-react";
import Link from "next/link";

interface propsItems {
  slug: string;
  category: string;
}

interface Props {
  params: propsItems;
}

export const revalidate = 60;

/* -------- METADATA -------- */
export async function generateMetadata({ params }: Props) {
  const language = await getDefaultLanguage();

  const lang = language.code;
  const { slug } = await params;

  const post = await getBlogData(slug, lang);

  return {
    title: post?.meta_title || post?.title,
    description: post?.meta_description || "",
  };
}

/* -------- PAGE -------- */
export default async function BlogPage({ params }: Props) {
  const { slug, category } = await params;

  const language = await getDefaultLanguage();

  const lang = language.code;

  const post = await getBlogData(slug, lang);

  if (!post || post.category !== category) return notFound();

  const related = await getRelatedPosts(category, lang, slug);
  const trending = await getTrendingPosts(lang);

  const url = `https://yoursite.com/${category}/${slug}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 ">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* MAIN */}
        <div className="lg:col-span-2">
          <BlogHeader post={post} lang={lang} />
          <BlogAuthor post={post} />
          <BlogShare url={url} />
          <BlogContent post={post} />
        </div>

        {/* SIDEBAR */}
        <aside className="hidden lg:block">
          <section>
            <div>
              <h2 className="text-xl font-bold mb-2 capitalize flex items-center justify-between gap-2 border-b-2 pb-2 border-orange-400 text-orange-600">
                🔥 Trending
                <span className="">
                  {<Gem size={20} />}
                </span>
              </h2>
            </div>

            {trending.map((post) => (
                <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="flex gap-3 mb-3">
                  <img
                    src={post.image}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <p className="hover:text-red-600 transition font-semibold">
                    {post.title}
                  </p>
                </Link>
              )
            )}
          </section>
        </aside>
      </div>

      <RelatedPosts posts={related} lang={lang} />
    </div>
  );
}
