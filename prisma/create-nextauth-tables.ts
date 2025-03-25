import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create Account table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Account" (
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
    `;

    // Create unique index on provider and providerAccountId
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" 
      ON "Account"("provider", "providerAccountId");
    `;

    // Create index on userId
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "Account_userId_idx" 
      ON "Account"("userId");
    `;

    // Create Session table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT NOT NULL,
        "sessionToken" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
      );
    `;

    // Create unique index on sessionToken
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" 
      ON "Session"("sessionToken");
    `;

    // Create index on userId
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "Session_userId_idx" 
      ON "Session"("userId");
    `;

    // Create VerificationToken table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "VerificationToken" (
        "identifier" TEXT NOT NULL,
        "token" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL
      );
    `;

    // Create unique index on token
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" 
      ON "VerificationToken"("token");
    `;

    // Create unique index on identifier and token
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" 
      ON "VerificationToken"("identifier", "token");
    `;

    // Add new columns to User table
    await prisma.$executeRaw`
      ALTER TABLE "User" 
      ADD COLUMN IF NOT EXISTS "emailVerified" TIMESTAMP(3),
      ADD COLUMN IF NOT EXISTS "image" TEXT;
    `;

    // Add foreign key constraints
    await prisma.$executeRaw`
      ALTER TABLE "Account" 
      ADD CONSTRAINT "Account_userId_fkey" 
      FOREIGN KEY ("userId") 
      REFERENCES "User"("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
    `;

    await prisma.$executeRaw`
      ALTER TABLE "Session" 
      ADD CONSTRAINT "Session_userId_fkey" 
      FOREIGN KEY ("userId") 
      REFERENCES "User"("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
    `;

    console.log('NextAuth tables created successfully!');
  } catch (error) {
    console.error('Error creating NextAuth tables:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
