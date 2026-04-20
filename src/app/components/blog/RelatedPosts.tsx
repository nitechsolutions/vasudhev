import { PostItem } from "@/lib/types/post";
import Link from "next/link";

export default function RelatedPosts({ posts }: any) {
  if (!posts.length) return null;

  return (
    <>
      <h3 className=" text-xl font-bold border-b border-gray-300">
        Related Posts
      </h3>

      <div className="grid md:grid-cols-4 gap-6 mt-4 ">
        {posts.map((p: PostItem) => (
          <Link
            key={p.slug}
            href={`/${p.category}/${p.slug}`}
            className="shadow p-2 hover:text-red-500 active:text-red-500 "
          >
            <img
              src={p.image}
              alt={p.slug}
              className="rounded mb-2 w-full"
            />
            <h4 className="font-semibold">{p.title}</h4>
          </Link>
        ))}
      </div>
    </>
  );
}
