-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "organizerId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
