-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_stripeAccountId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "stripeAccountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stripeAccountId_fkey" FOREIGN KEY ("stripeAccountId") REFERENCES "StripeAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
