/*
  Warnings:

  - You are about to drop the column `location` on the `destinations` table. All the data in the column will be lost.
  - Added the required column `city` to the `destinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "destinations" DROP COLUMN "location",
ADD COLUMN     "city" VARCHAR(100) NOT NULL,
ADD COLUMN     "country" VARCHAR(100) NOT NULL;
