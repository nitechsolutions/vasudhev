export default function BlogShare({ url }: { url: string }) {
  return (
    <div className="flex gap-3 mb-6">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
      >
        Facebook
      </a>
      <a
        href={`https://wa.me/?text=${url}`}
        target="_blank"
        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
      >
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        className="px-3 py-1 bg-black text-white rounded text-sm"
      >
        Twitter
      </a>
    </div>
  );
}
