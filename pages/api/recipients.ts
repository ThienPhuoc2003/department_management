import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '../../lib/mongodb';
import User from '../../models/user';

interface Recipient {
  _id: string;
  name: string;
  role: string;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<Recipient[] | { message: string }>
) {
  // Connecting to MongoDB
  try {
    await connectMongoDB();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return res.status(500).json({ message: 'Failed to connect to MongoDB' });
  }

  // Fetching recipients with the role 'truongBoMon'
  try {
    const recipients = await User.find({ role: 'truongBoMon' }, '-password').lean() as Recipient[];
    res.status(200).json(recipients);
  } catch (error) {
    console.error("Failed to fetch recipients:", error);
    res.status(500).json({ message: 'Failed to fetch recipients' });
  }
}
