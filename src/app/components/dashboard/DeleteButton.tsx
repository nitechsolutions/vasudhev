"use client"

import { deletePost } from "@/lib/service/delete.post.query";
// import { useRouter } from "next/navigation";
// import { deletePost } from "@/lib/service/dashboard.service";

export default function DeleteButton({ postId }: { postId: string }) {
 

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const res = await deletePost(postId);

    if (res.success) {
      alert(`Post deleted ID ${postId}`);
    //   router.refresh();
    } else {
      alert(res.error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 text-sm"
    >
      Delete
    </button>
  );
}