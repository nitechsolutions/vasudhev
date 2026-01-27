import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromCookies } from "@/lib/getUserFromRequest";

export async function GET(req: Request) {
  await connectDB();

  const user = await getUserFromCookies();

  if (!user || user.role !== "admin") {
    console.log(user.role);
    
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const users = await User.find()
    .select("-password")
    .lean();

  return NextResponse.json(users);
}
