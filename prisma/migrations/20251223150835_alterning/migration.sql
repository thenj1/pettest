/*
  Warnings:

  - You are about to drop the column `visetedAt` on the `Inspection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inspection" DROP COLUMN "visetedAt",
ADD COLUMN     "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
