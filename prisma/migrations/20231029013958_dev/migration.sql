/*
  Warnings:

  - Added the required column `stripeAccountId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeAccountId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StripeAccount" (
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StripeAccount_id_key" ON "StripeAccount"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stripeAccountId_fkey" FOREIGN KEY ("stripeAccountId") REFERENCES "StripeAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
