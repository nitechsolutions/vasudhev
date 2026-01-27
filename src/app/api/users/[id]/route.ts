import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromCookies } from "@/lib/getUserFromRequest";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ id, not slug
) {
  await connectDB();

  const admin = await getUserFromCookies(req);
  const { id } = await params; // ✅ matches folder name

  if (!admin || admin.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const { role } = await req.json();

  const updated = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );

  return NextResponse.json(updated);
}
