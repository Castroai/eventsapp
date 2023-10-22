/*
  Warnings:

  - You are about to drop the `Attendee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Attendee";

-- CreateTable
CREATE TABLE "UsersAttendingEvents" (
    "eventId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UsersAttendingEvents_pkey" PRIMARY KEY ("eventId","userId")
);

-- AddForeignKey
ALTER TABLE "UsersAttendingEvents" ADD CONSTRAINT "UsersAttendingEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersAttendingEvents" ADD CONSTRAINT "UsersAttendingEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
