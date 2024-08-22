import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

import { ObjectId } from "mongoose";

type Credentials = {
  email: string;
  password: string;
};

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  role: string;
  password: string;
}


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials as Credentials;

        try {
          await connectMongoDB();
          const user = (await User.findOne({ email })) as User | null;

          if (!user) {
            return null; // Or throw an error if you want to handle it in UI
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null; // Or throw an error if you want to handle it in UI
          }

          const newUser = {
            name: user.name,
            email: user.email,
            role: user.role,
            id: user._id.toString(),
          };

          return newUser;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Custom sign-in page
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user;
      return token;
    },
    session: ({ session, token }) => {
      if (token.user) session.user = token.user;
      return session;
    },
    
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
