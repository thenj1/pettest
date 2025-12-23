/*
  Warnings:

  - You are about to drop the column `lastVisit` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `worms` on the `House` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_ownerId_fkey";

-- AlterTable
ALTER TABLE "House" DROP COLUMN "lastVisit",
DROP COLUMN "ownerId",
DROP COLUMN "worms",
ADD COLUMN     "agentId" INTEGER;

-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "worms" BOOLEAN NOT NULL,
    "lastVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "houseId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
