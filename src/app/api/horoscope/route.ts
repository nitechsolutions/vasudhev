import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import Horoscope from "@/models/Horoscope";
import { cookies } from "next/headers";

/* ================================
   Types
================================ */

interface HoroscopePayload {
  zodiac: string;
  content_hi: string;
  date?: string;
}

/* ================================
   CREATE / UPDATE (ADMIN ONLY)
================================ */

export async function POST(req: Request) {
  await connectDB();

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyToken(token) as {
      id: string;
      role: "admin" | "writer" | "reader";
    };

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = (await req.json()) as HoroscopePayload;
    const { zodiac, content_hi, date } = body;

    if (!zodiac || !content_hi) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const today =
      date || new Date().toISOString().split("T")[0];

    const horoscope = await Horoscope.findOneAndUpdate(
      { zodiac, date: today },
      { content_hi },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      message: "Horoscope saved successfully",
      horoscope,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* ================================
   GET HOROSCOPE (PUBLIC)
================================ */

export async function GET(req: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const zodiac = searchParams.get("zodiac");
    const date =
      searchParams.get("date") ||
      new Date().toISOString().split("T")[0];

    if (!zodiac) {
      return NextResponse.json(
        { error: "zodiac is required" },
        { status: 400 }
      );
    }

    const horoscope = await Horoscope.findOne({
      zodiac,
      date,
    }).lean();

    return NextResponse.json(horoscope || null);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
