import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post, { IPost } from "@/models/Post";
import { getUserFromCookies } from "@/lib/getUserFromRequest";
import { requireOwnerOrAdmin } from "@/lib/roles";
import cloudinary from "@/lib/cloudinary";

/* =========================================================
   GET POST BY ID
========================================================= */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const post: IPost | null = await Post.findById(id);

  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

/* =========================================================
   UPDATE POST
========================================================= */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const user = await getUserFromCookies(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const post: IPost | null = await Post.findById(id);
  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  if (!requireOwnerOrAdmin(user, post)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const form = await req.formData();

  const title = String(form.get("title") || "");
  const slug = String(form.get("slug") || "");
  const category = String(form.get("category") || "");
  const description = String(form.get("description") || "");

  const featured = form.get("featured") === "true";
  const trending = form.get("trending") === "true";

  const tags = JSON.parse(
    String(form.get("tags") || "[]")
  ) as string[];

  const newImage = form.get("image") as File | null;

  let imageURL: string = post.image || "";

  /* ---------- Cloudinary Upload ---------- */
  if (newImage && newImage.size > 0) {
    const buffer = Buffer.from(await newImage.arrayBuffer());

    const uploaded = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "blog_images" },
            (err, result) => {
              if (err || !result) reject(err);
              else resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    imageURL = uploaded.secure_url;
  }

  /* ---------- Update Fields ---------- */
  post.title = title;
  post.slug = slug;
  post.category = category;
  post.description = description;
  post.featured = featured;
  post.trending = trending;
  post.tags = tags;
  post.image = imageURL;

  await post.save();

  return NextResponse.json({
    message: "Updated successfully",
    post,
  });
}

/* =========================================================
   DELETE POST
========================================================= */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const user = await getUserFromCookies(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const post: IPost | null = await Post.findById(id);
  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  if (!requireOwnerOrAdmin(user, post)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  await post.deleteOne();

  return NextResponse.json({
    message: "Deleted successfully",
  });
}
