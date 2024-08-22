import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

type User = DefaultSession["user"] & {
  role?: string;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: User;
    expires: DefaultSession["expires"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: User
  }
}
