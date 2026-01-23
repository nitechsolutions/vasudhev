import { NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/getUserFromRequest";

export async function GET() {
  const user = await getUserFromCookies(); // ✅ await + no args

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json(user); // return user directly
}
