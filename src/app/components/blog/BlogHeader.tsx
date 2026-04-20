import { BlogPost } from "@/lib/types/blog.types";
import Link from "next/link";

 interface propsType {
  lang: string;
  post: BlogPost;
}

export default function BlogHeader({ post, lang }: propsType) {
  return (
    <>
      <nav className="text-sm text-gray-500 mb-4">
        <Link href={`/`} className="hover:text-red-500 active:text-red-500">home</Link> /{" "}
        <Link href={`/${post.category}`} className="hover:text-red-500 active:text-red-500">{post.category}</Link> /{" "}
        <span className="text-black">{post.slug}</span>
      </nav>

      <h1 className="lg:text-3xl text-2xl font-bold mb-4">{post.title}</h1>
    </>
  );
}
