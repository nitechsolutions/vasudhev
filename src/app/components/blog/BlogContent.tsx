import { BlogPost } from "@/lib/types/blog.types";

interface Props {
  post: BlogPost;
}

export default function BlogContent({ post }: Props) {
  return (
    <>
      {post.image && (
        <img
          src={post.image}
          alt={post.slug}
          className="w-full rounded "
        />
      )}
      <div
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </>
  );
}
