import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    authProvider?: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    authProvider?: string;
  }
}
