// Set your secret key. Remember to switch to your live secret key in production.
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(
  "sk_test_51Kxci9GZqFfSTHOMXLz8jrK2e2uoByeZmo2e5yPcZ1otfBdDwr0aRTwohKI6nE11hW0PlsNwZlqTYy1DGfYXdzpz0057zGZdj1"
);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        StripeAccount: {},
      },
    });
    if (user && user.StripeAccount) {
      console.log("User already has account");
      return NextResponse.error();
    }
    const account = await stripe.accounts.create({
      type: "standard",
    });
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        stripeAccountId: {
          set: account.id,
        },
      },
    });
    const accountLink = await stripe.accountLinks.create({
      account: "acct_1O6MdLGf4M12Rncx",
      refresh_url: "https://example.com/reauth",
      return_url: "http://localhost:3000/dashboard/account",
      type: "account_onboarding",
    });
    console.log("ACCOUNTLINK", accountLink);
    return NextResponse.json(accountLink);
  } else {
    return NextResponse.error();
  }
}
