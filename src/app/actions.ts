"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authOptions } from "./lib/auth";
import prisma from "./lib/db";
import { stripe } from "./lib/stripe";
import { Prisma } from "@prisma/client";
import { uploadImage } from "./lib/gstorage";

export const createNewEvent = async (prevState: any, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const schema = z.object({
    eventName: z.string().min(1),
    location: z.string(),
    latitude: z.string(),
    longitude: z.string(),
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
    const createSlug = (name: string) => {
      // TODO: Better Slug
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
        organizerId: session.user.id,
        date: new Date(data.date),
        description: data.description,
        eventName: data.eventName,
        lat: parseFloat(data.latitude),
        long: parseFloat(data.longitude),
        location: data.location,
        imgUrl: uploadUrl,
        slug: slug,
      },
    };
    try {
      await prisma.event.create(query);
    } catch (error) {
      const err = error as Error;
      return { message: err.message };
    }
  }
  redirect("/dashboard");
};

export const fetchOrCreateStripeConnectLink = async (formData: FormData) => {
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
};

export const commentOnEvent = async (formData: FormData) => {
  console.log(formData);
  const schema = z.object({
    comment: z.string().min(1),
    eventId: z.string().min(1),
  });
  const data = schema.parse({
    comment: formData.get("comment"),
    eventId: formData.get("eventId"),
  });
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const res = await prisma.comment.create({
      data: {
        text: data.comment,
        eventId: parseInt(data.eventId),
        userId: session.user.id,
      },
    });
    revalidatePath("/");
    return res;
  }
  throw new Error("No User Found");
};

export const likeEvent = async (eventId: number, formData: FormData) => {
  const session = await getServerSession(authOptions);
  console.log(`eventId`, eventId);
  if (session?.user) {
    console.log(`user`, session.user.id);

    const existingAttendance = await prisma.usersAttendingEvents.findUnique({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: session.user.id,
        },
      },
    });
    if (existingAttendance) {
      // If the user is already attending, remove the attendance record
      await prisma.usersAttendingEvents.delete({
        where: {
          eventId_userId: {
            eventId: eventId,
            userId: session.user.id,
          },
        },
      });
      console.log("User has unattended the event.");
      revalidatePath("/");

      return {
        attending: false,
      };
    } else {
      // If the user is not attending, add a new attendance record
      await prisma.usersAttendingEvents.create({
        data: {
          eventId: eventId,
          userId: session.user.id,
        },
      });
      console.log("User is now attending the event.");
    }
    revalidatePath("/");
    return {
      attending: true,
    };
  } else {
    return {};
  }
};
