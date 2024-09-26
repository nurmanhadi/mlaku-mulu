/*
  Warnings:

  - You are about to drop the `Destination` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_tripId_fkey";

-- DropTable
DROP TABLE "Destination";

-- CreateTable
CREATE TABLE "destinations" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
