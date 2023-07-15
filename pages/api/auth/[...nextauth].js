import NextAuth from "next-auth";
import prisma from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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
        const user = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!user || user.password !== credentials.password) {
          return null;
        }

        return user;
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
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
