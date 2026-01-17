-- AlterTable
ALTER TABLE "ChurchBranch" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::integer;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::integer;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer,
ALTER COLUMN "updatedAt" SET DEFAULT extract(epoch from now())::integer;

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "titleHeader" TEXT NOT NULL,
    "titleSubHeader" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,
    "updatedAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Site_domain_key" ON "Site"("domain");

-- CreateIndex
CREATE INDEX "Site_domain_idx" ON "Site"("domain");

-- CreateIndex
CREATE INDEX "Site_isActive_idx" ON "Site"("isActive");

-- CreateIndex
CREATE INDEX "Site_isDefault_idx" ON "Site"("isDefault");
