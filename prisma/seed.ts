import { PrismaClient, Role } from '@prisma/client'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  // Create default admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@chif.org' },
    update: {},
    create: {
      email: 'admin@chif.org',
      name: 'Admin',
      role: Role.ADMIN,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
