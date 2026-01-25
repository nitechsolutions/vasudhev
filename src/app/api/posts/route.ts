// app/api/posts/route.ts
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import "@/models/User";
import Post, { IPost } from "@/models/Post";
import { verifyToken } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { cookies } from "next/headers";

/* ---------------------------------------------
   GET POSTS (pagination + filter)
---------------------------------------------- */
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 6);
    const type = searchParams.get("type"); // featured | trending
    const category = searchParams.get("category");

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (type === "featured") filter.featured = true;
    if (type === "trending") filter.trending = true;
    if (category) filter.category = category;

    const total = await Post.countDocuments(filter);

    const posts: IPost[] = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name");

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* ---------------------------------------------
   CREATE POST (Writer / Admin)
---------------------------------------------- */
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    /* ---------- AUTH ---------- */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user: { id: string; role: string };
    try {
      user = verifyToken(token) as any;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!["writer", "admin"].includes(user.role)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    /* ---------- FORM DATA ---------- */
    const form = await req.formData();

    const title = form.get("title") as string;
    const slug = form.get("slug") as string;
    const category = form.get("category") as string;
    const description = form.get("description") as string;

    const featured = form.get("featured") === "true";
    const trending = form.get("trending") === "true";
    const tags: string[] = JSON.parse((form.get("tags") as string) || "[]");

    const imageFile = form.get("image") as File | null;

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    /* ---------- CLOUDINARY ---------- */
    let imageURL = "";

    if (imageFile && imageFile.name) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploaded: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "tgl_blog_images" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageURL = uploaded.secure_url;
    }

    /* ---------- DB SAVE ---------- */
    const newPost = await Post.create({
      title,
      slug,
      category,
      description,
      featured,
      trending,
      image: imageURL,
      tags,
      author: user.id,
    });

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
