import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

// Extend the built-in session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: Role;
    };
  }
  
  interface User {
    id: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}

// Helper function to get the session on the server side
export const getAuthSession = () => getServerSession(authOptions);

// Helper function to get the token from a request in middleware
export const getAuthToken = (req: NextRequest) => {
  return getToken({ req, secret: process.env.NEXTAUTH_SECRET });
};

// Export auth-related functions for client components
export { signIn, signOut } from "next-auth/react";
export { useSession } from "next-auth/react";

