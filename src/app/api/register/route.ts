import { connect } from "http2";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from 'bcryptjs';

// Correctly named export for handling POST requests
export async function POST(req: NextRequest) {
  try {
    // Destructure the body directly; ensure your client sends a JSON payload
    const { name, email, password, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);  // 
    await connectMongoDB();
    await User.create({name,email,password:hashedPassword,role});

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);

    return NextResponse.json({
      message: "An error occurred while registering the user",
    });
  }
}
