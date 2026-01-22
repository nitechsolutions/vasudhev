import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromCookies } from "@/lib/getUserFromRequest";

interface Params {
  params: {
    id: string;
  };
}

interface UpdateUserBody {
  role: "reader" | "writer" | "admin";
}

export async function PUT(req: Request, { params }: Params) {
  await connectDB();

  const admin = getUserFromCookies(req);

  if (!admin || admin.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const body = (await req.json()) as UpdateUserBody;
  const { role } = body;

  if (!role) {
    return NextResponse.json(
      { error: "Role is required" },
      { status: 400 }
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    { role },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedUser);
}
