/*
  Warnings:

  - You are about to drop the column `destinationId` on the `trips` table. All the data in the column will be lost.
  - Added the required column `tripId` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_destinationId_fkey";

-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "tripId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "destinationId";

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
