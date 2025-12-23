/*
  Warnings:

  - You are about to drop the column `lastVisit` on the `Inspection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inspection" DROP COLUMN "lastVisit",
ADD COLUMN     "visetedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
