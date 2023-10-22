/*
  Warnings:

  - Added the required column `lat` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "lat" INTEGER NOT NULL,
ADD COLUMN     "long" INTEGER NOT NULL;
