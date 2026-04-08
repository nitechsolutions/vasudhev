import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  lang,
  category,
}: any) {
  return (
    <div className="flex justify-center gap-3 mt-10">
      {currentPage > 1 && (
        <Link
          href={`/${lang}/${category}?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={`/${lang}/${category}?page=${page}`}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={`/${lang}/${category}?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
}