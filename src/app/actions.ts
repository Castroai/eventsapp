"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function searchEvents(prevData: any, formData: FormData) {
  const schema = z.object({
    location: z.string().min(1),
    latitude: z.string().min(1),
    longitude: z.string().min(1),
  });
  const data = schema.parse({
    location: formData.get("location"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  });
  console.log(data);
  try {
    revalidatePath("/");
    return { message: `Hello` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}
