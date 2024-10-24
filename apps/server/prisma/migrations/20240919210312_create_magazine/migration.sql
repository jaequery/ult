-- CreateTable
CREATE TABLE "Magazine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "month" INTEGER,
    "year" INTEGER,
    "fileUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Magazine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Magazine_name_key" ON "Magazine"("name");
