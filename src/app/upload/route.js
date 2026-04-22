import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");

  // ⚠️ Replace this with Cloudinary / S3 upload
  const buffer = Buffer.from(await file.arrayBuffer());

  // fake URL (replace with real upload)
  const url = "https://via.placeholder.com/300";

  return NextResponse.json({
    success: 1,
    file: {
      url,
    },
  });
}