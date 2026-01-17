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
CREATE TABLE "BranchSite" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,

    CONSTRAINT "BranchSite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BranchSite_branchId_idx" ON "BranchSite"("branchId");

-- CreateIndex
CREATE INDEX "BranchSite_siteId_idx" ON "BranchSite"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "BranchSite_branchId_siteId_key" ON "BranchSite"("branchId", "siteId");

-- AddForeignKey
ALTER TABLE "BranchSite" ADD CONSTRAINT "BranchSite_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "ChurchBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchSite" ADD CONSTRAINT "BranchSite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
