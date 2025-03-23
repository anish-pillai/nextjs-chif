-- CreateTable
CREATE TABLE "LeadershipTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "LeadershipTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadershipTeam_order_idx" ON "LeadershipTeam"("order");
