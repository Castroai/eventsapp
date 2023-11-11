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

// utils
const createSlug = (name: string) => {
  // TODO: Better Slug
  // Convert the name to lowercase and replace spaces with hyphens
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return slug;
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

export const commentOnEvent = async (eventId: number, formData: FormData) => {
  console.log(formData);
  const schema = z.object({
    comment: z.string().min(1),
  });
  const data = schema.parse({
    comment: formData.get("comment"),
    eventId: eventId,
  });
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const res = await prisma.comment.create({
      data: {
        text: data.comment,
        eventId: eventId,
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

export const createTicket = async (eventId: number, formData: FormData) => {
  "use server";
  console.log(formData);
  console.log(eventId);

  const update = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      tickets: {
        create: {
          price: parseFloat(formData.get("price") as string),
          quantity: 1,
        },
      },
    },
  });

  redirect(`/dashboard/create/venue?event=${eventId}`);
};

const createEventSchema = z.object({
  eventName: z.string().min(1),
  description: z.string(),
});
export const createEvent = async (progressStep: string, formData: FormData) => {
  // 1. Get the current user session
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    //   2.v alidate the schema
    const data = createEventSchema.parse({
      eventName: formData.get("eventName"),
      description: formData.get("description"),
    });
    const slug = createSlug(data.eventName);
    let uploadUrl: string | undefined;

    if (formData.has("file")) {
      const file = formData.get("file") as File;
      uploadUrl = await uploadImage(file);
    }

    const query: Prisma.EventCreateArgs = {
      data: {
        organizerId: session.user?.id,
        slug: slug,
        eventName: data.eventName,
        description: data.description,
        imgUrl: uploadUrl,
        progressStep: parseInt(progressStep),
        status: "DRAFT",
      },
    };
    const res = await prisma.event.create(query);
    redirect(`/dashboard/create/ticket?event=${res.id}`);
  } else {
    throw new Error("No User");
  }
};

const schema = z.object({
  eventName: z.string().min(1),
  description: z.string(),
});
export const updateEvent = async (eventId: number, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const data = schema.parse({
    eventName: formData.get("eventName"),
    description: formData.get("description"),
    eventId: formData.get("eventId"),
  });
  if (session?.user?.id) {
    let uploadUrl: string | undefined;
    if (formData.has("file")) {
      const file = formData.get("file") as File;
      uploadUrl = await uploadImage(file);
    }
    const slug = createSlug(data.eventName);
    const query: Prisma.EventUpdateArgs = {
      where: {
        id: eventId,
      },
      data: {
        organizerId: session.user.id,
        slug: slug,
        eventName: data.eventName,
        description: data.description,
        imgUrl: uploadUrl,
        status: "DRAFT",
      },
    };
    await prisma.event.update(query);
    redirect(`/dashboard/create/ticket?event=${eventId}`);
  }
};
