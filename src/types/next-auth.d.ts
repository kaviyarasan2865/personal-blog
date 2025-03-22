// import NextAuth from "next-auth";
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    authProvider: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      authProvider: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    email?: string;
    authProvider?: string;
  }
}