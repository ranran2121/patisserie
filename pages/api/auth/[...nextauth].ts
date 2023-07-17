import NextAuth, { NextAuthOptions } from "next-auth";
import { prisma } from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        let user;
        if (credentials?.email) {
          user = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            return null;
          }

          return user as any;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...user,
          ...token,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;

      const user = await prisma.admin.findUnique({
        where: { email: session.user.email },
      });

      if (!user) throw new Error("User not found in the database.");

      return { ...session };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
