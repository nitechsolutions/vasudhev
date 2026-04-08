import { BlogPost } from "@/lib/types/blog.types";
import Image from "next/image";
// import verifiedIcon from "@/assets/verified.png";


interface Props {
  post: BlogPost;
}

export default function BlogAuthor({ post }: Props) {
  const author = post.author;

  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src={author?.profile_url || "/default-avatar.png"}
        className="h-12 w-12 rounded-full"
      />

      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">
            {author?.full_name}
          </p>

          {/* {author?.role === "author" && (
            <Image src={verifiedIcon} width={18} height={18} alt="verified" />
          )} */}
        </div>

        <p className="text-xs text-gray-500">
          {new Date(post.published_at).toDateString()}
        </p>
      </div>
    </div>
  );
}