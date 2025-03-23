import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

declare global {
  var prisma: PrismaClientSingleton | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
