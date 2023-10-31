import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { uploadImage } from "@/app/lib/gstorage";
import { stripe } from "@/app/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
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

    if (user && user.stripeAccountId) {
      const newStripeProduct = await stripe({
        stripeAccount: user.stripeAccountId,
      }).products.create({
        name: eventName,
        images: uploadUrl ? [uploadUrl] : undefined,
        type: "service",
        shippable: false,
      });
      console.log(newStripeProduct);
    }
    const createSlug = (name: string) => {
      // Convert the name to lowercase and replace spaces with hyphens
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      return slug;
    };
    const slug = createSlug(eventName);

    console.log(slug);
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
