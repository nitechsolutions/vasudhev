import { BlogPost } from "@/lib/types/blog.types";


interface Props {
  post: BlogPost;
}


export default function BlogContent({ post }: Props) {
  return (
    <>
      {post.image && (
        <img src={post.image} className="w-full rounded" />
      )}
      <div
        className="prose lg:prose-lg "
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </>
  );
}