"use client";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex justify-between items-center mt-10">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="bg-orange-500 active:bg-orange-600 cursor-pointer disabled:bg-gray-300 text-white px-5 py-2 rounded"
      >
        Previous
      </button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="bg-orange-500 active:bg-orange-600 cursor-pointer disabled:bg-gray-300 text-white px-5 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
}
