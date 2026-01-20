-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PASTOR', 'STAFF', 'MEMBER');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WORSHIP', 'YOUTH', 'CHILDREN', 'ADULT', 'PRAYER', 'STUDY', 'OTHER');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,
    "updatedAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" "EventType" NOT NULL DEFAULT 'OTHER',
    "organizerId" TEXT,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sermon" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT,
    "preacherId" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "Sermon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leadershipTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "leadershipTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchBranch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "country" TEXT,
    "phone" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "siteId" TEXT,
    "createdAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,
    "updatedAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,

    CONSTRAINT "ChurchBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "serviceType" TEXT,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "link" TEXT,
    "branchId" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,
    "updatedAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "BranchSite" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL DEFAULT extract(epoch from now())::integer,

    CONSTRAINT "BranchSite_pkey" PRIMARY KEY ("id")
);

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
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Event_organizerId_idx" ON "Event"("organizerId");

-- CreateIndex
CREATE INDEX "Sermon_preacherId_idx" ON "Sermon"("preacherId");

-- CreateIndex
CREATE INDEX "leadershipTeam_order_idx" ON "leadershipTeam"("order");

-- CreateIndex
CREATE INDEX "ChurchBranch_order_idx" ON "ChurchBranch"("order");

-- CreateIndex
CREATE INDEX "ChurchBranch_isActive_idx" ON "ChurchBranch"("isActive");

-- CreateIndex
CREATE INDEX "ChurchBranch_country_idx" ON "ChurchBranch"("country");

-- CreateIndex
CREATE INDEX "ChurchBranch_siteId_idx" ON "ChurchBranch"("siteId");

-- CreateIndex
CREATE INDEX "Service_branchId_idx" ON "Service"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "Site_domain_key" ON "Site"("domain");

-- CreateIndex
CREATE INDEX "Site_domain_idx" ON "Site"("domain");

-- CreateIndex
CREATE INDEX "Site_isActive_idx" ON "Site"("isActive");

-- CreateIndex
CREATE INDEX "Site_isDefault_idx" ON "Site"("isDefault");

-- CreateIndex
CREATE INDEX "BranchSite_branchId_idx" ON "BranchSite"("branchId");

-- CreateIndex
CREATE INDEX "BranchSite_siteId_idx" ON "BranchSite"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "BranchSite_branchId_siteId_key" ON "BranchSite"("branchId", "siteId");

-- CreateIndex
CREATE INDEX "HeroImage_order_idx" ON "HeroImage"("order");

-- CreateIndex
CREATE INDEX "HeroImage_isActive_idx" ON "HeroImage"("isActive");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sermon" ADD CONSTRAINT "Sermon_preacherId_fkey" FOREIGN KEY ("preacherId") REFERENCES "leadershipTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchBranch" ADD CONSTRAINT "ChurchBranch_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "ChurchBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchSite" ADD CONSTRAINT "BranchSite_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "ChurchBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchSite" ADD CONSTRAINT "BranchSite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

