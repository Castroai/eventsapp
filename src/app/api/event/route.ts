import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { uploadImage } from "@/app/lib/gstorage";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
const schema = z.object({
  eventName: z.string().min(100),
});
export async function POST(request: Request) {
  const formData = await request.formData();
  const session = await getServerSession(authOptions);
  console.log(formData);
  try {
    const data = schema.parse({
      eventName: formData.get("eventName"),
    });
    return NextResponse.json({ status: "good" });
  } catch (error) {
    const Err = error as ZodError;
    const obj = Err.errors.map((er) => {
      return {
        [`${er.path}`]: er.message,
      };
    });
    console.log();
    return NextResponse.json(obj, { status: 500 });
  }
  //   if (session?.user) {
  //     const createSlug = (name: string) => {
  //       // TODO: Better Slug
  //       // Convert the name to lowercase and replace spaces with hyphens
  //       const slug = name.toLowerCase().replace(/\s+/g, "-");
  //       return slug;
  //     };
  //     let uploadUrl: string | undefined;
  //     if (formData.has("file")) {
  //       const file = formData.get("file") as File;
  //       uploadUrl = await uploadImage(file);
  //     }
  //     const slug = createSlug(data.eventName);
  //     const query: Prisma.EventCreateArgs = {
  //       data: {
  //         organizerId: session.user.id,
  //         date: new Date(data.date),
  //         description: data.description,
  //         eventName: data.eventName,
  //         lat: parseFloat(data.latitude),
  //         long: parseFloat(data.longitude),
  //         location: data.location,
  //         imgUrl: uploadUrl,
  //         slug: slug,
  //       },
  //     };
  //     try {
  //       await prisma.event.create(query);
  //     } catch (error) {
  //       const err = error as Error;
  //       return { message: err.message };
  //     }
  //   }
}
