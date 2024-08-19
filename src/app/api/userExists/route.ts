import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const {email} = await req.json();
    const user = await User.findOne({email: email}).select('_id');
      return NextResponse.json({user});

    }catch (error) {

  }
}
