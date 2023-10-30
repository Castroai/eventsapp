import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (prismaUser && prismaUser.stripeAccountId) {
      const status = await stripe().accounts.retrieve(
        prismaUser.stripeAccountId
      );
      return NextResponse.json(status);
    } else {
      return NextResponse.error();
    }
  } else {
    return NextResponse.error();
  }
}
