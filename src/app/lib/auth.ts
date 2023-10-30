import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token }) {
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        // @ts-ignore
        // TODO:Fix this type
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
