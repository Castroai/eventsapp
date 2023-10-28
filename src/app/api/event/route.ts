import { authOptions } from "@/app/lib/auth";
import { uploadImage } from "@/app/lib/gstorage";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    const formData = await request.formData();
    const date = formData.get("date") as string;
    const eventName = formData.get("eventName") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const lat = formData.get("lat") as string;
    const long = formData.get("long") as string;
    let uploadUrl: string | undefined;
    if (formData.has("file")) {
      const file = formData.get("file") as File;
      uploadUrl = await uploadImage(file);
    }

    const res = await prisma.event.create({
      data: {
        organizerId: user!.id,
        date,
        description,
        eventName,
        lat: parseFloat(lat),
        long: parseFloat(long),
        location,
        imgUrl: uploadUrl,
      },
    });
    return NextResponse.json(res);
  } else {
    return NextResponse.error();
  }
}
