import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { uploadImage } from "@/app/lib/gstorage";
import { stripe } from "@/app/lib/stripe";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
// TODO:
// Use ZOD for api post body validation
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
    const createSlug = (name: string) => {
      // Convert the name to lowercase and replace spaces with hyphens
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      return slug;
    };
    const slug = createSlug(eventName);
    let data: Prisma.EventCreateArgs = {
      data: {
        organizerId: user!.id,
        date,
        description,
        eventName,
        lat: parseFloat(lat),
        long: parseFloat(long),
        location,
        imgUrl: uploadUrl,
        slug: slug,
      },
    };
    if (
      user &&
      user.stripeAccountId &&
      formData.has("ticketPrice") &&
      formData.has("ticketQuantity")
    ) {
      const tickerPrice = formData.get("ticketPrice") as string;
      const amountInPennies = Math.round(parseFloat(tickerPrice) * 100);
      data = {
        data: {
          ...data.data,
          tickets: {
            create: {
              price: amountInPennies,
              quantity: parseInt(formData.get("ticketQuantity") as string),
            },
          },
        },
      };
      const newStripeProduct = await stripe({
        stripeAccount: user.stripeAccountId,
      }).products.create({
        name: eventName,
        images: uploadUrl ? [uploadUrl] : undefined,

        shippable: false,
        default_price_data: {
          currency: "usd",
          unit_amount: amountInPennies,
        },
      });
    }
    const res = await prisma.event.create(data);
    return NextResponse.json(res);
  } else {
    return NextResponse.error();
  }
}
