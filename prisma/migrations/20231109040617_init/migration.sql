-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_userId_fkey";

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
