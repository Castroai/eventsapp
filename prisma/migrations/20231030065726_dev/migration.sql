/*
  Warnings:

  - You are about to drop the `StripeAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_stripeAccountId_fkey";

-- DropTable
DROP TABLE "StripeAccount";
