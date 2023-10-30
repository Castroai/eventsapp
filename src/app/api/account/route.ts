// Set your secret key. Remember to switch to your live secret key in production.
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { URL } from "url";
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(
  "sk_test_51Kxci9GZqFfSTHOMXLz8jrK2e2uoByeZmo2e5yPcZ1otfBdDwr0aRTwohKI6nE11hW0PlsNwZlqTYy1DGfYXdzpz0057zGZdj1"
);

export async function POST(request: Request) {
  const parsedUrl = new URL(request.url);
  const baseUrl = parsedUrl.origin;

  const session = await getServerSession(authOptions);
  if (session && session.user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (prismaUser && prismaUser.stripeAccountId) {
      const accountLink = await stripe.accountLinks.create({
        account: prismaUser.stripeAccountId,
        refresh_url: "https://example.com/reauth",
        return_url: `${baseUrl}/dashboard/account`,
        type: "account_onboarding",
      });
      console.log("ACCOUNTLINK", accountLink);
      return NextResponse.json(accountLink);
    } else {
      const account = await stripe.accounts.create({
        type: "standard",
      });
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          stripeAccountId: account.id,
        },
      });
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: "https://example.com/reauth",
        return_url: "http://localhost:3000/dashboard/account",
        type: "account_onboarding",
      });
      console.log("ACCOUNTLINK", accountLink);
      return NextResponse.json(accountLink);
    }
  } else {
    return NextResponse.error();
  }
}
