import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Create the NextAuth.js handler with our configuration options
const handler = NextAuth(authOptions);

// Export the handler as GET and POST methods
export { handler as GET, handler as POST };
