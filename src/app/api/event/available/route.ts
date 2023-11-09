import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  eventName: z.string().min(1),
});
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log(formData);
    const data = schema.parse({
      eventName: formData.get("eventName"),
    });
    console.log(data.eventName);
    await prisma.event.findUniqueOrThrow({
      where: {
        eventName: data.eventName,
      },
    });
    return NextResponse.json({ isAvailable: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isAvailable: true }, { status: 200 });
  }
}
