import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import prisma from "./db";
import bcrypt from "bcrypt";

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
  return new Promise((resolve) => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
      resolve(res);
    });
  });
};

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
    CredentialsProvider({
      name: "sign in",
      credentials: {
        email: {
          type: "email",
          label: "email",
          placeholder: "email@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        console.log(credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !(await compare(credentials.password, user.password!))) {
          return null;
        }
        return user;
      },
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
  pages: {
    signIn: "/login",
  },
};
