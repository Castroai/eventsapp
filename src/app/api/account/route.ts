import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function POST(request: Request) {
  const parsedUrl = new URL(request.url);
  const baseUrl = parsedUrl.origin;

  const session = await getServerSession(authOptions);
  console.log(`SESSION: ${session}`);
  if (session && session.user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    console.log(`prismaUser`);
    if (prismaUser && prismaUser.stripeAccountId) {
      console.log(`stripeAccountId`);

      const accountLink = await stripe().accountLinks.create({
        account: prismaUser.stripeAccountId,
        refresh_url: `${baseUrl}/dashboard/account`,
        return_url: `${baseUrl}/dashboard/account`,
        type: "account_onboarding",
      });
      console.log("ACCOUNTLINK", accountLink);
      return NextResponse.json(accountLink);
    } else {
      const account = await stripe().accounts.create({
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
      const accountLink = await stripe().accountLinks.create({
        account: account.id,
        refresh_url: `${baseUrl}/dashboard/account`,
        return_url: `${baseUrl}/dashboard/account`,
        type: "account_onboarding",
      });
      console.log("ACCOUNTLINK", accountLink);
      return NextResponse.json(accountLink);
    }
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
