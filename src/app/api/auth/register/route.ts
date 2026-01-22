import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

interface RegisterBody {
  name?: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = (await req.json()) as RegisterBody;
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email & Password required" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email }).lean();
    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "reader",
    });

    return NextResponse.json(
      {
        message: "Registered successfully",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
