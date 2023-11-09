import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { uploadImage } from "@/app/lib/gstorage";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
const schema = z.object({
  eventName: z.string().min(1),
  description: z.string().min(1),
  progressStep: z.string(),
});
const createSlug = (name: string) => {
  // TODO: Better Slug
  // Convert the name to lowercase and replace spaces with hyphens
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return slug;
};
export async function POST(request: Request) {
  const formData = await request.formData();
  const session = await getServerSession(authOptions);
  console.log(formData);
  try {
    const data = schema.parse({
      eventName: formData.get("eventName"),
      progressStep: formData.get("progressStep"),
      description: formData.get("description"),
    });
    if (session?.user) {
      let uploadUrl: string | undefined;
      if (formData.has("file")) {
        const file = formData.get("file") as File;
        uploadUrl = await uploadImage(file);
      }
      const slug = createSlug(data.eventName);
      const query: Prisma.EventCreateArgs = {
        data: {
          organizerId: session.user.id,
          slug: slug,
          eventName: data.eventName,
          description: data.description,
          imgUrl: uploadUrl,
          progressStep: parseInt(data.progressStep),
        },
      };
      try {
        await prisma.event.create(query);
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
    }
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
}
