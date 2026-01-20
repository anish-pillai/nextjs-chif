-- AlterTable
ALTER TABLE "BranchSite" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer;

-- AlterTable
ALTER TABLE "ChurchBranch" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::integer;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::integer;

-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::integer;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::integer;

-- CreateTable
CREATE TABLE "HeroImage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,
    "updatedAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,

    CONSTRAINT "HeroImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HeroImage_order_idx" ON "HeroImage"("order");

-- CreateIndex
CREATE INDEX "HeroImage_isActive_idx" ON "HeroImage"("isActive");
