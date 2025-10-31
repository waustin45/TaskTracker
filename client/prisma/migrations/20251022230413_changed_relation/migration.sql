-- DropForeignKey
ALTER TABLE "public"."DailyTask" DROP CONSTRAINT "DailyTask_userId_fkey";

-- AlterTable
ALTER TABLE "DailyTask" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "DailyTask" ADD CONSTRAINT "DailyTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
