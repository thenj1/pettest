-- CreateEnum
CREATE TYPE "Status" AS ENUM ('VISITED', 'NOT_VISITED', 'OWNER_NOT_PRESENT');

-- CreateEnum
CREATE TYPE "TypeStatus" AS ENUM ('AGENT', 'MANAGER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "TypeStatus" NOT NULL DEFAULT 'AGENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "ownerName" TEXT,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "worms" BOOLEAN NOT NULL,
    "lastVisit" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
