import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const session = await getServerSession(authOptions);
  if (params.has("event")) {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(params.get("event") as string),
        AND: {
          organizerId: session?.user?.id,
        },
      },
    });
    return NextResponse.json(event, { status: 200 });
  } else {
    return NextResponse.json({ err: "" }, { status: 500 });
  }
}
