import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    const data = await request.json();
    const res = await prisma.event.create({
      data: {
        organizerId: user?.id,
        ...data,
      },
    });
    return NextResponse.json(res);
  } else {
    return NextResponse.error();
  }
}
