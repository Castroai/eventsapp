import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    const data = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (user) {
      const existingAttendance = await prisma.usersAttendingEvents.findUnique({
        where: {
          eventId_userId: {
            eventId: data.id,
            userId: user.id,
          },
        },
      });
      if (existingAttendance) {
        // If the user is already attending, remove the attendance record
        await prisma.usersAttendingEvents.delete({
          where: {
            eventId_userId: {
              eventId: data.id,
              userId: user.id,
            },
          },
        });
        console.log("User has unattended the event.");
        return NextResponse.json({
          attending: false,
        });
      } else {
        // If the user is not attending, add a new attendance record
        const res = await prisma.usersAttendingEvents.create({
          data: {
            userId: user.id,
            eventId: data.id,
          },
        });
        console.log("User is now attending the event.");
        return NextResponse.json({ ...res, attending: true });
      }
    } else {
      return NextResponse.error();
    }
  } else {
    return NextResponse.error();
  }
}
