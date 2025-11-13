import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ✅ 1. Ensure both fields exist
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter both email and password.");
        }

        // ✅ 2. Find user by email (not by username)
        const user = await prisma.Compte.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No account found with this email.");
        }

        // ✅ 3. Compare entered password with stored hashed password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.Password
        );

        if (!isValid) {
          throw new Error("Invalid password.");
        }

        // ✅ 4. Return user data for session
        return {
          id: user.id,
          name: user.fullName || user.User,
          email: user.email,
          role: user.role || "CLIENT",
        };
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
