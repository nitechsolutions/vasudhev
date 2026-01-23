import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post, { IPost } from "@/models/Post";

/* ---------------------------------------------
   GET POST BY HINDI SLUG
---------------------------------------------- */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  try {
    // ✅ FIX: await params
    const { slug } = await params;

    console.log("Slug received:", slug);

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is missing" },
        { status: 400 }
      );
    }

    const post: IPost | null = await Post.findOne({
      slug: slug,
    }).populate("author", "name email");

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // ✅ Increment views safely
    post.views = (post.views ?? 0) + 1;
    await post.save();

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
