"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authOptions } from "./lib/auth";
import prisma from "./lib/db";
import { stripe } from "./lib/stripe";
import { Event, Prisma } from "@prisma/client";
import { uploadImage } from "./lib/gstorage";

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
  try {
    revalidatePath("/");
    return { message: `Hello` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export const createNewEvent = async (formData: FormData): Promise<Event> => {
  "use server";
  const session = await getServerSession(authOptions);
  console.log(formData);

  const schema = z.object({
    eventName: z.string().min(1),
    location: z.string().min(1),
    latitude: z.string().min(1),
    longitude: z.string().min(1),
    date: z.string().min(1),
    description: z.string().min(1),
  });
  const data = schema.parse({
    eventName: formData.get("eventName"),
    location: formData.get("location"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    date: formData.get("date"),
    description: formData.get("description"),
  });
  if (session?.user) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });
      const createSlug = (name: string) => {
        // Convert the name to lowercase and replace spaces with hyphens
        const slug = name.toLowerCase().replace(/\s+/g, "-");
        return slug;
      };
      let uploadUrl: string | undefined;
      if (formData.has("file")) {
        const file = formData.get("file") as File;
        uploadUrl = await uploadImage(file);
      }
      const slug = createSlug(data.eventName);
      const query: Prisma.EventCreateArgs = {
        data: {
          organizerId: user!.id,
          date: new Date(data.date),
          description: data.description,
          eventName: data.eventName,
          lat: parseFloat(data.latitude),
          long: parseFloat(data.longitude),
          location: data.longitude,
          imgUrl: uploadUrl,
          slug: slug,
        },
      };
      return await prisma.event.create(query);
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("No User");
  }
};

export async function fetchOrCreateStripeConnectLink(formData: FormData) {
  const baseUrl = "http://localhost:3000";
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (prismaUser?.stripeAccountId) {
      const accountLink = await stripe().accountLinks.create({
        account: prismaUser.stripeAccountId,
        refresh_url: `${baseUrl}/dashboard/account`,
        return_url: `${baseUrl}/dashboard/account`,
        type: "account_onboarding",
      });
      redirect(accountLink.url);
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
      redirect(accountLink.url);
    }
  } else {
    throw new Error("User Not Authenicated");
  }
}
