import { NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/getUserFromRequest";

export async function GET(req: Request) {
  const user = getUserFromCookies(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}
