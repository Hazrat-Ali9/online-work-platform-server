/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Testimonial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_userId_key" ON "Testimonial"("userId");
