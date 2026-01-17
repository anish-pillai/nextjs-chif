-- AlterTable
ALTER TABLE "ChurchBranch" ADD COLUMN     "siteId" TEXT,
ALTER COLUMN "createdAt" SET DEFAULT extract(epoch from now())::integer,
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

-- CreateIndex
CREATE INDEX "ChurchBranch_siteId_idx" ON "ChurchBranch"("siteId");

-- AddForeignKey
ALTER TABLE "ChurchBranch" ADD CONSTRAINT "ChurchBranch_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
