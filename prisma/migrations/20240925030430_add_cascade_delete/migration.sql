-- DropForeignKey
ALTER TABLE "destinations" DROP CONSTRAINT "destinations_tripId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_touristId_fkey";

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "tourists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
