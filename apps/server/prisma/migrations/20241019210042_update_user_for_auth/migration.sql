-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('email', 'google');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authType" "AuthType" NOT NULL DEFAULT 'email',
ADD COLUMN     "lastLoggedInAt" TIMESTAMP(3),
ADD COLUMN     "username" TEXT;
