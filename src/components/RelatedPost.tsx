import type { Post } from "@/types/post";

export default function RelatedPost({
  posts,
  currentSlug,
}: {
  posts: Post[];
  currentSlug: string;
}) {
    console.log(posts.length);
    
  return (
    <div className="space-y-4">
        {
            posts.length < 2 && <p>कोई भी संबंधित खबर उपलब्ध नहीं है|</p>
        }
      {posts
        .filter((p) => p.slug !== currentSlug)
        .slice(0, 4)
        .map((item) => (
          <a
            key={item._id}
            href={`/${item.slug}`}
            className="flex gap-3"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div>
              <p className="font-semibold active:text-orange-600">
                {item.title}
              </p>
            </div>
          </a>
        ))}
    </div>
  );
}
